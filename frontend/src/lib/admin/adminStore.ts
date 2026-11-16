"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DEMO_PRODUCTS, DemoProduct, PackSizeOption } from "@/lib/demo-catalog";

// ----------------------------------------------------------------------
// 1. ROLES & PERMISSIONS
// ----------------------------------------------------------------------
export type AdminRole =
  | "super_admin"
  | "catalogue_manager"
  | "inventory_manager"
  | "fulfilment_manager"
  | "customer_support";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  roleLabel: string;
  avatar: string;
  lastLogin: string;
  status: "active" | "inactive";
}

export const PRESET_ADMINS: AdminUser[] = [
  {
    id: "ADM-001",
    name: "Aaditya Vikram",
    email: "admin@peachyplate.in",
    role: "super_admin",
    roleLabel: "Super Admin",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    lastLogin: "Just now",
    status: "active",
  },
  {
    id: "ADM-002",
    name: "Maya Sen",
    email: "catalogue@peachyplate.in",
    role: "catalogue_manager",
    roleLabel: "Catalogue Manager",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    lastLogin: "2 hours ago",
    status: "active",
  },
  {
    id: "ADM-003",
    name: "Dev Malhotra",
    email: "inventory@peachyplate.in",
    role: "inventory_manager",
    roleLabel: "Inventory & Stock Lead",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    lastLogin: "4 hours ago",
    status: "active",
  },
  {
    id: "ADM-004",
    name: "Farhan Akhtar",
    email: "fulfilment@peachyplate.in",
    role: "fulfilment_manager",
    roleLabel: "Fulfilment Lead",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    lastLogin: "1 day ago",
    status: "active",
  },
  {
    id: "ADM-005",
    name: "Tara Mehta",
    email: "support@peachyplate.in",
    role: "customer_support",
    roleLabel: "Customer Care Lead",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    lastLogin: "Yesterday",
    status: "active",
  },
];

export const ROLE_PERMISSIONS: Record<AdminRole, string[]> = {
  super_admin: [
    "dashboard",
    "products",
    "categories",
    "brands",
    "inventory",
    "orders",
    "customers",
    "coupons",
    "reviews",
    "content",
    "gallery",
    "reports",
    "staff",
    "settings",
  ],
  catalogue_manager: [
    "dashboard",
    "products",
    "categories",
    "brands",
    "reviews",
    "content",
    "gallery",
  ],
  inventory_manager: ["dashboard", "inventory", "products", "orders"],
  fulfilment_manager: ["dashboard", "orders", "inventory"],
  customer_support: ["dashboard", "orders", "customers", "reviews"],
};

// ----------------------------------------------------------------------
// 2. DATA MODELS (Categories, Brands, Stock, Audit, Content)
// ----------------------------------------------------------------------
export interface AdminCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  displayOrder: number;
  status: "active" | "inactive";
  productCount: number;
}

export interface AdminBrandConcept {
  id: "flavourverse" | "purepantry" | "snackattack";
  name: string;
  headline: string;
  subhead: string;
  tagline: string;
  heroImageDesktop: string;
  heroImageMobile: string;
  ctaText: string;
  ctaLink: string;
  accentColor: string;
  status: "active" | "maintenance";
}

export interface InventoryItem {
  sku: string;
  productId: number;
  productName: string;
  packSizeTitle: string;
  netQuantity: string;
  stockOnHand: number;
  reservedStock: number; // 15-minute checkout hold
  lowStockThreshold: number;
  warehouseHub: string;
  mfgDate: string;
  expDate: string;
}

export interface StockAuditLog {
  id: string;
  sku: string;
  productName: string;
  previousQty: number;
  newQty: number;
  changeQty: number;
  reason: "Inward Restock" | "Damage / Spoilage" | "Cycle Count Correction" | "Order Return" | "Checkout Release";
  adminName: string;
  timestamp: string;
}

export interface AdminOrder {
  id: string;
  concept: "flavourverse" | "purepantry" | "snackattack";
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: {
    fullName: string;
    street: string;
    city: string;
    state: string;
    pincode: string;
    phone: string;
  };
  items: {
    productId: number;
    productName: string;
    sku: string;
    packSizeTitle: string;
    price: number;
    quantity: number;
  }[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  shippingFee: number;
  gstAmount: number;
  total: number;
  paymentMethod: string;
  paymentStatus: "Pending" | "Paid (Demo)" | "Failed";
  orderStatus: "placed" | "verified" | "packed" | "dispatched" | "in_transit" | "delivered" | "cancelled";
  courierName?: string;
  awbCode?: string;
  trackingUrl?: string;
  internalNotes?: string;
  createdAt: string;
}

export interface AdminCustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
  gstin?: string;
  city: string;
  state: string;
  pincode: string;
  totalOrders: number;
  totalSpend: number;
  status: "active" | "flagged" | "vip";
  registeredAt: string;
}

export interface AdminCoupon {
  id: string;
  code: string;
  type: "percentage" | "fixed";
  value: number;
  minSpend: number;
  maxDiscount?: number;
  usageLimit: number;
  usedCount: number;
  startDate: string;
  expiryDate: string;
  status: "active" | "expired" | "paused";
}

