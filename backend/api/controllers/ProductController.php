<?php
/**
 * PEACHY PLATE — ProductController
 * Indian Packaged Food Catalog API with Filters, Dietary Tags, Search & Single Product Lookup
 */

namespace PeachyPlate\Controllers;

use PeachyPlate\Config\Database;
use PDO;

class ProductController {
    private static function getMockCatalogue(): array {
        return [
            [
                'id' => 'prod-1',
                'name' => 'Tandoori Masala Potato Crisps',
                'hindi_name' => 'तंदूरी मसाला आलू चिप्स',
                'slug' => 'masala-chips',
                'subtitle' => 'Kettle-cooked golden Indian potatoes dusted in Kashmiri deggi mirch and amchur',
                'category_slug' => 'chips',
                'category_name' => 'Chips & Crisps',
                'brand_concept' => 'snackattack',
                'price' => 45,
                'rating' => 4.8,
                'review_count' => 124,
                'primary_image' => '/images/products/masala-chips.jpg',
                'pack_sizes' => [
                    ['label' => 'Standard Pack (70g)', 'price' => 45, 'weight' => '70g'],
                    ['label' => 'Party Pouch (150g)', 'price' => 85, 'weight' => '150g'],
                ],
                'is_featured' => true,
                'dietary' => ['Vegetarian', 'Gluten-Free']
            ],
            [
                'id' => 'prod-2',
                'name' => 'Flaming Peri Peri Roasted Makhana',
                'hindi_name' => 'पेरी पेरी भुना हुआ मखाना',
                'slug' => 'peri-peri-makhana',
                'subtitle' => 'Slow water-popped Bihar fox nuts tossed in fiery African bird’s eye chili and Himalayan pink salt',
                'category_slug' => 'makhana',
                'category_name' => 'Popped Makhana',
                'brand_concept' => 'snackattack',
                'price' => 135,
                'rating' => 4.9,
                'review_count' => 96,
                'primary_image' => '/images/products/peri-peri-makhana.jpg',
                'pack_sizes' => [
                    ['label' => 'Pouch (65g)', 'price' => 135, 'weight' => '65g'],
                    ['label' => 'Mega Jar (140g)', 'price' => 260, 'weight' => '140g'],
                ],
                'is_featured' => true,
                'dietary' => ['Vegan', 'Gluten-Free', 'High-Fiber']
            ],
            [
                'id' => 'prod-3',
                'name' => 'Malabar Single-Estate 74% Dark Chocolate',
                'hindi_name' => 'मालाबार डार्क चॉकलेट ७४%',
                'slug' => 'dark-chocolate',
                'subtitle' => 'Shade-grown Idukki cacao stone-ground for 48 hours with Kerala palm sugar',
                'category_slug' => 'chocolates',
                'category_name' => 'Chocolates & Cacao',
                'brand_concept' => 'flavourverse',
                'price' => 275,
                'rating' => 4.95,
                'review_count' => 89,
                'primary_image' => '/images/products/malabar-dark-chocolate-74.jpg',
                'pack_sizes' => [
                    ['label' => 'Single Block (80g)', 'price' => 275, 'weight' => '80g'],
                    ['label' => 'Duo Vault Pack (2 x 80g)', 'price' => 520, 'weight' => '160g'],
                ],
                'is_featured' => true,
                'dietary' => ['Vegan', 'Single-Estate', 'Refined Sugar Free']
            ],
            [
                'id' => 'prod-4',
                'name' => 'Alphonso Mango & Passionfruit Vegan Gummies',
                'hindi_name' => 'हापुस आम फ्रूट गमीज',
                'slug' => 'fruit-gummies',
                'subtitle' => 'Chewy pectin treat crafted with real Ratnagiri Hapus puree and organic cane sugar',
                'category_slug' => 'confectionery',
                'category_name' => 'Confectionery',
                'brand_concept' => 'flavourverse',
                'price' => 165,
                'rating' => 4.88,
                'review_count' => 142,
                'primary_image' => '/images/products/alphonso-mango-gummies.jpg',
                'pack_sizes' => [
                    ['label' => 'Snack Pouch (90g)', 'price' => 165, 'weight' => '90g'],
                    ['label' => 'Glass Treat Jar (200g)', 'price' => 320, 'weight' => '200g'],
                ],
                'is_featured' => true,
                'dietary' => ['Vegan', '100% Real Fruit', 'Gelatin Free']
            ],
            [
                'id' => 'prod-5',
                'name' => 'Kashmiri Mamra Roasted Almonds',
                'hindi_name' => 'कश्मीरी मामरा भुने बादाम',
                'slug' => 'roasted-almonds',
                'subtitle' => 'High-altitude organic Kashmiri Mamra almonds dry roasted with rock salt',
                'category_slug' => 'nuts',
                'category_name' => 'Nuts & Seeds',
                'brand_concept' => 'purepantry',
                'price' => 495,
                'rating' => 4.92,
                'review_count' => 64,
                'primary_image' => '/images/products/kashmiri-mamra-almonds.jpg',
                'pack_sizes' => [
                    ['label' => 'Glass Jar (200g)', 'price' => 495, 'weight' => '200g'],
                    ['label' => 'Refill Kraft Pouch (500g)', 'price' => 1150, 'weight' => '500g'],
                ],
                'is_featured' => true,
                'dietary' => ['Keto', 'Gluten-Free', 'Single-Origin']
            ],
            [
                'id' => 'prod-6',
                'name' => 'Whey Matrix 20G Fuel Bar',
                'hindi_name' => 'व्हे प्रोटीन मैट्रिक्स बार',
                'slug' => 'protein-bars',
                'subtitle' => 'Cold-filtered whey protein isolate, roasted peanut paste, and dark cacao nibs',
                'category_slug' => 'protein-bars',
                'category_name' => 'Protein Bars',
                'brand_concept' => 'flavourverse',
                'price' => 120,
                'rating' => 4.75,
                'review_count' => 78,
                'primary_image' => '/images/products/whey-protein-matrix-bar.jpg',
                'pack_sizes' => [
                    ['label' => 'Single Bar (60g)', 'price' => 120, 'weight' => '60g'],
                    ['label' => 'Box of 6 (360g)', 'price' => 660, 'weight' => '360g'],
                ],
                'is_featured' => false,
                'dietary' => ['High Protein', 'No Added Sugar']
            ],
            [
                'id' => 'prod-7',
                'name' => 'Belgian Dark Cacao Butter Cookies',
                'hindi_name' => 'डार्क कोको बटर कुकीज',
                'slug' => 'chocolate-cookies',
                'subtitle' => 'Melt-in-the-mouth crumbly butter cookies baked with Belgian cocoa & pure dairy butter',
                'category_slug' => 'cookies',
                'category_name' => 'Cookies & Bakes',
                'brand_concept' => 'flavourverse',
                'price' => 249,
                'rating' => 4.9,
                'review_count' => 112,
                'primary_image' => '/images/products/cocoa-hazelnut-cookies.jpg',
                'pack_sizes' => [
                    ['label' => 'Gift Tin (180g)', 'price' => 249, 'weight' => '180g'],
                    ['label' => 'Sharing Box (360g)', 'price' => 460, 'weight' => '360g'],
                ],
                'is_featured' => true,
                'dietary' => ['Vegetarian', 'Pure Butter']
            ],
            [
                'id' => 'prod-8',
                'name' => 'Stone-Ground Crunchy Peanut Butter',
                'hindi_name' => 'देसी मूंगफली का मक्खन',
                'slug' => 'peanut-butter',
                'subtitle' => 'Slow-roasted Saurashtra peanuts stone-churned with Himalayan pink salt and jaggery',
                'category_slug' => 'spreads',
                'category_name' => 'Spreads & Butters',
                'brand_concept' => 'purepantry',
                'price' => 299,
                'rating' => 4.85,
                'review_count' => 54,
                'primary_image' => '/images/products/stone-ground-peanut-butter.jpg',
                'pack_sizes' => [
                    ['label' => 'Glass Jar (350g)', 'price' => 299, 'weight' => '350g'],
                    ['label' => 'Family Tub (1kg)', 'price' => 749, 'weight' => '1000g'],
                ],
                'is_featured' => false,
                'dietary' => ['High-Protein', 'No Palm Oil', 'Vegan']
            ]
        ];
    }

