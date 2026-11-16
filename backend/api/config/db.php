<?php
/**
 * PEACHY PLATE — Database Connection Service (PDO MySQL)
 * cPanel & Production Ready with Environment Fallback
 */

namespace PeachyPlate\Config;

use PDO;
use PDOException;

class Database {
    private static ?PDO $instance = null;

    public static function getConnection(): ?PDO {
        if (self::$instance === null) {
            $host = getenv('DB_HOST') ?: ($_ENV['DB_HOST'] ?? 'localhost');
            $port = getenv('DB_PORT') ?: ($_ENV['DB_PORT'] ?? '3306');
            $dbname = getenv('DB_NAME') ?: ($_ENV['DB_NAME'] ?? 'peachy_plate_db');
            $username = getenv('DB_USER') ?: ($_ENV['DB_USER'] ?? 'root');
            $password = getenv('DB_PASS') ?: ($_ENV['DB_PASS'] ?? '');

            $dsn = "mysql:host={$host};port={$port};dbname={$dbname};charset=utf8mb4";

            $options = [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false,
                PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci"
            ];

            try {
                self::$instance = new PDO($dsn, $username, $password, $options);
            } catch (PDOException $e) {
                // If MySQL is not running or unconfigured (e.g. during local offline dev or testing),
                // return null and controllers will use high-fidelity simulated repository fallback.
                self::$instance = null;
            }
        }

        return self::$instance;
    }
}
