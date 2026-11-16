<?php
/**
 * PEACHY PLATE — CORS & HTTP Header Security Middleware
 */

namespace PeachyPlate\Config;

class Cors {
    public static function handle(): void {
        // Allow originating requests from localhost & production domains
        $origin = $_SERVER['HTTP_ORIGIN'] ?? '*';
        header("Access-Control-Allow-Origin: {$origin}");
        header("Access-Control-Allow-Credentials: true");
        header("Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, X-Brand-Concept");
        header("Access-Control-Max-Age: 86400");
        header("Content-Type: application/json; charset=UTF-8");
        header("X-Content-Type-Options: nosniff");
        header("X-Frame-Options: SAMEORIGIN");
        header("X-XSS-Protection: 1; mode=block");

        // Handle preflight OPTIONS requests immediately
        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            http_response_code(200);
            exit(0);
        }
    }
}