    public static function index(): void {
        $category = $_GET['category'] ?? null;
        $brand = $_GET['brand_concept'] ?? null;
        $search = strtolower(trim($_GET['search'] ?? ''));
        $sort = $_GET['sort'] ?? 'featured';

        $pdo = Database::getConnection();
        if ($pdo) {
            $query = "SELECT * FROM products WHERE 1=1";
            $params = [];

            if ($brand) {
                $query .= " AND brand_concept = :brand";
                $params['brand'] = $brand;
            }
            if ($category && $category !== 'all') {
                $query .= " AND category_slug = :category";
                $params['category'] = $category;
            }
            if ($search) {
                $query .= " AND (LOWER(name) LIKE :search OR LOWER(subtitle) LIKE :search)";
                $params['search'] = "%{$search}%";
            }

            if ($sort === 'price-asc') {
                $query .= " ORDER BY price ASC";
            } elseif ($sort === 'price-desc') {
                $query .= " ORDER BY price DESC";
            } elseif ($sort === 'rating') {
                $query .= " ORDER BY rating DESC";
            } else {
                $query .= " ORDER BY is_featured DESC, id ASC";
            }

            try {
                $stmt = $pdo->prepare($query);
                $stmt->execute($params);
                $products = $stmt->fetchAll();
            } catch (\Exception $e) {
                $products = self::filterMockCatalogue($brand, $category, $search, $sort);
            }
        } else {
            $products = self::filterMockCatalogue($brand, $category, $search, $sort);
        }

        echo json_encode([
            'success' => true,
            'count' => count($products),
            'products' => $products
        ]);
    }

