<?php
/**
 * PEACHY PLATE — NewsletterController
 * Email Subscription & SMS Dispatch List
 */

namespace PeachyPlate\Controllers;

use PeachyPlate\Config\Database;

class NewsletterController {
    public static function subscribe(): void {
        $input = json_decode(file_get_contents('php://input'), true) ?? [];
        $email = trim($input['email'] ?? '');
        $brandConcept = trim($input['brandConceptId'] ?? 'general');

        if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            http_response_code(422);
            echo json_encode(['success' => false, 'message' => 'Please provide a valid email address.']);
            return;
        }

        $pdo = Database::getConnection();
        if ($pdo) {
            try {
                $stmt = $pdo->prepare("
                    INSERT INTO newsletter_subscribers (email, brand_concept, subscribed_at)
                    VALUES (:email, :brand, NOW())
                    ON DUPLICATE KEY UPDATE subscribed_at = NOW()
                ");
                $stmt->execute(['email' => $email, 'brand' => $brandConcept]);
            } catch (\Exception $e) {
                // table fallback
            }
        }

        echo json_encode([
            'success' => true,
            'message' => 'You are on the VIP early-access drop list! Watch your inbox for secret promo codes.'
        ]);
    }
}
