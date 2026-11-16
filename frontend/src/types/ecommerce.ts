/**
 * PEACHY PLATE — E-Commerce Domain Types (Audited v1.1.0)
 * Single source of truth for all frontend concepts (Flavourverse, Pure & Pantry, Snack Attack),
 * shared commerce logic, and India-specific compliance (GST, FSSAI, PIN code, Razorpay).
 */

export type UserRole =
  | "customer"
  | "super_admin"
  | "inventory_manager"
  | "fulfillment_manager"
  | "customer_support";

export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  customerGstin?: string;
  dietaryPreferences?: string[];
  createdAt: string;
}

export interface PincodeServiceability {
  pincode: string; // 6 digits
  city: string;
  state: string;
  isServiceable: boolean;
  isCodAvailable: boolean;
  estimatedDeliveryDays: number;
  shippingSurchargeCents: number;
}

export interface Address {
  id?: number;
  type: "shipping" | "billing";
  recipientName: string;
  phone: string; // 10-digit Indian Mobile number
  flatHouseBuilding: string; // Flat, House No., Building Name
  areaStreetSector: string; // Street, Colony, Sector, Locality
  landmark?: string; // Landmark for Indian courier routing
  city: string;
  state: string; // Indian State / Union Territory
  pincode: string; // 6-digit PIN code
  countryCode: string; // 'IN'
  isDefault?: boolean;
}

export interface Category {
  id: number;
  parentId?: number | null;
  name: string;
  slug: string;
  description?: string;
  heroImageUrl?: string;
  thumbnailUrl?: string;
  conceptThemeAccent?: string;
  defaultHsnCode?: string;
  sortOrder: number;
}

export interface Brand {
  id: number;
  name: string;
  slug: string;
  story?: string;
  logoUrl?: string;
  originRegion?: string;
  isFeatured: boolean;
}

export interface DietaryTag {
  id: number;
  name: string;
  slug: string;
  iconName: string;
  badgeColorHex: string;
}

export interface NutritionalFacts {
  id?: number;
  servingSize: string; // e.g. "30g (approx 15 crisps)"
  servingsPerContainer: number;
  energyKcal: number;
  proteinG: number;
  totalCarbohydratesG: number;
  totalSugarsG: number;
  addedSugarsG: number;
  totalFatG: number;
  saturatedFatG: number;
  transFatG: number;
  cholesterolMg: number;
  sodiumMg: number;
  dietaryFiberG: number;
  micronutrients?: Record<string, string | number>;
}

export interface ProductVariant {
  id: number;
  productId: number;
  sku: string;
  barcodeEan13?: string;
  variantTitle: string; // e.g. "Pack of 1 (150g)" or "Trio Pack (3 x 150g)"
  packSizeUnit: string;
  netQuantity: string; // Legal Metrology declaration (e.g. "150 g", "3 x 150 g", "330 ml")
  netWeightGrams: number; // Accurate weight for carrier calculation
  flavorProfile?: string;
  priceCents: number; // Selling price in Paise (e.g. 24900 = ₹249.00)
  mrpCents?: number; // Maximum Retail Price (compare-at price)
  costPriceCents?: number;
  inventoryQuantity: number;
  reservedQuantity: number;
  availableStock: number;
  lowStockThreshold: number;
  isActive: boolean;
}

export interface ProductImage {
  id: number;
  productId: number;
  productVariantId?: number | null;
  imageUrl: string;
  blurhash?: string;
  altText: string;
  isPrimary: boolean;
  sortOrder: number;
}

export interface Product {
  id: number;
  brand: Brand;
  name: string;
  slug: string;
  subtitleTagline?: string;
  shortDescription: string;
  storyDescription?: string;
  ingredientsList: string; // Descending weight order
  allergens?: string; // Statutory warnings
  shelfLifeDuration: string; // e.g. "9 Months from packaging"
  storageInstructions: string;
  servingSuggestion?: string;
  originCountry: string; // "India"
  hsnCode: string; // GST HSN Code (e.g. "1905", "1806", "2202")
  gstRatePercent: number; // 5.00, 12.00, 18.00
  fssaiLicenseNumber: string; // Brand 14-digit FSSAI
  manufacturerName: string;
  manufacturerAddress: string;
  manufacturerFssaiLicense: string;
  marketerName: string;
  marketerAddress: string;
  marketerFssaiLicense: string;
  isFeatured: boolean;
  isBestseller: boolean;
  status: "draft" | "active" | "archived";
  categories: Category[];
  dietaryTags: DietaryTag[];
  nutritionalFacts?: NutritionalFacts;
  variants: ProductVariant[];
  images: ProductImage[];
  averageRating: number;
  reviewsCount: number;
  primaryImage?: ProductImage;
  priceSummary: {
    minPriceCents: number;
    maxPriceCents: number;
    currency: string;
    hasDiscount: boolean;
  };
}

