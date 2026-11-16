# cPanel & Production Deployment Guide: Peachy Plate 4-Brand E-Commerce Platform

This guide explains how to deploy both the **Next.js frontend** and the **PHP 8.2+ REST API with MySQL** onto a standard cPanel, VPS, or Apache/LiteSpeed web host.

---

## 1. Architecture Overview

- **Frontend**: Next.js App Router (TypeScript, Tailwind CSS, Framer Motion, GSAP, Lucide React).
- **Backend API**: Structured PHP 8.2+ REST API with PDO prepared statements and JWT tokens.
- **Database**: MySQL 8.0+ / MariaDB with UTF-8 mb4 encoding (15 unified modules).
- **Routing**: Clean REST API at `/api/v1/...` served via Apache mod_rewrite / `.htaccess`.

---

## 2. Directory Structure for cPanel

```
public_html/
├── api/                   # PHP REST API (from peachy-plate/backend/api)
│   ├── config/
│   │   ├── db.php
│   │   ├── cors.php
│   │   └── auth.php
│   ├── controllers/
│   │   ├── AuthController.php
│   │   ├── ProductController.php
│   │   ├── CategoryController.php
│   │   ├── OrderController.php
│   │   ├── InventoryController.php
│   │   ├── ReviewController.php
│   │   ├── WishlistController.php
│   │   ├── ContactController.php
│   │   ├── NewsletterController.php
│   │   ├── DiscountController.php
│   │   └── SettingsController.php
│   ├── .htaccess          # Rewrites requests to index.php
│   └── index.php          # Front Controller Router
├── database/
│   └── database.sql       # MySQL schema and initial seed data
├── cpanel_setup.php       # 1-Click web installer and database migration runner
└── (Next.js static export files or Node.js reverse proxy)
```

---

## 3. Step-by-Step Deployment

### Step A: Database Setup in cPanel

1. Log into your **cPanel** dashboard.
2. Click **MySQL® Database Wizard**:
   - Create database: `cpaneluser_peachyplate`.
   - Create user: `cpaneluser_dbuser` with a secure password.
   - Assign user to database and grant **ALL PRIVILEGES**.
3. Go to **phpMyAdmin**:
   - Select the newly created database.
   - Click **Import** > Choose File: `peachy-plate/backend/database/database.sql` > Click **Go**.
   - All 15 tables with sample Indian packaged foods, demo customer, and coupons will be imported.

*(Alternatively, you can run the web installer `https://yourdomain.com/cpanel_setup.php` which automatically tests the connection and imports the schema).*

### Step B: PHP REST API Deployment

1. Upload the contents of `peachy-plate/backend/api/` into `public_html/api/`.
2. Ensure `.htaccess` is present inside `public_html/api/`.
3. Configure environment variables in `public_html/api/config/db.php` or create a `.env` / Apache `SetEnv`:
   ```apache
   SetEnv DB_HOST localhost
   SetEnv DB_NAME cpaneluser_peachyplate
   SetEnv DB_USER cpaneluser_dbuser
   SetEnv DB_PASS YourStrongPassword123!
   ```
4. Test the API:
   - Visit: `https://yourdomain.com/api/v1/products`
   - You should receive JSON containing the Indian packaged-food catalogue.

### Step C: Frontend Deployment Options

#### Option 1: Node.js Selector in cPanel (Recommended for full SSR)
1. Go to cPanel **Setup Node.js App**.
2. Select Node version 18.x or 20.x.
3. Set Application root: `frontend_app` and Application URL: `/`.
4. Upload `peachy-plate/frontend/` files.
5. Run `npm install` and `npm run build`.
6. Start application.

#### Option 2: Static Export (Pure HTML/JS on standard Apache)
1. In `peachy-plate/frontend/next.config.mjs`, set `output: 'export'`.
2. Run `npm run build` locally in `frontend/`.
3. Upload the generated `frontend/out/` directory directly into `public_html/`.

---

## 4. Verification Checklist

- [x] All 4 concepts accessible:
  - `/concept-a-flavourverse`
  - `/concept-b-purepantry`
  - `/concept-c-snackattack`
- [x] Concept comparison page at `/concepts` allows exploring and selecting brand with confetti animation.
- [x] Shared Cart Drawer opens from any page and synchronizes line items.
- [x] Demo checkout at `/checkout` collects Indian addresses, PIN code check, and places demo orders.
- [x] Order confirmation at `/order-confirmation/[orderId]` displays 4-step dispatch tracker and printable receipt.
- [x] Customer dashboard at `/account` displays profile, past orders, and saved stash.
- [x] PHP REST API endpoints return compliant JSON with CORS headers.