    private static function filterMockCatalogue(?string $brand, ?string $category, string $search, string $sort): array {
        $list = self::getMockCatalogue();

        if ($brand) {
            $list = array_values(array_filter($list, function ($p) use ($brand) {
                // Map aliases
                if ($brand === 'flavourverse' && ($p['brand_concept'] === 'flavourverse' || $p['brand_concept'] === 'concept-a-flavourverse')) return true;
                if ($brand === 'purepantry' && ($p['brand_concept'] === 'purepantry' || $p['brand_concept'] === 'concept-b-purepantry')) return true;
                if ($brand === 'snackattack' && ($p['brand_concept'] === 'snackattack' || $p['brand_concept'] === 'concept-c-snackattack')) return true;
                return $p['brand_concept'] === $brand;
            }));
        }

        if ($category && $category !== 'all') {
            $list = array_values(array_filter($list, fn($p) => $p['category_slug'] === $category));
        }

        if (!empty($search)) {
            $list = array_values(array_filter($list, fn($p) =>
                str_contains(strtolower($p['name']), $search) ||
                str_contains(strtolower($p['subtitle']), $search)
            ));
        }

        if ($sort === 'price-asc') {
            usort($list, fn($a, $b) => $a['price'] <=> $b['price']);
        } elseif ($sort === 'price-desc') {
            usort($list, fn($a, $b) => $b['price'] <=> $a['price']);
        } elseif ($sort === 'rating') {
            usort($list, fn($a, $b) => $b['rating'] <=> $a['rating']);
        }

        return $list;
    }

    public static function show(string $slug): void {
        $catalog = self::getMockCatalogue();
        foreach ($catalog as $prod) {
            if ($prod['slug'] === $slug) {
                echo json_encode(['success' => true, 'product' => $prod]);
                return;
            }
        }

        http_response_code(404);
        echo json_encode(['success' => false, 'message' => "Product '{$slug}' not found."]);
    }

    public static function dietaryTags(): void {
        echo json_encode([
            'success' => true,
            'tags' => ['Vegetarian', 'Vegan', 'Gluten-Free', 'High-Protein', 'High-Fiber', 'Keto', 'Ayurvedic']
        ]);
    }
}
