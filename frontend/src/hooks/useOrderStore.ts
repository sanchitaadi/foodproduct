"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DemoCartItem } from "./useCart";

export type OrderStatus =
  | "placed"
  | "verified"
  | "packed"
  | "dispatched"
  | "in_transit"
  | "delivered"
  | "cancelled";

export interface OrderTimelineStep {
  status: OrderStatus;
  title: string;
  description: string;
  time: string;
  completed: boolean;
  current: boolean;
}

export interface PeachyOrder {
  id: string; // e.g. PP-2026-10482
  date: string;
  concept: "flavourverse" | "purepantry" | "snackattack";
  items: DemoCartItem[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  shipping: number;
  gst: number;
  total: number;
  status: OrderStatus;
  paymentStatus: "Payment Pending (Live Launch)" | "Paid (Demo Simulation)";
  paymentMethod: "Razorpay / UPI / Cards (Phase 3)" | "Cash on Delivery";
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  gstin?: string;
  shippingAddress: {
    fullName: string;
    phone: string;
    street: string;
    landmark?: string;
    city: string;
    state: string;
    pincode: string;
  };
  courier?: string;
  awb?: string;
  estimatedDelivery: string;
  fssaiNumber: string;
  timeline: OrderTimelineStep[];
}

interface OrderStoreState {
  orders: PeachyOrder[];
  createOrder: (order: Omit<PeachyOrder, "id" | "date" | "timeline" | "fssaiNumber">) => PeachyOrder;
  getOrderById: (orderId: string) => PeachyOrder | undefined;
  getOrdersByCustomer: (emailOrPhone: string) => PeachyOrder[];
  updateOrderStatus: (orderId: string, status: OrderStatus, courier?: string, awb?: string) => void;
}

const DEFAULT_TIMELINE = (status: OrderStatus, placedTime: string): OrderTimelineStep[] => {
  const steps: { status: OrderStatus; title: string; description: string }[] = [
    {
      status: "placed",
      title: "Order Placed",
      description: "Order received in Peachy Plate warehouse system.",
    },
    {
      status: "verified",
      title: "Stock Verified & Reserved",
      description: "Batch quality inspection & expiry re-validation passed.",
    },
    {
      status: "packed",
      title: "Packed in Temperature-Shield Packaging",
      description: "Eco-kraft box sealed with freshness integrity tape.",
    },
    {
      status: "dispatched",
      title: "Handed over to Logistics",
      description: "Carrier manifest generated and scanned at hub.",
    },
    {
      status: "in_transit",
      title: "In Transit across India",
      description: "Shipment moving between sorting facility and destination city.",
    },
    {
      status: "delivered",
      title: "Delivered to Customer Doorstep",
      description: "Handed over to recipient with OTP verification.",
    },
  ];

  const statusOrder: OrderStatus[] = [
    "placed",
    "verified",
    "packed",
    "dispatched",
    "in_transit",
    "delivered",
  ];

  const currentIndex = statusOrder.indexOf(status);

  return steps.map((s, index) => ({
    ...s,
    time: index <= currentIndex ? (index === 0 ? placedTime : "Today, 15:40") : "Pending",
    completed: index <= currentIndex,
    current: index === currentIndex,
  }));
};

const SEED_ORDERS: PeachyOrder[] = [
  {
    id: "PP-2026-10482",
    date: "2026-11-16T14:22:00Z",
    concept: "flavourverse",
    items: [
      {
        id: "3-1-std",
        productId: 3,
        productName: "Single-Estate Malabar Dark Bar 74%",
        productSlug: "single-estate-malabar-dark-bar-74",
        categoryName: "Chocolate Therapy",
        packSizeTitle: "Artisan Bar",
        packSizeUnit: "80g Bar",
        price: 360,
        quantity: 2,
        image: "/images/products/chocolate-dark.jpg",
      },
      {
        id: "1-1-std",
        productId: 1,
        productName: "Gourmet Sorghum Crisps",
        productSlug: "gourmet-sorghum-crisps",
        categoryName: "Salty Obsessions",
        packSizeTitle: "Snack Pouch",
        packSizeUnit: "120g Pouch",
        price: 240,
        quantity: 1,
        image: "/images/products/sorghum-crisps.jpg",
      },
    ],
    subtotal: 960,
    discount: 96,
    couponCode: "WELCOME10",
    shipping: 0,
    gst: 43.2,
    total: 907.2,
    status: "in_transit",
    paymentStatus: "Payment Pending (Live Launch)",
    paymentMethod: "Razorpay / UPI / Cards (Phase 3)",
    customerName: "Aaditya Vikram",
    customerEmail: "aadi@peachyplate.in",
    customerPhone: "+91 98765 43210",
    gstin: "07AAAAA0000A1Z5",
    shippingAddress: {
      fullName: "Aaditya Vikram",
      phone: "+91 98765 43210",
      street: "Flat 402, Royal Palms, Outer Ring Road, Bellandur",
      landmark: "Near Ecospace Tech Park",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560103",
    },
    courier: "Delhivery Air Express",
    awb: "DEL982310239",
    estimatedDelivery: "Tomorrow, by 8:00 PM",
    fssaiNumber: "10021011000428",
    timeline: DEFAULT_TIMELINE("in_transit", "16 Nov 2026, 02:22 PM"),
  },
  {
    id: "PP-2026-10481",
    date: "2026-11-15T11:05:00Z",
    concept: "purepantry",
    items: [
      {
        id: "2-1-std",
        productId: 2,
        productName: "Cold-Extracted Kashmiri Walnut Halves",
        productSlug: "cold-extracted-kashmiri-walnut-halves",
        categoryName: "Better Bites",
        packSizeTitle: "Glass Jar",
        packSizeUnit: "250g Jar",
        price: 680,
        quantity: 1,
        image: "/images/products/walnuts.jpg",
      },
    ],
    subtotal: 680,
    discount: 0,
    shipping: 0,
    gst: 34,
    total: 714,
    status: "dispatched",
    paymentStatus: "Payment Pending (Live Launch)",
    paymentMethod: "Cash on Delivery",
    customerName: "Aaditya Vikram",
    customerEmail: "aadi@peachyplate.in",
    customerPhone: "+91 98765 43210",
    shippingAddress: {
      fullName: "Aaditya Vikram",
      phone: "+91 98765 43210",
      street: "Suite 3B, WeWork Galaxy, 43 Residency Road",
      landmark: "Opposite Bishop Cotton Boys School",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560025",
    },
    courier: "BlueDart Apex",
    awb: "BD87239102",
    estimatedDelivery: "18 Nov 2026",
    fssaiNumber: "10021011000428",
    timeline: DEFAULT_TIMELINE("dispatched", "15 Nov 2026, 11:05 AM"),
  },
  {
    id: "PP-2026-10480",
    date: "2026-11-14T18:40:00Z",
    concept: "snackattack",
    items: [
      {
        id: "4-1-std",
        productId: 4,
        productName: "Sparkling Yuzu & Pink Guava Soda",
        productSlug: "sparkling-yuzu-pink-guava-soda",
        categoryName: "Liquid Happiness",
        packSizeTitle: "Single Can",
        packSizeUnit: "330ml Can",
        price: 180,
        quantity: 4,
        image: "/images/products/yuzu-soda.jpg",
      },
    ],
    subtotal: 720,
    discount: 108,
    couponCode: "SNACKATTACK15",
    shipping: 0,
    gst: 30.6,
    total: 642.6,
    status: "delivered",
    paymentStatus: "Payment Pending (Live Launch)",
    paymentMethod: "Razorpay / UPI / Cards (Phase 3)",
    customerName: "Aaditya Vikram",
    customerEmail: "aadi@peachyplate.in",
    customerPhone: "+91 98765 43210",
    shippingAddress: {
      fullName: "Aaditya Vikram",
      phone: "+91 98765 43210",
      street: "Flat 402, Royal Palms, Outer Ring Road",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560103",
    },
    courier: "Shiprocket Surface",
    awb: "SR49281734",
    estimatedDelivery: "15 Nov 2026 (Delivered)",
    fssaiNumber: "10021011000428",
    timeline: DEFAULT_TIMELINE("delivered", "14 Nov 2026, 06:40 PM"),
  },
];

export const useOrderStore = create<OrderStoreState>()(
  persist(
    (set, get) => ({
      orders: SEED_ORDERS,

      createOrder: (orderData) => {
        const orderNumber = `PP-2026-${Math.floor(10000 + Math.random() * 90000)}`;
        const now = new Date().toISOString();
        const displayDate = new Date().toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });

        const newOrder: PeachyOrder = {
          ...orderData,
          id: orderNumber,
          date: now,
          fssaiNumber: "10021011000428",
          estimatedDelivery: "3 to 4 Business Days",
          timeline: DEFAULT_TIMELINE(orderData.status || "placed", displayDate),
        };

        set((state) => ({
          orders: [newOrder, ...state.orders],
        }));

        return newOrder;
      },

      getOrderById: (orderId: string) => {
        const cleanId = orderId.trim().toUpperCase();
        return get().orders.find(
          (o) => o.id.toUpperCase() === cleanId || o.awb?.toUpperCase() === cleanId
        );
      },

      getOrdersByCustomer: (emailOrPhone: string) => {
        const clean = emailOrPhone.trim().toLowerCase();
        return get().orders.filter(
          (o) =>
            o.customerEmail.toLowerCase().includes(clean) ||
            o.customerPhone.includes(clean)
        );
      },

      updateOrderStatus: (orderId, status, courier, awb) => {
        set((state) => ({
          orders: state.orders.map((order) => {
            if (order.id !== orderId) return order;
            const updated = { ...order, status };
            if (courier) updated.courier = courier;
            if (awb) updated.awb = awb;
            updated.timeline = DEFAULT_TIMELINE(status, order.date);
            return updated;
          }),
        }));
      },
    }),
    {
      name: "peachy-plate-order-store",
    }
  )
);
