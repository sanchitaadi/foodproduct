"use client";

import React, { useState } from "react";
import Link from "next/link";
import { User, Package, Heart, LogOut, ArrowRight, ShieldCheck, MapPin } from "lucide-react";
import { useWishlist } from "@/hooks/useWishlist";
import { DEMO_PRODUCTS } from "@/lib/demo-catalog";
import MegaMenuHeader from "@/components/common/MegaMenuHeader";
import ProductCard from "@/components/common/ProductCard";
import { ConceptKey, getConceptTheme } from "./conceptTheme";

export default function ConceptAccountPage({ concept }: { concept: ConceptKey }) {
  const theme = getConceptTheme(concept);
  const { wishlistIds } = useWishlist();
  const [activeTab, setActiveTab] = useState<"orders" | "wishlist" | "addresses">("wishlist");

  const wishlistedProducts = DEMO_PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className={`min-h-screen flex flex-col ${theme.bgClass}`}>
      <MegaMenuHeader concept={concept} />

      <section className={`py-10 px-4 sm:px-6 lg:px-8 border-b ${theme.bannerClass}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className={`text-3xl font-black uppercase tracking-tight ${theme.fontClass}`}>
              CUSTOMER ACCOUNT
            </h1>
            <p className="text-xs font-mono opacity-80 mt-1">Manage provisions orders, wishlist, and delivery addresses.</p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Active Session</span>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-4 border-b border-current/15 pb-4 mb-8 text-xs font-mono uppercase tracking-wider">
          <button
            onClick={() => setActiveTab("wishlist")}
            className={`flex items-center gap-2 pb-2 transition-all ${
              activeTab === "wishlist" ? "border-b-2 border-current font-bold opacity-100" : "opacity-60 hover:opacity-100"
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Wishlist ({wishlistIds.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("orders")}
            className={`flex items-center gap-2 pb-2 transition-all ${
              activeTab === "orders" ? "border-b-2 border-current font-bold opacity-100" : "opacity-60 hover:opacity-100"
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Past Orders</span>
          </button>

          <button
            onClick={() => setActiveTab("addresses")}
            className={`flex items-center gap-2 pb-2 transition-all ${
              activeTab === "addresses" ? "border-b-2 border-current font-bold opacity-100" : "opacity-60 hover:opacity-100"
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Delivery Addresses</span>
          </button>
        </div>

        {/* Wishlist Tab */}
        {activeTab === "wishlist" && (
          <div>
            {wishlistedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {wishlistedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} concept={concept} />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center space-y-3">
                <Heart className="w-12 h-12 mx-auto opacity-30" />
                <h3 className="text-xl font-bold">Your Wishlist is Empty</h3>
                <p className="text-sm opacity-70">Save your favorite provisions while browsing.</p>
                <Link
                  href={`${theme.basePath}/shop`}
                  className={`inline-block px-6 py-2.5 rounded-xl text-xs uppercase font-bold ${theme.btnPrimaryClass}`}
                >
                  Explore Provisions
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="space-y-4 max-w-2xl">
            <div className="p-6 rounded-2xl bg-black/5 border border-current/15 space-y-3">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="font-bold">ORDER #PP-2026-8841</span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 font-bold">DELIVERED</span>
              </div>
              <div className="text-sm opacity-80">
                2x Malabar Dark Chocolate (100g), 1x Himalayan Sorghum (150g)
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-current/10 text-xs font-mono">
                <span>Total: ₹1,120</span>
                <Link href={`${theme.basePath}/track-order`} className="underline font-bold">Track Shipment &rarr;</Link>
              </div>
            </div>
          </div>
        )}

        {/* Addresses Tab */}
        {activeTab === "addresses" && (
          <div className="max-w-xl space-y-4">
            <div className="p-6 rounded-2xl bg-black/5 border border-current/15 space-y-2 text-xs font-mono">
              <span className="font-bold block text-sm">Default Home Address</span>
              <p className="opacity-80">Flat 402, Green Glen Layout, Bellandur, Bengaluru, Karnataka - 560103</p>
              <p className="opacity-70">Phone: +91 98765 43210</p>
            </div>
          </div>
        )}
      </div>

      <footer className="mt-auto border-t border-current/10 py-10 px-4 text-center text-xs font-mono opacity-70">
        <p>© 2026 Peachy Plate Foods Ltd. • {theme.name} Edition • FSSAI Lic. No. 10019022009876</p>
      </footer>
    </div>
  );
}
