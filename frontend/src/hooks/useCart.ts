"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DemoProduct, PackSizeOption } from "@/lib/demo-catalog";

export interface DemoCartItem {
  id: string; // unique item id: `${productId}-${packSizeId}`
  productId: number;
  productName: string;
  productSlug: string;
  categoryName: string;
  packSizeTitle: string;
  packSizeUnit: string;
  price: number; // in INR
  quantity: number;
  image: string;
}

interface CartState {
  items: DemoCartItem[];
  isOpen: boolean;
  isComingSoonOpen: boolean;
  appliedCoupon: string | null;
  couponDiscount: number; // in INR
  discountCode: string | null;
  openCart: () => void;
  closeCart: () => void;
  openComingSoon: () => void;
  closeComingSoon: () => void;
  addItem: (product: any, packSize?: any, quantity?: number) => void;
  removeItem: (itemIdOrProductId: string | number, variantId?: string) => void;
  updateQuantity: (itemIdOrProductId: string | number, variantIdOrQty: string | number, maybeQty?: number) => void;
  applyCoupon: (code: string) => boolean;
  applyDiscountCode: (code: string) => boolean;
  removeCoupon: () => void;
  removeDiscountCode: () => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getShipping: () => number;
  getShippingFee: () => number;
  getEstimatedTax: () => number;
  getTax: () => number;
  getDiscount: () => number;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [
        {
          id: "1-1-std",
          productId: 1,
          productName: "Gourmet Sorghum Crisps",
          productSlug: "gourmet-sorghum-crisps",
          categoryName: "Salty Obsessions",
          packSizeTitle: "Snack Pouch",
          packSizeUnit: "120g Pouch",
          price: 249,
          quantity: 2,
          image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=800&q=80",
        },
        {
          id: "2-2-can",
          productId: 2,
          productName: "Prebiotic White Peach Soda",
          productSlug: "prebiotic-white-peach-soda",
          categoryName: "Liquid Happiness",
          packSizeTitle: "Single Can",
          packSizeUnit: "330ml Can",
          price: 195,
          quantity: 2,
          image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80",
        },
        {
          id: "3-3-bar",
          productId: 3,
          productName: "74% Malabar Dark Chocolate",
          productSlug: "malabar-dark-chocolate-74",
          categoryName: "Chocolate Therapy",
          packSizeTitle: "Artisanal Bar",
          packSizeUnit: "80g Bar",
          price: 325,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80",
        },
      ],

      isOpen: false,
      isComingSoonOpen: false,
      appliedCoupon: null,
      couponDiscount: 0,
      get discountCode() {
        return get().appliedCoupon;
      },

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      openComingSoon: () => set({ isComingSoonOpen: true }),
      closeComingSoon: () => set({ isComingSoonOpen: false }),

      addItem: (product: any, packSize?: any, quantity = 1) => {
        let selectedPack = packSize;
        if (!selectedPack) {
          if (Array.isArray(product.packSizes) && product.packSizes.length > 0) {
            selectedPack = product.packSizes[0];
          } else {
            selectedPack = { id: "std", title: "Standard Pack", packSize: "Standard", price: product.price || 99 };
          }
        }

        const packId = typeof selectedPack === "object" ? (selectedPack.id || "std") : String(selectedPack || "std");
        const packTitle = typeof selectedPack === "object" ? (selectedPack.title || selectedPack.label || "Standard Pack") : String(selectedPack || "Standard Pack");
        const packUnit = typeof selectedPack === "object" ? (selectedPack.packSize || selectedPack.label || "Standard Pack") : String(selectedPack || "Standard Pack");
        const price = typeof selectedPack === "object" ? (selectedPack.price || selectedPack.priceInr || product.price || 99) : (product.price || 99);
        const categoryName = product.category?.name || product.categoryName || "Gourmet Packaged Food";
        const primaryImage = product.images?.primary || (typeof product.primaryImage === "string" ? product.primaryImage : "/images/products/kettle-cooked-sea-salt-crisps.jpg");

        const itemId = `${product.id}-${packId}`;
        const existing = get().items.find((item) => item.id === itemId);

        if (existing) {
          set({
            items: get().items.map((item) =>
              item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
            ),
            isOpen: true,
          });
        } else {
          const newItem: DemoCartItem = {
            id: itemId,
            productId: Number(product.id) || 1,
            productName: product.name,
            productSlug: product.slug,
            categoryName,
            packSizeTitle: packTitle,
            packSizeUnit: packUnit,
            price,
            quantity,
            image: primaryImage,
          };
          set({
            items: [...get().items, newItem],
            isOpen: true,
          });
        }
      },

      removeItem: (itemIdOrProductId, variantId) => {
        if (typeof itemIdOrProductId === "string") {
          set({ items: get().items.filter((item) => item.id !== itemIdOrProductId) });
        } else {
          set({
            items: get().items.filter((item) => {
              if (item.productId !== itemIdOrProductId) return true;
              if (variantId && !item.id.endsWith(variantId)) return true;
              return false;
            }),
          });
        }
      },

      updateQuantity: (itemIdOrProductId, variantIdOrQty, maybeQty) => {
        if (typeof itemIdOrProductId === "string") {
          const quantity = Number(variantIdOrQty);
          if (quantity <= 0) {
            get().removeItem(itemIdOrProductId);
            return;
          }
          set({
            items: get().items.map((item) =>
              item.id === itemIdOrProductId ? { ...item, quantity } : item
            ),
          });
        } else {
          const variantId = String(variantIdOrQty);
          const quantity = maybeQty ?? 1;
          if (quantity <= 0) {
            get().removeItem(itemIdOrProductId, variantId);
            return;
          }
          set({
            items: get().items.map((item) => {
              if (item.productId === itemIdOrProductId && (!variantId || item.id.endsWith(variantId))) {
                return { ...item, quantity };
              }
              return item;
            }),
          });
        }
      },

      applyCoupon: (code) => {
        const clean = code.trim().toUpperCase();
        const subtotal = get().getSubtotal();
        if (clean === "PEACHY15" || clean === "CRUNCH15") {
          const discount = Math.round(subtotal * 0.15);
          set({ appliedCoupon: clean, couponDiscount: discount });
          return true;
        }
        return false;
      },

      applyDiscountCode: (code) => get().applyCoupon(code),
      removeCoupon: () => set({ appliedCoupon: null, couponDiscount: 0 }),
      removeDiscountCode: () => set({ appliedCoupon: null, couponDiscount: 0 }),
      clearCart: () => set({ items: [], appliedCoupon: null, couponDiscount: 0 }),

      getSubtotal: () => {
        return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      },

      getShipping: () => {
        const subtotal = get().getSubtotal();
        return subtotal >= 499 || subtotal === 0 ? 0 : 49;
      },
      getShippingFee: () => get().getShipping(),

      getEstimatedTax: () => {
        const subtotal = get().getSubtotal();
        const discount = get().couponDiscount;
        return Math.round(Math.max(0, subtotal - discount) * 0.05);
      },
      getTax: () => get().getEstimatedTax(),

      getDiscount: () => get().couponDiscount,

      getTotal: () => {
        const subtotal = get().getSubtotal();
        const discount = get().couponDiscount;
        const shipping = get().getShipping();
        const tax = get().getEstimatedTax();
        return Math.max(0, subtotal - discount + shipping + tax);
      },

      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: "peachy-plate-cart",
      partialize: (state) => ({
        items: state.items,
        appliedCoupon: state.appliedCoupon,
        couponDiscount: state.couponDiscount,
      }),
    }
  )
);
