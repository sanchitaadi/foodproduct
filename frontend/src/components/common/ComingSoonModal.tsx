"use client";

import React from "react";
import { X, Sparkles, ShieldCheck, ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "@/hooks/useCart";

export const ComingSoonModal: React.FC = () => {
  const { isComingSoonOpen, closeComingSoon, items, getTotal, getSubtotal } = useCart();

  if (!isComingSoonOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={closeComingSoon}
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      <div className="relative w-full max-w-lg bg-[#191919] text-white border border-white/15 rounded-3xl p-8 shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Glow accent */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-[#FF9F1C]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close button */}
        <button
          onClick={closeComingSoon}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-[#FF9F1C]/15 border border-[#FF9F1C]/30 flex items-center justify-center text-[#FF9F1C]">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#FF9F1C]">
              CLIENT DEMONSTRATION MODE
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">
              Checkout & Payment
            </h3>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4 text-sm text-neutral-300 leading-relaxed mb-6">
          <p>
            You have selected <strong className="text-white">{items.length} artisanal packaged food items</strong> totaling <strong className="text-[#FF9F1C]">₹{getTotal()}</strong>.
          </p>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2 text-xs">
            <div className="flex items-center gap-2 font-semibold text-white">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Production Payment Gateways Disabled</span>
            </div>
            <p className="text-neutral-400">
              Live payment processing (Razorpay, UPI, Cards, NetBanking, and Cash on Delivery) and postal courier dispatches are scheduled for the Phase 3 backend launch. No actual charges have occurred.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={closeComingSoon}
            className="flex-1 py-3.5 px-6 rounded-xl bg-[#FF9F1C] hover:bg-[#ffa938] text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Continue Exploring Concepts</span>
          </button>
        </div>

        <div className="mt-5 text-center">
          <span className="text-[11px] text-neutral-400 font-mono">
            PEACHY PLATE • THREE STOREFRONT CONCEPT SHOWCASE
          </span>
        </div>
      </div>
    </div>
  );
};
