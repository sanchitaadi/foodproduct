<?php

namespace App\Services;

use App\Models\ProductVariant;
use App\Models\InventoryMovement;
use App\Models\StockReservation;
use App\Models\Order;
use App\Models\OrderStatusHistory;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;
use Exception;
use Razorpay\Api\Api as RazorpayApi;

/**
 * PEACHY PLATE — Atomic Inventory & Stock Allocation Service (Audited v1.2.0)
 * 
 * NOTE: "Inventory Reservations" refer strictly to temporary checkout product-stock locks
 * held while a customer interacts with the Razorpay payment gateway (15-minute TTL).
 * THIS IS NOT A RESTAURANT RESERVATION SYSTEM.
 * 
 * Features:
 * - 15-minute temporary checkout stock reservation
 * - Automated expired reservation release
 * - Post-expiry payment recovery algorithm (auto-reconciliation vs automated instant refund)
 * - Idempotency guard on duplicate webhooks
 */
class InventoryService
{
    public const RESERVATION_TTL_MINUTES = 15;

    /**
     * Create temporary stock reservations for checkout items.
     * Prevents overselling during high-volume snack drops.
     *
     * @param array $items Array of ['variant_id' => int, 'quantity' => int]
     * @param int|null $orderId
     * @param int|null $cartId
     * @return array Array of created StockReservation models
     */
    public function reserveStockForCheckout(array $items, ?int $orderId = null, ?int $cartId = null): array
    {
        return DB::transaction(function () use ($items, $orderId, $cartId) {
            $createdReservations = [];
            $expiresAt = Carbon::now()->addMinutes(self::RESERVATION_TTL_MINUTES);

            foreach ($items as $item) {
                $variant = ProductVariant::where('id', $item['variant_id'])
                    ->lockForUpdate() // Row-level lock
                    ->firstOrFail();

                $available = $variant->inventory_quantity - $variant->reserved_quantity;
                if ($available < $item['quantity']) {
                    throw new Exception("Insufficient stock for SKU {$variant->sku}. Requested: {$item['quantity']}, Available: {$available}");
                }

                // Increment variant reserved quantity
                $variant->increment('reserved_quantity', $item['quantity']);

                // Persist reservation record with 15-minute expiry
                $reservation = StockReservation::create([
                    'product_variant_id' => $variant->id,
                    'order_id' => $orderId,
                    'cart_id' => $cartId,
                    'reserved_units' => $item['quantity'],
                    'status' => 'active',
                    'expires_at' => $expiresAt,
                ]);

                $createdReservations[] = $reservation;
            }

            return $createdReservations;
        });
    }

    /**
     * Release all expired stock reservations back to available inventory.
     * Invoked via artisan scheduler (cron: every 5 minutes) or on-demand.
     *
     * @return int Number of released reservations
     */
    public function releaseExpiredReservations(): int
    {
        return DB::transaction(function () {
            $expired = StockReservation::where('status', 'active')
                ->where('expires_at', '<=', Carbon::now())
                ->lockForUpdate()
                ->get();

            $count = 0;
            foreach ($expired as $reservation) {
                $variant = ProductVariant::where('id', $reservation->product_variant_id)
                    ->lockForUpdate()
                    ->first();

                if ($variant) {
                    $decrementQty = min($variant->reserved_quantity, $reservation->reserved_units);
                    $variant->decrement('reserved_quantity', $decrementQty);
                }

                $reservation->update(['status' => 'released']);
                $count++;
            }

            return $count;
        });
    }

