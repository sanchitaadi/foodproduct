"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistState {
  wishlistIds: number[];
  wishlist: number[];
  toggleWishlist: (productOrId: number | { id: number }) => void;
  removeFromWishlist: (productId: number) => void;
  isWishlisted: (productId: number) => boolean;
  clearWishlist: () => void;
}

export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      wishlistIds: [1, 3], // Default demo favorites
      wishlist: [1, 3],

      toggleWishlist: (productOrId: number | { id: number }) => {
        const productId = typeof productOrId === "number" ? productOrId : productOrId.id;
        const { wishlistIds } = get();
        const exists = wishlistIds.includes(productId);
        const updated = exists
          ? wishlistIds.filter((id) => id !== productId)
          : [...wishlistIds, productId];
        set({ wishlistIds: updated, wishlist: updated });
      },

      removeFromWishlist: (productId: number) => {
        const { wishlistIds } = get();
        const updated = wishlistIds.filter((id) => id !== productId);
        set({ wishlistIds: updated, wishlist: updated });
      },

      isWishlisted: (productId: number) => {
        return get().wishlistIds.includes(productId);
      },

      clearWishlist: () => set({ wishlistIds: [], wishlist: [] }),
    }),
    {
      name: "peachy-plate-wishlist",
    }
  )
);
