"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  TrendingUp,
  Package,
  AlertTriangle,
  ShoppingBag,
  DollarSign,
  Plus,
  Truck,
  CheckCircle,
  Clock,
  ShieldCheck,
  Search,
  Filter,
  Users,
  Tag,
  Star,
  MapPin,
  Settings,
  FileText,
  Printer,
  ChevronRight,
  Edit2,
  Trash2,
  RotateCcw,
  Check,
  X,
  Menu,
  Lock,
  Eye,
  Sparkles,
  Layout,
  Layers,
  Image as ImageIcon,
  Upload,
  MessageSquare,
  Flag,
  Bell,
  Sliders,
  ExternalLink,
  Globe,
  Palette,
  Radio,
  Heart,
  Flame,
  Leaf,
  HelpCircle,
  Save,
  RefreshCw,
  Send,
  ArrowUpRight,
} from "lucide-react";
import confetti from "canvas-confetti";
import { DEMO_PRODUCTS, DemoProduct } from "@/lib/demo-catalog";
import { useOrderStore, PeachyOrder, OrderStatus } from "@/hooks/useOrderStore";
import { useCustomerAuth } from "@/hooks/useCustomerAuth";
import SafeImage from "@/components/common/SafeImage";
import { BRAND_IDENTITIES, BrandConceptId } from "@/types/brand";

export type AdminTab =
  | "overview"
  | "design_selector"
  | "products"
  | "categories"
  | "variants"
  | "inventory"
  | "orders"
  | "customers"
  | "coupons"
  | "reviews"
  | "enquiries"
  | "banners"
  | "content"
  | "pincodes"
  | "staff"
  | "settings"
  | "audit";

interface Coupon {
  id: string;
  code: string;
  discountPercent: number;
  minSpend: number;
  maxUsage: number;
  timesUsed: number;
  status: "active" | "expired" | "paused";
}

interface Review {
  id: number;
  productName: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
  status: "approved" | "pending" | "rejected";
}

interface CategoryItem {
  id: string;
  slug: string;
  name: string;
  hindiName: string;
  productCount: number;
  status: "active" | "inactive";
  tagline: string;
  iconName: string;
}

interface ContactEnquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  storefrontSource: string;
  receivedAt: string;
  status: "new" | "in_progress" | "resolved";
  adminNotes?: string;
}

interface HomepageBanner {
  id: string;
  location: "top_ticker" | "promo_strip" | "seasonal_announcement";
  targetDesign: "all" | "flavourverse" | "purepantry" | "snackattack";
  text: string;
  bgColor: string;
  textColor: string;
  isActive: boolean;
  lastUpdated: string;
}

interface PinCodeRule {
  pincode: string;
  city: string;
  state: string;
  leadDays: string;
  codAvailable: boolean;
  status: "active" | "inactive";
}

interface StaffMember {
  id: string;
  name: string;
  email: string;
  role: "Super Admin" | "Operations Manager" | "Fulfillment Lead" | "Customer Support";
  status: "active" | "inactive";
  lastLogin: string;
}

