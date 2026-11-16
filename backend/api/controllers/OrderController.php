<?php
/**
 * PEACHY PLATE — OrderController
 * Demo Orders, Order Tracking, Line Items & Invoice Generation
 */

namespace PeachyPlate\Controllers;

use PeachyPlate\Config\Database;
use PeachyPlate\Config\Auth;
use PDO;

class OrderController {
    public static function create(): void {
        $input = json_decode(file_get_contents('php://input'), true) ?? [];
        $items = $input['items'] ?? [];
        $customerName = trim($input['customerName'] ?? 'Guest Customer');
        $customerEmail = trim($input['customerEmail'] ?? '');
        $customerPhone = trim($input['customerPhone'] ?? '');
        $shippingAddress = $input['shippingAddress'] ?? [];

        if (empty($items)) {
            http_response_code(422);
            echo json_encode([
                'success' => false,
                'message' => 'Cart is empty. Please add products to place an order.'
            ]);
            return;
        }

        $orderNumber = 'ORD-2026-' . rand(10000, 99999);
        $subtotal = (float)($input['subtotal'] ?? 0);
        $discount = (float)($input['discount'] ?? 0);
        $shipping = (float)($input['shipping'] ?? 0);
        $gst = (float)($input['gst'] ?? 0);
        $total = (float)($input['total'] ?? ($subtotal - $discount + $shipping + $gst));
        $awb = 'BD-IN-' . rand(100000000, 999999999);

        $pdo = Database::getConnection();
        if ($pdo) {
            try {
                $stmt = $pdo->prepare("
                    INSERT INTO orders (
                        order_number, customer_name, customer_email, customer_phone,
                        shipping_street, shipping_city, shipping_state, shipping_pincode,
                        subtotal, discount, shipping_fee, tax_amount, total_amount,
                        payment_method, payment_status, order_status, courier_name, awb_code, created_at
                    ) VALUES (
                        :ord_no, :c_name, :c_email, :c_phone,
                        :street, :city, :state, :pincode,
                        :subtotal, :discount, :shipping, :tax, :total,
                        :pay_method, 'Paid (Demo)', 'placed', 'BlueDart Express', :awb, NOW()
                    )
                ");
                $stmt->execute([
                    'ord_no' => $orderNumber,
                    'c_name' => $customerName,
                    'c_email' => $customerEmail,
                    'c_phone' => $customerPhone,
                    'street' => $shippingAddress['street'] ?? 'Street',
                    'city' => $shippingAddress['city'] ?? 'City',
                    'state' => $shippingAddress['state'] ?? 'State',
                    'pincode' => $shippingAddress['pincode'] ?? '000000',
                    'subtotal' => $subtotal,
                    'discount' => $discount,
                    'shipping' => $shipping,
                    'tax' => $gst,
                    'total' => $total,
                    'pay_method' => $input['paymentMethod'] ?? 'Demo Simulation',
                    'awb' => $awb
                ]);
            } catch (\Exception $e) {
                // If tables not migrated, continue cleanly
            }
        }

        http_response_code(201);
        echo json_encode([
            'success' => true,
            'message' => 'Demo order placed successfully.',
            'order' => [
                'id' => $orderNumber,
                'orderNumber' => $orderNumber,
                'status' => 'placed',
                'paymentStatus' => 'Paid (Demo Simulation)',
                'total' => $total,
                'itemCount' => count($items),
                'courier' => 'BlueDart Express',
                'awb' => $awb,
                'estimatedDelivery' => '2-4 Business Days',
                'trackingUrl' => "/order-confirmation/{$orderNumber}"
            ]
        ]);
    }

    public static function track(string $orderNumber): void {
        echo json_encode([
            'success' => true,
            'orderNumber' => $orderNumber,
            'status' => 'in_transit',
            'courier' => 'BlueDart Express',
            'awb' => 'BD-IN-' . rand(100000000, 999999999),
            'milestones' => [
                ['title' => 'Order Placed', 'time' => '10:30 AM', 'completed' => true],
                ['title' => 'Stock Reserved & Checked', 'time' => '11:15 AM', 'completed' => true],
                ['title' => 'Packed in Shield Box', 'time' => '02:00 PM', 'completed' => true],
                ['title' => 'Dispatched via Air Courier', 'time' => '05:30 PM', 'completed' => true],
                ['title' => 'Out for Doorstep Delivery', 'time' => 'Expected Tomorrow', 'completed' => false],
            ]
        ]);
    }

    public static function invoice(string $orderNumber): void {
        echo json_encode([
            'success' => true,
            'invoice' => [
                'invoiceNumber' => 'INV-' . strtoupper(substr(md5($orderNumber), 0, 8)),
                'orderNumber' => $orderNumber,
                'date' => date('d M Y'),
                'gstin' => '29AAAAA0000A1Z5',
                'fssai' => '10019041000572',
                'company' => 'Peachy Plate Organics India Pvt Ltd',
                'address' => 'Indiranagar 100ft Road, Bengaluru 560038, Karnataka',
                'sac_hsn' => '21069099'
            ]
        ]);
    }
}
