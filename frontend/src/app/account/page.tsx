"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  Package,
  Heart,
  MapPin,
  LogOut,
  ArrowRight,
  ExternalLink,
  Clock,
  CheckCircle2,
  Trash2,
  ShoppingBag,
  Layers,
  Sparkles,
} from "lucide-react";
import { useCustomerAuth } from "@/hooks/useCustomerAuth";
import { useOrderStore, PeachyOrder } from "@/hooks/useOrderStore";
import { useWishlist } from "@/hooks/useWishlist";
import { useCart } from "@/hooks/useCart";
import { SafeImage } from "@/components/common/SafeImage";

export default function CustomerAccountDashboardPage() {
  const router = useRouter();
  const { customer, isLoggedIn, logout } = useCustomerAuth();
  const { orders } = useOrderStore();
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addItem } = useCart();

  const [activeTab, setActiveTab] = useState<"orders" | "wishlist" | "addresses">("orders");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (!isLoggedIn || !customer) {
    return (
      <div className="min-h-screen bg-[#0D0D11] text-zinc-100 py-16 px-4 flex items-center justify-center font-sans">
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 max-w-md text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center mx-auto text-zinc-400">
            <User className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-white">Sign In Required</h2>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Please sign in to view your orders, saved addresses, and active wishlist stashes.
          </p>
          <div className="pt-2">
            <Link
              href="/login"
              className="inline-block px-6 py-2.5 rounded-xl bg-[#CCFF00] text-black font-mono font-bold text-xs uppercase hover:bg-white transition-colors"
            >
              Go to Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-[#0D0D11] text-zinc-100 py-12 px-4 sm:px-6 lg:px-8 font-sans selection:bg-[#CCFF00] selection:text-black">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Profile Header Bar */}
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#CCFF00]/10 border border-[#CCFF00]/30 text-[#CCFF00] flex items-center justify-center text-2xl font-black font-mono">
              {customer.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-white">{customer.name}</h1>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded font-mono">
                  DEMO CUSTOMER
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-mono mt-0.5">
                {customer.email} • {customer.phone}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/concepts"
              className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-mono font-bold flex items-center gap-2 border border-zinc-700 transition-colors"
            >
              <Layers className="w-3.5 h-3.5 text-[#CCFF00]" />
              <span>Switch Concept</span>
            </Link>

            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-mono font-bold flex items-center gap-2 border border-rose-500/20 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-zinc-800 pb-3 overflow-x-auto scrollbar-none font-mono text-xs">
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-colors ${
              activeTab === "orders"
                ? "bg-[#CCFF00] text-black"
                : "text-zinc-400 hover:text-white hover:bg-zinc-900"
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Orders History ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("wishlist")}
            className={`px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-colors ${
              activeTab === "wishlist"
                ? "bg-[#CCFF00] text-black"
                : "text-zinc-400 hover:text-white hover:bg-zinc-900"
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Saved Wishlist ({wishlist?.length || 0})</span>
          </button>

          <button
            onClick={() => setActiveTab("addresses")}
            className={`px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-colors ${
              activeTab === "addresses"
                ? "bg-[#CCFF00] text-black"
                : "text-zinc-400 hover:text-white hover:bg-zinc-900"
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Saved Addresses ({customer.addresses.length})</span>
          </button>
        </div>

        {/* Tab 1: Orders */}
        {activeTab === "orders" && (
          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-12 text-center space-y-3">
                <Package className="w-8 h-8 text-zinc-500 mx-auto" />
                <h3 className="font-bold text-white text-base">No Orders Yet</h3>
                <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                  Your placed orders will show here with real-time status tracking, dispatch manifests, and invoice download links.
                </p>
                <div className="pt-2">
                  <Link
                    href="/checkout"
                    className="inline-block px-5 py-2 rounded-xl bg-[#CCFF00] text-black text-xs font-mono font-bold uppercase hover:bg-white transition-colors"
                  >
                    Go To Checkout
                  </Link>
                </div>
              </div>
            ) : (
              orders.map((ord) => (
                <div
                  key={ord.id}
                  className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 space-y-4 hover:border-zinc-700 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-white text-sm">
                          Order #{ord.id}
                        </span>
                        <span className="text-[10px] bg-[#CCFF00]/10 text-[#CCFF00] border border-[#CCFF00]/30 px-2 py-0.5 rounded font-mono">
                          {ord.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="text-[11px] text-zinc-500 font-mono">
                        Placed on {new Date(ord.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })} • {ord.courier}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-[#CCFF00] text-base">
                        ₹{ord.total}
                      </span>
                      <Link
                        href={`/order-confirmation/${ord.id}`}
                        className="px-3.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-mono flex items-center gap-1 transition-colors"
                      >
                        <span>Track</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>

                  {/* Items row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {ord.items.map((it) => (
                      <div
                        key={it.id}
                        className="flex items-center gap-2.5 p-2 rounded-xl bg-zinc-950 border border-zinc-800/80"
                      >
                        <div className="w-10 h-10 rounded-lg bg-zinc-900 overflow-hidden shrink-0">
                          <SafeImage
                            src={it.image}
                            alt={it.productName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="text-xs">
                          <div className="font-bold text-white line-clamp-1">{it.productName}</div>
                          <div className="text-[10px] text-zinc-400 font-mono">
                            {it.packSizeTitle} × {it.quantity}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-mono text-zinc-400 pt-1">
                    <div>
                      Ship to: {ord.shippingAddress.fullName}, {ord.shippingAddress.city} ({ord.shippingAddress.pincode})
                    </div>
                    <div className="text-emerald-400">
                      {ord.paymentStatus}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 2: Wishlist */}
        {activeTab === "wishlist" && (
          <div className="space-y-4">
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-8 text-center space-y-3">
              <Heart className="w-8 h-8 text-[#FF9E7D] mx-auto fill-[#FF9E7D]/20" />
              <h3 className="font-bold text-white text-base">Your Saved Provisions Stash</h3>
              <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                Items you save across Pop Snacks, Goodness Co., Crave Cult, or Happy Bites appear in this unified wishlist.
              </p>
              <div className="pt-2">
                <Link
                  href="/concepts"
                  className="inline-block px-5 py-2 rounded-xl bg-[#CCFF00] text-black text-xs font-mono font-bold uppercase hover:bg-white transition-colors"
                >
                  Explore Catalog
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Saved Addresses */}
        {activeTab === "addresses" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {customer.addresses.map((addr) => (
              <div
                key={addr.id}
                className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 space-y-3 relative"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#CCFF00] uppercase">
                    [{addr.type.toUpperCase()}]
                  </span>
                  {addr.isDefault && (
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-mono">
                      DEFAULT ADDRESS
                    </span>
                  )}
                </div>

                <div className="text-xs font-mono text-zinc-300 space-y-1">
                  <div className="font-bold text-white font-sans text-sm">{addr.fullName}</div>
                  <div>{addr.street}</div>
                  {addr.landmark && <div>Landmark: {addr.landmark}</div>}
                  <div>
                    {addr.city}, {addr.state} - {addr.pincode}
                  </div>
                  <div className="text-zinc-500 pt-1">Phone: {addr.phone}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