    /**
     * Post-Expiry Payment Recovery Strategy:
     * Handles situations where Razorpay payment succeeds AFTER the 15-minute reservation expired
     * and stock was released back to the general inventory.
     * 
     * Idempotent: If already processed, exits cleanly.
     * Branch A: Stock still available -> Re-allocate stock, convert to sale, proceed to fulfill.
     * Branch B: Stock exhausted -> Reject fulfillment, trigger automated 100% Razorpay refund, notify customer.
     *
     * @param Order $order
     * @param string $razorpayPaymentId
     * @return array Status report ['success' => bool, 'action' => 'fulfilled'|'refunded', 'message' => string]
     */
    public function reconcilePostExpiryPayment(Order $order, string $razorpayPaymentId): array
    {
        return DB::transaction(function () use ($order, $razorpayPaymentId) {
            // Idempotency check: If already paid or refunded, do not double-process
            if (in_array($order->payment_status, ['captured', 'refunded'])) {
                return [
                    'success' => true,
                    'action' => $order->payment_status,
                    'message' => "Order #{$order->order_number} has already been reconciled as {$order->payment_status}.",
                ];
            }

            $order->refresh();
            $canFulfill = true;
            $insufficientItems = [];

            // Step 1: Stock Revalidation across all line items
            foreach ($order->items as $item) {
                if (!$item->product_variant_id) continue;

                $variant = ProductVariant::where('id', $item->product_variant_id)
                    ->lockForUpdate()
                    ->first();

                if (!$variant) {
                    $canFulfill = false;
                    $insufficientItems[] = $item->sku_snapshot;
                    break;
                }

                $available = $variant->inventory_quantity - $variant->reserved_quantity;
                if ($available < $item->quantity) {
                    $canFulfill = false;
                    $insufficientItems[] = "{$variant->sku} (Needed: {$item->quantity}, Available: {$available})";
                }
            }

            // Step 2: Branch A — Stock is Available (Auto-Reconciliation)
            if ($canFulfill) {
                foreach ($order->items as $item) {
                    if (!$item->product_variant_id) continue;

                    $variant = ProductVariant::where('id', $item->product_variant_id)->first();
                    $variant->decrement('inventory_quantity', $item->quantity);

                    InventoryMovement::create([
                        'product_variant_id' => $variant->id,
                        'order_id' => $order->id,
                        'admin_user_id' => null,
                        'movement_type' => 'sale_deduction',
                        'quantity_change' => -$item->quantity,
                        'balance_after' => $variant->inventory_quantity,
                        'notes' => "Late payment reconciliation (payment captured post-reservation expiry) for Order #{$order->order_number}",
                    ]);
                }

                $order->update([
                    'status' => 'paid_processing',
                    'payment_status' => 'captured',
                    'razorpay_payment_id' => $razorpayPaymentId,
                ]);

                OrderStatusHistory::create([
                    'order_id' => $order->id,
                    'from_status' => 'pending_payment',
                    'to_status' => 'paid_processing',
                    'comment' => "Late payment reconciled successfully. Stock re-allocated from available inventory.",
                ]);

                Log::info("Post-expiry payment reconciled for Order #{$order->order_number}. Fulfillment approved.");

                return [
                    'success' => true,
                    'action' => 'fulfilled',
                    'message' => "Payment received after reservation expiry; stock successfully re-allocated.",
                ];
            }

            // Step 3: Branch B — Stock is Exhausted (Automated Instant Refund)
            Log::warning("Post-expiry payment received for Order #{$order->order_number}, but stock was exhausted. Initiating automated Razorpay refund.", [
                'insufficient_items' => $insufficientItems,
            ]);

            $order->update([
                'status' => 'cancelled',
                'payment_status' => 'refund_pending',
                'razorpay_payment_id' => $razorpayPaymentId,
            ]);

            // Call Razorpay Refund API
            try {
                $razorpayKey = config('services.razorpay.key_id');
                $razorpaySecret = config('services.razorpay.key_secret');

                if ($razorpayKey && $razorpaySecret) {
                    $api = new RazorpayApi($razorpayKey, $razorpaySecret);
                    $refund = $api->payment->fetch($razorpayPaymentId)->refund([
                        'amount' => $order->total_cents, // Amount in Paise
                        'notes' => [
                            'reason' => 'Stock reservation expired before payment completion; inventory unavailable',
                            'order_number' => $order->order_number,
                        ],
                    ]);

                    $order->update([
                        'payment_status' => 'refunded',
                    ]);

                    OrderStatusHistory::create([
                        'order_id' => $order->id,
                        'from_status' => 'pending_payment',
                        'to_status' => 'cancelled',
                        'comment' => "Stock reservation expired before payment completion. Items sold out. Automated 100% refund initiated via Razorpay (Refund ID: {$refund->id}).",
                    ]);
                }
            } catch (Exception $e) {
                Log::error("Failed to execute automatic Razorpay refund for Order #{$order->order_number}: " . $e->getMessage());
                OrderStatusHistory::create([
                    'order_id' => $order->id,
                    'from_status' => 'pending_payment',
                    'to_status' => 'cancelled',
                    'comment' => "Automated refund failed to process via API. Manual refund queued for admin. Error: " . $e->getMessage(),
                ]);
            }

            return [
                'success' => false,
                'action' => 'refunded',
                'message' => "Stock was sold out after 15-minute reservation expired. An automated full refund has been triggered.",
            ];
        });
    }

    /**
     * Standard order deduction when payment is confirmed WITHIN active reservation window.
     */
    public function commitOrderDeduction(Order $order): void
    {
        DB::transaction(function () use ($order) {
            foreach ($order->items as $item) {
                if (!$item->product_variant_id) continue;

                $variant = ProductVariant::where('id', $item->product_variant_id)
                    ->lockForUpdate()
                    ->first();

                if (!$variant) continue;

                // Decrement physical stock and release reservation
                $variant->decrement('inventory_quantity', $item->quantity);
                $variant->decrement('reserved_quantity', min($variant->reserved_quantity, $item->quantity));

                // Mark reservation converted
                StockReservation::where('order_id', $order->id)
                    ->where('product_variant_id', $variant->id)
                    ->where('status', 'active')
                    ->update(['status' => 'converted']);

                // Record immutable audit movement
                InventoryMovement::create([
                    'product_variant_id' => $variant->id,
                    'order_id' => $order->id,
                    'admin_user_id' => null,
                    'movement_type' => 'sale_deduction',
                    'quantity_change' => -$item->quantity,
                    'balance_after' => $variant->inventory_quantity,
                    'notes' => "Automatic deduction for Order #{$order->order_number} (Razorpay Verified)",
                ]);
            }
        });
    }

    /**
     * Record a manual inventory adjustment with mandatory audit note.
     */
    public function adjustStock(int $variantId, int $quantityChange, string $type, ?int $adminId, string $notes): void
    {
        DB::transaction(function () use ($variantId, $quantityChange, $type, $adminId, $notes) {
            $variant = ProductVariant::where('id', $variantId)
                ->lockForUpdate()
                ->firstOrFail();

            $variant->inventory_quantity += $quantityChange;
            if ($variant->inventory_quantity < 0) {
                throw new Exception("Adjustment would result in negative stock.");
            }
            $variant->save();

            InventoryMovement::create([
                'product_variant_id' => $variant->id,
                'order_id' => null,
                'admin_user_id' => $adminId,
                'movement_type' => $type,
                'quantity_change' => $quantityChange,
                'balance_after' => $variant->inventory_quantity,
                'notes' => $notes,
            ]);
        });
    }
}
