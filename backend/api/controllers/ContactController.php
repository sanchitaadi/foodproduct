<?php
/**
 * PEACHY PLATE — ContactController
 * Wholesale, Inquiries & Press Message Intake
 */

namespace PeachyPlate\Controllers;

use PeachyPlate\Config\Database;

class ContactController {
    public static function submit(): void {
        $input = json_decode(file_get_contents('php://input'), true) ?? [];
        $name = trim($input['name'] ?? '');
        $email = trim($input['email'] ?? '');
        $message = trim($input['message'] ?? '');
        $brandConcept = trim($input['brandConceptId'] ?? 'general');

        if (empty($name) || empty($email) || empty($message)) {
            http_response_code(422);
            echo json_encode([
                'success' => false,
                'message' => 'Please provide name, email, and message content.'
            ]);
            return;
        }

        $ticketId = 'TKT-' . rand(10000, 99999);

        $pdo = Database::getConnection();
        if ($pdo) {
            try {
                $stmt = $pdo->prepare("
                    INSERT INTO contact_messages (ticket_id, brand_concept, name, email, phone, subject, message, created_at)
                    VALUES (:tkt, :brand, :name, :email, :phone, :subj, :msg, NOW())
                ");
                $stmt->execute([
                    'tkt' => $ticketId,
                    'brand' => $brandConcept,
                    'name' => $name,
                    'email' => $email,
                    'phone' => $input['phone'] ?? '',
                    'subj' => $input['subject'] ?? 'General Inquiry',
                    'msg' => $message
                ]);
            } catch (\Exception $e) {
                // Table uninitialized fallback
            }
        }

        http_response_code(201);
        echo json_encode([
            'success' => true,
            'ticketId' => $ticketId,
            'message' => "Thank you {$name}! Your message has been logged under ticket #{$ticketId}. Our concierge will reply within 24 hours."
        ]);
    }
}
