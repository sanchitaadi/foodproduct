<?php
/**
 * PEACHY PLATE — DiscountController
 * Coupon Validation Engine (e.g. PEACHY15, WELCOME10, CRUNCH20)
 */

namespace PeachyPlate\Controllers;

class DiscountController {
    public static function validate(): void {
        $input = json_decode(file_get_contents('php://input'), true) ?? [];
        $code = strtoupper(trim($input['code'] ?? ''));
        $subtotal = (float)($input['subtotal'] ?? 0);

        $coupons = [
            'PEACHY15' => [
                'type' => 'percentage',
                'value' => 15,
                'min_order' => 499,
                'description' => '15% Off on orders above ₹499'
            ],
            'WELCOME10' => [
                'type' => 'percentage',
                'value' => 10,
                'min_order' => 299,
                'description' => '10% Off Welcome Voucher'
            ],
            'CRUNCH20' => [
                'type' => 'fixed',
                'value' => 100,
                'min_order' => 699,
                'description' => 'Flat ₹100 Off on Super Stashes above ₹699'
            ]
        ];

        if (!isset($coupons[$code])) {
            http_response_code(404);
            echo json_encode([
                'success' => false,
                'message' => 'Invalid or expired coupon code. (Try PEACHY15)'
            ]);
            return;
        }

        $c = $coupons[$code];
        if ($subtotal < $c['min_order']) {
            http_response_code(422);
            echo json_encode([
                'success' => false,
                'message' => "Order subtotal must be at least ₹{$c['min_order']} to apply code {$code}."
            ]);
            return;
        }

        $discountAmount = $c['type'] === 'percentage'
            ? round(($subtotal * $c['value']) / 100)
            : $c['value'];

        echo json_encode([
            'success' => true,
            'code' => $code,
            'discountAmount' => $discountAmount,
            'description' => $c['description']
        ]);
    }
}