export interface AdminReview {
  id: string;
  productId: number;
  productName: string;
  authorName: string;
  rating: number;
  comment: string;
  status: "approved" | "pending" | "rejected";
  createdAt: string;
}

export interface AdminNotification {
  id: string;
  title: string;
  message: string;
  type: "order" | "inventory" | "customer" | "review" | "system";
  isRead: boolean;
  createdAt: string;
  link?: string;
}

export interface StoreSettings {
  storeName: string;
  legalEntity: string;
  fssaiLicense: string;
  gstin: string;
  defaultTaxRatePercent: number;
  standardShippingFee: number;
  freeShippingThreshold: number;
  contactEmail: string;
  contactPhone: string;
  maintenanceMode: boolean;
  pincodes: {
    pincode: string;
    city: string;
    state: string;
    leadDays: string;
    codAvailable: boolean;
    active: boolean;
  }[];
}

// ----------------------------------------------------------------------
// 3. SEED DATA
// ----------------------------------------------------------------------
const INITIAL_CATEGORIES: AdminCategory[] = [
  {
    id: "cat-1",
    name: "Salty Obsessions",
    slug: "salty-obsessions",
    description: "Slow-popped sorghum crisps, kettle crisps, and savoury millet crunches.",
    image: "/images/products/gourmet-sorghum-crisps.jpg",
    displayOrder: 1,
    status: "active",
    productCount: 3,
  },
  {
    id: "cat-2",
    name: "Liquid Happiness",
    slug: "liquid-happiness",
    description: "Botanical cold-pressed craft sodas and prebiotic mountain refreshments.",
    image: "/images/products/prebiotic-white-peach-soda.jpg",
    displayOrder: 2,
    status: "active",
    productCount: 2,
  },
  {
    id: "cat-3",
    name: "Chocolate Therapy",
    slug: "chocolate-therapy",
    description: "Single-origin shade-grown Malabar chocolate reserves conched at 45°C.",
    image: "/images/products/malabar-dark-chocolate-74.jpg",
    displayOrder: 3,
    status: "active",
    productCount: 2,
  },
  {
    id: "cat-4",
    name: "Better Bites",
    slug: "better-bites",
    description: "Sun-dried Kashmiri walnuts, roasted almonds, and functional trail crunches.",
    image: "/images/products/kashmiri-jumbo-walnuts.jpg",
    displayOrder: 4,
    status: "active",
    productCount: 3,
  },
  {
    id: "cat-5",
    name: "Pantry Essentials",
    slug: "pantry-essentials",
    description: "Cold-extracted wild forest honeys and stone-milled ancient grains.",
    image: "/images/products/wild-forest-honey.jpg",
    displayOrder: 5,
    status: "active",
    productCount: 4,
  },
  {
    id: "cat-6",
    name: "Sweet Cravings",
    slug: "sweet-cravings",
    description: "Artisanal chili fruit candies, mango pops, and clean-label confections.",
    image: "/images/products/alphonso-mango-chili-pops.jpg",
    displayOrder: 6,
    status: "active",
    productCount: 3,
  },
];

const INITIAL_CONCEPTS: Record<"flavourverse" | "purepantry" | "snackattack", AdminBrandConcept> = {
  flavourverse: {
    id: "flavourverse",
    name: "FLAVOURVERSE",
    headline: "FLAVOUR HAS A NEW UNIVERSE.",
    subhead: "Where packaged food ascends to high culinary art. Slow-popped ancient sorghum dusted with wild Italian truffle.",
    tagline: "VOLUME 01 • LUXURY EDITORIAL FOOD",
    heroImageDesktop: "/images/products/gourmet-sorghum-crisps.jpg",
    heroImageMobile: "/images/products/gourmet-sorghum-crisps.jpg",
    ctaText: "EXPLORE COLLECTION",
    ctaLink: "/concept-a-flavourverse/shop",
    accentColor: "#FF9F1C",
    status: "active",
  },
  purepantry: {
    id: "purepantry",
    name: "PURE & PANTRY",
    headline: "HONEST FOOD FOR INTENTIONAL LIVING.",
    subhead: "Traceable ingredients sourced directly from smallholder farms in Kashmir and Kerala.",
    tagline: "EST. 2026 • 100% CLEAN BOTANICAL PROVISIONS",
    heroImageDesktop: "/images/products/kashmiri-jumbo-walnuts.jpg",
    heroImageMobile: "/images/products/kashmiri-jumbo-walnuts.jpg",
    ctaText: "SHOP CLEAN PROVISIONS",
    ctaLink: "/concept-b-purepantry/shop",
    accentColor: "#1E3A2F",
    status: "active",
  },
  snackattack: {
    id: "snackattack",
    name: "SNACK ATTACK!",
    headline: "UNAPOLOGETIC HIGH-DECIBEL CRUNCH.",
    subhead: "Electric fizz, hot crunch, zero boring bites. Built for midnight gaming, movie drops, and festival runs.",
    tagline: "CRUNCH HEADQUARTERS • ZERO BORING BITES",
    heroImageDesktop: "/images/products/prebiotic-white-peach-soda.jpg",
    heroImageMobile: "/images/products/prebiotic-white-peach-soda.jpg",
    ctaText: "RAID THE STASH",
    ctaLink: "/concept-c-snackattack/shop",
    accentColor: "#FFE600",
    status: "active",
  },
};

