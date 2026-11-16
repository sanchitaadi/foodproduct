<?php
/**
 * PEACHY PLATE — REST API Front Controller (PHP 8.2+)
 * cPanel & Production Ready Single Entry Point
 */

declare(strict_types=1);

// 1. Simple PSR-4 Autoloader
spl_autoload_register(function ($class) {
    $prefix = 'PeachyPlate\\';
    $baseDir = __DIR__ . '/';

    $len = strlen($prefix);
    if (strncmp($prefix, $class, $len) !== 0) {
        return;
    }

    $relativeClass = substr($class, $len);
    // Convert Config\Database -> config/db.php, Controllers\AuthController -> controllers/AuthController.php
    $parts = explode('\\', $relativeClass);
    if (count($parts) === 2) {
        $folder = strtolower($parts[0]);
        $filename = $parts[1] . '.php';
        if ($folder === 'config' && $parts[1] === 'Database') $filename = 'db.php';
        if ($folder === 'config' && $parts[1] === 'Cors') $filename = 'cors.php';
        if ($folder === 'config' && $parts[1] === 'Auth') $filename = 'auth.php';

        $file = $baseDir . $folder . '/' . $filename;
        if (file_exists($file)) {
            require_once $file;
        }
    }
});

// 2. Dispatch CORS Headers
\PeachyPlate\Config\Cors::handle();

// 3. Normalize URI
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

// Strip script subfolder or prefix if deployed under subfolder e.g. /backend/api or /api
$uri = preg_replace('#^/.*?/api#', '/api', $uri);
if (!str_starts_with($uri, '/api')) {
    $uri = '/api' . $uri;
}

// 4. Simple Route Dispatcher
try {
    // Health / Root ping
    if ($uri === '/api' || $uri === '/api/' || $uri === '/api/v1') {
        echo json_encode([
            'status' => 'operational',
            'api' => 'Peachy Plate Packaged Food REST API',
            'version' => '1.4.0-cpanel',
            'php' => PHP_VERSION,
            'timestamp' => date('c')
        ]);
        exit;
    }

    // 1. AUTH
    if ($method === 'POST' && $uri === '/api/v1/auth/register') {
        \PeachyPlate\Controllers\AuthController::register();
        exit;
    }
    if ($method === 'POST' && $uri === '/api/v1/auth/login') {
        \PeachyPlate\Controllers\AuthController::login();
        exit;
    }
    if ($method === 'GET' && $uri === '/api/v1/auth/me') {
        \PeachyPlate\Controllers\AuthController::me();
        exit;
    }

    // 2. PRODUCTS
    if ($method === 'GET' && $uri === '/api/v1/products') {
        \PeachyPlate\Controllers\ProductController::index();
        exit;
    }
    if ($method === 'GET' && $uri === '/api/v1/dietary-tags') {
        \PeachyPlate\Controllers\ProductController::dietaryTags();
        exit;
    }
    if ($method === 'GET' && preg_match('#^/api/v1/products/([^/]+)/reviews$#', $uri, $m)) {
        \PeachyPlate\Controllers\ReviewController::index($m[1]);
        exit;
    }
    if ($method === 'GET' && preg_match('#^/api/v1/products/([^/]+)$#', $uri, $m)) {
        \PeachyPlate\Controllers\ProductController::show($m[1]);
        exit;
    }

    // 3. CATEGORIES
    if ($method === 'GET' && $uri === '/api/v1/categories') {
        \PeachyPlate\Controllers\CategoryController::index();
        exit;
    }

    // 4. ORDERS & TRACKING
    if ($method === 'POST' && $uri === '/api/v1/orders') {
        \PeachyPlate\Controllers\OrderController::create();
        exit;
    }
    if ($method === 'GET' && preg_match('#^/api/v1/tracking/([^/]+)$#', $uri, $m)) {
        \PeachyPlate\Controllers\OrderController::track($m[1]);
        exit;
    }
    if ($method === 'GET' && preg_match('#^/api/v1/orders/([^/]+)/invoice$#', $uri, $m)) {
        \PeachyPlate\Controllers\OrderController::invoice($m[1]);
        exit;
    }

    // 5. INVENTORY
    if ($method === 'GET' && $uri === '/api/v1/inventory') {
        \PeachyPlate\Controllers\InventoryController::index();
        exit;
    }

    // 6. REVIEWS
    if ($method === 'POST' && $uri === '/api/v1/reviews') {
        \PeachyPlate\Controllers\ReviewController::store();
        exit;
    }

    // 7. WISHLIST
    if ($method === 'GET' && $uri === '/api/v1/wishlist') {
        \PeachyPlate\Controllers\WishlistController::index();
        exit;
    }
    if ($method === 'POST' && $uri === '/api/v1/wishlist/toggle') {
        \PeachyPlate\Controllers\WishlistController::toggle();
        exit;
    }

    // 8. CONTACT & NEWSLETTER
    if ($method === 'POST' && $uri === '/api/v1/contact') {
        \PeachyPlate\Controllers\ContactController::submit();
        exit;
    }
    if ($method === 'POST' && $uri === '/api/v1/newsletter/subscribe') {
        \PeachyPlate\Controllers\NewsletterController::subscribe();
        exit;
    }

    // 9. DISCOUNTS & COUPONS
    if ($method === 'POST' && $uri === '/api/v1/coupons/validate') {
        \PeachyPlate\Controllers\DiscountController::validate();
        exit;
    }

    // 10. SETTINGS & THEME SELECTION
    if ($method === 'GET' && $uri === '/api/v1/settings') {
        \PeachyPlate\Controllers\SettingsController::get();
        exit;
    }
    if ($method === 'POST' && $uri === '/api/v1/settings/theme') {
        \PeachyPlate\Controllers\SettingsController::setTheme();
        exit;
    }

    // Endpoint Not Found
    http_response_code(404);
    echo json_encode([
        'success' => false,
        'message' => "Endpoint {$method} {$uri} not found in Peachy Plate REST API."
    ]);
} catch (\Throwable $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage(),
        'file' => basename($e->getFile()),
        'line' => $e->getLine()
    ]);
}