export interface CartItem {
  id: number;
  productVariantId: number;
  variant: ProductVariant;
  product: {
    id: number;
    name: string;
    slug: string;
    brandName: string;
    hsnCode: string;
    gstRatePercent: number;
    primaryImage?: string;
  };
  quantity: number;
  unitPriceCents: number;
  totalPriceCents: number;
}

export interface Coupon {
  id: number;
  code: string;
  discountType: "percentage" | "fixed_amount" | "free_shipping";
  discountValue: number;
  minimumOrderCents: number;
  maximumDiscountCents?: number;
  savingsCents: number;
}

export interface Cart {
  id?: number;
  guestToken?: string;
  items: CartItem[];
  subtotalCents: number;
  discountCents: number;
  shippingFeeCents: number;
  taxCents: number;
  cgstCents: number; // Central GST (Intra-state)
  sgstCents: number; // State GST (Intra-state)
  igstCents: number; // Integrated GST (Inter-state)
  isCod: boolean;
  codFeeCents: number;
  totalCents: number;
  currency: string;
  appliedCoupon?: Coupon | null;
  totalItemCount: number;
}

export interface StockReservation {
  id: number;
  productVariantId: number;
  cartId?: number;
  orderId?: number;
  reservedUnits: number;
  status: "active" | "released" | "converted";
  expiresAt: string; // ISO-8601, 15-minute TTL
  createdAt: string;
}

export type OrderStatus =
  | "pending_payment"
  | "paid_processing"
  | "packed"
  | "handed_over_to_courier"
  | "in_transit"
  | "out_for_delivery"
  | "delivered"
  | "cancelled"
  | "refunded";

export type PaymentStatus = "unpaid" | "authorized" | "captured" | "failed" | "refunded";

export interface OrderItem {
  id: number;
  productVariantId?: number;
  productNameSnapshot: string;
  variantTitleSnapshot: string;
  skuSnapshot: string;
  hsnCodeSnapshot: string;
  gstRateSnapshot: number;
  unitPriceCents: number;
  quantity: number;
  totalPriceCents: number;
  cgstCents: number;
  sgstCents: number;
  igstCents: number;
  fssaiLicenseSnapshot: string;
  thumbnailUrlSnapshot?: string;
  nutritionalSummarySnapshot?: Partial<NutritionalFacts>;
}

export interface OrderShipment {
  id: number;
  courierPartner: string; // e.g. 'Delhivery', 'BlueDart', 'Shiprocket', 'DTDC', 'India Post'
  trackingAwbNumber: string; // Air Waybill number
  trackingPortalUrl: string; // Direct link to carrier portal
  pickupManifestId?: string;
  shippedAt?: string;
  estimatedDeliveryAt?: string;
  deliveredAt?: string;
}

export interface OrderStatusHistoryItem {
  status: OrderStatus;
  timestamp: string;
  comment?: string;
}

export interface Order {
  id: number;
  orderNumber: string; // e.g. PP-2026-10482
  invoiceNumber?: string; // Statutory GST Tax Invoice: PP-INV-2026-00042
  invoiceGeneratedAt?: string;
  customerEmail: string;
  customerPhone: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentGateway: "razorpay" | "cod";
  paymentMethod?: "razorpay_card" | "razorpay_upi" | "razorpay_netbanking" | "cod";
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  isCod: boolean;
  codConvenienceFeeCents: number;
  subtotalCents: number;
  discountCents: number;
  shippingFeeCents: number;
  taxCents: number;
  cgstCents: number;
  sgstCents: number;
  igstCents: number;
  totalCents: number;
  currency: string;
  couponSnapshotCode?: string;
  shippingAddress: Address;
  billingAddress: Address;
  customerGstinSnapshot?: string;
  customerNotes?: string;
  items: OrderItem[];
  shipment?: OrderShipment;
  statusHistory: OrderStatusHistoryItem[];
  placedAt?: string;
  createdAt: string;
}

export interface ProductReview {
  id: number;
  productId: number;
  userName: string;
  rating: number; // 1-5
  headline: string;
  reviewBody: string;
  isVerifiedBuyer: boolean;
  upvotesCount: number;
  createdAt: string;
}
