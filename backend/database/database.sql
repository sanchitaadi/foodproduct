-- ==============================================================================
-- PEACHY PLATE — COMPLETE MYSQL DATABASE SCHEMA & INITIAL SEED DATA
-- Version: 1.4.0 (cPanel / phpMyAdmin / MySQL 8.0+ Ready)
-- Target Market: India (INR Pricing, FSSAI Compliance, 15 Unified Modules)
-- ==============================================================================

SET FOREIGN_KEY_CHECKS = 0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+05:30";

-- --------------------------------------------------------
-- 1. USERS & AUTHENTICATION
-- --------------------------------------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(191) NOT NULL UNIQUE,
  `phone` VARCHAR(25) DEFAULT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `role` ENUM('customer', 'admin', 'inventory_manager') NOT NULL DEFAULT 'customer',
  `gstin` VARCHAR(30) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_users_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 2. CATEGORIES
-- --------------------------------------------------------
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `hindi_name` VARCHAR(150) DEFAULT NULL,
  `slug` VARCHAR(100) NOT NULL UNIQUE,
  `description` TEXT DEFAULT NULL,
  `image` VARCHAR(255) DEFAULT NULL,
  `display_order` INT NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_categories_slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 3. PRODUCTS
-- --------------------------------------------------------
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `sku` VARCHAR(60) NOT NULL UNIQUE,
  `name` VARCHAR(200) NOT NULL,
  `hindi_name` VARCHAR(200) DEFAULT NULL,
  `slug` VARCHAR(150) NOT NULL UNIQUE,
  `subtitle` VARCHAR(255) DEFAULT NULL,
  `long_description` TEXT DEFAULT NULL,
  `category_slug` VARCHAR(100) NOT NULL,
  `brand_concept` VARCHAR(50) NOT NULL DEFAULT 'pop-cult',
  `price` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `rating` DECIMAL(3,2) NOT NULL DEFAULT 5.00,
  `review_count` INT UNSIGNED NOT NULL DEFAULT 0,
  `primary_image` VARCHAR(255) NOT NULL,
  `hsn_code` VARCHAR(20) DEFAULT '21069099',
  `gst_rate_percent` DECIMAL(4,2) DEFAULT 5.00,
  `is_featured` TINYINT(1) NOT NULL DEFAULT 0,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_prod_slug` (`slug`),
  INDEX `idx_prod_brand` (`brand_concept`),
  INDEX `idx_prod_cat` (`category_slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 4. PRODUCT VARIANTS / PACK SIZES
-- --------------------------------------------------------
DROP TABLE IF EXISTS `product_variants`;
CREATE TABLE `product_variants` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `product_id` INT UNSIGNED NOT NULL,
  `label` VARCHAR(100) NOT NULL,
  `weight_grams` INT UNSIGNED NOT NULL DEFAULT 0,
  `price_inr` DECIMAL(10,2) NOT NULL,
  `compare_at_price_inr` DECIMAL(10,2) DEFAULT NULL,
  `is_default` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 5. PRODUCT IMAGES
-- --------------------------------------------------------
DROP TABLE IF EXISTS `product_images`;
CREATE TABLE `product_images` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `product_id` INT UNSIGNED NOT NULL,
  `image_url` VARCHAR(255) NOT NULL,
  `is_primary` TINYINT(1) NOT NULL DEFAULT 0,
  `display_order` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 6. INVENTORY & BATCH CONTROL
