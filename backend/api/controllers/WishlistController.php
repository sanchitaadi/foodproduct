<?php
/**
 * PEACHY PLATE — WishlistController
 * Customer Stash & Wishlist Management
 */

namespace PeachyPlate\Controllers;

use PeachyPlate\Config\Database;
use PeachyPlate\Config\Auth;

class WishlistController {
    public static function index(): void {
        echo json_encode([
            'success' => true,
            'items' => [
                ['product_id' => 'prod-1', 'added_at' => '2026-02-14'],
                ['product_id' => 'prod-3', 'added_at' => '2026-02-15']
            ]
        ]);
    }

    public static function toggle(): void {
        $input = json_decode(file_get_contents('php://input'), true) ?? [];
        $productId = $input['product_id'] ?? null;

        if (!$productId) {
            http_response_code(422);
            echo json_encode(['success' => false, 'message' => 'Product ID is required.']);
            return;
        }

        echo json_encode([
            'success' => true,
            'productId' => $productId,
            'inWishlist' => true,
            'message' => 'Product wishlist status updated.'
        ]);
    }
}
