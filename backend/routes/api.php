<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| PEACHY PLATE — REST API Routes (v1 Audited)
|--------------------------------------------------------------------------
|
| Stateless REST API endpoints consumed identically by all Next.js frontend
| concepts (Flavourverse, Pure & Pantry, Snack Attack) and Admin Back-Office.
|
*/

Route::prefix('v1')->group(function () {

    // 1. PUBLIC AUTHENTICATION & IDENTITY
    Route::prefix('auth')->group(function () {
        Route::post('/register', [\App\Http\Controllers\Api\v1\AuthController::class, 'register']);
        Route::post('/login', [\App\Http\Controllers\Api\v1\AuthController::class, 'login']);
    });

    // 2. PINCODE SERVICEABILITY & COD CHECK
    Route::get('/pincode/check/{pincode}', [\App\Http\Controllers\Api\v1\PincodeController::class, 'check']);

    // 3. PUBLIC PRODUCT CATALOG, NUTRITION & SEARCH
    Route::get('/categories', [\App\Http\Controllers\Api\v1\CategoryController::class, 'index']);
    Route::get('/dietary-tags', [\App\Http\Controllers\Api\v1\ProductController::class, 'dietaryTags']);
    Route::get('/products', [\App\Http\Controllers\Api\v1\ProductController::class, 'index']);
    Route::get('/products/{slug}', [\App\Http\Controllers\Api\v1\ProductController::class, 'show']);
    Route::get('/products/{id}/reviews', [\App\Http\Controllers\Api\v1\ReviewController::class, 'index']);

    // 4. CART & PRICING ENGINE (Supports Guest Token or Auth User)
    Route::prefix('cart')->group(function () {
        Route::get('/', [\App\Http\Controllers\Api\v1\CartController::class, 'getCart']);
        Route::post('/items', [\App\Http\Controllers\Api\v1\CartController::class, 'addItem']);
        Route::patch('/items/{id}', [\App\Http\Controllers\Api\v1\CartController::class, 'updateItemQuantity']);
        Route::delete('/items/{id}', [\App\Http\Controllers\Api\v1\CartController::class, 'removeItem']);
        Route::post('/apply-coupon', [\App\Http\Controllers\Api\v1\CouponController::class, 'apply']);
        Route::delete('/remove-coupon', [\App\Http\Controllers\Api\v1\CouponController::class, 'remove']);
    });

    // 5. CHECKOUT & RAZORPAY INTEGRATION
    Route::prefix('checkout')->group(function () {
        Route::post('/validate', [\App\Http\Controllers\Api\v1\CheckoutController::class, 'validateCart']);
        Route::post('/create-order', [\App\Http\Controllers\Api\v1\CheckoutController::class, 'createOrder']);
        Route::post('/verify-razorpay', [\App\Http\Controllers\Api\v1\CheckoutController::class, 'verifyRazorpayPayment']);
    });

    // 6. PUBLIC ORDER TRACKING (Authentic Milestones + Courier AWB Link)
    Route::get('/tracking/{orderNumber}', [\App\Http\Controllers\Api\v1\OrderTrackingController::class, 'track']);

    // 7. RAZORPAY & PAYMENT WEBHOOKS (Cryptographically Verified via HMAC-SHA256)
    Route::post('/webhooks/razorpay', [\App\Http\Controllers\Api\v1\CheckoutController::class, 'handleRazorpayWebhook']);

    // 8. PROTECTED CUSTOMER ROUTES (Sanctum)
    Route::middleware('auth:sanctum')->group(function () {
        Route::prefix('auth')->group(function () {
            Route::get('/me', [\App\Http\Controllers\Api\v1\AuthController::class, 'me']);
            Route::post('/logout', [\App\Http\Controllers\Api\v1\AuthController::class, 'logout']);
        });

        Route::prefix('account')->group(function () {
            Route::get('/orders', [\App\Http\Controllers\Api\v1\OrderController::class, 'index']);
            Route::get('/orders/{orderNumber}', [\App\Http\Controllers\Api\v1\OrderController::class, 'show']);
            Route::get('/orders/{orderNumber}/invoice', [\App\Http\Controllers\Api\v1\OrderController::class, 'downloadInvoice']);
            Route::post('/reviews', [\App\Http\Controllers\Api\v1\ReviewController::class, 'store']);
            Route::get('/wishlist', [\App\Http\Controllers\Api\v1\WishlistController::class, 'index']);
            Route::post('/wishlist/toggle', [\App\Http\Controllers\Api\v1\WishlistController::class, 'toggle']);
        });

        // 9. GRANULAR ADMIN RBAC OPERATIONS
        Route::prefix('admin')->group(function () {
            // Super Admin Only: Financials, System Config & Analytics
            Route::middleware('role:super_admin')->group(function () {
                Route::get('/analytics/overview', [\App\Http\Controllers\Api\v1\Admin\AdminAnalyticsController::class, 'overview']);
                Route::get('/analytics/financials', [\App\Http\Controllers\Api\v1\Admin\AdminAnalyticsController::class, 'financials']);
            });

            // Inventory & Catalog Operations (Super Admin + Inventory Manager)
            Route::middleware('role:super_admin,inventory_manager')->group(function () {
                Route::apiResource('products', \App\Http\Controllers\Api\v1\Admin\AdminProductController::class);
                Route::post('/inventory/adjust', [\App\Http\Controllers\Api\v1\Admin\AdminInventoryController::class, 'adjustStock']);
                Route::get('/inventory/movements', [\App\Http\Controllers\Api\v1\Admin\AdminInventoryController::class, 'movements']);
                Route::post('/inventory/release-expired', [\App\Http\Controllers\Api\v1\Admin\AdminInventoryController::class, 'releaseExpiredLocks']);
            });

            // Order Fulfillment & AWB Logistics (Super Admin + Fulfillment Manager)
            Route::middleware('role:super_admin,fulfillment_manager')->group(function () {
                Route::get('/orders', [\App\Http\Controllers\Api\v1\Admin\AdminOrderController::class, 'index']);
                Route::patch('/orders/{id}/fulfill', [\App\Http\Controllers\Api\v1\Admin\AdminOrderController::class, 'fulfill']);
                Route::get('/orders/{id}/packing-slip', [\App\Http\Controllers\Api\v1\Admin\AdminOrderController::class, 'packingSlip']);
            });

            // UGC Reviews & Customer Moderation (Super Admin + Customer Support)
            Route::middleware('role:super_admin,customer_support')->group(function () {
                Route::get('/reviews/pending', [\App\Http\Controllers\Api\v1\Admin\AdminReviewController::class, 'pending']);
                Route::patch('/reviews/{id}/status', [\App\Http\Controllers\Api\v1\Admin\AdminReviewController::class, 'updateStatus']);
            });
        });
    });
});
