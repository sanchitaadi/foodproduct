"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  Tag 
} from "lucide-react";
import { useCart } from "@/hooks/useCart";
import MegaMenuHeader from "@/components/common/MegaMenuHeader";
import SafeImage from "@/components/common/SafeImage";
import { ConceptKey, getConceptTheme } from "./conceptTheme";

export default function ConceptCartPage({ concept }: { concept: ConceptKey }) {
  const theme = getConceptTheme(concept);
  const { 
    items, 
    removeItem, 
    updateQuantity, 
    getSubtotal, 
    couponDiscount, 
    appliedCoupon, 
    applyCoupon, 
    removeCoupon, 
    clearCart,
    getTotal
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState("");
  const [couponError, setCouponError] = useState("");

  const subtotal = getSubtotal();
  const shipping = subtotal > 499 || subtotal === 0 ? 0 : 50;
  const grandTotal = getTotal();

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const ok = applyCoupon(inputCoupon.trim());
    if (ok) {
      setCouponError("");
      setInputCoupon("");
    } else {
      setCouponError("Invalid coupon. Try 'PEACHY15' for 15% off!");
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${theme.bgClass}`}>
      <MegaMenuHeader concept={concept} />

      <section className={`py-10 px-4 sm:px-6 lg:px-8 border-b ${theme.bannerClass}`}>
        <div className="max-w-7xl mx-auto">
          <h1 className={`text-3xl sm:text-4xl font-black uppercase tracking-tight ${theme.fontClass}`}>
            YOUR PROVISIONS BASKET
          </h1>
          <p className="text-sm opacity-80 mt-1">Review your selected artisan packaged foods before final dispatch.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
        {items.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Items list */}
            <div className="lg:col-span-8 space-y-4">
              <div className="border border-current/15 rounded-2xl overflow-hidden divide-y divide-current/10">
                {items.map((item) => (
                  <div key={item.id} className="p-4 sm:p-6 flex gap-4 items-center">
                    <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-black/10 border border-current/10 relative">
                      <SafeImage
                        src={item.image}
                        alt={item.productName}
                        concept={concept}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link 
                        href={`${theme.basePath}/product/${item.productSlug}`}
                        className="font-bold text-sm sm:text-base hover:underline block truncate"
                      >
                        {item.productName}
                      </Link>
                      <div className="text-xs font-mono opacity-70 mt-0.5">
                        Pack: {item.packSizeTitle} ({item.packSizeUnit}) • ₹{item.price} each
                      </div>
                      <div className="flex items-center gap-4 mt-3">
                        <div className="flex items-center border border-current/20 rounded-lg overflow-hidden bg-black/5">
                          <button
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="p-1.5 hover:bg-black/10"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-3 text-xs font-mono font-bold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1.5 hover:bg-black/10"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-xs text-rose-500 hover:text-rose-600 flex items-center gap-1 opacity-80 hover:opacity-100"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                    <div className="text-right font-mono font-bold text-sm sm:text-base">
                      ₹{item.price * item.quantity}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2">
                <Link
                  href={`${theme.basePath}/shop`}
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase hover:underline"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Continue Shopping</span>
                </Link>
                <button
                  onClick={clearCart}
                  className="text-xs font-mono opacity-60 hover:opacity-100 underline"
                >
                  Clear Entire Basket
                </button>
              </div>
            </div>

            {/* Order summary */}
            <div className="lg:col-span-4 p-6 rounded-2xl bg-black/5 border border-current/15 space-y-6">
              <h3 className="text-base font-bold font-mono uppercase tracking-wider">
                Order Summary
              </h3>

              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Coupon code (PEACHY15)"
                    value={inputCoupon}
                    onChange={(e) => setInputCoupon(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs rounded-xl bg-black/10 border border-current/15 uppercase font-mono focus:outline-none"
                  />
                  <button
                    type="submit"
                    className={`px-4 py-2 text-xs font-bold rounded-xl uppercase ${theme.btnPrimaryClass}`}
                  >
                    Apply
                  </button>
                </div>
                {couponError && <p className="text-[11px] text-rose-500">{couponError}</p>}
                {appliedCoupon && (
                  <div className="text-[11px] text-emerald-500 flex items-center justify-between">
                    <span>Applied: <strong>{appliedCoupon}</strong></span>
                    <button type="button" onClick={removeCoupon} className="underline text-xs">Remove</button>
                  </div>
                )}
              </form>

              {/* Price rows */}
              <div className="space-y-2 text-xs font-mono pt-3 border-t border-current/10">
                <div className="flex justify-between">
                  <span className="opacity-70">Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-emerald-500 font-bold">
                    <span>Discount</span>
                    <span>-₹{couponDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="opacity-70">Estimated Shipping</span>
                  <span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
                </div>
                <div className="flex justify-between text-base font-bold pt-3 border-t border-current/15">
                  <span>Grand Total</span>
                  <span className="text-lg">₹{grandTotal}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className={`w-full py-4 rounded-xl text-center font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 ${theme.btnPrimaryClass}`}
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="flex items-center gap-2 text-[11px] font-mono opacity-70 justify-center">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>256-Bit SSL Encrypted Checkout</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-24 text-center space-y-4">
            <ShoppingBag className="w-16 h-16 mx-auto opacity-30" />
            <h2 className="text-2xl font-bold">Your Basket is Empty</h2>
            <p className="text-sm opacity-70">Discover our curated collection of clean-label provisions.</p>
            <Link
              href={`${theme.basePath}/shop`}
              className={`inline-block px-8 py-3.5 rounded-xl text-xs uppercase font-bold ${theme.btnPrimaryClass}`}
            >
              Explore Provisions
            </Link>
          </div>
        )}
      </div>

      <footer className="mt-auto border-t border-current/10 py-10 px-4 text-center text-xs font-mono opacity-70">
        <p>© 2026 Peachy Plate Foods Ltd. • {theme.name} Edition • FSSAI Lic. No. 10019022009876</p>
      </footer>
    </div>
  );
}