const INITIAL_ORDERS: AdminOrder[] = [
  {
    id: "PP-ORD-9842",
    concept: "flavourverse",
    customerName: "Aaditya Vikram",
    customerEmail: "aadi@peachyplate.in",
    customerPhone: "+91 98765 43210",
    shippingAddress: {
      fullName: "Aaditya Vikram",
      street: "Flat 402, Royal Palms, Outer Ring Road, Bellandur",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560103",
      phone: "+91 98765 43210",
    },
    items: [
      {
        productId: 1,
        productName: "Slow-Popped Artisan Sorghum Crisps",
        sku: "PP-SOR-120",
        packSizeTitle: "Standard Pouch (150 g)",
        price: 249,
        quantity: 2,
      },
      {
        productId: 3,
        productName: "74% Malabar Single-Origin Dark Reserve",
        sku: "PP-MAL-80",
        packSizeTitle: "Artisan Bar (80 g)",
        price: 380,
        quantity: 1,
      },
    ],
    subtotal: 878,
    discount: 131.7,
    couponCode: "PEACHY15",
    shippingFee: 0,
    gstAmount: 37.32,
    total: 783.62,
    paymentMethod: "Demo Simulation (Coming Soon)",
    paymentStatus: "Paid (Demo)",
    orderStatus: "in_transit",
    courierName: "Delhivery Air Express",
    awbCode: "DEL849201948",
    trackingUrl: "https://www.delhivery.com/track/package/DEL849201948",
    internalNotes: "Gift note requested: 'For the ultimate flavour lover'. Truffle pouch sealed.",
    createdAt: "2026-11-16T10:15:00Z",
  },
  {
    id: "PP-ORD-9841",
    concept: "purepantry",
    customerName: "Meera Krishnan",
    customerEmail: "meera.k@gmail.com",
    customerPhone: "+91 98234 11223",
    shippingAddress: {
      fullName: "Meera Krishnan",
      street: "Plot 18, 4th Cross, Indiranagar 1st Stage",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560038",
      phone: "+91 98234 11223",
    },
    items: [
      {
        productId: 4,
        productName: "Kashmiri Cold-Pressed Jumbo Walnuts",
        sku: "PP-WAL-250",
        packSizeTitle: "Glass Jar (250 g)",
        price: 680,
        quantity: 1,
      },
      {
        productId: 5,
        productName: "Raw Wild Forest Monofloral Honey",
        sku: "PP-HON-350",
        packSizeTitle: "Pantry Jar (350 g)",
        price: 520,
        quantity: 1,
      },
    ],
    subtotal: 1200,
    discount: 0,
    shippingFee: 0,
    gstAmount: 60.0,
    total: 1260.0,
    paymentMethod: "Demo Simulation (Coming Soon)",
    paymentStatus: "Paid (Demo)",
    orderStatus: "dispatched",
    courierName: "Blue Dart Apex",
    awbCode: "BLU48291054",
    trackingUrl: "https://www.bluedart.com/tracking/BLU48291054",
    internalNotes: "Fragile glass packaging verified.",
    createdAt: "2026-11-16T08:30:00Z",
  },
  {
    id: "PP-ORD-9840",
    concept: "snackattack",
    customerName: "Rohan Kapoor",
    customerEmail: "rohan.kapoor@outlook.com",
    customerPhone: "+91 97112 34567",
    shippingAddress: {
      fullName: "Rohan Kapoor",
      street: "B-42, Defence Colony, Ring Road",
      city: "New Delhi",
      state: "Delhi",
      pincode: "110024",
      phone: "+91 97112 34567",
    },
    items: [
      {
        productId: 2,
        productName: "Sparkling Prebiotic White Peach Soda",
        sku: "PP-PEA-330",
        packSizeTitle: "Can Multi-Pack (6 x 330 ml)",
        price: 840,
        quantity: 1,
      },
      {
        productId: 6,
        productName: "Smoked Paprika & Himalayan Salt Millet Puffs",
        sku: "PP-MIL-100",
        packSizeTitle: "Snack Box (100 g)",
        price: 180,
        quantity: 3,
      },
    ],
    subtotal: 1380,
    discount: 200,
    couponCode: "SNACK20",
    shippingFee: 0,
    gstAmount: 59.0,
    total: 1239.0,
    paymentMethod: "Demo Simulation (Coming Soon)",
    paymentStatus: "Paid (Demo)",
    orderStatus: "packed",
    courierName: "Delhivery Surface",
    internalNotes: "Packed in neon bubble mailer with collector stickers.",
    createdAt: "2026-11-15T18:45:00Z",
  },
];