-- --------------------------------------------------------
DROP TABLE IF EXISTS `inventory`;
CREATE TABLE `inventory` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `product_id` INT UNSIGNED NOT NULL,
  `sku` VARCHAR(60) NOT NULL,
  `batch_number` VARCHAR(50) NOT NULL,
  `stock_available` INT NOT NULL DEFAULT 0,
  `stock_reserved` INT NOT NULL DEFAULT 0,
  `mfg_date` DATE DEFAULT NULL,
  `exp_date` DATE DEFAULT NULL,
  `warehouse_hub` VARCHAR(100) DEFAULT 'Bhiwandi Central Hub, Maharashtra',
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 7. ORDERS
-- --------------------------------------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `order_number` VARCHAR(50) NOT NULL UNIQUE,
  `customer_id` INT UNSIGNED DEFAULT NULL,
  `customer_name` VARCHAR(150) NOT NULL,
  `customer_email` VARCHAR(191) NOT NULL,
  `customer_phone` VARCHAR(30) NOT NULL,
  `shipping_street` TEXT NOT NULL,
  `shipping_landmark` VARCHAR(150) DEFAULT NULL,
  `shipping_city` VARCHAR(100) NOT NULL,
  `shipping_state` VARCHAR(100) NOT NULL,
  `shipping_pincode` VARCHAR(10) NOT NULL,
  `subtotal` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `discount` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `coupon_code` VARCHAR(50) DEFAULT NULL,
  `shipping_fee` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `tax_amount` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `total_amount` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `payment_method` VARCHAR(60) NOT NULL DEFAULT 'Demo Simulation',
  `payment_status` VARCHAR(50) NOT NULL DEFAULT 'Paid (Demo)',
  `order_status` ENUM('placed', 'verified', 'packed', 'dispatched', 'in_transit', 'delivered', 'cancelled') NOT NULL DEFAULT 'placed',
  `courier_name` VARCHAR(100) DEFAULT 'BlueDart Express',
  `awb_code` VARCHAR(100) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_order_number` (`order_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 8. ORDER ITEMS
-- --------------------------------------------------------
DROP TABLE IF EXISTS `order_items`;
CREATE TABLE `order_items` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `order_id` INT UNSIGNED NOT NULL,
  `product_id` INT UNSIGNED DEFAULT NULL,
  `product_name` VARCHAR(200) NOT NULL,
  `pack_size_label` VARCHAR(100) NOT NULL,
  `unit_price` DECIMAL(10,2) NOT NULL,
  `quantity` INT UNSIGNED NOT NULL DEFAULT 1,
  `line_total` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 9. REVIEWS & RATINGS
-- --------------------------------------------------------
DROP TABLE IF EXISTS `reviews`;
CREATE TABLE `reviews` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `product_id` INT UNSIGNED NOT NULL,
  `author_name` VARCHAR(100) NOT NULL,
  `author_location` VARCHAR(100) DEFAULT 'India',
  `rating` TINYINT UNSIGNED NOT NULL DEFAULT 5,
  `title` VARCHAR(200) DEFAULT NULL,
  `comment` TEXT NOT NULL,
  `is_verified_buyer` TINYINT(1) NOT NULL DEFAULT 1,
  `is_approved` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 10. WISHLISTS
-- --------------------------------------------------------
DROP TABLE IF EXISTS `wishlists`;
CREATE TABLE `wishlists` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` INT UNSIGNED NOT NULL,
  `product_id` INT UNSIGNED NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_user_prod` (`user_id`, `product_id`),
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 11. CONTACT MESSAGES
-- --------------------------------------------------------
DROP TABLE IF EXISTS `contact_messages`;
CREATE TABLE `contact_messages` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `ticket_id` VARCHAR(30) NOT NULL UNIQUE,
  `brand_concept` VARCHAR(50) DEFAULT 'general',
  `name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(191) NOT NULL,
  `phone` VARCHAR(30) DEFAULT NULL,
  `subject` VARCHAR(255) NOT NULL,
  `message` TEXT NOT NULL,
  `is_resolved` TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 12. NEWSLETTER SUBSCRIBERS
-- --------------------------------------------------------
DROP TABLE IF EXISTS `newsletter_subscribers`;
CREATE TABLE `newsletter_subscribers` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(191) NOT NULL UNIQUE,
  `brand_concept` VARCHAR(50) DEFAULT 'general',
  `subscribed_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 13. COUPONS & DISCOUNTS
-- --------------------------------------------------------
DROP TABLE IF EXISTS `coupons`;
CREATE TABLE `coupons` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(50) NOT NULL UNIQUE,
  `discount_type` ENUM('percentage', 'fixed') NOT NULL DEFAULT 'percentage',
  `discount_value` DECIMAL(10,2) NOT NULL,
  `min_order_value` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 14. WEBSITE SETTINGS
