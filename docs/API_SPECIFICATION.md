# PEACHY PLATE — REST API Specification (v1 Audited)

**Base URL:** `/api/v1`  
**Protocol:** HTTPS  
**Data Format:** JSON (`Content-Type: application/json`, `Accept: application/json`)  
**Currency:** Indian Rupee (INR) — all amounts stored and exchanged in integer Paise (`100 Paise = ₹1.00`)

---

## 1. Authentication & Customer Identity

### `POST /auth/register`
Creates a new customer account.
- **Request Body:**
  ```json
  {
    "name": "Aarav Sharma",
    "email": "aarav@example.com",
    "phone": "+919876543210",
    "password": "SecurePassword123!",
    "password_confirmation": "SecurePassword123!",
    "customer_gstin": "29ABCDE1234F1Z5", // Optional B2B tax credit GSTIN
    "guest_cart_token": "opt_uuid_v4" // Auto-merges active guest cart on signup
  }
  ```
- **Response `201 Created`:**
  ```json
  {
    "user": {
      "id": 12,
      "name": "Aarav Sharma",
      "email": "aarav@example.com",
      "phone": "+919876543210",
      "role": "customer"
    },
    "token": "sanctum_personal_access_token_str"
  }
  ```

### `POST /auth/login`
Authenticates user and returns Sanctum Bearer token (or sets HTTP-only cookie).
- **Request Body:**
  ```json
  {
    "email": "aarav@example.com",
    "password": "SecurePassword123!",
    "guest_cart_token": "opt_uuid_v4"
  }
  ```

### `POST /auth/logout`
Revokes access token / invalidates session. (Header: `Authorization: Bearer <token>`)

### `GET /auth/me`
Retrieves authenticated profile, default Indian address, and wishlist IDs.

---

## 2. PIN-Code Serviceability & Logistics Check

### `GET /pincode/check/{pincode}`
Checks if an Indian 6-digit PIN code is serviceable and eligible for COD.
- **Path Parameter:** `pincode` (e.g. `560038`, `110001`, `400001`)
- **Response `200 OK`:**
  ```json
  {
    "pincode": "560038",
    "city": "Bengaluru",
    "state": "Karnataka",
    "is_serviceable": true,
    "is_cod_available": true,
    "estimated_delivery_days": 2,
    "shipping_surcharge_cents": 0
  }
  ```

---

## 3. Product Catalog, Nutrition Facts & Search

### `GET /categories`
Returns full hierarchical category tree with banners and theme accents.

### `GET /dietary-tags`
Returns dietary certifications (*100% Organic, Gluten-Free, Vegan, Keto-Friendly, Zero Palm Oil*).

### `GET /products`
Paginated product catalog with multi-faceted filtering.
- **Query Parameters:**
  - `category_slug`: e.g. `snacks`, `craft-sodas`, `chocolates`
  - `dietary_tags`: e.g. `organic,gluten-free`
  - `price_min`, `price_max`: in Paise (e.g. `15000` to `50000`)
  - `sort`: `featured`, `price_asc`, `price_desc`, `rating`, `newest`
  - `search`: keyword search across ingredients, name, and brand
  - `page`: default 1, `per_page`: default 12

### `GET /products/{slug}`
Full product details including variants, statutory FSSAI details, allergen warnings, and 1:1 FSSAI nutritional facts.
- **Response `200 OK`:**
  ```json
  {
    "id": 1,
    "name": "Artisanal Truffle & Sea Salt Ancient Grain Crisps",
    "slug": "artisanal-truffle-sea-salt-crisps",
    "ingredients_list": "Whole grain sorghum, cold-pressed high-oleic sunflower oil, black summer truffle extract, French grey sea salt, cracked black pepper.",
    "allergens": "Processed in dedicated peanut-free facility. Zero tree nuts.",
    "shelf_life_duration": "9 Months from packaging",
    "storage_instructions": "Store in a cool, dark pantry. Reseal tightly after opening.",
    "origin_country": "India",
    "hsn_code": "190590",
    "gst_rate_percent": 5.0,
    "fssai_license_number": "10023022001928",
    "manufacturer": {
      "name": "Himalayan Agro Bakes Ltd",
      "address": "Plot 42, Food Park, Dehradun, Uttarakhand - 248001",
      "fssai_license": "10019012000543"
    },
    "marketer": {
      "name": "Peachy Plate Foods Pvt Ltd",
      "address": "Indiranagar 100ft Road, Bengaluru, Karnataka - 560038",
      "fssai_license": "10023022001928"
    },
    "nutritional_facts": {
      "serving_size": "30g (approx. 20 crisps)",
      "servings_per_container": 5,
      "energy_kcal": 135,
      "protein_g": 2.8,
      "total_carbohydrates_g": 21,
      "total_sugars_g": 0.5,
      "added_sugars_g": 0,
      "total_fat_g": 4.5,
      "saturated_fat_g": 0.5,
      "trans_fat_g": 0,
      "cholesterol_mg": 0,
      "sodium_mg": 140,
      "dietary_fiber_g": 3.2
    },
    "variants": [
      {
        "id": 101,
        "sku": "PP-TRUF-150G",
        "barcode_ean13": "8901234567890",
        "variant_title": "Standard Pouch (150g)",
        "net_quantity": "150 g",
        "net_weight_grams": 150.0,
        "price_cents": 24900,
        "mrp_cents": 29900,
        "inventory_quantity": 95,
        "in_stock": true
      }
    ]
  }
  ```

