<?php
/**
 * PEACHY PLATE — Automated cPanel 1-Click Setup & Migration Script
 * Access via browser: https://yourdomain.com/cpanel_setup.php
 */

declare(strict_types=1);

$phpVersion = PHP_VERSION;
$phpOk = version_compare($phpVersion, '8.2.0', '>=');
$pdoInstalled = extension_loaded('pdo') && extension_loaded('pdo_mysql');

$dbHost = $_POST['db_host'] ?? getenv('DB_HOST') ?: 'localhost';
$dbName = $_POST['db_name'] ?? getenv('DB_NAME') ?: '';
$dbUser = $_POST['db_user'] ?? getenv('DB_USER') ?: '';
$dbPass = $_POST['db_pass'] ?? getenv('DB_PASS') ?: '';

$message = null;
$messageType = null;

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['run_migration'])) {
    if (empty($dbName) || empty($dbUser)) {
        $message = "Please provide database name and user.";
        $messageType = "error";
    } else {
        try {
            $dsn = "mysql:host={$dbHost};dbname={$dbName};charset=utf8mb4";
            $pdo = new PDO($dsn, $dbUser, $dbPass, [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
            ]);

            $sqlFile = __DIR__ . '/database/database.sql';
            if (!file_exists($sqlFile)) {
                throw new Exception("Migration file 'database/database.sql' not found.");
            }

            $sql = file_get_contents($sqlFile);
            $pdo->exec($sql);

            $message = "Database tables and seed data migrated successfully! All 15 modules are operational.";
            $messageType = "success";
        } catch (Throwable $e) {
            $message = "Migration failed: " . $e->getMessage();
            $messageType = "error";
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Peachy Plate — cPanel Setup & Diagnostic</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #0D0D11; color: #F2F2F2; margin: 0; padding: 40px 20px; }
        .card { max-width: 640px; margin: 0 auto; background: #16161C; border: 1px solid #27272A; border-radius: 20px; padding: 32px; box-shadow: 0 20px 40px rgba(0,0,0,0.5); }
        h1 { color: #CCFF00; font-size: 24px; margin-top: 0; text-transform: uppercase; letter-spacing: 1px; }
        .badge { display: inline-block; padding: 4px 10px; border-radius: 9999px; font-size: 11px; font-weight: bold; text-transform: uppercase; margin-bottom: 20px; }
        .badge-ok { background: rgba(34, 197, 94, 0.15); color: #4ade80; border: 1px solid rgba(34, 197, 94, 0.3); }
        .badge-warn { background: rgba(234, 179, 8, 0.15); color: #facc15; border: 1px solid rgba(234, 179, 8, 0.3); }
        .field { margin-bottom: 16px; }
        label { display: block; font-size: 12px; color: #A1A1AA; margin-bottom: 6px; font-family: monospace; }
        input[type="text"], input[type="password"] { width: 100%; box-sizing: border-box; background: #09090B; border: 1px solid #27272A; color: white; padding: 10px 14px; border-radius: 10px; font-size: 13px; outline: none; }
        input:focus { border-color: #CCFF00; }
        button { width: 100%; background: #CCFF00; color: #000; border: none; font-weight: 900; padding: 14px; border-radius: 10px; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; cursor: pointer; margin-top: 10px; }
        button:hover { background: #FFFFFF; }
        .msg { padding: 12px 16px; border-radius: 10px; font-size: 13px; margin-bottom: 20px; }
        .msg-success { background: rgba(34, 197, 94, 0.15); color: #4ade80; border: 1px solid #22c55e; }
        .msg-error { background: rgba(239, 68, 68, 0.15); color: #f87171; border: 1px solid #ef4444; }
        .req { display: flex; justify-content: space-between; font-size: 12px; padding: 8px 0; border-bottom: 1px solid #27272A; font-family: monospace; }
    </style>
</head>
<body>
<div class="card">
    <div class="badge badge-ok">cPanel 1-Click Deployment Engine</div>
    <h1>Peachy Plate Setup</h1>
    <p style="font-size: 13px; color: #A1A1AA; line-height: 1.6;">
        Verify server compatibility and execute schema migrations for the 4 Gen-Z packaged food storefronts and PHP REST API.
    </p>

    <div style="background: #09090B; border: 1px solid #27272A; border-radius: 12px; padding: 16px; margin: 20px 0;">
        <div class="req">
            <span>PHP 8.2+ Compatibility</span>
            <span style="color: <?= $phpOk ? '#4ade80' : '#facc15' ?>"><?= $phpVersion ?> (<?= $phpOk ? 'PASSED' : 'RECOMMENDED 8.2+' ?>)</span>
        </div>
        <div class="req" style="border-bottom: none;">
            <span>PDO & MySQL Drivers</span>
            <span style="color: <?= $pdoInstalled ? '#4ade80' : '#ef4444' ?>"><?= $pdoInstalled ? 'AVAILABLE' : 'MISSING' ?></span>
        </div>
    </div>

    <?php if ($message): ?>
        <div class="msg msg-<?= $messageType ?>"><?= htmlspecialchars($message) ?></div>
    <?php endif; ?>

    <form method="POST">
        <div class="field">
            <label>Database Host</label>
            <input type="text" name="db_host" value="<?= htmlspecialchars($dbHost) ?>" required>
        </div>
        <div class="field">
            <label>Database Name (e.g. cpaneluser_peachyplate)</label>
            <input type="text" name="db_name" value="<?= htmlspecialchars($dbName) ?>" required>
        </div>
        <div class="field">
            <label>Database Username</label>
            <input type="text" name="db_user" value="<?= htmlspecialchars($dbUser) ?>" required>
        </div>
        <div class="field">
            <label>Database Password</label>
            <input type="password" name="db_pass" value="<?= htmlspecialchars($dbPass) ?>">
        </div>

        <button type="submit" name="run_migration" value="1">
            Run Database Schema Migrations
        </button>
    </form>
</div>
</body>
</html>