const INITIAL_CUSTOMERS: AdminCustomer[] = [
  {
    id: "CUST-8821",
    name: "Aaditya Vikram",
    email: "aadi@peachyplate.in",
    phone: "+91 98765 43210",
    gstin: "07AAAAA0000A1Z5",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560103",
    totalOrders: 4,
    totalSpend: 3120,
    status: "vip",
    registeredAt: "2026-01-15T10:00:00Z",
  },
  {
    id: "CUST-8822",
    name: "Meera Krishnan",
    email: "meera.k@gmail.com",
    phone: "+91 98234 11223",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560038",
    totalOrders: 2,
    totalSpend: 2460,
    status: "active",
    registeredAt: "2026-02-01T14:20:00Z",
  },
  {
    id: "CUST-8823",
    name: "Rohan Kapoor",
    email: "rohan.kapoor@outlook.com",
    phone: "+91 97112 34567",
    city: "New Delhi",
    state: "Delhi",
    pincode: "110024",
    totalOrders: 1,
    totalSpend: 1239,
    status: "active",
    registeredAt: "2026-03-10T11:45:00Z",
  },
  {
    id: "CUST-8824",
    name: "Ananya Sharma",
    email: "ananya.s@yahoo.com",
    phone: "+91 99887 76655",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400050",
    totalOrders: 3,
    totalSpend: 2180,
    status: "active",
    registeredAt: "2026-02-18T09:15:00Z",
  },
];

const INITIAL_COUPONS: AdminCoupon[] = [
  {
    id: "cp-1",
    code: "PEACHY15",
    type: "percentage",
    value: 15,
    minSpend: 499,
    maxDiscount: 300,
    usageLimit: 1000,
    usedCount: 142,
    startDate: "2026-01-01",
    expiryDate: "2026-12-31",
    status: "active",
  },
  {
    id: "cp-2",
    code: "SNACK20",
    type: "percentage",
    value: 20,
    minSpend: 799,
    maxDiscount: 400,
    usageLimit: 500,
    usedCount: 88,
    startDate: "2026-02-01",
    expiryDate: "2026-11-30",
    status: "active",
  },
  {
    id: "cp-3",
    code: "WELCOME100",
    type: "fixed",
    value: 100,
    minSpend: 499,
    usageLimit: 2000,
    usedCount: 420,
    startDate: "2026-01-01",
    expiryDate: "2026-12-31",
    status: "active",
  },
  {
    id: "cp-4",
    code: "FESTIVE25",
    type: "percentage",
    value: 25,
    minSpend: 1499,
    maxDiscount: 750,
    usageLimit: 250,
    usedCount: 250,
    startDate: "2026-03-01",
    expiryDate: "2026-03-31",
    status: "expired",
  },
];

const INITIAL_REVIEWS: AdminReview[] = [
  {
    id: "rev-1",
    productId: 1,
    productName: "Slow-Popped Artisan Sorghum Crisps",
    authorName: "Kavita Rao",
    rating: 5,
    comment: "Incredible crunch! The wild truffle aroma is genuine and doesn't feel synthetic. Will reorder the 3-pack.",
    status: "approved",
    createdAt: "2026-11-14T11:20:00Z",
  },
  {
    id: "rev-2",
    productId: 2,
    productName: "Sparkling Prebiotic White Peach Soda",
    authorName: "Arjun Nambiar",
    rating: 5,
    comment: "Clean ingredients and subtle sweetness from organic peach. Much better than artificial canned drinks.",
    status: "approved",
    createdAt: "2026-11-12T16:45:00Z",
  },
  {
    id: "rev-3",
    productId: 3,
    productName: "74% Malabar Single-Origin Dark Reserve",
    authorName: "Divya Sethi",
    rating: 4,
    comment: "Very rich stone-ground texture with bright berry notes. Packaged securely with insulation.",
    status: "approved",
    createdAt: "2026-11-10T19:00:00Z",
  },
  {
    id: "rev-4",
    productId: 4,
    productName: "Kashmiri Cold-Pressed Jumbo Walnuts",
    authorName: "Vikram Singhania",
    rating: 5,
    comment: "Crisp and totally free of bitter oxidation. Perfect harvest quality.",
    status: "pending",
    createdAt: "2026-11-16T12:05:00Z",
  },
];

const INITIAL_NOTIFICATIONS: AdminNotification[] = [
  {
    id: "notif-1",
    title: "New Order Received",
    message: "Order #PP-ORD-9842 (₹783.62) placed for Flavourverse collection.",
    type: "order",
    isRead: false,
    createdAt: "10 mins ago",
    link: "/admin/orders",
  },
  {
    id: "notif-2",
    title: "Low Stock Alert",
    message: "SKU PP-MAL-80 (74% Malabar Bar) is at 14 units (Safety threshold: 15).",
    type: "inventory",
    isRead: false,
    createdAt: "45 mins ago",
    link: "/admin/inventory",
  },
  {
    id: "notif-3",
    title: "Review Awaiting Moderation",
    message: "Vikram Singhania reviewed Kashmiri Jumbo Walnuts (5 Stars).",
    type: "review",
    isRead: false,
    createdAt: "2 hours ago",
    link: "/admin/reviews",
  },
  {
    id: "notif-4",
    title: "New Customer Registration",
    message: "Ananya Sharma registered from Mumbai, Maharashtra.",
    type: "customer",
    isRead: true,
    createdAt: "1 day ago",
    link: "/admin/customers",
  },
];

