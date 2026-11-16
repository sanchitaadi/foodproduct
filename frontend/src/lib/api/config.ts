/**
 * CENTRALIZED API CONFIGURATION FOR PHP REST API & MYSQL INTEGRATION
 * Configures endpoints, headers, timeouts, and fallback demo modes.
 */

export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1",
  timeoutMs: 8000,
  isDemoMode: process.env.NEXT_PUBLIC_DEMO_MODE !== "false",
  defaultCurrency: "INR",
  currencySymbol: "₹",
  endpoints: {
    // Catalog & Products
    products: "/products",
    productBySlug: (slug: string) => `/products/${slug}`,
    categories: "/categories",
    categoryBySlug: (slug: string) => `/categories/${slug}`,
    search: "/products/search",

    // Cart & Pricing Engine (Server-side GST/Shipping re-computation)
    cart: "/cart",
    cartAddItem: "/cart/items",
    cartUpdateItem: (itemId: string | number) => `/cart/items/${itemId}`,
    cartApplyCoupon: "/cart/coupon",
    pincodeCheck: (pincode: string) => `/shipping/pincode/${pincode}`,

    // Orders & Checkout
    orders: "/orders",
    orderDetail: (id: string | number) => `/orders/${id}`,
    createPaymentOrder: "/checkout/razorpay-init",

    // Brand Inquiries & Contact
    contact: "/contact",
    newsletter: "/newsletter/subscribe",
  },
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-Client-Platform": "Gen-Z-Packaged-Food-Frontend-v1.0",
  },
};
