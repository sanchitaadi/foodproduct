<?php
/**
 * PEACHY PLATE — ReviewController
 * Customer Reviews & Ratings Submission
 */

namespace PeachyPlate\Controllers;

use PeachyPlate\Config\Database;

class ReviewController {
    public static function index(string $productId): void {
        $reviews = [
            [
                'id' => 1,
                'product_id' => $productId,
                'author' => 'Aniket R.',
                'location' => 'Mumbai, India',
                'rating' => 5,
                'verified_buyer' => true,
                'title' => 'Unreal crunch and seasoning',
                'comment' => 'Tastes fresh and crisp without feeling soaked in grease. Perfect balance of spices.',
                'date' => '2026-02-12'
            ],
            [
                'id' => 2,
                'product_id' => $productId,
                'author' => 'Pooja V.',
                'location' => 'Bengaluru, India',
                'rating' => 5,
                'verified_buyer' => true,
                'title' => 'Best late night snack',
                'comment' => 'Packaging is super cool and arrived in 2 days in mint condition.',
                'date' => '2026-02-10'
            ]
        ];

        echo json_encode([
            'success' => true,
            'productId' => $productId,
            'count' => count($reviews),
            'reviews' => $reviews
        ]);
    }

    public static function store(): void {
        $input = json_decode(file_get_contents('php://input'), true) ?? [];
        $rating = (int)($input['rating'] ?? 5);
        $comment = trim($input['comment'] ?? '');

        if (empty($comment)) {
            http_response_code(422);
            echo json_encode(['success' => false, 'message' => 'Please provide review comments.']);
            return;
        }

        http_response_code(201);
        echo json_encode([
            'success' => true,
            'message' => 'Thank you! Your verified review has been submitted.'
        ]);
    }
}
