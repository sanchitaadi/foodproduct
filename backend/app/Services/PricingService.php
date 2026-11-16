<?php

namespace App\Services;

use App\Models\Cart;
use App\Models\Coupon;
use App\Models\ProductVariant;
use InvalidArgumentException;

/**
 * PEACHY PLATE — Server-Side Pricing, GST Tax & Cart Calculation Engine
 * 
 * Rules:
 * - Zero client trust.
 * - Integer cents/paise precision (e.g. 24900 = ₹249.00).
 * - Indian GST calculation:
 *   - Intra-state (Seller state == Buyer state, default Karnataka): CGST (half) + SGST (half)
 *   - Inter-state (Seller state != Buyer state): IGST (full rate)
 * - COD support: Optional convenience surcharge (e.g. ₹50 / 5000 paise).
 */
class PricingService
{
    public const SELLER_STATE = 'Karnataka';
    public const FREE_SHIPPING_THRESHOLD_CENTS = 49900; // ₹499.00
    public const STANDARD_SHIPPING_CENTS = 5000; // ₹50.00
    public const COD_CONVENIENCE_FEE_CENTS = 5000; // ₹50.00
    public const COD_MAX_ORDER_LIMIT_CENTS = 500000; // ₹5,000.00

    /**
     * Compute comprehensive cart financial breakdown including GST split and delivery fees.
     *
     * @param Cart $cart
     * @param string $destinationState Indian State for shipping (e.g. 'Karnataka', 'Maharashtra', 'Delhi')
     * @param bool $isCod Whether customer selected Cash on Delivery
     * @return array
     */
    public function computeCartTotals(Cart $cart, string $destinationState = 'Karnataka', bool $isCod = false): array
    {
        $subtotalCents = 0;
        $totalWeightGrams = 0;
        $itemBreakdowns = [];

        $totalCgstCents = 0;
        $totalSgstCents = 0;
        $totalIgstCents = 0;

        $isIntraState = (strcasecmp(trim($destinationState), self::SELLER_STATE) === 0);

        foreach ($cart->items as $item) {
            $variant = ProductVariant::with('product')->findOrFail($item->product_variant_id);

            if (!$variant->is_active || $variant->product->status !== 'active') {
                continue;
            }

            $lineTotal = $variant->price_cents * $item->quantity;
            $subtotalCents += $lineTotal;
            $totalWeightGrams += ($variant->net_weight_grams * $item->quantity);

            // Product specific GST rate (default 5.00%)
            $gstRate = (float) ($variant->product->gst_rate_percent ?? 5.00);
            $gstFraction = $gstRate / 100.0;

            // In India, consumer retail prices are inclusive of GST (MRP standard)
            // Taxable Base = LineTotal / (1 + GST Rate)
            $taxableLineAmount = $lineTotal / (1.0 + $gstFraction);
            $taxAmountCents = (int) round($lineTotal - $taxableLineAmount);

            $lineCgst = 0;
            $lineSgst = 0;
            $lineIgst = 0;

            if ($isIntraState) {
                $lineCgst = (int) round($taxAmountCents / 2);
                $lineSgst = $taxAmountCents - $lineCgst;
                $totalCgstCents += $lineCgst;
                $totalSgstCents += $lineSgst;
            } else {
                $lineIgst = $taxAmountCents;
                $totalIgstCents += $lineIgst;
            }

            $itemBreakdowns[] = [
                'cart_item_id' => $item->id,
                'variant_id' => $variant->id,
                'sku' => $variant->sku,
                'hsn_code' => $variant->product->hsn_code ?? '1905',
                'gst_rate_percent' => $gstRate,
                'unit_price_cents' => $variant->price_cents,
                'quantity' => $item->quantity,
                'line_total_cents' => $lineTotal,
                'cgst_cents' => $lineCgst,
                'sgst_cents' => $lineSgst,
                'igst_cents' => $lineIgst,
            ];
        }

        // Coupon discount calculation
        $discountCents = 0;
        if ($cart->coupon_id) {
            $coupon = Coupon::find($cart->coupon_id);
            if ($coupon && $coupon->isValidForAmount($subtotalCents)) {
                $discountCents = $coupon->calculateSavings($subtotalCents);
            }
        }

        // Shipping calculation: Free over ₹499
        $shippingFeeCents = ($subtotalCents >= self::FREE_SHIPPING_THRESHOLD_CENTS || $subtotalCents === 0)
            ? 0
            : self::STANDARD_SHIPPING_CENTS;

        // Cash on delivery surcharge
        $codFeeCents = 0;
        if ($isCod && $subtotalCents > 0) {
            if ($subtotalCents > self::COD_MAX_ORDER_LIMIT_CENTS) {
                throw new InvalidArgumentException("COD is not eligible for orders exceeding ₹5,000. Please pay via Razorpay.");
            }
            $codFeeCents = self::COD_CONVENIENCE_FEE_CENTS;
        }

        $totalTaxCents = $totalCgstCents + $totalSgstCents + $totalIgstCents;
        $totalPayableCents = max(0, $subtotalCents - $discountCents + $shippingFeeCents + $codFeeCents);

        return [
            'subtotal_cents' => $subtotalCents,
            'discount_cents' => $discountCents,
            'shipping_fee_cents' => $shippingFeeCents,
            'tax_cents' => $totalTaxCents,
            'cgst_cents' => $totalCgstCents,
            'sgst_cents' => $totalSgstCents,
            'igst_cents' => $totalIgstCents,
            'is_intra_state' => $isIntraState,
            'is_cod' => $isCod,
            'cod_fee_cents' => $codFeeCents,
            'total_cents' => $totalPayableCents,
            'currency' => 'INR',
            'total_weight_grams' => $totalWeightGrams,
            'items' => $itemBreakdowns,
        ];
    }
}
