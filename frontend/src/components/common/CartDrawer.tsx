"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Trash2, Plus, Minus, ArrowRight, Tag, ShieldCheck, ShoppingBag, Sparkles } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import SafeImage from "./SafeImage";

export const CartDrawer: React.FC = () => {
  const pathname = usePathname();
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    applyCoupon,
    removeCoupon,
    appliedCoupon,
    couponDiscount,
    getSubtotal,
    getShipping,
    getEstimatedTax,
    getTotal,
    getItemCount,
    openComingSoon,
  } = useCart();

  const [couponInput, setCouponInput] = useState("");
  const [couponMessage, setCouponMessage] = useState<{ text: string; isError: boolean } | null>(null);

  let cartHref = "/concept-a-flavourverse/cart";
  if (pathname.includes("purepantry")) cartHref = "/concept-b-purepantry/cart";
  if (pathname.includes("snackattack")) cartHref = "/concept-c-snackattack/cart";

  if (!isOpen) return null;

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;

    const ok = applyCoupon(couponInput);
    if (ok) {
      setCouponMessage({ text: "Code applied! 15% discount granted.", isError: false });
      setCouponInput("");
    } else {
      setCouponMessage({ text: "Invalid code or min ₹499 order needed. (Try PEACHY15)", isError: true });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-full sm:w-[420px] max-w-full bg-[#161616] border-l border-white/10 text-white flex flex-col justify-between shadow-2xl">
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#FF9F1C]/20 text-[#FF9F1C] flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white tracking-wide">
                  Your Pantry Stash
                </h2>
                <p className="text-[11px] text-neutral-400 font-mono">
                  {getItemCount()} items selected
                </p>
              </div>
            </div>
            <button
              onClick={closeCart}
              className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-20 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-neutral-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-semibold text-neutral-300">Your basket is empty</h3>
                <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                  Explore Flavourverse, Pure & Pantry, or Snack Attack to add artisanal provisions.
                </p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="p-4 bg-white/5 rounded-2xl border border-white/10 flex gap-4 hover:border-white/20 transition-all"
                >
                  <SafeImage
                    src={item.image}
                    alt={item.productName}
                    width={64}
                    height={64}
                    className="w-16 h-16 object-cover rounded-xl shrink-0 bg-neutral-900 border border-white/10"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] uppercase font-mono text-amber-400 truncate">
                      {item.categoryName}
                    </div>
                    <h4 className="text-sm font-semibold text-white truncate">
                      {item.productName}
                    </h4>
                    <div className="text-xs text-neutral-400 mt-0.5">
                      {item.packSizeTitle}
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-white/15 rounded-lg overflow-hidden bg-black/40">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 text-xs font-mono font-bold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-amber-400 font-mono">
                          ₹{item.price * item.quantity}
                        </span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-neutral-500 hover:text-rose-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Summary */}
          {items.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-black/60 space-y-4">
              {/* Coupon Form */}
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-3 bg-emerald-950/40 border border-emerald-800/60 rounded-xl text-xs text-emerald-300">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-emerald-400" />
                    <span>
                      Coupon <strong>{appliedCoupon}</strong> (-₹{couponDiscount})
                    </span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-neutral-400 hover:text-rose-400 font-bold"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApply} className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Coupon (e.g. PEACHY15)"
                    className="flex-1 bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-xs text-white uppercase placeholder:text-neutral-500 focus:outline-none focus:border-amber-400 font-mono"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-xs font-semibold rounded-xl transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponMessage && (
                <p className={`text-[11px] font-medium ${couponMessage.isError ? "text-rose-400" : "text-emerald-400"}`}>
                  {couponMessage.text}
                </p>
              )}

              {/* Line items calculation */}
              <div className="space-y-1.5 text-xs text-neutral-300">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono">₹{getSubtotal()}</span>
                </div>
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount</span>
                    <span className="font-mono">-₹{couponDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span className="font-mono">
                    {getShipping() === 0 ? (
                      <span className="text-emerald-400 font-semibold">FREE (Over ₹499)</span>
                    ) : (
                      `₹${getShipping()}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax (5% GST)</span>
                  <span className="font-mono">₹{getEstimatedTax()}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-white/10">
                  <span>Total Payable</span>
                  <span className="font-mono text-amber-400">₹{getTotal()}</span>
                </div>
              </div>

              {/* Checkout Button -> Navigates to Demo Checkout */}
              <Link
                href="/checkout"
                onClick={closeCart}
                className="w-full py-4 bg-[#CCFF00] hover:bg-white text-black font-mono font-black text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg hover:scale-[1.01]"
              >
                <span>PROCEED TO DEMO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                onClick={closeCart}
                className="w-full py-3 bg-white/10 hover:bg-white/15 text-white font-mono text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 border border-white/10"
              >
                <span>Continue Snacking</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-neutral-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Demonstration Storefront • Synchronized across all 4 concepts</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