const INITIAL_STORE_SETTINGS: StoreSettings = {
  storeName: "PEACHY PLATE FOODS",
  legalEntity: "Peachy Plate Gourmet Retail Pvt Ltd",
  fssaiLicense: "10021011000428",
  gstin: "07AAAAA0000A1Z5",
  defaultTaxRatePercent: 5.0,
  standardShippingFee: 60,
  freeShippingThreshold: 499,
  contactEmail: "concierge@peachyplate.in",
  contactPhone: "+91 98765 43210",
  maintenanceMode: false,
  pincodes: [
    { pincode: "560001", city: "Bengaluru Central", state: "Karnataka", leadDays: "1-2 Business Days", codAvailable: true, active: true },
    { pincode: "560103", city: "Bengaluru Bellandur", state: "Karnataka", leadDays: "1-2 Business Days", codAvailable: true, active: true },
    { pincode: "110001", city: "New Delhi Connaught Place", state: "Delhi", leadDays: "2-3 Business Days", codAvailable: true, active: true },
    { pincode: "400001", city: "Mumbai South", state: "Maharashtra", leadDays: "2-3 Business Days", codAvailable: true, active: true },
    { pincode: "600001", city: "Chennai George Town", state: "Tamil Nadu", leadDays: "2-3 Business Days", codAvailable: true, active: true },
    { pincode: "500001", city: "Hyderabad Abids", state: "Telangana", leadDays: "2-3 Business Days", codAvailable: true, active: true },
    { pincode: "700001", city: "Kolkata BBD Bagh", state: "West Bengal", leadDays: "3-4 Business Days", codAvailable: false, active: true },
  ],
};

// ----------------------------------------------------------------------
// 4. ZUSTAND STORE INTERFACE
// ----------------------------------------------------------------------
interface AdminStoreState {
  // Auth
  currentAdmin: AdminUser | null;
  isAuthenticated: boolean;
  login: (email: string, password?: string) => { success: boolean; error?: string };
  logout: () => void;
  canAccess: (module: string) => boolean;

  // Catalog Products
  products: DemoProduct[];
  addProduct: (product: Omit<DemoProduct, "id">) => DemoProduct;
  updateProduct: (id: number, updates: Partial<DemoProduct>) => void;
  deleteProduct: (id: number) => void;
  duplicateProduct: (id: number) => void;
  togglePublish: (id: number) => void;
  toggleFeatured: (id: number) => void;

  // Categories
  categories: AdminCategory[];
  addCategory: (category: Omit<AdminCategory, "id">) => void;
  updateCategory: (id: string, updates: Partial<AdminCategory>) => void;
  deleteCategory: (id: string) => void;

  // Brands / 3 Storefront Concepts
  concepts: Record<"flavourverse" | "purepantry" | "snackattack", AdminBrandConcept>;
  updateConcept: (
    conceptId: "flavourverse" | "purepantry" | "snackattack",
    updates: Partial<AdminBrandConcept>
  ) => void;

  // Inventory & Audits
  inventory: InventoryItem[];
  inventoryAuditLogs: StockAuditLog[];
  adjustStock: (params: {
    sku: string;
    changeQty: number;
    reason: StockAuditLog["reason"];
    adminName: string;
  }) => { success: boolean; message: string };

  // Orders
  orders: AdminOrder[];
  updateOrderStatus: (orderId: string, status: AdminOrder["orderStatus"]) => void;
  assignCourier: (orderId: string, courierName: string, awbCode: string, trackingUrl?: string) => void;
  cancelOrder: (orderId: string, reason?: string) => void;
  addOrderInternalNote: (orderId: string, note: string) => void;

  // Customers
  customers: AdminCustomer[];
  updateCustomerStatus: (id: string, status: AdminCustomer["status"]) => void;

  // Coupons
  coupons: AdminCoupon[];
  addCoupon: (coupon: Omit<AdminCoupon, "id" | "usedCount">) => void;
  updateCoupon: (id: string, updates: Partial<AdminCoupon>) => void;
  deleteCoupon: (id: string) => void;
  toggleCouponStatus: (id: string) => void;

  // Reviews
  reviews: AdminReview[];
  approveReview: (id: string) => void;
  rejectReview: (id: string) => void;
  deleteReview: (id: string) => void;

  // Media Gallery
  galleryImages: { id: string; url: string; title: string; concept: string; size: string; createdAt: string }[];
  addGalleryImage: (image: { url: string; title: string; concept: string; size: string }) => void;
  deleteGalleryImage: (id: string) => void;

  // Staff & Permissions
  staffList: AdminUser[];
  updateStaffRole: (id: string, role: AdminRole) => void;
  toggleStaffStatus: (id: string) => void;
  addStaffMember: (member: Omit<AdminUser, "id" | "lastLogin">) => void;

  // Notifications
  notifications: AdminNotification[];
  markNotificationAsRead: (id: string) => void;
  clearAllNotifications: () => void;

  // Store Settings
  settings: StoreSettings;
  updateSettings: (updates: Partial<StoreSettings>) => void;
  togglePincodeCod: (pincode: string) => void;

  // Reports
  exportReportCSV: (type: "sales" | "inventory" | "orders" | "customers") => string;
}

