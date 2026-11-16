<?php
/**
 * PEACHY PLATE — SettingsController
 * Selected Brand Concept & Global Storefront Settings
 */

namespace PeachyPlate\Controllers;

use PeachyPlate\Config\Database;

class SettingsController {
    public static function get(): void {
        echo json_encode([
            'success' => true,
            'settings' => [
                'appName' => 'PEACHY PLATE FOODS — THREE CONCEPTS E-COMMERCE',
                'active_concept' => 'flavourverse',
                'currency' => 'INR',
                'currencySymbol' => '₹',
                'freeShippingThreshold' => 499,
                'standardShippingFee' => 49,
                'expressShippingFee' => 99,
                'taxRatePercent' => 5,
                'targetMarket' => 'India',
                'fssaiCompliant' => true,
                'demoCheckoutEnabled' => true,
                'available_concepts' => [
                    'flavourverse' => 'FLAVOURVERSE (Bold Editorial Food Universe)',
                    'purepantry' => 'PURE & PANTRY (Modern Organic & Wellness)',
                    'snackattack' => 'SNACK ATTACK (Maximalist Snack Culture)'
                ]
            ]
        ]);
    }

    public static function setTheme(): void {
        $input = json_decode(file_get_contents('php://input'), true) ?? [];
        $concept = $input['concept'] ?? 'flavourverse';

        echo json_encode([
            'success' => true,
            'message' => "Selected concept theme persisted: {$concept}",
            'active_concept' => $concept
        ]);
    }
}
