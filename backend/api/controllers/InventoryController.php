<?php
/**
 * PEACHY PLATE — InventoryController
 * Warehouse Stock Levels, Batch Expiries & Stock Adjustments
 */

namespace PeachyPlate\Controllers;

use PeachyPlate\Config\Database;

class InventoryController {
    public static function index(): void {
        $inventory = [
            [
                'product_id' => 'prod-1',
                'sku' => 'POP-CHIP-70G',
                'stock_available' => 1420,
                'stock_reserved' => 38,
                'batch_number' => 'BATCH-2026-03B',
                'mfg_date' => '2026-02-15',
                'exp_date' => '2026-08-15',
                'warehouse' => 'Bhiwandi Hub, MH',
                'status' => 'IN_STOCK'
            ],
            [
                'product_id' => 'prod-2',
                'sku' => 'POP-MAKH-65G',
                'stock_available' => 840,
                'stock_reserved' => 12,
                'batch_number' => 'BATCH-2026-02F',
                'mfg_date' => '2026-02-20',
                'exp_date' => '2026-11-20',
                'warehouse' => 'Patna Agro Hub, BR',
                'status' => 'IN_STOCK'
            ],
            [
                'product_id' => 'prod-3',
                'sku' => 'CRV-CHOC-80G',
                'stock_available' => 460,
                'stock_reserved' => 85,
                'batch_number' => 'BATCH-2026-04A',
                'mfg_date' => '2026-01-10',
                'exp_date' => '2027-01-10',
                'warehouse' => 'Kochi Estate, KL',
                'status' => 'LIMITED_DROP'
            ],
            [
                'product_id' => 'prod-4',
                'sku' => 'HPY-GUMM-90G',
                'stock_available' => 920,
                'stock_reserved' => 44,
                'batch_number' => 'BATCH-2026-01C',
                'mfg_date' => '2026-02-01',
                'exp_date' => '2026-12-01',
                'warehouse' => 'Ratnagiri Facility, MH',
                'status' => 'IN_STOCK'
            ]
        ];

        echo json_encode([
            'success' => true,
            'count' => count($inventory),
            'inventory' => $inventory
        ]);
    }
}
