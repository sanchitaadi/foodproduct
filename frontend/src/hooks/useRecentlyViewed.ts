"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface RecentlyViewedState {
  viewedIds: number[];
  addProductView: (productId: number) => void;
  clearRecentlyViewed: () => void;
}

export const useRecentlyViewed = create<RecentlyViewedState>()(
  persist(
    (set, get) => ({
      viewedIds: [3, 1, 4], // Pre-seeded with realistic sample items

      addProductView: (productId: number) => {
        const current = get().viewedIds.filter((id) => id !== productId);
        set({ viewedIds: [productId, ...current].slice(0, 10) });
      },

      clearRecentlyViewed: () => set({ viewedIds: [] }),
    }),
    {
      name: "peachy-plate-recently-viewed",
    }
  )
);
