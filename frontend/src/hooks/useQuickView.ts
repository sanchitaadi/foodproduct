"use client";

import { create } from "zustand";
import { DemoProduct } from "@/lib/demo-catalog";

interface QuickViewState {
  selectedProduct: DemoProduct | null;
  isOpen: boolean;
  concept: "flavourverse" | "purepantry" | "snackattack";
  openQuickView: (product: DemoProduct, concept?: "flavourverse" | "purepantry" | "snackattack") => void;
  closeQuickView: () => void;
}

export const useQuickView = create<QuickViewState>()((set) => ({
  selectedProduct: null,
  isOpen: false,
  concept: "flavourverse",

  openQuickView: (product, concept = "flavourverse") => {
    set({ selectedProduct: product, isOpen: true, concept });
  },

  closeQuickView: () => {
    set({ selectedProduct: null, isOpen: false });
  },
}));