// ----------------------------------------------------------------------
// 5. ZUSTAND STORE CREATION
// ----------------------------------------------------------------------
export const useAdminStore = create<AdminStoreState>()(
  persist(
    (set, get) => ({
      // Auth Initial State
      currentAdmin: PRESET_ADMINS[0], // Default logged in as Super Admin (Aaditya Vikram)
      isAuthenticated: true,

      login: (email: string, password?: string) => {
        const found = PRESET_ADMINS.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
        if (!found) {
          return { success: false, error: "Invalid staff email. Please check your credentials." };
        }
        if (found.status === "inactive") {
          return { success: false, error: "This staff account has been deactivated by the Super Admin." };
        }
        const updatedUser = { ...found, lastLogin: "Just now" };
        set({ currentAdmin: updatedUser, isAuthenticated: true });
        return { success: true };
      },

      logout: () => {
        set({ currentAdmin: null, isAuthenticated: false });
      },

      canAccess: (module: string) => {
        const admin = get().currentAdmin;
        if (!admin) return false;
        if (admin.role === "super_admin") return true;
        const perms = ROLE_PERMISSIONS[admin.role] || [];
        return perms.includes(module);
      },

      // Catalog Products
      products: DEMO_PRODUCTS,

      addProduct: (productData) => {
        const currentProducts = get().products;
        const newId = Math.max(...currentProducts.map((p) => p.id), 0) + 1;
        const newProduct: DemoProduct = {
          ...productData,
          id: newId,
        };
        const updatedProducts = [newProduct, ...currentProducts];
        
        // Also seed initial inventory for new product variants
        const newInventoryItems: InventoryItem[] = newProduct.packSizes.map((ps) => ({
          sku: ps.sku,
          productId: newId,
          productName: newProduct.name,
          packSizeTitle: ps.title,
          netQuantity: ps.netQuantity,
          stockOnHand: 40,
          reservedStock: 0,
          lowStockThreshold: 15,
          warehouseHub: "Bhiwandi Central Hub, Maharashtra",
          mfgDate: "2026-10-01",
          expDate: "2027-04-01",
        }));

        set({
          products: updatedProducts,
          inventory: [...get().inventory, ...newInventoryItems],
        });
        return newProduct;
      },

      updateProduct: (id, updates) => {
        set({
          products: get().products.map((p) => (p.id === id ? { ...p, ...updates } : p)),
        });
      },

      deleteProduct: (id) => {
        // Safe soft delete: keep historical order integrity
        set({
          products: get().products.filter((p) => p.id !== id),
        });
      },

      duplicateProduct: (id) => {
        const existing = get().products.find((p) => p.id === id);
        if (!existing) return;
        const newId = Math.max(...get().products.map((p) => p.id), 0) + 1;
        const duplicated: DemoProduct = {
          ...existing,
          id: newId,
          name: `${existing.name} (Copy)`,
          slug: `${existing.slug}-copy-${Date.now().toString().slice(-4)}`,
          packSizes: existing.packSizes.map((ps, idx) => ({
            ...ps,
            id: `dup-${newId}-${idx}`,
            sku: `${ps.sku}-CP`,
          })),
        };
        set({
          products: [duplicated, ...get().products],
        });
      },

      togglePublish: (id) => {
        set({
          products: get().products.map((p) => (p.id === id ? { ...p, isNew: !p.isNew } : p)),
        });
      },

      toggleFeatured: (id) => {
        set({
          products: get().products.map((p) => (p.id === id ? { ...p, isFeatured: !p.isFeatured } : p)),
        });
      },

      // Categories
      categories: INITIAL_CATEGORIES,

      addCategory: (categoryData) => {
        const newId = `cat-${Date.now().toString().slice(-4)}`;
        const newCat: AdminCategory = { ...categoryData, id: newId, productCount: 0 };
        set({ categories: [...get().categories, newCat] });
      },

      updateCategory: (id, updates) => {
        set({
          categories: get().categories.map((c) => (c.id === id ? { ...c, ...updates } : c)),
        });
      },

      deleteCategory: (id) => {
        set({
          categories: get().categories.filter((c) => c.id !== id),
        });
      },

      // Brands / 3 Storefront Concepts
      concepts: INITIAL_CONCEPTS,

      updateConcept: (conceptId, updates) => {
        set({
          concepts: {
            ...get().concepts,
            [conceptId]: { ...get().concepts[conceptId], ...updates },
          },
        });
      },

      // Inventory & Stock Adjustments
      inventory: DEMO_PRODUCTS.flatMap((p) =>
        p.packSizes.map((ps) => ({
          sku: ps.sku,
          productId: p.id,
          productName: p.name,
          packSizeTitle: ps.title,
          netQuantity: ps.netQuantity,
          stockOnHand: Math.floor(18 + (p.id * 7) % 55),
          reservedStock: Math.floor((p.id * 3) % 5),
          lowStockThreshold: 15,
          warehouseHub: "Bhiwandi Central Hub, Maharashtra",
          mfgDate: "2026-09-15",
          expDate: "2027-03-15",
        }))
      ),

      inventoryAuditLogs: [
        {
          id: "AUD-1001",
          sku: "PP-SOR-120",
          productName: "Slow-Popped Artisan Sorghum Crisps",
          previousQty: 25,
          newQty: 50,
          changeQty: 25,
          reason: "Inward Restock",
          adminName: "Dev Malhotra",
          timestamp: "2026-11-16 14:30:00",
        },
        {
          id: "AUD-1002",
          sku: "PP-MAL-80",
          productName: "74% Malabar Single-Origin Dark Reserve",
          previousQty: 18,
          newQty: 14,
          changeQty: -4,
          reason: "Damage / Spoilage",
          adminName: "Dev Malhotra",
          timestamp: "2026-11-16 11:15:00",
        },
      ],

      adjustStock: ({ sku, changeQty, reason, adminName }) => {
        const item = get().inventory.find((i) => i.sku === sku);
        if (!item) return { success: false, message: `SKU ${sku} not found.` };

        const previousQty = item.stockOnHand;
        const newQty = previousQty + changeQty;

        if (newQty < 0) {
          return {
            success: false,
            message: `Adjustment denied: Negative stock not permitted (Current: ${previousQty}, Request: ${changeQty}).`,
          };
        }

        const auditEntry: StockAuditLog = {
          id: `AUD-${Date.now().toString().slice(-4)}`,
          sku,
          productName: item.productName,
          previousQty,
          newQty,
          changeQty,
          reason,
          adminName: adminName || "Staff Administrator",
          timestamp: new Date().toISOString().replace("T", " ").slice(0, 19),
        };

        const updatedInventory = get().inventory.map((i) => (i.sku === sku ? { ...i, stockOnHand: newQty } : i));

        // Add warning notification if low stock
        let notifications = get().notifications;
        if (newQty < item.lowStockThreshold) {
          notifications = [
            {
              id: `notif-${Date.now()}`,
              title: "Low Stock Warning Triggered",
              message: `SKU ${sku} (${item.productName}) dropped to ${newQty} units.`,
              type: "inventory",
              isRead: false,
              createdAt: "Just now",
              link: "/admin/inventory",
            },
            ...notifications,
          ];
        }

        set({
          inventory: updatedInventory,
          inventoryAuditLogs: [auditEntry, ...get().inventoryAuditLogs],
          notifications,
        });

        return {
          success: true,
          message: `Stock updated for ${sku}: ${previousQty} -> ${newQty} units (${reason}).`,
        };
      },

      // Orders
      orders: INITIAL_ORDERS,

      updateOrderStatus: (orderId, status) => {
        set({
          orders: get().orders.map((o) => (o.id === orderId ? { ...o, orderStatus: status } : o)),
        });
      },

      assignCourier: (orderId, courierName, awbCode, trackingUrl) => {
        set({
          orders: get().orders.map((o) =>
            o.id === orderId
              ? {
                  ...o,
                  courierName,
                  awbCode,
                  trackingUrl: trackingUrl || `https://track.courier.in/${awbCode}`,
                  orderStatus: "in_transit",
                }
              : o
          ),
        });
      },

      cancelOrder: (orderId, reason) => {
        const order = get().orders.find((o) => o.id === orderId);
        if (!order) return;

        // Restore reserved stock for each item in the order
        const updatedInventory = get().inventory.map((inv) => {
          const matchedItem = order.items.find((i) => i.sku === inv.sku);
          if (matchedItem) {
            return {
              ...inv,
              stockOnHand: inv.stockOnHand + matchedItem.quantity,
              reservedStock: Math.max(0, inv.reservedStock - matchedItem.quantity),
            };
          }
          return inv;
        });

        set({
          orders: get().orders.map((o) =>
            o.id === orderId
              ? {
                  ...o,
                  orderStatus: "cancelled",
                  internalNotes: `${o.internalNotes || ""}\nCancelled: ${reason || "Admin request"} (Stock restored).`,
                }
              : o
          ),
          inventory: updatedInventory,
        });
      },

      addOrderInternalNote: (orderId, note) => {
        set({
          orders: get().orders.map((o) => (o.id === orderId ? { ...o, internalNotes: note } : o)),
        });
      },

      // Customers
      customers: INITIAL_CUSTOMERS,

      updateCustomerStatus: (id, status) => {
        set({
          customers: get().customers.map((c) => (c.id === id ? { ...c, status } : c)),
        });
      },

      // Coupons
      coupons: INITIAL_COUPONS,

      addCoupon: (couponData) => {
        const newCoupon: AdminCoupon = {
          ...couponData,
          id: `cp-${Date.now().toString().slice(-4)}`,
          usedCount: 0,
        };
        set({ coupons: [newCoupon, ...get().coupons] });
      },

      updateCoupon: (id, updates) => {
        set({
          coupons: get().coupons.map((c) => (c.id === id ? { ...c, ...updates } : c)),
        });
      },

      deleteCoupon: (id) => {
        set({ coupons: get().coupons.filter((c) => c.id !== id) });
      },

      toggleCouponStatus: (id) => {
        set({
          coupons: get().coupons.map((c) =>
            c.id === id ? { ...c, status: c.status === "active" ? "paused" : "active" } : c
          ),
        });
      },

      // Reviews
      reviews: INITIAL_REVIEWS,

      approveReview: (id) => {
        set({
          reviews: get().reviews.map((r) => (r.id === id ? { ...r, status: "approved" } : r)),
        });
      },

      rejectReview: (id) => {
        set({
          reviews: get().reviews.map((r) => (r.id === id ? { ...r, status: "rejected" } : r)),
        });
      },

      deleteReview: (id) => {
        set({
          reviews: get().reviews.filter((r) => r.id !== id),
        });
      },

      // Media Gallery
      galleryImages: [
        {
          id: "gal-1",
          url: "/images/products/gourmet-sorghum-crisps.jpg",
          title: "Slow Popped Sorghum Crisps Primary Pack",
          concept: "flavourverse",
          size: "420 KB",
          createdAt: "2026-11-01",
        },
        {
          id: "gal-2",
          url: "/images/products/prebiotic-white-peach-soda.jpg",
          title: "Prebiotic White Peach Soda Chilled Can",
          concept: "snackattack",
          size: "385 KB",
          createdAt: "2026-11-02",
        },
        {
          id: "gal-3",
          url: "/images/products/kashmiri-jumbo-walnuts.jpg",
          title: "Kashmiri Jumbo Walnuts Glass Jar Harvest",
          concept: "purepantry",
          size: "460 KB",
          createdAt: "2026-11-03",
        },
        {
          id: "gal-4",
          url: "/images/products/malabar-dark-chocolate-74.jpg",
          title: "Malabar Dark Chocolate 74% Single Origin Bar",
          concept: "flavourverse",
          size: "510 KB",
          createdAt: "2026-11-04",
        },
      ],

      addGalleryImage: (image) => {
        const newImg = {
          id: `gal-${Date.now().toString().slice(-4)}`,
          ...image,
          createdAt: new Date().toISOString().slice(0, 10),
        };
        set({ galleryImages: [newImg, ...get().galleryImages] });
      },

      deleteGalleryImage: (id) => {
        set({ galleryImages: get().galleryImages.filter((g) => g.id !== id) });
      },

      // Staff Team
      staffList: PRESET_ADMINS,

      updateStaffRole: (id, role) => {
        const roleLabels: Record<AdminRole, string> = {
          super_admin: "Super Admin",
          catalogue_manager: "Catalogue Manager",
          inventory_manager: "Inventory Lead",
          fulfilment_manager: "Fulfilment Lead",
          customer_support: "Customer Care",
        };
        set({
          staffList: get().staffList.map((s) => (s.id === id ? { ...s, role, roleLabel: roleLabels[role] } : s)),
        });
      },

      toggleStaffStatus: (id) => {
        set({
          staffList: get().staffList.map((s) =>
            s.id === id ? { ...s, status: s.status === "active" ? "inactive" : "active" } : s
          ),
        });
      },

      addStaffMember: (member) => {
        const newId = `ADM-${Math.floor(100 + Math.random() * 900)}`;
        const newMember: AdminUser = {
          ...member,
          id: newId,
          lastLogin: "Never",
        };
        set({ staffList: [...get().staffList, newMember] });
      },

      // Notifications
      notifications: INITIAL_NOTIFICATIONS,

      markNotificationAsRead: (id) => {
        set({
          notifications: get().notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
        });
      },

      clearAllNotifications: () => {
        set({
          notifications: get().notifications.map((n) => ({ ...n, isRead: true })),
        });
      },

      // Settings
      settings: INITIAL_STORE_SETTINGS,

      updateSettings: (updates) => {
        set({
          settings: { ...get().settings, ...updates },
        });
      },

      togglePincodeCod: (pincode) => {
        set({
          settings: {
            ...get().settings,
            pincodes: get().settings.pincodes.map((p) =>
              p.pincode === pincode ? { ...p, codAvailable: !p.codAvailable } : p
            ),
          },
        });
      },

      // Reports CSV Generator
      exportReportCSV: (type) => {
        if (type === "sales") {
          const orders = get().orders;
          const headers = "Order ID,Concept,Customer,Email,Total (INR),Status,Date\n";
          const rows = orders
            .map((o) => `"${o.id}","${o.concept}","${o.customerName}","${o.customerEmail}",${o.total},"${o.orderStatus}","${o.createdAt}"`)
            .join("\n");
          return headers + rows;
        } else if (type === "inventory") {
          const items = get().inventory;
          const headers = "SKU,Product Name,Pack Size,Available Stock,Reserved,Threshold,Hub\n";
          const rows = items
            .map((i) => `"${i.sku}","${i.productName}","${i.packSizeTitle}",${i.stockOnHand},${i.reservedStock},${i.lowStockThreshold},"${i.warehouseHub}"`)
            .join("\n");
          return headers + rows;
        } else if (type === "customers") {
          const customers = get().customers;
          const headers = "Customer ID,Name,Email,Phone,City,State,Total Orders,Total Spend (INR),Status\n";
          const rows = customers
            .map((c) => `"${c.id}","${c.name}","${c.email}","${c.phone}","${c.city}","${c.state}",${c.totalOrders},${c.totalSpend},"${c.status}"`)
            .join("\n");
          return headers + rows;
        }
        return "Report,Generated\nPeachy Plate,Empty";
      },
    }),
    {
      name: "peachy_plate_admin_master_store",
    }
  )
);
