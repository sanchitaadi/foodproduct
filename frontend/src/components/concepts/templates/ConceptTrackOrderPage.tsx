"use client";

import React, { useState } from "react";
import Link from "next/link";
import MegaMenuHeader from "@/components/common/MegaMenuHeader";
import NewsletterSection from "@/components/common/NewsletterSection";
import { ConceptKey, getConceptTheme } from "./conceptTheme";
import { ArrowLeft, Search, Truck, CheckCircle2, Clock, PackageCheck, AlertCircle } from "lucide-react";

export default function ConceptTrackOrderPage({ concept }: { concept: ConceptKey }) {
  const theme = getConceptTheme(concept);
  const [orderNumber, setOrderNumber] = useState("");
  const [tracked, setTracked] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderNumber.trim()) {
      setTracked(true);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${theme.bgClass}`}>
      <MegaMenuHeader concept={concept} />

      {/* Banner */}
      <section className={`py-16 px-4 sm:px-6 lg:px-8 ${theme.bannerClass}`}>
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <Link
            href={theme.basePath}
            className="inline-flex items-center gap-1.5 text-xs font-mono opacity-70 hover:opacity-100 mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to {theme.name}</span>
          </Link>
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase ${theme.badgeClass}`}>
            <span>Real-Time Logistics Tracker</span>
          </div>
          <h1 className={`text-4xl sm:text-6xl font-bold tracking-tight ${theme.fontClass}`}>
            Track Your Dispatch
          </h1>
          <p className="text-base opacity-85 max-w-xl mx-auto">
            Enter your 10-character Order ID or Carrier AWB number to inspect live cold-chain dispatch milestones.
          </p>
        </div>
      </section>

      {/* Form & Timeline */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full flex-1 space-y-12">
        <div className="p-8 rounded-2xl bg-white/5 border border-current/15">
          <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 opacity-50" />
              <input
                type="text"
                placeholder="Enter Order ID (e.g. PP-84920) or AWB..."
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:border-current text-sm font-mono"
              />
            </div>
            <button
              type="submit"
              className={`px-8 py-3.5 rounded-xl text-xs uppercase tracking-wider font-bold transition-all ${theme.btnPrimaryClass}`}
            >
              Track Order
            </button>
          </form>
        </div>

        {tracked && (
          <div className="p-8 rounded-2xl bg-white/5 border border-current/15 space-y-8 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-current/15 gap-4">
              <div>
                <span className="text-[10px] font-mono uppercase opacity-60">Shipment Status</span>
                <h3 className="text-xl font-bold text-emerald-400 font-mono">IN TRANSIT (OUT FOR DELIVERY TODAY)</h3>
              </div>
              <div className="text-xs font-mono opacity-80 text-right">
                <span className="block">Carrier: BlueDart ColdExpress</span>
                <span className="block font-bold">AWB: BD-9182374921</span>
              </div>
            </div>

            {/* Milestones */}
            <div className="space-y-6 text-xs font-mono">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-black flex items-center justify-center font-bold shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-sm block">Order Received &amp; Verified</span>
                  <span className="opacity-70 block">Inventory reserved and payment verified via Razorpay.</span>
                  <span className="opacity-40 text-[10px]">Yesterday, 14:22 IST</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-black flex items-center justify-center font-bold shrink-0">
                  <PackageCheck className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-sm block">Quality Inspected &amp; Packed</span>
                  <span className="opacity-70 block">Vacuum sealed with tamper-evident FSSAI holographic label.</span>
                  <span className="opacity-40 text-[10px]">Yesterday, 18:45 IST</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#FF9F1C] text-black flex items-center justify-center font-bold shrink-0">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-sm block text-[#FF9F1C]">In Transit to Destination Hub</span>
                  <span className="opacity-70 block">Package arrived at regional cold logistics hub. Out for delivery.</span>
                  <span className="opacity-40 text-[10px]">Today, 08:15 IST</span>
                </div>
              </div>

              <div className="flex items-start gap-4 opacity-40">
                <div className="w-8 h-8 rounded-full border border-current flex items-center justify-center font-bold shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-sm block">Delivered</span>
                  <span className="opacity-70 block">Recipient OTP delivery confirmation.</span>
                  <span className="opacity-40 text-[10px]">Estimated by 18:00 IST</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <NewsletterSection concept={concept} />
    </div>
  );
}
