# PEACHY PLATE — Food Products E-Commerce Platform

A production-grade, multi-concept packaged food e-commerce platform built with Next.js (App Router, TypeScript, Tailwind CSS, Framer Motion, GSAP) and Laravel (REST APIs, Sanctum, MySQL, Eloquent ORM).

> **Important Business Context:**  
> This is strictly a packaged food retail brand (snacks, beverages, confectionery, wellness pantry staples, dry fruits, gourmet condiments), **NOT a restaurant or takeaway website**.

---

## 🎨 Three Distinct Visual Design Concepts

Peachy Plate tests three distinct visual expressions on top of **one shared backend engine**:

1. **Concept A: FLAVOURVERSE** (`/concept-a-flavourverse`)
   - **Vibe:** Bold editorial culinary universe.
   - **Visuals:** Magazine layouts, asymmetric grids, deep plum (`#1F0E1C`), saffron glow (`#FF9F1C`), high-contrast editorial typography, and cinematic storytelling.
   - **Inspirations:** *Atmosphere Studio*, *The Safari Stitch*.

2. **Concept B: PURE & PANTRY** (`/concept-b-purepantry`)
   - **Vibe:** Modern organic and wellness.
   - **Visuals:** Warm terracotta (`#C86D51`), deep sage (`#4A5844`), raw linen (`#F7F4EE`), serene serif typography, ingredient nutrition cards, and dietary badges.
   - **Inspirations:** *Raas Life*, *Blute Life*.

3. **Concept C: SNACK ATTACK** (`/concept-c-snackattack`)
   - **Vibe:** Maximalist snack culture.
   - **Visuals:** Neon lime (`#70E000`), hot peach (`#FF6B6B`), neo-brutalist solid black drop-shadows, sticker badges (*"10/10 CRUNCH FACTOR"*), bouncy spring physics.
   - **Inspirations:** *Local All Natural Soda*, *Kruncho*.

---

## 🏛️ Shared Architecture Core

All three concepts share:
- **One Product Catalog & Database:** Packaged food modeling with statutory FSSAI compliance, nutritional facts table, allergen statements, shelf life, and pack sizes.
- **One Inventory System:** Atomic row-level database locking (`lockForUpdate`), stock reservation during checkout, and immutable audit logs.
- **One Authentication System:** Laravel Sanctum (stateful cookies for web, bearer tokens for admin/mobile).
- **One Cart & Pricing Engine:** Strictly server-side recomputed pricing with zero client trust; coupon verification and GST/shipping calculations.
- **One Order Dispatch System:** Real-time milestone tracking (Pending $\to$ Packed $\to$ In-Transit $\to$ Delivered) with carrier AWB integration.
- **One Admin Dashboard:** Operations portal for catalog management, stock adjustments, order fulfillment, and analytics.

---

## 📂 Project Structure

```
peachy-plate/
├── frontend/                          # Next.js App Router (TypeScript, Tailwind, Framer Motion)
│   ├── src/
│   │   ├── app/
│   │   │   ├── (concepts)/
│   │   │   │   ├── concept-a-flavourverse/   # Skin A: Editorial Food Universe
│   │   │   │   ├── concept-b-purepantry/     # Skin B: Modern Organic & Wellness
│   │   │   │   └── concept-c-snackattack/    # Skin C: Maximalist Snack Culture
│   │   │   ├── admin/                        # Operations & Back-Office Portal
│   │   │   ├── layout.tsx                    # Shell with Floating Concept Switcher & Cart Drawer
│   │   │   └── page.tsx                      # Root Concept Selector & Launchpad
│   │   ├── components/
│   │   │   └── common/                       # ConceptSwitcherBar, CartDrawer, etc.
│   │   ├── hooks/                            # useCart (Zustand), useWishlist, useAuth
│   │   ├── lib/                              # api-client, formatters, mock-catalog
│   │   ├── styles/                           # globals.css, themes.css
│   │   └── types/                            # ecommerce.ts, design-systems.ts
│   ├── tailwind.config.ts                    # Extended theme tokens for all 3 skins
│   └── package.json
│
├── backend/                           # Laravel 11 REST API Application
│   ├── app/
│   │   ├── Http/Controllers/Api/v1/   # Auth, Catalog, Cart, Checkout, Admin
│   │   ├── Models/                    # Eloquent Models (Product, Variant, Order, Cart)
│   │   └── Services/                  # PricingService, InventoryService
│   ├── database/                      # Migrations & Seeders
│   ├── routes/api.php                 # Versioned REST API routes
│   └── composer.json
│
└── docs/                              # Comprehensive Architectural Documentation
    ├── ARCHITECTURE.md                # 10-section Master Architecture Specification
    ├── DATABASE_SCHEMA.sql            # Complete DDL SQL schema for MySQL 8.0+
    └── API_SPECIFICATION.md           # OpenAPI/REST endpoint documentation
```

---

## 🚀 Running the Frontend Development Server

Inside `frontend/`:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the Concept Selector and navigate seamlessly between:
- `/concept-a-flavourverse`
- `/concept-b-purepantry`
- `/concept-c-snackattack`
- `/admin`

Use the interactive floating Concept Switcher Bar at the top to toggle themes on any screen, and test adding items to the interactive Cart Drawer with coupon code `PEACHY15`.

---

## 📋 Phased Implementation Plan

1. **Phase 1: Foundation & Schemas** (Complete initialization, DDL, Sanctum auth)
2. **Phase 2: Product & Nutrition Catalog Engine** (FSSAI, dietary tags, multi-variant pack sizes)
3. **Phase 3: Cart, Coupon & Checkout Pipeline** (Atomic inventory reservations, Payment webhooks)
4. **Phase 4: Visual Concept Implementations** (Editorial Flavourverse, Pure & Pantry, Snack Attack)
5. **Phase 5: Customer Portal & Real-time Tracking** (AWB shipping milestones, verified reviews)
6. **Phase 6: Admin Back-Office** (Live inventory adjustments, order dispatch, analytics)
7. **Phase 7: Production Hardening** (WCAG 2.1 AA accessibility, image optimization, security audit)
