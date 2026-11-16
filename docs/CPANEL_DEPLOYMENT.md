# PEACHY PLATE — cPanel & Shared Hosting Deployment Guide
**Document Version:** 1.0.0  
**Target Environments:** cPanel on Apache/LiteSpeed, CloudLinux, MariaDB 10.11+/11.4+, PHP 8.2/8.3+

---

## 1. Overview of Architecture on cPanel

PEACHY PLATE consists of a Next.js App Router frontend and a Laravel REST API backend. On standard cPanel hosting accounts, there are two primary deployment models:

| Architecture Model | Frontend Hosting | Backend Hosting | Best For |
| :--- | :--- | :--- | :--- |
| **Model 1 (Recommended): Hybrid Static + PHP API** | Static export (`next export` / `output: 'export'`) in `public_html` | Laravel PHP backend in `~/api.peachyplate.com` or `~/backend` | Standard cPanel shared hosting without Node.js root daemon permissions. Ultra-fast, zero daemon crashes. |
| **Model 2: Node.js App Manager + PHP API** | Next.js Node.js Server via cPanel "Setup Node.js App" (Phusion Passenger) | Laravel PHP backend | When server-side rendering (SSR) or Next.js middleware is strictly required. |

---

## 2. Model 1 Deployment: Static Export + Laravel API (Step-by-Step)

### Step 2.1: Frontend Static Build
1. In `peachy-plate/frontend/next.config.ts`, ensure export output is configured if full static hosting is desired:
   ```typescript
   import type { NextConfig } from "next";

   const nextConfig: NextConfig = {
     output: "export",
     images: {
       unoptimized: true, // Required for static export on shared Apache hosting
     },
   };

   export default nextConfig;
   ```
2. Build the production assets locally:
   ```bash
   cd peachy-plate/frontend
   npm run build
   ```
3. A directory named `out` will be generated containing static HTML, CSS, and JS bundles.
4. Compress the contents of `out/` into `frontend-dist.zip`.
5. In cPanel **File Manager**, navigate to `public_html/`.
6. Upload `frontend-dist.zip` and click **Extract**.
7. Create or update `.htaccess` in `public_html/` to support Next.js client-side routing:
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

---

### Step 2.2: Backend Deployment (Laravel on cPanel)

1. **Upload Backend Files Outside `public_html`:**
   - Compress the `peachy-plate/backend` directory (excluding `node_modules`, `vendor`, and `.git`) into `backend.zip`.
   - In cPanel File Manager, create a folder outside web root: `/home/username/peachy-backend/`.
   - Upload and extract `backend.zip` there.

2. **Configure Subdomain or Web Root for Backend:**
   - In cPanel **Subdomains**, create `api.peachyplate.com`.
   - Set the document root for `api.peachyplate.com` to `/home/username/peachy-backend/public` (CRITICAL: Never set the document root to the backend root directory; always to the `/public` folder).

3. **Install Dependencies via SSH (or Composer in cPanel Terminal):**
   ```bash
   cd /home/username/peachy-backend
   composer install --no-dev --optimize-autoloader
   ```

4. **Set Permissions for Storage and Cache:**
   ```bash
   chmod -R 775 storage bootstrap/cache
   ```

5. **Environment Configuration (`.env`):**
   Copy `.env.example` to `.env` and configure:
   ```env
   APP_NAME="PEACHY PLATE API"
   APP_ENV=production
   APP_KEY=base64:... (generate via php artisan key:generate)
   APP_DEBUG=false
   APP_URL=https://api.peachyplate.com
   FRONTEND_URL=https://peachyplate.com

   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=cpaneluser_peachyplate
   DB_USERNAME=cpaneluser_dbuser
   DB_PASSWORD=SecureGeneratedPasswordHere!

   RAZORPAY_KEY_ID=rzp_live_...
   RAZORPAY_KEY_SECRET=...
   RAZORPAY_WEBHOOK_SECRET=...
   ```

---

## 3. Database Setup (MariaDB via cPanel)

1. In cPanel, click **MySQL® Database Wizard**.
2. **Step 1:** Create database name: `cpaneluser_peachyplate`.
3. **Step 2:** Create user: `cpaneluser_dbuser` with a strong password.
4. **Step 3:** Grant **ALL PRIVILEGES** to the user on this database.
5. In cPanel, open **phpMyAdmin**:
   - Select `cpaneluser_peachyplate`.
   - Click the **Import** tab.
   - Choose `peachy-plate/docs/DATABASE_SCHEMA.sql` from your local machine.
   - Click **Import**.
6. Verify that all 18 tables are created with proper indexes, decimal constraints for GST, and foreign keys.

---

## 4. Model 2 Deployment: Node.js App Manager (Phusion Passenger)

If dynamic server-side rendering is required:

1. In cPanel, navigate to **Software > Setup Node.js App**.
2. Click **Create Application**.
3. Fill in:
   - **Node.js version:** Select `20.x` or `22.x` (LTS).
   - **Application mode:** `Production`.
   - **Application root:** `/home/username/peachy-frontend`.
   - **Application URL:** `peachyplate.com`.
   - **Application startup file:** `server.js` (using custom Next.js custom server or standalone mode).
4. In `peachy-plate/frontend/next.config.ts`, enable standalone output:
   ```typescript
   const nextConfig = {
     output: "standalone",
   };
   ```
5. Run `npm run build`.
6. Copy `.next/standalone` contents and the `public` and `.next/static` folders into `/home/username/peachy-frontend`.
7. Click **Run NPM Install** in cPanel Node.js App Manager, then click **Restart**.

---

## 5. SSL & HTTPS Enforcement

1. In cPanel, go to **SSL/TLS Status**.
2. Ensure **AutoSSL** has generated certificates for both:
   - `peachyplate.com` (and `www.peachyplate.com`)
   - `api.peachyplate.com`
3. In cPanel **Domains**, enable **Force HTTPS Redirect** to ensure all HTTP traffic is redirected to HTTPS.

---

## 6. Pre-Launch Sanity Verification Checklist

- [ ] HTTPS certificates active on both frontend and backend domains.
- [ ] Database credentials in `.env` verified and test query successful.
- [ ] Cross-Origin Resource Sharing (CORS) configured in `backend/config/cors.php` allowing `https://peachyplate.com`.
- [ ] FSSAI license numbers and GST rates correctly configured in database seeders.
- [ ] Storage directory permissions (`storage/logs`, `storage/framework`) set to `775`.
- [ ] Tested all three concept storefronts:
  - Concept A: `https://peachyplate.com/concept-a-flavourverse`
  - Concept B: `https://peachyplate.com/concept-b-purepantry`
  - Concept C: `https://peachyplate.com/concept-c-snackattack`
- [ ] Tested Cart Drawer, Wishlist persistence, and demonstration "Coming Soon" checkout modal.
