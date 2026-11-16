"use client";

import { create } from "zustand";

interface ComparisonState {
  comparedProductIds: number[];
  isOpen: boolean;
  addToCompare: (productId: number) => boolean;
  removeFromCompare: (productId: number) => void;
  clearComparison: () => void;
  openComparison: () => void;
  closeComparison: () => void;
  isInComparison: (productId: number) => boolean;
}

export const useComparison = create<ComparisonState>()((set, get) => ({
  comparedProductIds: [1, 2], // Initial comparison sample
  isOpen: false,

  addToCompare: (productId: number) => {
    const { comparedProductIds } = get();
    if (comparedProductIds.includes(productId)) return false;
    if (comparedProductIds.length >= 4) {
      alert("You can compare up to 4 products simultaneously.");
      return false;
    }
    set({ comparedProductIds: [...comparedProductIds, productId], isOpen: true });
    return true;
  },

  removeFromCompare: (productId: number) => {
    set((state) => ({
      comparedProductIds: state.comparedProductIds.filter((id) => id !== productId),
    }));
  },

  clearComparison: () => set({ comparedProductIds: [], isOpen: false }),
  openComparison: () => set({ isOpen: true }),
  closeComparison: () => set({ isOpen: false }),

  isInComparison: (productId: number) => {
    return get().comparedProductIds.includes(productId);
  },
}));
