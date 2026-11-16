<?php
/**
 * PEACHY PLATE — Auth Token Utility (HMAC-SHA256 Stateless Tokens)
 */

namespace PeachyPlate\Config;

class Auth {
    private static string $secretKey = 'peachy_plate_secure_jwt_token_key_2026';

    public static function generateToken(array $payload, int $expirySeconds = 604800): string {
        $header = base64_encode(json_encode(['typ' => 'JWT', 'alg' => 'HS256']));
        $payload['exp'] = time() + $expirySeconds;
        $payload['iat'] = time();
        $encodedPayload = base64_encode(json_encode($payload));
        $signature = hash_hmac('sha256', "{$header}.{$encodedPayload}", self::$secretKey, true);
        $encodedSignature = base64_encode($signature);

        return "{$header}.{$encodedPayload}.{$encodedSignature}";
    }

    public static function verifyToken(string $token): ?array {
        $parts = explode('.', $token);
        if (count($parts) !== 3) {
            return null;
        }

        [$header, $payload, $signature] = $parts;
        $validSignature = base64_encode(hash_hmac('sha256', "{$header}.{$payload}", self::$secretKey, true));

        if (!hash_equals($validSignature, $signature)) {
            return null;
        }

        $decodedPayload = json_decode(base64_decode($payload), true);
        if (!$decodedPayload || ($decodedPayload['exp'] ?? 0) < time()) {
            return null;
        }

        return $decodedPayload;
    }

    public static function getBearerToken(): ?string {
        $headers = getallheaders();
        $authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? '';
        if (preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
            return $matches[1];
        }
        return null;
    }
}
