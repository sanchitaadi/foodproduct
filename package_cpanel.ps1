# ========================================================
# PEACHY PLATE — Automated cPanel Release Packager
# ========================================================
$ErrorActionPreference = "Stop"

$root = $PSScriptRoot
$frontendDir = Join-Path $root "frontend"
$backendDir = Join-Path $root "backend"
$docsDir = Join-Path $root "docs"
$buildDir = Join-Path $root "build_cpanel"
$zipOutput = Join-Path $root "peachy_plate_cpanel.zip"

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "  PEACHY PLATE - CPANEL PACKAGER        " -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan

# 1. Clean previous builds
if (Test-Path $buildDir) {
    Write-Host "[1/5] Cleaning existing build_cpanel folder..." -ForegroundColor Yellow
    Remove-Item -Path $buildDir -Recurse -Force
}
if (Test-Path $zipOutput) {
    Remove-Item -Path $zipOutput -Force
}

New-Item -ItemType Directory -Path $buildDir | Out-Null

# 2. Check or build Next.js build
Write-Host "[2/5] Checking Next.js build assets..." -ForegroundColor Yellow
$nextBuildDir = Join-Path $frontendDir ".next"
if (-not (Test-Path $nextBuildDir)) {
    Write-Host "Compiling Next.js build..." -ForegroundColor Cyan
    Push-Location $frontendDir
    npm run build
    Pop-Location
} else {
    Write-Host "Verified .next production build found." -ForegroundColor Green
}

# 3. Create cPanel Directory Structure
Write-Host "[3/5] Setting up cPanel directory tree..." -ForegroundColor Yellow
$publicHtml = Join-Path $buildDir "public_html"
$backendDest = Join-Path $buildDir "backend"
$dbDest = Join-Path $buildDir "database"

New-Item -ItemType Directory -Path $publicHtml | Out-Null
New-Item -ItemType Directory -Path $backendDest | Out-Null
New-Item -ItemType Directory -Path $dbDest | Out-Null

# Copy Frontend Public Assets
$frontendPublic = Join-Path $frontendDir "public"
if (Test-Path $frontendPublic) {
    Copy-Item -Path "$frontendPublic\*" -Destination $publicHtml -Recurse -Force
}

# Copy Frontend Application bundle
$frontendAppDest = Join-Path $buildDir "frontend_app"
New-Item -ItemType Directory -Path $frontendAppDest | Out-Null
Copy-Item -Path "$frontendDir\.next" -Destination $frontendAppDest -Recurse -Force
Copy-Item -Path "$frontendDir\package.json" -Destination $frontendAppDest -Force
if (Test-Path "$frontendDir\next.config.mjs") {
    Copy-Item -Path "$frontendDir\next.config.mjs" -Destination $frontendAppDest -Force
}
if (Test-Path "$frontendDir\next.config.ts") {
    Copy-Item -Path "$frontendDir\next.config.ts" -Destination $frontendAppDest -Force
}

# Copy Backend Files
Write-Host "[4/5] Copying PHP REST API layer & database schemas..." -ForegroundColor Yellow
Copy-Item -Path "$backendDir\app" -Destination $backendDest -Recurse -Force
Copy-Item -Path "$backendDir\database" -Destination $backendDest -Recurse -Force
Copy-Item -Path "$backendDir\routes" -Destination $backendDest -Recurse -Force
Copy-Item -Path "$backendDir\composer.json" -Destination $backendDest -Force

# Copy Database Schema
Copy-Item -Path "$docsDir\DATABASE_SCHEMA.sql" -Destination (Join-Path $dbDest "database.sql") -Force

# Generate Apache .htaccess
$htaccessContent = @"
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # Serve existing files directly
  RewriteCond %{REQUEST_FILENAME} -f [OR]
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]

  # Forward everything else to passenger Node.js app or index
  RewriteRule ^index\.html$ - [L]
  RewriteRule . /index.html [L]
</IfModule>

# Browser Caching & Gzip
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css application/javascript application/json image/svg+xml
</IfModule>
"@
Set-Content -Path (Join-Path $publicHtml ".htaccess") -Value $htaccessContent

# Copy Deployment Guide
Copy-Item -Path "$docsDir\CPANEL_DEPLOYMENT.md" -Destination (Join-Path $buildDir "CPANEL_DEPLOYMENT_GUIDE.md") -Force

# 5. Compress into deployment ZIP
Write-Host "[5/5] Compressing production archive: peachy_plate_cpanel.zip..." -ForegroundColor Yellow
Compress-Archive -Path "$buildDir\*" -DestinationPath $zipOutput -CompressionLevel Optimal

$zipInfo = Get-Item $zipOutput
$zipSizeMb = [Math]::Round($zipInfo.Length / 1MB, 2)

Write-Host "`nSUCCESS! cPanel Deployment Package Ready!" -ForegroundColor Green
Write-Host "Archive: $zipOutput ($zipSizeMb MB)" -ForegroundColor Green
Write-Host "Deployment: Upload and extract directly into cPanel root." -ForegroundColor Cyan
