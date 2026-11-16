<?php
/**
 * PEACHY PLATE — CategoryController
 * Indian Packaged Food Categories
 */

namespace PeachyPlate\Controllers;

class CategoryController {
    public static function index(): void {
        $categories = [
            [
                'id' => 'cat-1',
                'name' => 'Chips & Crisps',
                'hindi_name' => 'चिप्स और क्रिस्प्स',
                'slug' => 'chips',
                'description' => 'Golden potato crisps, kettle cooked and dusted with regional Indian spices.',
                'image' => '/images/categories/chips-crisps.jpg',
                'product_count' => 1
            ],
            [
                'id' => 'cat-2',
                'name' => 'Popped Makhana',
                'hindi_name' => 'भुना हुआ मखाना',
                'slug' => 'makhana',
                'description' => 'Nutrient-rich water lily seeds roasted and popped in olive oil.',
                'image' => '/images/categories/popped-makhana.jpg',
                'product_count' => 1
            ],
            [
                'id' => 'cat-3',
                'name' => 'Chocolates & Cacao',
                'hindi_name' => 'चॉकलेट और कोको',
                'slug' => 'chocolates',
                'description' => 'Single-estate South Indian dark chocolate blocks and nut bars.',
                'image' => '/images/categories/chocolates.jpg',
                'product_count' => 1
            ],
            [
                'id' => 'cat-4',
                'name' => 'Confectionery',
                'hindi_name' => 'कन्फेक्शनरी व टॉफी',
                'slug' => 'confectionery',
                'description' => 'Real fruit vegan gummies, jaggery bites and natural toffees.',
                'image' => '/images/categories/healthy-snacks.jpg',
                'product_count' => 1
            ],
            [
                'id' => 'cat-5',
                'name' => 'Cookies & Bakes',
                'hindi_name' => 'कुकीज और बेक्स',
                'slug' => 'cookies',
                'description' => 'Handcrafted pure butter cookies, hazelnut crunch and chai rusks.',
                'image' => '/images/categories/healthy-snacks.jpg',
                'product_count' => 1
            ],
            [
                'id' => 'cat-6',
                'name' => 'Nuts & Seeds',
                'hindi_name' => 'मेवे और बीज',
                'slug' => 'nuts',
                'description' => 'Kashmiri Mamra almonds, roasted cashews, and superseed mixes.',
                'image' => '/images/categories/nuts-seeds.jpg',
                'product_count' => 1
            ],
            [
                'id' => 'cat-7',
                'name' => 'Spreads & Butters',
                'hindi_name' => 'स्प्रेड्स और बटर',
                'slug' => 'spreads',
                'description' => 'Stone-ground peanut, almond and cacao nut butters.',
                'image' => '/images/categories/healthy-snacks.jpg',
                'product_count' => 1
            ],
            [
                'id' => 'cat-8',
                'name' => 'Protein Bars',
                'hindi_name' => 'प्रोटीन बार्स',
                'slug' => 'protein-bars',
                'description' => 'High protein, cold-pressed snack bars with zero artificial sweeteners.',
                'image' => '/images/categories/healthy-snacks.jpg',
                'product_count' => 1
            ]
        ];

        echo json_encode([
            'success' => true,
            'count' => count($categories),
            'categories' => $categories
        ]);
    }
}