-- --------------------------------------------------------
DROP TABLE IF EXISTS `settings`;
CREATE TABLE `settings` (
  `setting_key` VARCHAR(100) NOT NULL UNIQUE,
  `setting_value` TEXT NOT NULL,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`setting_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 15. THEME SELECTIONS
-- --------------------------------------------------------
DROP TABLE IF EXISTS `theme_selections`;
CREATE TABLE `theme_selections` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `concept_id` VARCHAR(50) NOT NULL UNIQUE,
  `concept_name` VARCHAR(100) NOT NULL,
  `is_active` TINYINT(1) NOT NULL DEFAULT 0,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================================
-- SEED DATA
-- ========================================================

-- Seed Categories
INSERT INTO `categories` (`id`, `name`, `hindi_name`, `slug`, `description`, `image`, `display_order`) VALUES
(1, 'Chips & Crisps', 'चिप्स और क्रिस्प्स', 'chips', 'Golden kettle-cooked Indian potato crisps', '/images/categories/chips-crisps.jpg', 1),
(2, 'Popped Makhana', 'भुना हुआ मखाना', 'makhana', 'Slow water-popped fox nuts with mineral spices', '/images/categories/popped-makhana.jpg', 2),
(3, 'Chocolates & Cacao', 'चॉकलेट और कोको', 'chocolates', 'Single-estate South Indian dark chocolate blocks', '/images/categories/chocolates.jpg', 3),
(4, 'Confectionery', 'कन्फेक्शनरी', 'confectionery', 'Real fruit vegan gummies and jaggery chews', '/images/categories/healthy-snacks.jpg', 4),
(5, 'Cookies & Bakes', 'कुकीज और बेक्स', 'cookies', 'Belgian cocoa butter cookies and artisanal biscuits', '/images/categories/healthy-snacks.jpg', 5),
(6, 'Nuts & Seeds', 'मेवे और बीज', 'nuts', 'Kashmiri Mamra almonds and roasted nut mixes', '/images/categories/nuts-seeds.jpg', 6),
(7, 'Spreads & Butters', 'स्प्रेड्स और बटर', 'spreads', 'Slow stone-churned natural peanut & nut butters', '/images/categories/healthy-snacks.jpg', 7),
(8, 'Protein Bars', 'प्रोटीन बार्स', 'protein-bars', 'Cold-filtered whey matrix fuel bars', '/images/categories/healthy-snacks.jpg', 8);

-- Seed Products
INSERT INTO `products` (`id`, `sku`, `name`, `hindi_name`, `slug`, `subtitle`, `long_description`, `category_slug`, `brand_concept`, `price`, `rating`, `review_count`, `primary_image`, `hsn_code`, `gst_rate_percent`, `is_featured`) VALUES
(1, 'SKU-CHIP-01', 'Tandoori Masala Potato Crisps', 'तंदूरी मसाला आलू चिप्स', 'masala-chips', 'Kettle-cooked golden Indian potatoes dusted in Kashmiri deggi mirch and amchur', 'Thick cut, triple-washed Indian Russet potatoes slow-cooked in small kettles to achieve the ultimate acoustic crunch. Finished with an aromatic spice rub.', 'chips', 'snackattack', 45.00, 4.85, 124, '/images/products/masala-chips.jpg', '20052000', 5.00, 1),
(2, 'SKU-MAKH-02', 'Flaming Peri Peri Roasted Makhana', 'पेरी पेरी भुना हुआ मखाना', 'peri-peri-makhana', 'Slow water-popped Bihar fox nuts tossed in fiery African bird’s eye chili and Himalayan pink salt', 'Sourced straight from Mithila smallholders, these lotus seeds are popped in slow wood-fired pans with cold-pressed olive oil.', 'makhana', 'snackattack', 135.00, 4.90, 96, '/images/products/peri-peri-makhana.jpg', '19041090', 5.00, 1),
(3, 'SKU-CHOC-03', 'Malabar Single-Estate 74% Dark Chocolate', 'मालाबार डार्क चॉकलेट ७४%', 'dark-chocolate', 'Shade-grown Idukki cacao stone-ground for 48 hours with Kerala palm sugar', 'Harvested from single-origin cacao trees nestled among pepper and cardamom plantations in Kerala.', 'chocolates', 'flavourverse', 275.00, 4.95, 89, '/images/products/malabar-dark-chocolate-74.jpg', '18063200', 18.00, 1),
(4, 'SKU-GUMM-04', 'Alphonso Mango & Passionfruit Vegan Gummies', 'हापुस आम फ्रूट गमीज', 'fruit-gummies', 'Chewy pectin treat crafted with real Ratnagiri Hapus puree and organic cane sugar', 'Pure comfort treats made with natural citrus pectin and zero artificial gelatin.', 'confectionery', 'flavourverse', 165.00, 4.88, 142, '/images/products/alphonso-mango-gummies.jpg', '17049090', 18.00, 1),
(5, 'SKU-ALMD-05', 'Kashmiri Mamra Roasted Almonds', 'कश्मीरी मामरा भुने बादाम', 'roasted-almonds', 'High-altitude organic Kashmiri Mamra almonds dry roasted with rock salt', 'Indigenous Mamra almonds containing over 50% natural oil content, slowly roasted to perfection.', 'nuts', 'purepantry', 495.00, 4.92, 64, '/images/products/kashmiri-mamra-almonds.jpg', '20081910', 5.00, 1),
(6, 'SKU-BAR-06', 'Whey Matrix 20G Fuel Bar', 'व्हे प्रोटीन मैट्रिक्स बार', 'protein-bars', 'Cold-filtered whey protein isolate, roasted peanut paste, and dark cacao nibs', 'Clean sports nutrition designed for peak performance without artificial sucralose.', 'protein-bars', 'flavourverse', 120.00, 4.75, 78, '/images/products/whey-protein-matrix-bar.jpg', '21069099', 18.00, 0),
(7, 'SKU-COOK-07', 'Belgian Dark Cacao Butter Cookies', 'डार्क कोको बटर कुकीज', 'chocolate-cookies', 'Melt-in-the-mouth crumbly butter cookies baked with Belgian cocoa & pure dairy butter', 'Slowly baked in vintage copper ovens with real cultured butter and raw jaggery.', 'cookies', 'flavourverse', 249.00, 4.90, 112, '/images/products/cocoa-hazelnut-cookies.jpg', '19053100', 18.00, 1),
(8, 'SKU-PEAN-08', 'Stone-Ground Crunchy Peanut Butter', 'देसी मूंगफली का मक्खन', 'peanut-butter', 'Slow-roasted Saurashtra peanuts stone-churned with Himalayan pink salt and jaggery', '100% whole roasted peanuts with zero hydrogenated palm oils, stabilizers or refined sugars.', 'spreads', 'purepantry', 299.00, 4.85, 54, '/images/products/stone-ground-peanut-butter.jpg', '20081100', 12.00, 0);

-- Seed Coupons
INSERT INTO `coupons` (`code`, `discount_type`, `discount_value`, `min_order_value`, `is_active`) VALUES
('PEACHY15', 'percentage', 15.00, 499.00, 1),
('WELCOME10', 'percentage', 10.00, 299.00, 1),
('CRUNCH20', 'fixed', 100.00, 699.00, 1);

-- Seed Settings
INSERT INTO `settings` (`setting_key`, `setting_value`) VALUES
('store_name', 'Peachy Plate Foods — Artisanal Indian Packaged Foods'),
('target_country', 'India'),
('currency', 'INR'),
('currency_symbol', '₹'),
('fssai_lic_no', '10019041000572'),
('free_shipping_min', '499'),
('standard_shipping_rate', '49'),
('express_shipping_rate', '99');

-- Seed Theme Selections (One Business • Four Alternative Storefront Designs)
INSERT INTO `theme_selections` (`concept_id`, `concept_name`, `is_active`) VALUES
('pop-cult', 'POP CULT (Colourful Maximalist Gen-Z)', 1),
('pure-co', 'PURE & CO. (Premium Luxury Minimalist)', 0),
('crunch-mode', 'CRUNCH MODE (Black, White & Neon Brutalist)', 0),
('happy-bites', 'HAPPY BITES (Cute Pastel Aesthetic)', 0),
('flavourverse', 'FLAVOURVERSE (Bold Editorial Food Universe)', 0),
('purepantry', 'PURE & PANTRY (Modern Organic & Wellness)', 0),
('snackattack', 'SNACK ATTACK (Maximalist Snack Culture)', 0);

-- Seed Demo Customer (Password: demo12345)
INSERT INTO `users` (`id`, `name`, `email`, `phone`, `password_hash`, `role`) VALUES
(1, 'Aaditya Vikram', 'aadi@peachyplate.in', '+91 98765 43210', '$2y$10$QkXl5cTq1Y5yQxPZ6XhM..L8eBq5FkE3gV.6eR6n0C3eP4zK0dM2S', 'customer');

SET FOREIGN_KEY_CHECKS = 1;
