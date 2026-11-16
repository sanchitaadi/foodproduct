"use client";

import React from "react";
import Link from "next/link";
import { Zap, Flame, Award, ArrowRight } from "lucide-react";
import SafeImage from "@/components/common/SafeImage";

export default function SnackAttackOurStoryPage() {
  return (
    <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-12 w-full space-y-16">
      {/* Hero Manifesto */}
      <div className="bg-[#FF5400] text-black border-4 border-black p-8 sm:p-14 rounded-3xl shadow-[8px_8px_0px_#000] relative overflow-hidden">
        <div className="inline-block bg-[#FFD60A] text-black font-black text-xs uppercase px-3 py-1 border-2 border-black rotate-[-2deg] mb-4">
          BRAND MANIFESTO
        </div>
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white drop-shadow-[4px_4px_0px_#000] max-w-4xl leading-[0.92]">
          WE GOT TIRED OF BORING, STERILE SNACKS.
        </h1>
        <p className="text-base sm:text-lg font-bold text-black mt-6 max-w-2xl leading-relaxed">
          India has the most vibrant street food and spice culture on Earth. Why were packaged snacks either cheap oily junk or bland imported health bars that tasted like cardboard?
        </p>
      </div>

      {/* Origin Story Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 bg-[#FFD60A] border-2 border-black px-3 py-1 text-xs font-black uppercase">
            <Zap className="w-4 h-4 fill-black" />
            <span>THE SPICE CONSPIRACY</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black uppercase text-black">
            BORN IN BENGALURU, POWERED BY DESI HEAT
          </h2>

          <p className="text-sm text-neutral-800 leading-relaxed font-medium">
            Snack Attack was founded by three college hostel roommates who lived on midnight Maggi and spicy mixture. We wanted snacks that had genuine crunch, real stone-ground masala, and zero trans fats.
          </p>

          <p className="text-sm text-neutral-800 leading-relaxed font-medium">
            We partner with farmer cooperatives in Rajasthan for Mathania chillies, Bihar for jumbo lotus seed makhana, and Gujarat for cold-pressed groundnut oils. Every batch is kettle-popped with surgical precision.
          </p>

          <div className="pt-2">
            <Link
              href="/concept-c-snackattack/shop"
              className="inline-flex items-center gap-2 bg-[#FF5400] text-black font-black text-xs uppercase px-6 py-3 border-2 border-black shadow-[3px_3px_0px_#000] hover:bg-[#FFD60A]"
            >
              <span>Explore The Stash</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border-4 border-black bg-[#FFD60A] shadow-[8px_8px_0px_#000] rotate-1">
            <SafeImage
              src="/images/products/kettle-cooked-sea-salt-crisps.jpg"
              alt="Snack Attack Production"
              concept="snack-attack"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* 3 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border-3 border-black p-6 rounded-2xl shadow-[5px_5px_0px_#000]">
          <span className="text-2xl mb-2 block">🌶️</span>
          <h3 className="font-black text-lg uppercase text-black mb-1">REAL REGIONAL CHILLIES</h3>
          <p className="text-xs text-neutral-700 font-medium">From Guntur to Mathania, we source whole dried pod chillies and stone-mill them fresh.</p>
        </div>
        <div className="bg-white border-3 border-black p-6 rounded-2xl shadow-[5px_5px_0px_#000]">
          <span className="text-2xl mb-2 block">🍳</span>
          <h3 className="font-black text-lg uppercase text-black mb-1">SMALL-BATCH KETTLES</h3>
          <p className="text-xs text-neutral-700 font-medium">Never continuous conveyor lines. We kettle-fry in small pans for extreme irregular crispiness.</p>
        </div>
        <div className="bg-white border-3 border-black p-6 rounded-2xl shadow-[5px_5px_0px_#000]">
          <span className="text-2xl mb-2 block">🌱</span>
          <h3 className="font-black text-lg uppercase text-black mb-1">NO FILLERS OR MSG</h3>
          <p className="text-xs text-neutral-700 font-medium">100% vegetarian, zero artificial food coloring, and completely palm-oil free.</p>
        </div>
      </div>
    </div>
  );
}