---

## 4. Cart & Pricing Engine

### `GET /cart`
Retrieves current cart with recalculated subtotal, GST split (CGST/SGST or IGST based on destination state), coupon discount, and free shipping progress.

### `POST /cart/items`
Adds variant to cart. Verified against available real-time stock (`inventory_quantity - reserved_quantity`).
- **Request Body:** `{ "product_variant_id": 101, "quantity": 2 }`

### `PATCH /cart/items/{id}`
Updates item quantity.

### `DELETE /cart/items/{id}`
Removes item.

### `POST /cart/apply-coupon`
Validates coupon against minimum order threshold (e.g. `PEACHY15` for ₹499+ orders).

---

## 5. Checkout & Razorpay Payment Integration

### `POST /checkout/validate`
Validates destination PIN-code serviceability, checks real-time stock locks, and returns final payable breakdown including GST split.

### `POST /checkout/create-order`
Creates the order, creates a **temporary 15-minute stock reservation** to lock inventory, and initiates a Razorpay Order.
- **Request Body:**
  ```json
  {
    "shipping_address": {
      "recipient_name": "Aarav Sharma",
      "phone": "9876543210",
      "flat_house_building": "Flat 302, Palm Heights",
      "area_street_sector": "12th Main, HAL 2nd Stage",
      "landmark": "Near Indiranagar Club",
      "city": "Bengaluru",
      "state": "Karnataka",
      "pincode": "560038",
      "country_code": "IN"
    },
    "billing_address_same_as_shipping": true,
    "customer_gstin": "29ABCDE1234F1Z5", // Optional B2B credit
    "payment_gateway": "razorpay", // 'razorpay' or 'cod'
    "customer_notes": "Please deliver before 5 PM."
  }
  ```
- **Response `201 Created` (for Razorpay):**
  ```json
  {
    "order_number": "PP-2026-10482",
    "total_cents": 49800,
    "currency": "INR",
    "payment_gateway": "razorpay",
    "razorpay_payload": {
      "razorpay_order_id": "order_O123abcXYZ",
      "amount_paise": 49800,
      "currency": "INR",
      "key_id": "rzp_live_key_xyz",
      "customer_name": "Aarav Sharma",
      "customer_email": "aarav@example.com",
      "customer_phone": "9876543210"
    },
    "reservation_expires_at": "2026-11-16T18:25:00Z"
  }
  ```

### `POST /checkout/verify-razorpay`
Cryptographically verifies Razorpay payment signature and commits order.
- **Request Body:**
  ```json
  {
    "order_number": "PP-2026-10482",
    "razorpay_order_id": "order_O123abcXYZ",
    "razorpay_payment_id": "pay_P456defUVW",
    "razorpay_signature": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
  }
  ```
- **Response `200 OK`:**
  ```json
  {
    "status": "paid_processing",
    "order_number": "PP-2026-10482",
    "invoice_number": "PP-INV-2026-00042",
    "message": "Payment verified successfully. Stock allocated and sent for packing."
  }
  ```

### `POST /webhooks/razorpay`
Server-to-server webhook verified with `X-Razorpay-Signature`. Handles background payment confirmation if customer closes browser after payment.

---

## 6. Order Tracking & Tax Invoices

### `GET /tracking/{orderNumber}`
Public tracking endpoint returning genuine verified fulfillment milestones.
- **Response `200 OK`:**
  ```json
  {
    "order_number": "PP-2026-10482",
    "status": "handed_over_to_courier",
    "courier_partner": "Delhivery Express",
    "tracking_awb": "DEL982310239",
    "tracking_portal_url": "https://www.delhivery.com/track/package/DEL982310239",
    "estimated_delivery": "2026-11-19",
    "status_history": [
      { "status": "pending_payment", "timestamp": "2026-11-16T18:10:00Z" },
      { "status": "paid_processing", "timestamp": "2026-11-16T18:12:30Z" },
      { "status": "packed", "timestamp": "2026-11-16T19:00:00Z" },
      { "status": "handed_over_to_courier", "timestamp": "2026-11-17T09:30:00Z" }
    ]
  }
  ```

### `GET /account/orders/{orderNumber}/invoice`
Generates statutory Tax Invoice PDF compliant with Rule 46 of CGST Rules.

---

## 7. Admin Back-Office Endpoints (With Role-Based Access Control)

- **Super Admin (`role:super_admin`):**
  - `GET /admin/analytics/overview` — GMV, AOV, net revenue, tax collections.
- **Inventory Team (`role:super_admin,inventory_manager`):**
  - `GET /admin/products` — Catalog with low-stock alerts.
  - `POST /admin/products` — Create product with FSSAI, HSN & nutrition facts.
  - `POST /admin/inventory/adjust` — Manual adjustment with mandatory audit note.
  - `POST /admin/inventory/release-expired` — Force release expired checkout locks.
- **Fulfillment Team (`role:super_admin,fulfillment_manager`):**
  - `GET /admin/orders` — Orders dispatch board.
  - `PATCH /admin/orders/{id}/fulfill` — Assign courier partner (`Delhivery`, `BlueDart`, `Shiprocket`) and manual AWB number.
  - `GET /admin/orders/{id}/packing-slip` — Generate warehouse packing slip.
- **Support Team (`role:super_admin,customer_support`):**
  - `GET /admin/reviews/pending` — UGC reviews moderation queue.
  - `PATCH /admin/reviews/{id}/status` — Approve or reject customer review.