export default function CompleteAdminPortal() {
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const { orders, updateOrderStatus } = useOrderStore();
  const { customer } = useCustomerAuth();

  // 1. WEBSITE DESIGN SELECTOR STATE
  const [activePublishedDesign, setActivePublishedDesign] = useState<BrandConceptId>("flavourverse");
  const [selectedDesignToPublish, setSelectedDesignToPublish] = useState<BrandConceptId>("flavourverse");
  const [publishSuccessBanner, setPublishSuccessBanner] = useState<string | null>(null);

  // 2. PRODUCT MANAGEMENT & IMAGE UPLOAD STATE
  const [products, setProducts] = useState(DEMO_PRODUCTS);
  const [productSearch, setProductSearch] = useState("");
  const [imageManagerProduct, setImageManagerProduct] = useState<DemoProduct | null>(null);
  const [customImageUrl, setCustomImageUrl] = useState("");
  const [imageUploadPreview, setImageUploadPreview] = useState<string | null>(null);
  const [addProductModalOpen, setAddProductModalOpen] = useState(false);
  const [newProductName, setNewProductName] = useState("");
  const [newProductCategory, setNewProductCategory] = useState("Chips & Desi Namkeen");
  const [newProductPrice, setNewProductPrice] = useState(149);
  const [newProductSubtitle, setNewProductSubtitle] = useState("");

  // 3. CATEGORIES STATE
  const [categories, setCategories] = useState<CategoryItem[]>([
    {
      id: "cat-1",
      slug: "chips-and-namkeen",
      name: "Chips & Desi Namkeen",
      hindiName: "चिप्स और नमकीन",
      productCount: 3,
      status: "active",
      tagline: "Crisp kettle chips, spicy sev blends & artisanal crisps",
      iconName: "Flame",
    },
    {
      id: "cat-2",
      slug: "roasted-makhana-and-nuts",
      name: "Roasted Makhana & Dry Fruits",
      hindiName: "रोस्टेड मखाना और मेवे",
      productCount: 3,
      status: "active",
      tagline: "Slow-roasted fox nuts, California & Mamra almonds",
      iconName: "Sparkles",
    },
    {
      id: "cat-3",
      slug: "confectionery-and-bakes",
      name: "Bakes & Dark Chocolate",
      hindiName: "बेक्स और डार्क चॉकलेट",
      productCount: 3,
      status: "active",
      tagline: "Stone-ground Malabar cacao & melt-in-mouth cookies",
      iconName: "Heart",
    },
    {
      id: "cat-4",
      slug: "wellness-pantry",
      name: "Wellness Pantry & Spreads",
      hindiName: "वेलनेस स्प्रेड्स और ग्रेनोला",
      productCount: 3,
      status: "active",
      tagline: "Stone-ground peanut butter, protein fuel & seed granolas",
      iconName: "Leaf",
    },
  ]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategorySlug, setNewCategorySlug] = useState("");
  const [newCategoryTagline, setNewCategoryTagline] = useState("");
  const [addCategoryModalOpen, setAddCategoryModalOpen] = useState(false);

  // 4. PRODUCT VARIANTS (Pack Sizes) STATE
  const [variantsSearch, setVariantsSearch] = useState("");

  // 5. INVENTORY STATE
  const [restockSku, setRestockSku] = useState(DEMO_PRODUCTS[0]?.packSizes[0]?.sku || "PP-SOR-120");
  const [restockQty, setRestockQty] = useState(25);
  const [restockReason, setRestockReason] = useState("purchase_order_restock");
  const [inventoryList, setInventoryList] = useState(
    DEMO_PRODUCTS.flatMap((p) =>
      p.packSizes.map((ps) => ({
        sku: ps.sku,
        productName: p.name,
        packSize: ps.title,
        netWeight: ps.netQuantity,
        stock: Math.floor(15 + (p.id * 7) % 65),
        lowStockThreshold: 15,
        reorderAlert: (p.id * 7) % 65 < 18,
      }))
    )
  );

  // 6. ORDERS & DISPATCH STATE
  const [orderFilter, setOrderFilter] = useState<string>("all");
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<PeachyOrder | null>(null);
  const [editingOrder, setEditingOrder] = useState<PeachyOrder | null>(null);
  const [awbInput, setAwbInput] = useState("");
  const [courierInput, setCourierInput] = useState("Delhivery Air Express");
  const [statusSelect, setStatusSelect] = useState<OrderStatus>("placed");

  // 7. CONTACT ENQUIRIES STATE
  const [enquiries, setEnquiries] = useState<ContactEnquiry[]>([
    {
      id: "ENQ-1049",
      name: "Rohit Mehra",
      email: "rohit@zepto.in",
      phone: "+91 98201 44829",
      subject: "Corporate Gifting Bulk Order (500 Hampers)",
      message:
        "We are looking to order 500 gift boxes featuring Flavourverse single-estate chocolates and Pure & Pantry roasted almonds for our partner meet.",
      storefrontSource: "FLAVOURVERSE (/concept-a-flavourverse)",
      receivedAt: "Today, 11:20 AM",
      status: "new",
    },
    {
      id: "ENQ-1048",
      name: "Ananya Deshmukh",
      email: "ananya.d@cafeheritage.com",
      phone: "+91 99120 88231",
      subject: "Specialty Cafe Retail Distribution Inquiry",
      message:
        "We operate 8 artisanal coffee stores in Pune & South Mumbai. We'd love to stock Peachy Plate Single-Estate Dark Chocolate and Malabar cookies on our counters.",
      storefrontSource: "PURE & PANTRY (/concept-b-purepantry)",
      receivedAt: "Yesterday, 4:45 PM",
      status: "in_progress",
      adminNotes: "Sent product catalogue and wholesale margin deck.",
    },
    {
      id: "ENQ-1047",
      name: "Dr. Ramesh Iyer",
      email: "ramesh.iyer@apollo.org",
      phone: "+91 94440 12890",
      subject: "FSSAI Lab Certificate & Heavy Metal Testing",
      message:
        "Please provide the accredited NABL lab test report for cadmium and lead in the 85% Single-Origin Malabar bar for dietary validation.",
      storefrontSource: "SNACK ATTACK (/concept-c-snackattack)",
      receivedAt: "14 Nov 2026",
      status: "resolved",
      adminNotes: "Shared certificate NABL-FSSAI-2026-BLR-89.",
    },
  ]);
  const [selectedEnquiry, setSelectedEnquiry] = useState<ContactEnquiry | null>(null);
  const [replyMessageText, setReplyMessageText] = useState("");
  const [replySentNotice, setReplySentNotice] = useState<string | null>(null);

  // 8. HOMEPAGE BANNERS & TICKERS STATE
  const [banners, setBanners] = useState<HomepageBanner[]>([
    {
      id: "BAN-1",
      location: "top_ticker",
      targetDesign: "all",
      text: "PEACHY PLATE FOODS • COMPLIMENTARY EXPRESS DELIVERY ON ALL ORDERS OVER ₹499 ACROSS 19,000+ PIN CODES IN INDIA",
      bgColor: "#FFD60A",
      textColor: "#0A0A0A",
      isActive: true,
      lastUpdated: "Today, 10:00 AM",
    },
    {
      id: "BAN-2",
      location: "promo_strip",
      targetDesign: "all",
      text: "100% INDIAN SNACK HUSTLE • COLD-PRESSED OILS • ZERO PALM OIL • STONE CONCHED CACAO",
      bgColor: "#FF007F",
      textColor: "#FFFFFF",
      isActive: true,
      lastUpdated: "15 Nov 2026",
    },
    {
      id: "BAN-3",
      location: "seasonal_announcement",
      targetDesign: "flavourverse",
      text: "FESTIVE COMBO DROP: GET 15% OFF WITH CODE PEACHY15 ON FIRST PURCHASE",
      bgColor: "#FF9F1C",
      textColor: "#000000",
      isActive: true,
      lastUpdated: "14 Nov 2026",
    },
  ]);

  // 9. CONTENT EDITING & STATUTORY DETAILS STATE
  const [contentSettings, setContentSettings] = useState({
    legalEntityName: "Peachy Plate Foods Private Limited",
    brandUmbrella: "Peachy Plate Foods",
    tagline: "Artisanal Indian Packaged Foods • Three Independent Storefront Concepts",
    fssaiLicense: "10019041000572",
    gstin: "29AAACP9281Q1Z8",
    registeredAddress: "Unit 4B, Indiranagar 100ft Road, Bengaluru, Karnataka 560038, India",
    customerCareEmail: "concierge@peachyplate.in",
    customerCarePhone: "+91 80 4920 1800",
    operatingHours: "Monday to Saturday, 9:00 AM - 7:00 PM IST",
    brandStory:
      "Peachy Plate Foods was founded to prove that packaged Indian foods can celebrate genuine terroir and maximalist excitement without compromising clean-label purity. We cold-press our peanut and sunflower oils, source Mathania chillies directly from farmers, stone-conch organic cacao in the Western Ghats, and package in certified zero-moisture nitrogen sealed barrier pouches.",
    sourcingPromise:
      "100% vegetarian, zero adulteration, zero palm oil, lab-tested batches with QR-verifiable nutritional certificates.",
    instagramHandle: "@peachyplatefoods",
    twitterHandle: "@peachyplate",
  });
  const [contentSavedNotice, setContentSavedNotice] = useState(false);

  // 10. REVIEWS & COUPONS STATE
  const [coupons, setCoupons] = useState<Coupon[]>([
    { id: "1", code: "PEACHY15", discountPercent: 15, minSpend: 499, maxUsage: 1000, timesUsed: 142, status: "active" },
    { id: "2", code: "WELCOME10", discountPercent: 10, minSpend: 299, maxUsage: 5000, timesUsed: 628, status: "active" },
    { id: "3", code: "CRUNCH20", discountPercent: 20, minSpend: 699, maxUsage: 500, timesUsed: 89, status: "active" },
  ]);
  const [newCouponCode, setNewCouponCode] = useState("");
  const [newCouponPercent, setNewCouponPercent] = useState(15);

  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      productName: "Desi Fire Masala Kettle Chips",
      customerName: "Vikram Singhania",
      rating: 5,
      comment: "Incredible crunch and the smoky Mathania chilli balance is completely addictive!",
      date: "16 Nov 2026",
      status: "approved",
    },
    {
      id: 2,
      productName: "Royal Truffle Peri Peri Makhana",
      customerName: "Pooja Narang",
      rating: 5,
      comment: "Super light and fluffy lotus seeds. Not oily at all like local market brands.",
      date: "15 Nov 2026",
      status: "approved",
    },
    {
      id: 3,
      productName: "85% Single-Origin Malabar Dark Bar",
      customerName: "Harsh Vardhan",
      rating: 5,
      comment: "Proper stone-conched texture, floral notes, zero palm fats. World-class Indian craft chocolate.",
      date: "14 Nov 2026",
      status: "approved",
    },
    {
      id: 4,
      productName: "Real Alphonso Mango Fruit Gummies",
      customerName: "Meera Sen",
      rating: 4,
      comment: "My kids loved them! Soft chew, genuine Ratnagiri mango taste and no artificial gelatine.",
      date: "13 Nov 2026",
      status: "pending",
    },
  ]);

  // 11. PINCODES, STAFF & SETTINGS STATE
  const [pincodes, setPincodes] = useState<PinCodeRule[]>([
    { pincode: "560103", city: "Bengaluru", state: "Karnataka", leadDays: "1-2 Days", codAvailable: true, status: "active" },
    { pincode: "560001", city: "Bengaluru", state: "Karnataka", leadDays: "1-2 Days", codAvailable: true, status: "active" },
    { pincode: "110001", city: "New Delhi", state: "Delhi", leadDays: "2-3 Days", codAvailable: true, status: "active" },
    { pincode: "400001", city: "Mumbai", state: "Maharashtra", leadDays: "2-3 Days", codAvailable: true, status: "active" },
    { pincode: "600001", city: "Chennai", state: "Tamil Nadu", leadDays: "2-3 Days", codAvailable: true, status: "active" },
    { pincode: "700001", city: "Kolkata", state: "West Bengal", leadDays: "3-4 Days", codAvailable: false, status: "active" },
    { pincode: "500001", city: "Hyderabad", state: "Telangana", leadDays: "2-3 Days", codAvailable: true, status: "active" },
  ]);

  const [staff, setStaff] = useState<StaffMember[]>([
    { id: "STF-01", name: "Aaditya Vikram", email: "aadi@peachyplate.in", role: "Super Admin", status: "active", lastLogin: "Just Now" },
    { id: "STF-02", name: "Siddharth Verma", email: "siddharth@peachyplate.in", role: "Operations Manager", status: "active", lastLogin: "2 hours ago" },
    { id: "STF-03", name: "Priya Nair", email: "priya@peachyplate.in", role: "Fulfillment Lead", status: "active", lastLogin: "Yesterday" },
  ]);

  const [storeSettings, setStoreSettings] = useState({
    storeName: "Peachy Plate Provisions Pvt. Ltd.",
    fssaiLicense: "10019041000572",
    gstin: "29AAACP9281Q1Z8",
    freeShippingThreshold: 499,
    standardShippingFee: 60,
    codEnabled: true,
    supportEmail: "concierge@peachyplate.in",
    supportPhone: "+91 80 4920 1800",
  });

  // 12. AUDIT LOGS STATE
  const [auditLogs, setAuditLogs] = useState([
    {
      id: 1,
      sku: "STOREFRONT-CONFIG",
      action: "Website Concept Activated -> FLAVOURVERSE",
      change: "Active storefront route set to /concept-a-flavourverse",
      user: "Admin (Aaditya)",
      time: "10 mins ago",
    },
    {
      id: 2,
      sku: "PP-MAL-80",
      action: "Fulfillment Status -> Dispatched",
      change: "AWB Assigned DEL982310239 (Delhivery Air)",
      user: "Admin (Aaditya)",
      time: "25 mins ago",
    },
    {
      id: 3,
      sku: "PP-SOR-120",
      action: "Stock Inward Restock",
      change: "+50 units (Purchase Order PO-2026-88)",
      user: "Ops (Warehouse Lead)",
      time: "1 hour ago",
    },
  ]);

  // Load active storefront from localStorage on client mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("peachy_active_storefront_concept") as BrandConceptId;
      if (saved && BRAND_IDENTITIES[saved]) {
        setActivePublishedDesign(saved);
        setSelectedDesignToPublish(saved);
      }
    }
  }, []);

  // Handler: Publish Selected Design as Active Storefront
  const handlePublishDesign = (designId: BrandConceptId) => {
    setActivePublishedDesign(designId);
    if (typeof window !== "undefined") {
      localStorage.setItem("peachy_active_storefront_concept", designId);
    }
    const brand = BRAND_IDENTITIES[designId];
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 },
      colors: brand?.colors?.swatches?.map((s) => s.hex) || ["#FF5400", "#5F7965", "#CCFF00", "#FF9E7D"],
    });

    setPublishSuccessBanner(
      `🎉 Storefront Activated: ${brand.name} (${brand.code}) is now the live published storefront for Peachy Plate Foods!`
    );

    setAuditLogs((prev) => [
      {
        id: Date.now(),
        sku: "STOREFRONT-CONFIG",
        action: `Website Design Published -> ${brand.name}`,
        change: `Active route updated to ${brand.routePrefix}`,
        user: "Admin (Aaditya)",
        time: "Just now",
      },
      ...prev,
    ]);

    setTimeout(() => {
      setPublishSuccessBanner(null);
    }, 7000);
  };

  // Metrics
  const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0);
  const totalItemsSold = orders.reduce((acc, o) => acc + o.items.reduce((s, i) => s + i.quantity, 0), 0);
  const lowStockCount = inventoryList.filter((i) => i.stock < i.lowStockThreshold).length;

  // Filtered Products
  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.category.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.slug.toLowerCase().includes(productSearch.toLowerCase())
  );

  // Filtered Orders
  const filteredOrders = orders.filter((o) => {
    if (orderFilter === "all") return true;
    return o.status === orderFilter;
  });

  // Filtered Variants
  const allVariants = products.flatMap((p) =>
    p.packSizes.map((ps) => ({
      productName: p.name,
      categoryName: p.category.name,
      sku: ps.sku,
      title: ps.title,
      netQuantity: ps.netQuantity,
      weightGrams: ps.weightGrams,
      price: ps.price,
      compareAtPrice: ps.compareAtPrice || ps.price + 30,
      inStock: ps.inStock,
    }))
  );

  const filteredVariants = allVariants.filter(
    (v) =>
      v.productName.toLowerCase().includes(variantsSearch.toLowerCase()) ||
      v.sku.toLowerCase().includes(variantsSearch.toLowerCase()) ||
      v.title.toLowerCase().includes(variantsSearch.toLowerCase())
  );

  // Handlers
  const handleRestockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInventoryList((prev) =>
      prev.map((item) =>
        item.sku === restockSku ? { ...item, stock: item.stock + Number(restockQty) } : item
      )
    );
    setAuditLogs((prev) => [
      {
        id: Date.now(),
        sku: restockSku,
        action: `Manual Stock Inward (${restockReason})`,
        change: `+${restockQty} units`,
        user: "Admin (Aaditya)",
        time: "Just now",
      },
      ...prev,
    ]);
  };

  const handleSaveOrderUpdate = () => {
    if (!editingOrder) return;
    updateOrderStatus(editingOrder.id, statusSelect, awbInput || undefined, courierInput || undefined);
    setAuditLogs((prev) => [
      {
        id: Date.now(),
        sku: editingOrder.id,
        action: `Fulfillment Status -> ${statusSelect}`,
        change: `AWB: ${awbInput || "Unassigned"} (${courierInput})`,
        user: "Admin (Aaditya)",
        time: "Just now",
      },
      ...prev,
    ]);
    setEditingOrder(null);
  };

  const handleSaveProductImage = () => {
    if (!imageManagerProduct) return;
    const chosenUrl = imageUploadPreview || customImageUrl;
    if (!chosenUrl) return;

    setProducts((prev) =>
      prev.map((p) =>
        p.id === imageManagerProduct.id
          ? {
              ...p,
              images: {
                ...p.images,
                primary: chosenUrl,
              },
            }
          : p
      )
    );

    setAuditLogs((prev) => [
      {
        id: Date.now(),
        sku: `PROD-${imageManagerProduct.id}`,
        action: "Product Image Uploaded",
        change: `Updated primary artwork for ${imageManagerProduct.name}`,
        user: "Admin (Aaditya)",
        time: "Just now",
      },
      ...prev,
    ]);

    setImageManagerProduct(null);
    setCustomImageUrl("");
    setImageUploadPreview(null);
  };

  const handleSaveBrandContent = (e: React.FormEvent) => {
    e.preventDefault();
    setContentSavedNotice(true);
    setAuditLogs((prev) => [
      {
        id: Date.now(),
        sku: "STATUTORY-DOCS",
        action: "Company Content Updated",
        change: `FSSAI: ${contentSettings.fssaiLicense} • Registered Office Updated`,
        user: "Admin (Aaditya)",
        time: "Just now",
      },
      ...prev,
    ]);
    setTimeout(() => setContentSavedNotice(false), 4000);
  };

  const handleSendReply = () => {
    if (!selectedEnquiry || !replyMessageText.trim()) return;
    setEnquiries((prev) =>
      prev.map((item) =>
        item.id === selectedEnquiry.id
          ? {
              ...item,
              status: "resolved",
              adminNotes: `Replied: "${replyMessageText}"`,
            }
          : item
      )
    );
    setReplySentNotice(`Reply dispatched to ${selectedEnquiry.email} successfully.`);
    setTimeout(() => {
      setReplySentNotice(null);
      setSelectedEnquiry(null);
      setReplyMessageText("");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-black">
      {/* Top Banner Notice */}
      {publishSuccessBanner && (
        <div className="bg-emerald-500 text-black px-4 py-2 text-center text-xs font-mono font-bold flex items-center justify-between gap-4 sticky top-0 z-50 shadow-lg">
          <span className="mx-auto">{publishSuccessBanner}</span>
          <button
            onClick={() => setPublishSuccessBanner(null)}
            className="text-black font-black hover:opacity-75 px-2"
          >
            ✕
          </button>
        </div>
      )}

      {/* Header Bar */}
      <header className="sticky top-0 z-40 bg-[#1E293B] border-b border-slate-800 px-4 sm:px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
            className="md:hidden p-2 rounded-lg bg-slate-800 text-slate-200 hover:text-white border border-slate-700"
            aria-label="Toggle admin navigation menu"
          >
            {isMobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link href="/" className="flex items-center gap-2">
            <span className="text-lg sm:text-xl font-serif font-black tracking-wider text-amber-400">
              PEACHY PLATE
            </span>
            <span className="text-[10px] font-mono uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded hidden xs:inline">
              CENTRAL COMMERCE ADMIN
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 text-xs font-mono">
          <div className="hidden sm:flex items-center gap-2 text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>FSSAI Lic #10019041000572</span>
          </div>

          {/* Quick Active Storefront Switcher Badge */}
          <div className="flex items-center gap-2 px-3 py-1 bg-slate-900 border border-slate-700 rounded-lg text-xs">
            <span className="text-slate-400 text-[10px] uppercase">Live Store:</span>
            <span className="font-bold text-amber-400 uppercase">
              {BRAND_IDENTITIES[activePublishedDesign]?.name || activePublishedDesign}
            </span>
            <Link
              href={BRAND_IDENTITIES[activePublishedDesign]?.routePrefix || "/concepts"}
              className="text-slate-400 hover:text-white ml-1"
              title="View Live Storefront"
              target="_blank"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

          <Link
            href="/"
            className="px-2.5 sm:px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors text-xs"
          >
            &larr; <span className="hidden xs:inline">View </span>Hub
          </Link>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar Nav */}
        <aside
          className={`${
            isMobileNavOpen ? "block" : "hidden"
          } md:block w-full md:w-64 bg-[#1E293B]/90 border-r border-slate-800 p-4 space-y-1 text-xs font-mono flex-shrink-0 transition-all`}
        >
          {/* GROUP 1: STOREFRONT & IDENTITY */}
          <div className="px-3 py-2 text-[10px] text-amber-400 uppercase tracking-widest font-black flex items-center justify-between">
            <span>Storefront Selection</span>
            <Sparkles className="w-3.5 h-3.5" />
          </div>

          <button
            onClick={() => {
              setActiveTab("design_selector");
              setIsMobileNavOpen(false);
            }}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-colors ${
              activeTab === "design_selector"
                ? "bg-amber-500 text-black font-black shadow-md"
                : "text-amber-300 hover:bg-slate-800 font-bold"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Palette className="w-4 h-4" />
              <span>Design Selector</span>
            </div>
            <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-black/25 text-inherit font-mono">
              4 CONCEPTS
            </span>
          </button>

          <button
            onClick={() => {
              setActiveTab("banners");
              setIsMobileNavOpen(false);
            }}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-colors ${
              activeTab === "banners" ? "bg-amber-500 text-black font-bold" : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            <Flag className="w-4 h-4" />
            <span>Homepage Banners</span>
          </button>

          <button
            onClick={() => {
              setActiveTab("content");
              setIsMobileNavOpen(false);
            }}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-colors ${
              activeTab === "content" ? "bg-amber-500 text-black font-bold" : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Content & Statutory</span>
          </button>

          {/* GROUP 2: CORE COMMERCE */}
          <div className="pt-4 px-3 py-2 text-[10px] text-slate-400 uppercase tracking-widest font-bold">
            Core Catalog & Stock
          </div>

          <button
            onClick={() => {
              setActiveTab("overview");
              setIsMobileNavOpen(false);
            }}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-colors ${
              activeTab === "overview" ? "bg-amber-500 text-black font-bold" : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Dashboard & KPIs</span>
          </button>

          <button
            onClick={() => {
              setActiveTab("products");
              setIsMobileNavOpen(false);
            }}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
              activeTab === "products" ? "bg-amber-500 text-black font-bold" : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Package className="w-4 h-4" />
              <span>Products</span>
            </div>
            <span className="text-[10px] text-slate-400">{products.length}</span>
          </button>

          <button
            onClick={() => {
              setActiveTab("categories");
              setIsMobileNavOpen(false);
            }}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
              activeTab === "categories" ? "bg-amber-500 text-black font-bold" : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Layers className="w-4 h-4" />
              <span>Categories</span>
            </div>
            <span className="text-[10px] text-slate-400">{categories.length}</span>
          </button>

          <button
            onClick={() => {
              setActiveTab("variants");
              setIsMobileNavOpen(false);
            }}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-colors ${
              activeTab === "variants" ? "bg-amber-500 text-black font-bold" : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Product Variants</span>
          </button>

          <button
            onClick={() => {
              setActiveTab("inventory");
              setIsMobileNavOpen(false);
            }}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
              activeTab === "inventory" ? "bg-amber-500 text-black font-bold" : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <AlertTriangle className="w-4 h-4" />
              <span>Inventory</span>
            </div>
            {lowStockCount > 0 && (
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-rose-500 text-white font-bold">
                {lowStockCount}
              </span>
            )}
          </button>

          <button
            onClick={() => {
              setActiveTab("orders");
              setIsMobileNavOpen(false);
            }}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
              activeTab === "orders" ? "bg-amber-500 text-black font-bold" : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Truck className="w-4 h-4" />
              <span>Orders & Dispatch</span>
            </div>
            <span className="text-[10px] text-slate-400">{orders.length}</span>
          </button>

          {/* GROUP 3: CUSTOMERS & GROWTH */}
          <div className="pt-4 px-3 py-2 text-[10px] text-slate-400 uppercase tracking-widest font-bold">
            Customers & CRM
          </div>

          <button
            onClick={() => {
              setActiveTab("customers");
              setIsMobileNavOpen(false);
            }}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-colors ${
              activeTab === "customers" ? "bg-amber-500 text-black font-bold" : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Customer CRM</span>
          </button>

          <button
            onClick={() => {
              setActiveTab("enquiries");
              setIsMobileNavOpen(false);
            }}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
              activeTab === "enquiries" ? "bg-amber-500 text-black font-bold" : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <MessageSquare className="w-4 h-4" />
              <span>Contact Enquiries</span>
            </div>
            <span className="text-[9px] px-1.5 py-0.2 rounded bg-blue-500 text-white font-bold">
              {enquiries.filter((e) => e.status === "new").length} New
            </span>
          </button>

          <button
            onClick={() => {
              setActiveTab("coupons");
              setIsMobileNavOpen(false);
            }}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-colors ${
              activeTab === "coupons" ? "bg-amber-500 text-black font-bold" : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            <Tag className="w-4 h-4" />
            <span>Promotions & Coupons</span>
          </button>

          <button
            onClick={() => {
              setActiveTab("reviews");
              setIsMobileNavOpen(false);
            }}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-colors ${
              activeTab === "reviews" ? "bg-amber-500 text-black font-bold" : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            <Star className="w-4 h-4" />
            <span>Reviews Moderation</span>
          </button>

          {/* GROUP 4: CONFIGURATION & LOGS */}
          <div className="pt-4 px-3 py-2 text-[10px] text-slate-400 uppercase tracking-widest font-bold">
            Configuration & Logs
          </div>

          <button
            onClick={() => {
              setActiveTab("pincodes");
              setIsMobileNavOpen(false);
            }}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-colors ${
              activeTab === "pincodes" ? "bg-amber-500 text-black font-bold" : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>PIN Serviceability</span>
          </button>

          <button
            onClick={() => {
              setActiveTab("staff");
              setIsMobileNavOpen(false);
            }}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-colors ${
              activeTab === "staff" ? "bg-amber-500 text-black font-bold" : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Staff & Roles</span>
          </button>

          <button
            onClick={() => {
              setActiveTab("settings");
              setIsMobileNavOpen(false);
            }}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-colors ${
              activeTab === "settings" ? "bg-amber-500 text-black font-bold" : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Store Settings</span>
          </button>

          <button
            onClick={() => {
              setActiveTab("audit");
              setIsMobileNavOpen(false);
            }}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-colors ${
              activeTab === "audit" ? "bg-amber-500 text-black font-bold" : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Audit Trail Ledger</span>
          </button>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-6 lg:p-8 max-w-7xl overflow-x-hidden">
          {/* TAB 1: OVERVIEW / DASHBOARD */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-2xl font-bold text-white mb-1">Executive Performance Radar</h1>
                <p className="text-xs text-slate-400 font-mono">
                  Consolidated multi-storefront metrics for Peachy Plate Foods across all 4 customer design concepts.
                </p>
              </div>

              {/* Active Storefront Spotlight Card */}
              <div className="bg-gradient-to-r from-amber-500/20 via-slate-800 to-slate-900 border-2 border-amber-500/40 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-emerald-300">
                      LIVE PUBLISHED STOREFRONT CONCEPT
                    </span>
                  </div>
                  <h2 className="text-2xl font-black text-white uppercase tracking-tight">
                    {BRAND_IDENTITIES[activePublishedDesign]?.name} ({BRAND_IDENTITIES[activePublishedDesign]?.code})
                  </h2>
                  <p className="text-xs text-slate-300 max-w-xl mt-1">
                    {BRAND_IDENTITIES[activePublishedDesign]?.visualIdentitySummary}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setActiveTab("design_selector")}
                    className="px-4 py-2.5 rounded-xl bg-amber-500 text-black font-black uppercase text-xs hover:bg-amber-400 transition-colors"
                  >
                    Switch Design
                  </button>
                  <Link
                    href={BRAND_IDENTITIES[activePublishedDesign]?.routePrefix || "/concepts"}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono text-xs hover:bg-slate-700 transition-colors inline-flex items-center gap-1.5"
                    target="_blank"
                  >
                    <span>Open Live Store</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="bg-[#1E293B] border border-slate-800 p-5 rounded-2xl">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-slate-400 uppercase">Gross Revenue (INR)</span>
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-3xl font-bold text-white font-mono">₹{totalRevenue.toLocaleString("en-IN")}</div>
                  <div className="text-[11px] text-emerald-400 mt-2 font-mono flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> Demo Mode Orders Included
                  </div>
                </div>

                <div className="bg-[#1E293B] border border-slate-800 p-5 rounded-2xl">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-slate-400 uppercase">Total Orders</span>
                    <ShoppingBag className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-3xl font-bold text-white font-mono">{orders.length}</div>
                  <div className="text-[11px] text-slate-400 mt-2 font-mono">
                    {orders.filter((o) => o.status === "placed").length} requiring dispatch
                  </div>
                </div>

                <div className="bg-[#1E293B] border border-slate-800 p-5 rounded-2xl">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-slate-400 uppercase">Products Catalog</span>
                    <Package className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="text-3xl font-bold text-white font-mono">{products.length} Items</div>
                  <div className="text-[11px] text-cyan-400 mt-2 font-mono">
                    Across 4 Indian Categories
                  </div>
                </div>

                <div className="bg-[#1E293B] border border-slate-800 p-5 rounded-2xl">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-slate-400 uppercase">Inventory Health</span>
                    <AlertTriangle className="w-4 h-4 text-rose-400" />
                  </div>
                  <div className="text-3xl font-bold text-white font-mono">{lowStockCount} Alerts</div>
                  <div className="text-[11px] text-rose-400 mt-2 font-mono">
                    SKUs below threshold (15 units)
                  </div>
                </div>
              </div>

              {/* Recent Orders Overview */}
              <div className="bg-[#1E293B] border border-slate-800 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-white text-base">Recent Pan-India Dispatches</h3>
                    <p className="text-xs text-slate-400 font-mono">Live customer orders with BlueDart and Delhivery AWB tracking</p>
                  </div>
                  <button
                    onClick={() => setActiveTab("orders")}
                    className="text-xs font-mono text-amber-400 hover:underline"
                  >
                    View All Orders &rarr;
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="text-slate-400 border-b border-slate-800 uppercase text-[10px]">
                      <tr>
                        <th className="py-2.5">Order ID</th>
                        <th className="py-2.5">Customer</th>
                        <th className="py-2.5">City</th>
                        <th className="py-2.5">Total</th>
                        <th className="py-2.5">AWB Tracking</th>
                        <th className="py-2.5">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {orders.slice(0, 5).map((o) => (
                        <tr key={o.id} className="hover:bg-slate-800/40">
                          <td className="py-2.5 font-bold text-amber-300">{o.id}</td>
                          <td className="py-2.5 text-white">{o.customerName}</td>
                          <td className="py-2.5 text-slate-300">{o.shippingAddress.city}</td>
                          <td className="py-2.5 text-white font-bold">₹{o.total}</td>
                          <td className="py-2.5 text-slate-400">{o.awb || "PENDING"}</td>
                          <td className="py-2.5">
                            <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                              {o.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: WEBSITE DESIGN SELECTOR (MANDATORY CLIENT REQUIREMENT) */}
          {activeTab === "design_selector" && (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/40 rounded-full text-amber-300 text-xs font-mono mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>CLIENT SELECTION CONTROL PANEL</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                    Website Design Selector
                  </h1>
                  <p className="text-xs text-slate-400 font-mono max-w-2xl mt-1">
                    Peachy Plate Foods has four complete alternative website designs. Select which design is actively published to live visitors, or test each one independently.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    href="/"
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono border border-slate-700 flex items-center gap-1.5"
                    target="_blank"
                  >
                    <span>View 3 Concepts Showcase</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Three Design Cards Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {[
                  BRAND_IDENTITIES["flavourverse"],
                  BRAND_IDENTITIES["purepantry"],
                  BRAND_IDENTITIES["snackattack"],
                ].map((concept) => {
                  const isCurrentlyPublished = activePublishedDesign === concept.id;
                  const isSelectedForAction = selectedDesignToPublish === concept.id;

                  return (
                    <div
                      key={concept.id}
                      onClick={() => setSelectedDesignToPublish(concept.id)}
                      className={`cursor-pointer rounded-2xl p-6 border-2 transition-all relative overflow-hidden flex flex-col justify-between ${
                        isCurrentlyPublished
                          ? "bg-slate-900 border-emerald-500 shadow-[0_0_25px_rgba(16,185,129,0.2)]"
                          : isSelectedForAction
                          ? "bg-slate-900/90 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.2)]"
                          : "bg-slate-900/50 border-slate-800 hover:border-slate-700"
                      }`}
                    >
                      {/* Status Badges */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded bg-slate-800 text-slate-300">
                          {concept.code} • {concept.vibePillars.energy}
                        </span>

                        {isCurrentlyPublished ? (
                          <span className="px-3 py-1 rounded-full bg-emerald-500 text-black font-mono font-black text-xs uppercase flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
                            ACTIVE STOREFRONT
                          </span>
                        ) : (
                          <span className="text-xs font-mono text-slate-400">
                            Alternative Proposal
                          </span>
                        )}
                      </div>

                      {/* Header */}
                      <div className="space-y-1 mb-4">
                        <h3 className="text-2xl font-black text-white uppercase tracking-tight">
                          {concept.name}
                        </h3>
                        <p className="text-xs font-bold text-amber-400">{concept.tagline}</p>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-slate-300 leading-relaxed mb-4">
                        {concept.visualIdentitySummary}
                      </p>

                      {/* Visual Tokens Breakdown */}
                      <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-4 space-y-3 mb-6 text-xs font-mono">
                        <div className="flex items-center justify-between text-[11px] text-slate-400">
                          <span>Primary Palette:</span>
                          <span>{concept.colors.swatches.length} Swatches</span>
                        </div>
                        <div className="flex gap-2">
                          {concept.colors.swatches.map((s, idx) => (
                            <span
                              key={idx}
                              className="flex-1 h-6 rounded border border-black/30"
                              style={{ backgroundColor: s.hex }}
                              title={`${s.name} (${s.hex})`}
                            />
                          ))}
                        </div>

                        <div className="pt-1 flex flex-wrap gap-1.5 text-[10px]">
                          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                            Grid: {concept.vibePillars.gridType}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                            Motion: {concept.vibePillars.motionProfile}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                            Target: {concept.targetAudience}
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3 pt-3 border-t border-slate-800">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePublishDesign(concept.id);
                          }}
                          className={`flex-1 py-3 px-4 rounded-xl font-mono text-xs font-black uppercase transition-all flex items-center justify-center gap-2 ${
                            isCurrentlyPublished
                              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 cursor-default"
                              : "bg-emerald-500 hover:bg-emerald-400 text-black shadow-md"
                          }`}
                        >
                          <Check className="w-4 h-4 stroke-[3]" />
                          <span>
                            {isCurrentlyPublished ? "Already Published Live" : "Publish This Storefront"}
                          </span>
                        </button>

                        <Link
                          href={concept.routePrefix}
                          onClick={(e) => e.stopPropagation()}
                          className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5"
                          target="_blank"
                        >
                          <span>Explore Site</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: PRODUCTS & IMAGE UPLOAD MANAGER */}
          {activeTab === "products" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-white mb-1">Packaged Foods Catalog</h1>
                  <p className="text-xs text-slate-400 font-mono">
                    Authentic Indian food catalogue: manage SKUs, MRP, selling price, image artwork & FSSAI nutrition.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative">
                    <input
                      type="text"
                      value={productSearch}
                      onChange={(e) => setProductSearch(e.target.value)}
                      placeholder="Search name, category, slug..."
                      className="bg-[#1E293B] border border-slate-800 rounded-xl px-4 py-2 text-xs font-mono text-white focus:outline-none focus:border-amber-400 w-56 sm:w-64"
                    />
                    <Search className="w-3.5 h-3.5 text-slate-500 absolute right-3 top-2.5" />
                  </div>

                  <button
                    onClick={() => setAddProductModalOpen(true)}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black uppercase text-xs font-mono flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[3]" />
                    <span>Add Food Item</span>
                  </button>
                </div>
              </div>

              {/* Products Table */}
              <div className="bg-[#1E293B] border border-slate-800 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono min-w-[700px]">
                    <thead className="bg-slate-900/60 border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                      <tr>
                        <th className="py-3 px-4">Item & Photography</th>
                        <th className="py-3 px-4">Category</th>
                        <th className="py-3 px-4">Pack Options</th>
                        <th className="py-3 px-4">Base Price</th>
                        <th className="py-3 px-4">FSSAI Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {filteredProducts.map((p) => (
                        <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="py-3 px-4 flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-900 border border-slate-700 relative flex-shrink-0 group">
                              <SafeImage
                                src={p.images.primary}
                                alt={p.name}
                                concept="flavourverse"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <div className="font-bold text-white font-sans text-sm">{p.name}</div>
                              <div className="text-[11px] text-slate-400 line-clamp-1">{p.subtitle}</div>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-slate-300">{p.category.name}</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 rounded bg-slate-800 text-amber-300">
                              {p.packSizes.length} Pack Sizes
                            </span>
                          </td>
                          <td className="py-3 px-4 font-bold text-white">₹{p.price}</td>
                          <td className="py-3 px-4">
                            <span className="inline-flex items-center gap-1 text-emerald-400">
                              <ShieldCheck className="w-3.5 h-3.5" /> FSSAI Compliant
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right space-x-2">
                            <button
                              onClick={() => {
                                setImageManagerProduct(p);
                                setCustomImageUrl(p.images.primary);
                                setImageUploadPreview(null);
                              }}
                              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-400 inline-flex items-center gap-1"
                              title="Upload or Change Product Image"
                            >
                              <ImageIcon className="w-3 h-3" />
                              <span>Artwork</span>
                            </button>
                            <Link
                              href={`/concepts/${activePublishedDesign}/product/${p.slug}`}
                              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-amber-400 inline-block"
                              target="_blank"
                            >
                              Preview
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: CATEGORIES MANAGEMENT */}
          {activeTab === "categories" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-white mb-1">Product Categories</h1>
                  <p className="text-xs text-slate-400 font-mono">
                    Organize your Indian food inventory into clean, navigable product classifications.
                  </p>
                </div>

                <button
                  onClick={() => setAddCategoryModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black uppercase text-xs font-mono flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Create Category</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {categories.map((cat) => (
                  <div
                    key={cat.id}
                    className="bg-[#1E293B] border border-slate-800 rounded-2xl p-5 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-mono uppercase bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-amber-400">
                          Slug: /{cat.slug}
                        </span>
                        <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Active
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-white mb-0.5">{cat.name}</h3>
                      <div className="text-xs font-sans text-amber-400/80 mb-2">{cat.hindiName}</div>
                      <p className="text-xs text-slate-400 leading-relaxed mb-4">{cat.tagline}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-400">{cat.productCount} Live Food Items</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setCategories((prev) =>
                              prev.map((c) =>
                                c.id === cat.id
                                  ? { ...c, status: c.status === "active" ? "inactive" : "active" }
                                  : c
                              )
                            );
                          }}
                          className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                        >
                          Toggle Status
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: PRODUCT VARIANTS & PACK SIZES */}
          {activeTab === "variants" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-white mb-1">Pack Size Variants & Pricing</h1>
                  <p className="text-xs text-slate-400 font-mono">
                    Configure multi-pack options (pouches, jars, tins, boxes), net weights, and INR pricing.
                  </p>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    value={variantsSearch}
                    onChange={(e) => setVariantsSearch(e.target.value)}
                    placeholder="Search SKU or product..."
                    className="bg-[#1E293B] border border-slate-800 rounded-xl px-4 py-2 text-xs font-mono text-white focus:outline-none focus:border-amber-400 w-64"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-500 absolute right-3 top-2.5" />
                </div>
              </div>

              <div className="bg-[#1E293B] border border-slate-800 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono min-w-[700px]">
                    <thead className="bg-slate-900/60 border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                      <tr>
                        <th className="py-3 px-4">SKU</th>
                        <th className="py-3 px-4">Product Name</th>
                        <th className="py-3 px-4">Pack Size Title</th>
                        <th className="py-3 px-4">Net Quantity</th>
                        <th className="py-3 px-4">MRP (INR)</th>
                        <th className="py-3 px-4">Selling Price (INR)</th>
                        <th className="py-3 px-4 text-right">In Stock</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {filteredVariants.map((v, idx) => (
                        <tr key={idx} className="hover:bg-slate-800/40">
                          <td className="py-3 px-4 font-bold text-amber-300">{v.sku}</td>
                          <td className="py-3 px-4 text-white font-medium">{v.productName}</td>
                          <td className="py-3 px-4 text-slate-300">{v.title}</td>
                          <td className="py-3 px-4 text-slate-400">{v.netQuantity}</td>
                          <td className="py-3 px-4 text-slate-400 line-through">₹{v.compareAtPrice}</td>
                          <td className="py-3 px-4 font-bold text-emerald-400">₹{v.price}</td>
                          <td className="py-3 px-4 text-right">
                            <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                              Available
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: INVENTORY & STOCK */}
          {activeTab === "inventory" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-2xl font-bold text-white mb-1">Live Stock & Inventory Replenishment</h1>
                <p className="text-xs text-slate-400 font-mono">
                  Multi-warehouse inventory allocations with reorder threshold triggers.
                </p>
              </div>

              {/* Replenishment Form */}
              <div className="bg-[#1E293B] border border-slate-800 p-6 rounded-2xl">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-mono">
                  Quick Stock Adjustment (Goods Inward)
                </h3>
                <form onSubmit={handleRestockSubmit} className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs font-mono">
                  <div>
                    <label className="block text-slate-400 mb-1">Target SKU</label>
                    <select
                      value={restockSku}
                      onChange={(e) => setRestockSku(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white"
                    >
                      {inventoryList.map((item) => (
                        <option key={item.sku} value={item.sku}>
                          {item.sku} ({item.productName})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Add Units</label>
                    <input
                      type="number"
                      min="1"
                      value={restockQty}
                      onChange={(e) => setRestockQty(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Reason / Doc Ref</label>
                    <select
                      value={restockReason}
                      onChange={(e) => setRestockReason(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white"
                    >
                      <option value="purchase_order_restock">Purchase Order (PO)</option>
                      <option value="factory_batch_arrival">Factory Batch Arrival</option>
                      <option value="cycle_count_correction">Cycle Count Correction</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <button
                      type="submit"
                      className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold uppercase p-2.5 rounded-lg transition-colors"
                    >
                      Record Inward Stock
                    </button>
                  </div>
                </form>
              </div>

              {/* Inventory Table */}
              <div className="bg-[#1E293B] border border-slate-800 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono min-w-[650px]">
                    <thead className="bg-slate-900/60 border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                      <tr>
                        <th className="py-3 px-4">SKU</th>
                        <th className="py-3 px-4">Item Name</th>
                        <th className="py-3 px-4">Pack Size</th>
                        <th className="py-3 px-4">Current Units</th>
                        <th className="py-3 px-4">Reorder Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {inventoryList.map((item) => (
                        <tr key={item.sku} className="hover:bg-slate-800/40">
                          <td className="py-3 px-4 font-bold text-amber-300">{item.sku}</td>
                          <td className="py-3 px-4 text-white font-medium">{item.productName}</td>
                          <td className="py-3 px-4 text-slate-400">{item.packSize}</td>
                          <td className="py-3 px-4 font-bold text-white">{item.stock} units</td>
                          <td className="py-3 px-4">
                            {item.stock < item.lowStockThreshold ? (
                              <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[10px] uppercase font-bold">
                                Low Stock
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] uppercase font-bold">
                                Healthy
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: ORDERS & DISPATCH */}
          {activeTab === "orders" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-white mb-1">Pan-India Order Operations</h1>
                  <p className="text-xs text-slate-400 font-mono">
                    Track shipments, assign BlueDart / Delhivery AWBs, and print GST Tax Invoices.
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="text-slate-400">Filter:</span>
                  {["all", "placed", "packed", "dispatched", "delivered"].map((f) => (
                    <button
                      key={f}
                      onClick={() => setOrderFilter(f)}
                      className={`px-3 py-1.5 rounded-lg uppercase text-[10px] font-bold ${
                        orderFilter === f ? "bg-amber-500 text-black" : "bg-slate-800 text-slate-400 hover:text-white"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-[#1E293B] border border-slate-800 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono min-w-[750px]">
                    <thead className="bg-slate-900/60 border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                      <tr>
                        <th className="py-3 px-4">Order ID</th>
                        <th className="py-3 px-4">Customer</th>
                        <th className="py-3 px-4">Destination</th>
                        <th className="py-3 px-4">Amount</th>
                        <th className="py-3 px-4">Logistics</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {filteredOrders.map((o) => (
                        <tr key={o.id} className="hover:bg-slate-800/40">
                          <td className="py-3 px-4 font-bold text-amber-300">{o.id}</td>
                          <td className="py-3 px-4">
                            <div className="text-white font-medium">{o.customerName}</div>
                            <div className="text-[10px] text-slate-500">{o.customerEmail}</div>
                          </td>
                          <td className="py-3 px-4 text-slate-300">
                            {o.shippingAddress.city}, {o.shippingAddress.pincode}
                          </td>
                          <td className="py-3 px-4 font-bold text-white">₹{o.total}</td>
                          <td className="py-3 px-4">
                            <div className="text-slate-300">{o.courier || "Delhivery Air"}</div>
                            <div className="text-[10px] text-amber-400/80 font-bold">{o.awb || "AWB Pending"}</div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                              {o.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right space-x-2">
                            <button
                              onClick={() => {
                                setEditingOrder(o);
                                setAwbInput(o.awb || "");
                                setCourierInput(o.courier || "Delhivery Air Express");
                                setStatusSelect(o.status);
                              }}
                              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-amber-400 inline-block"
                            >
                              Dispatch / AWB
                            </button>
                            <button
                              onClick={() => setSelectedInvoiceOrder(o)}
                              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 inline-block"
                            >
                              Invoice
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: CUSTOMERS CRM */}
          {activeTab === "customers" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-white mb-1">Customer Relationship Registry</h1>
                <p className="text-xs text-slate-400 font-mono">
                  Verified customer profiles, repeat order frequency, and Pan-India delivery addresses.
                </p>
              </div>

              <div className="bg-[#1E293B] border border-slate-800 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono min-w-[650px]">
                    <thead className="bg-slate-900/60 border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                      <tr>
                        <th className="py-3 px-4">Customer Name</th>
                        <th className="py-3 px-4">Contact</th>
                        <th className="py-3 px-4">Primary City</th>
                        <th className="py-3 px-4">Orders Placed</th>
                        <th className="py-3 px-4">Customer Tier</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {[
                        { name: "Aaditya Vikram", email: "aadi@peachyplate.in", phone: "+91 98450 12891", city: "Bengaluru, KA", orders: 4, tier: "VIP Connoisseur" },
                        { name: "Priya Sharma", email: "priya.sharma@gmail.com", phone: "+91 98110 33492", city: "New Delhi, DL", orders: 2, tier: "Active Snacker" },
                        { name: "Rahul Mehta", email: "rahul.m@outlook.com", phone: "+91 99201 88312", city: "Mumbai, MH", orders: 3, tier: "Active Snacker" },
                        { name: "Divya Nair", email: "divya.n@yahoo.co.in", phone: "+91 94440 55102", city: "Chennai, TN", orders: 1, tier: "First-Timer" },
                      ].map((c, idx) => (
                        <tr key={idx} className="hover:bg-slate-800/40">
                          <td className="py-3 px-4 font-bold text-white">{c.name}</td>
                          <td className="py-3 px-4 text-slate-400">
                            <div>{c.email}</div>
                            <div className="text-[10px] text-slate-500">{c.phone}</div>
                          </td>
                          <td className="py-3 px-4 text-slate-300">{c.city}</td>
                          <td className="py-3 px-4 font-bold text-amber-300">{c.orders} Orders</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                              {c.tier}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 9: CONTACT ENQUIRIES (MANDATORY REQUIREMENT) */}
          {activeTab === "enquiries" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-white mb-1">Storefront Contact Enquiries</h1>
                  <p className="text-xs text-slate-400 font-mono">
                    Messages submitted via contact forms across Pop Cult, Pure & Co., Crunch Mode, and Happy Bites.
                  </p>
                </div>
              </div>

              {replySentNotice && (
                <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500 text-emerald-300 text-xs font-mono">
                  {replySentNotice}
                </div>
              )}

              <div className="space-y-4">
                {enquiries.map((enq) => (
                  <div
                    key={enq.id}
                    className="bg-[#1E293B] border border-slate-800 rounded-2xl p-5 space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className="font-bold text-amber-400 font-mono text-xs">{enq.id}</span>
                        <span className="font-bold text-white text-sm">{enq.name}</span>
                        <span className="text-slate-400 text-xs">({enq.email} • {enq.phone})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono uppercase bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-slate-300">
                          {enq.storefrontSource}
                        </span>
                        <span
                          className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold ${
                            enq.status === "new"
                              ? "bg-rose-500/20 text-rose-300 border border-rose-500/40"
                              : enq.status === "in_progress"
                              ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                              : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                          }`}
                        >
                          {enq.status.replace("_", " ")}
                        </span>
                      </div>
                    </div>

                    <div className="font-bold text-xs text-slate-200">{enq.subject}</div>
                    <p className="text-xs text-slate-400 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                      "{enq.message}"
                    </p>

                    {enq.adminNotes && (
                      <div className="text-[11px] font-mono text-emerald-400 bg-emerald-950/30 p-2 rounded-lg border border-emerald-800/40">
                        Admin Note: {enq.adminNotes}
                      </div>
                    )}

                    <div className="pt-2 flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-500 text-[11px]">Received: {enq.receivedAt}</span>
                      <button
                        onClick={() => setSelectedEnquiry(enq)}
                        className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold uppercase text-[11px] flex items-center gap-1"
                      >
                        <Send className="w-3 h-3" />
                        <span>Quick Reply</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 10: HOMEPAGE BANNERS & TICKERS (MANDATORY REQUIREMENT) */}
          {activeTab === "banners" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-white mb-1">Homepage Banners & Marquees</h1>
                <p className="text-xs text-slate-400 font-mono">
                  Control announcement bars, promotional tickers, and festive notice strips across all four websites.
                </p>
              </div>

              <div className="space-y-4">
                {banners.map((ban) => (
                  <div key={ban.id} className="bg-[#1E293B] border border-slate-800 rounded-2xl p-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-amber-400 font-mono text-xs uppercase">
                          {ban.location.replace("_", " ")}
                        </span>
                        <span className="text-[10px] font-mono uppercase bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-slate-400">
                          Target: {ban.targetDesign.toUpperCase()}
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          setBanners((prev) =>
                            prev.map((b) => (b.id === ban.id ? { ...b, isActive: !b.isActive } : b))
                          );
                        }}
                        className={`text-xs font-mono font-bold px-3 py-1 rounded-full ${
                          ban.isActive ? "bg-emerald-500 text-black" : "bg-slate-800 text-slate-400"
                        }`}
                      >
                        {ban.isActive ? "Active on Store" : "Disabled"}
                      </button>
                    </div>

                    {/* Live Preview Strip */}
                    <div
                      className="p-3 rounded-xl border border-black/20 text-xs font-black uppercase text-center font-mono overflow-hidden shadow-inner"
                      style={{ backgroundColor: ban.bgColor, color: ban.textColor }}
                    >
                      {ban.text}
                    </div>

                    {/* Editor Input */}
                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 mb-1">Banner Text</label>
                      <input
                        type="text"
                        value={ban.text}
                        onChange={(e) => {
                          const val = e.target.value;
                          setBanners((prev) => prev.map((b) => (b.id === ban.id ? { ...b, text: val } : b)));
                        }}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white font-mono"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 11: CONTENT EDITING & STATUTORY (MANDATORY REQUIREMENT) */}
          {activeTab === "content" && (
            <div className="max-w-3xl space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-white mb-1">Content Editing & Brand Narrative</h1>
                <p className="text-xs text-slate-400 font-mono">
                  Modify company information, FSSAI statutory licenses, GSTIN, registered office, and brand manifesto.
                </p>
              </div>

              {contentSavedNotice && (
                <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500 text-emerald-300 text-xs font-mono flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Company content settings saved and updated across all storefront footers!</span>
                </div>
              )}

              <form onSubmit={handleSaveBrandContent} className="bg-[#1E293B] border border-slate-800 p-6 rounded-2xl space-y-5 text-xs font-mono">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1">Legal Entity Name</label>
                    <input
                      type="text"
                      value={contentSettings.legalEntityName}
                      onChange={(e) => setContentSettings({ ...contentSettings, legalEntityName: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Brand Umbrella Name</label>
                    <input
                      type="text"
                      value={contentSettings.brandUmbrella}
                      onChange={(e) => setContentSettings({ ...contentSettings, brandUmbrella: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1">FSSAI Central License</label>
                    <input
                      type="text"
                      value={contentSettings.fssaiLicense}
                      onChange={(e) => setContentSettings({ ...contentSettings, fssaiLicense: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">GSTIN Number</label>
                    <input
                      type="text"
                      value={contentSettings.gstin}
                      onChange={(e) => setContentSettings({ ...contentSettings, gstin: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Registered Corporate Address</label>
                  <input
                    type="text"
                    value={contentSettings.registeredAddress}
                    onChange={(e) => setContentSettings({ ...contentSettings, registeredAddress: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1">Concierge Email</label>
                    <input
                      type="email"
                      value={contentSettings.customerCareEmail}
                      onChange={(e) => setContentSettings({ ...contentSettings, customerCareEmail: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Customer Care Phone</label>
                    <input
                      type="text"
                      value={contentSettings.customerCarePhone}
                      onChange={(e) => setContentSettings({ ...contentSettings, customerCarePhone: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Brand Philosophy & Manifesto</label>
                  <textarea
                    rows={4}
                    value={contentSettings.brandStory}
                    onChange={(e) => setContentSettings({ ...contentSettings, brandStory: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-bold uppercase rounded-xl flex items-center gap-1.5"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Brand Content</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 12: PROMOTIONS & COUPONS */}
          {activeTab === "coupons" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-white mb-1">Promotion Codes & Checkout Discounts</h1>
                <p className="text-xs text-slate-400 font-mono">
                  Create discount voucher codes validated in real time during the demo checkout process.
                </p>
              </div>

              <div className="bg-[#1E293B] border border-slate-800 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono min-w-[600px]">
                    <thead className="bg-slate-900/60 border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                      <tr>
                        <th className="py-3 px-4">Coupon Code</th>
                        <th className="py-3 px-4">Discount</th>
                        <th className="py-3 px-4">Min. Spend</th>
                        <th className="py-3 px-4">Usage Count</th>
                        <th className="py-3 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {coupons.map((c) => (
                        <tr key={c.id} className="hover:bg-slate-800/40">
                          <td className="py-3 px-4 font-bold text-amber-300">{c.code}</td>
                          <td className="py-3 px-4 text-emerald-400 font-bold">{c.discountPercent}% OFF</td>
                          <td className="py-3 px-4 text-slate-300">₹{c.minSpend}</td>
                          <td className="py-3 px-4 text-slate-400">{c.timesUsed} uses</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                              {c.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 13: REVIEWS MODERATION */}
          {activeTab === "reviews" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-white mb-1">Product Reviews Moderation</h1>
                <p className="text-xs text-slate-400 font-mono">
                  Screen customer ratings and verified review submissions before displaying on product pages.
                </p>
              </div>

              <div className="space-y-4">
                {reviews.map((r) => (
                  <div key={r.id} className="bg-[#1E293B] border border-slate-800 rounded-2xl p-5 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{r.customerName}</span>
                        <div className="flex text-amber-400">
                          {Array.from({ length: r.rating }).map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                          ))}
                        </div>
                      </div>
                      <span className="text-xs font-mono text-slate-500">{r.date}</span>
                    </div>

                    <div className="text-xs text-amber-300 font-bold font-mono">Product: {r.productName}</div>
                    <p className="text-xs text-slate-300 italic">"{r.comment}"</p>

                    <div className="pt-2 flex justify-between items-center text-xs font-mono">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] uppercase font-bold">
                        {r.status}
                      </span>
                      <div className="space-x-2">
                        <button
                          onClick={() => {
                            setReviews((prev) =>
                              prev.map((item) =>
                                item.id === r.id
                                  ? { ...item, status: item.status === "approved" ? "rejected" : "approved" }
                                  : item
                              )
                            );
                          }}
                          className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                        >
                          Toggle Approval
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 14: PINCODE SERVICEABILITY */}
          {activeTab === "pincodes" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-white mb-1">Pan-India PIN Code Serviceability</h1>
                <p className="text-xs text-slate-400 font-mono">
                  Configure delivery SLAs and Cash-on-Delivery (COD) rules across tier 1, 2, and 3 cities.
                </p>
              </div>

              <div className="bg-[#1E293B] border border-slate-800 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono min-w-[600px]">
                    <thead className="bg-slate-900/60 border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                      <tr>
                        <th className="py-3 px-4">PIN Code</th>
                        <th className="py-3 px-4">City / Region</th>
                        <th className="py-3 px-4">State</th>
                        <th className="py-3 px-4">Delivery SLA</th>
                        <th className="py-3 px-4">COD Available</th>
                        <th className="py-3 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {pincodes.map((pin) => (
                        <tr key={pin.pincode} className="hover:bg-slate-800/40">
                          <td className="py-3 px-4 font-bold text-amber-300">{pin.pincode}</td>
                          <td className="py-3 px-4 text-white">{pin.city}</td>
                          <td className="py-3 px-4 text-slate-400">{pin.state}</td>
                          <td className="py-3 px-4 text-emerald-400 font-bold">{pin.leadDays}</td>
                          <td className="py-3 px-4">{pin.codAvailable ? "Yes (₹50 Fee)" : "Prepaid Only"}</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-emerald-500/10 text-emerald-400">
                              {pin.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 15: STAFF & ROLES */}
          {activeTab === "staff" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-white mb-1">Administrative Team & Role-Based Access</h1>
                <p className="text-xs text-slate-400 font-mono">
                  Authorized personnel managing storefront design choices, inventory, and logistics.
                </p>
              </div>

              <div className="bg-[#1E293B] border border-slate-800 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono min-w-[600px]">
                    <thead className="bg-slate-900/60 border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                      <tr>
                        <th className="py-3 px-4">Staff ID</th>
                        <th className="py-3 px-4">Name</th>
                        <th className="py-3 px-4">Email</th>
                        <th className="py-3 px-4">Assigned Role</th>
                        <th className="py-3 px-4">Last Activity</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {staff.map((s) => (
                        <tr key={s.id} className="hover:bg-slate-800/40">
                          <td className="py-3 px-4 font-bold text-amber-300">{s.id}</td>
                          <td className="py-3 px-4 text-white font-bold">{s.name}</td>
                          <td className="py-3 px-4 text-slate-400">{s.email}</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                              {s.role}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-slate-500">{s.lastLogin}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 16: STORE SETTINGS */}
          {activeTab === "settings" && (
            <div className="max-w-2xl space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-white mb-1">Store & Regulatory Settings</h1>
                <p className="text-xs text-slate-400 font-mono">
                  FSSAI licensing, GST configuration, and Pan-India shipping parameters.
                </p>
              </div>

              <div className="bg-[#1E293B] border border-slate-800 p-6 rounded-2xl space-y-4 text-xs font-mono">
                <div>
                  <label className="block text-slate-400 mb-1">Company Trade Name</label>
                  <input
                    type="text"
                    value={storeSettings.storeName}
                    onChange={(e) => setStoreSettings({ ...storeSettings, storeName: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1">FSSAI License Number</label>
                    <input
                      type="text"
                      value={storeSettings.fssaiLicense}
                      onChange={(e) => setStoreSettings({ ...storeSettings, fssaiLicense: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">GSTIN Number</label>
                    <input
                      type="text"
                      value={storeSettings.gstin}
                      onChange={(e) => setStoreSettings({ ...storeSettings, gstin: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1">Free Shipping Min Amount (₹)</label>
                    <input
                      type="number"
                      value={storeSettings.freeShippingThreshold}
                      onChange={(e) => setStoreSettings({ ...storeSettings, freeShippingThreshold: Number(e.target.value) })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Standard Shipping Fee (₹)</label>
                    <input
                      type="number"
                      value={storeSettings.standardShippingFee}
                      onChange={(e) => setStoreSettings({ ...storeSettings, standardShippingFee: Number(e.target.value) })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 17: AUDIT TRAIL */}
          {activeTab === "audit" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-white mb-1">Regulatory Audit Ledger</h1>
                <p className="text-xs text-slate-400 font-mono">
                  Immutable record of inventory transfers, status modifications, and website design activations.
                </p>
              </div>

              <div className="bg-[#1E293B] border border-slate-800 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono min-w-[650px]">
                    <thead className="bg-slate-900/60 border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                      <tr>
                        <th className="py-3 px-4">Entity</th>
                        <th className="py-3 px-4">Action</th>
                        <th className="py-3 px-4">Modification Details</th>
                        <th className="py-3 px-4">Operator</th>
                        <th className="py-3 px-4 text-right">Timestamp</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {auditLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-slate-800/40">
                          <td className="py-3 px-4 font-bold text-amber-300">{log.sku}</td>
                          <td className="py-3 px-4 text-white font-medium">{log.action}</td>
                          <td className="py-3 px-4 text-slate-300">{log.change}</td>
                          <td className="py-3 px-4 text-slate-400">{log.user}</td>
                          <td className="py-3 px-4 text-right text-slate-500">{log.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MODAL: IMAGE UPLOAD / ARTWORK MANAGER */}
      {imageManagerProduct && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-lg w-full bg-[#1E293B] border border-slate-700 p-6 rounded-2xl space-y-5 text-xs font-mono">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Artwork & Image Manager</h3>
                <p className="text-[11px] text-slate-400 mt-0.5">{imageManagerProduct.name}</p>
              </div>
              <button
                onClick={() => setImageManagerProduct(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            {/* Live Image Preview */}
            <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-slate-900 border-2 border-dashed border-slate-700 flex items-center justify-center">
              <SafeImage
                src={imageUploadPreview || customImageUrl || imageManagerProduct.images.primary}
                alt={imageManagerProduct.name}
                concept="flavourverse"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 bg-black/75 px-2.5 py-1 rounded text-[10px] text-white">
                Live Artwork Preview
              </div>
            </div>

            {/* URL Input */}
            <div>
              <label className="block text-slate-300 mb-1 font-bold">Image URL</label>
              <input
                type="text"
                value={customImageUrl}
                onChange={(e) => {
                  setCustomImageUrl(e.target.value);
                  setImageUploadPreview(null);
                }}
                placeholder="https://... or /images/products/..."
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white"
              />
            </div>

            {/* Presets Gallery */}
            <div>
              <label className="block text-slate-400 mb-1 text-[11px]">Select from Local Food Presets:</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { name: "Sea Salt Kettle", url: "/images/products/kettle-cooked-sea-salt-crisps.jpg" },
                  { name: "Sorghum Crisps", url: "/images/products/gourmet-sorghum-crisps.jpg" },
                  { name: "Dark Cacao 74%", url: "/images/products/single-estate-dark-chocolate-74.jpg" },
                  { name: "Honey Granola", url: "/images/products/wild-forest-honey-granola.jpg" },
                  { name: "Kashmiri Walnuts", url: "/images/products/cold-pressed-kashmiri-walnuts.jpg" },
                  { name: "Hazelnut Cookies", url: "/images/products/cocoa-hazelnut-cookies.jpg" },
                ].map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setCustomImageUrl(preset.url);
                      setImageUploadPreview(null);
                    }}
                    className="p-1.5 rounded bg-slate-900 border border-slate-800 hover:border-amber-400 text-left text-[10px] truncate text-slate-300 hover:text-white transition-colors"
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                type="button"
                onClick={handleSaveProductImage}
                className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-bold uppercase rounded-lg transition-colors"
              >
                Save & Apply Image
              </button>
              <button
                type="button"
                onClick={() => setImageManagerProduct(null)}
                className="px-4 py-2.5 border border-slate-700 rounded-lg text-slate-400 hover:text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: EDIT AWB & ORDER STATUS */}
      {editingOrder && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-[#1E293B] border border-slate-700 p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-white mb-1 font-mono">
              Update Order: {editingOrder.id}
            </h3>
            <p className="text-xs text-slate-400 font-mono mb-4">
              Recipient: {editingOrder.customerName} ({editingOrder.shippingAddress.city})
            </p>

            <div className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-slate-300 mb-1">Fulfillment Status</label>
                <select
                  value={statusSelect}
                  onChange={(e) => setStatusSelect(e.target.value as OrderStatus)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white"
                >
                  <option value="placed">Placed (New)</option>
                  <option value="verified">Verified (Stock Reserved)</option>
                  <option value="packed">Packed (Insulated Carton)</option>
                  <option value="dispatched">Dispatched (Carrier Scanned)</option>
                  <option value="in_transit">In Transit (Moving)</option>
                  <option value="delivered">Delivered (Completed)</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Carrier Partner</label>
                <select
                  value={courierInput}
                  onChange={(e) => setCourierInput(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white"
                >
                  <option value="Delhivery Air Express">Delhivery Air Express</option>
                  <option value="BlueDart Apex">BlueDart Apex Express</option>
                  <option value="Shiprocket Surface Express">Shiprocket Surface Express</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">AWB Tracking Code</label>
                <input
                  type="text"
                  value={awbInput}
                  onChange={(e) => setAwbInput(e.target.value)}
                  placeholder="e.g. DEL982310239 or BLR771890"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white font-mono"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={handleSaveOrderUpdate}
                  className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-bold uppercase rounded-lg"
                >
                  Save & Update Tracking
                </button>
                <button
                  type="button"
                  onClick={() => setEditingOrder(null)}
                  className="px-4 py-2.5 border border-slate-700 rounded-lg text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: PRINTABLE GST TAX INVOICE */}
      {selectedInvoiceOrder && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-2xl w-full bg-white text-black p-8 rounded-2xl border-4 border-slate-900 relative max-h-[90vh] overflow-y-auto print:border-none print:m-0 print:p-0">
            <button
              onClick={() => setSelectedInvoiceOrder(null)}
              className="absolute top-4 right-4 text-xs font-mono bg-slate-200 px-3 py-1 rounded print:hidden"
            >
              Close [X]
            </button>

            {/* Invoice Top */}
            <div className="border-b-2 border-black pb-4 mb-4 flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-serif font-black uppercase text-black">PEACHY PLATE</h2>
                <div className="text-xs font-mono text-slate-600 mt-1">
                  Peachy Plate Foods Pvt Ltd <br />
                  FSSAI Central Lic: 10019041000572 <br />
                  GSTIN: 29AAACP9281Q1Z8
                </div>
              </div>
              <div className="text-right font-mono text-xs">
                <div className="font-bold text-base">TAX INVOICE</div>
                <div>Invoice No: INV-{selectedInvoiceOrder.id}</div>
                <div>Date: {new Date(selectedInvoiceOrder.date).toLocaleDateString("en-IN")}</div>
              </div>
            </div>

            {/* Bill To */}
            <div className="grid grid-cols-2 gap-4 font-mono text-xs mb-6">
              <div>
                <span className="font-bold text-slate-500 uppercase">Billed / Shipped To:</span>
                <p className="font-bold text-sm">{selectedInvoiceOrder.shippingAddress.fullName}</p>
                <p>{selectedInvoiceOrder.shippingAddress.street}</p>
                <p>{selectedInvoiceOrder.shippingAddress.city}, {selectedInvoiceOrder.shippingAddress.state} - {selectedInvoiceOrder.shippingAddress.pincode}</p>
                <p>Phone: {selectedInvoiceOrder.shippingAddress.phone}</p>
              </div>
              <div className="text-right">
                <span className="font-bold text-slate-500 uppercase">Logistics Details:</span>
                <p>Carrier: {selectedInvoiceOrder.courier || "Delhivery Air"}</p>
                <p>AWB: {selectedInvoiceOrder.awb || "PENDING"}</p>
                <p>Payment: {selectedInvoiceOrder.paymentStatus}</p>
              </div>
            </div>

            {/* Line Items */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono border-t border-b border-black mb-4 min-w-[480px]">
                <thead>
                  <tr className="border-b border-slate-300">
                    <th className="py-2">Item Description</th>
                    <th className="py-2">HSN</th>
                    <th className="py-2">Qty</th>
                    <th className="py-2 text-right">Unit Price</th>
                    <th className="py-2 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {selectedInvoiceOrder.items.map((i) => (
                    <tr key={i.id}>
                      <td className="py-2">
                        <div className="font-bold">{i.productName}</div>
                        <div className="text-[10px] text-slate-500">{i.packSizeTitle}</div>
                      </td>
                      <td className="py-2 text-slate-600">1905 / 2106</td>
                      <td className="py-2">{i.quantity}</td>
                      <td className="py-2 text-right">₹{i.price.toFixed(2)}</td>
                      <td className="py-2 text-right font-bold">₹{(i.price * i.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Math */}
            <div className="flex justify-end font-mono text-xs mb-6">
              <div className="w-64 space-y-1">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>₹{selectedInvoiceOrder.subtotal.toFixed(2)}</span>
                </div>
                {selectedInvoiceOrder.discount > 0 && (
                  <div className="flex justify-between text-green-700">
                    <span>Discount:</span>
                    <span>-₹{selectedInvoiceOrder.discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Pan-India Shipping:</span>
                  <span>₹{selectedInvoiceOrder.shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>CGST (2.5%):</span>
                  <span>₹{(selectedInvoiceOrder.gst / 2).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>SGST (2.5%):</span>
                  <span>₹{(selectedInvoiceOrder.gst / 2).toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-sm pt-2 border-t border-black">
                  <span>Grand Total:</span>
                  <span>₹{selectedInvoiceOrder.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-black text-xs font-mono print:hidden">
              <span className="text-slate-500">Computer generated invoice. No signature required.</span>
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-black text-white font-bold rounded uppercase hover:bg-slate-800 flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Tax Invoice</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: REPLY TO ENQUIRY */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-[#1E293B] border border-slate-700 p-6 rounded-2xl space-y-4 text-xs font-mono">
            <div>
              <h3 className="text-base font-bold text-white">Reply to Customer Enquiry</h3>
              <p className="text-slate-400 mt-1">Recipient: {selectedEnquiry.name} ({selectedEnquiry.email})</p>
            </div>

            <div>
              <label className="block text-slate-300 mb-1">Subject</label>
              <input
                type="text"
                readOnly
                value={`Re: ${selectedEnquiry.subject}`}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-300"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-1">Response Message</label>
              <textarea
                rows={4}
                value={replyMessageText}
                onChange={(e) => setReplyMessageText(e.target.value)}
                placeholder="Type official response from Peachy Plate Foods concierge..."
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white"
              />
            </div>

            <div className="pt-2 flex gap-3">
              <button
                type="button"
                onClick={handleSendReply}
                className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-bold uppercase rounded-lg"
              >
                Dispatch Email Reply
              </button>
              <button
                type="button"
                onClick={() => setSelectedEnquiry(null)}
                className="px-4 py-2.5 border border-slate-700 rounded-lg text-slate-400 hover:text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: CREATE CATEGORY */}
      {addCategoryModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-[#1E293B] border border-slate-700 p-6 rounded-2xl space-y-4 text-xs font-mono">
            <h3 className="text-base font-bold text-white">Create New Product Category</h3>

            <div>
              <label className="block text-slate-300 mb-1">Category Title</label>
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="e.g. Artisanal Energy Fuel"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-1">Category Slug</label>
              <input
                type="text"
                value={newCategorySlug}
                onChange={(e) => setNewCategorySlug(e.target.value)}
                placeholder="e.g. energy-fuel"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-1">Tagline</label>
              <input
                type="text"
                value={newCategoryTagline}
                onChange={(e) => setNewCategoryTagline(e.target.value)}
                placeholder="Brief description for customer storefronts..."
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white"
              />
            </div>

            <div className="pt-2 flex gap-3">
              <button
                type="button"
                onClick={() => {
                  if (!newCategoryName) return;
                  setCategories((prev) => [
                    ...prev,
                    {
                      id: `cat-${Date.now()}`,
                      name: newCategoryName,
                      slug: newCategorySlug || newCategoryName.toLowerCase().replace(/\s+/g, "-"),
                      hindiName: "नई श्रेणी",
                      tagline: newCategoryTagline || "Freshly curated artisanal snacks",
                      productCount: 0,
                      status: "active",
                      iconName: "Sparkles",
                    },
                  ]);
                  setAddCategoryModalOpen(false);
                  setNewCategoryName("");
                  setNewCategorySlug("");
                  setNewCategoryTagline("");
                }}
                className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-bold uppercase rounded-lg"
              >
                Create Category
              </button>
              <button
                type="button"
                onClick={() => setAddCategoryModalOpen(false)}
                className="px-4 py-2.5 border border-slate-700 rounded-lg text-slate-400 hover:text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
