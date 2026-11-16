"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Zap, Flame, ArrowRight, Sparkles, Check, ShoppingBag, Star, AlertCircle } from "lucide-react";
import { ProductRepository } from "@/lib/api/repository";
import { PackagedFoodProduct } from "@/types/products";
import { SnackProductCard } from "@/components/brands/snack-attack/SnackProductCard";
import { MarqueeBanner } from "@/components/animation/MarqueeBanner";
import { FloatingBrandObjects } from "@/components/animation/FloatingBrandObjects";
import SafeImage from "@/components/common/SafeImage";

export default function SnackAttackHomePage() {
  const [products, setProducts] = useState<PackagedFoodProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const all = await ProductRepository.getAllProducts({ brandConceptId: "snack-attack" });
      setProducts(all);
      setLoading(false);
    }
    loadData();
  }, []);

  const heroItem = products.find((p) => p.slug === "masala-chips") || products[0];

  return (
    <div className="flex-1 flex flex-col relative overflow-hidden">
      <FloatingBrandObjects brandId="snack-attack" count={6} />

      {/* Hero Section */}
      <section className="relative bg-[#FF5400] text-black border-b-4 border-black pt-12 pb-16 md:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text Col */}
          <div className="lg:col-span-7 space-y-6 z-10">
            {/* Top pill */}
            <div className="inline-flex items-center gap-2 bg-[#FFD60A] border-3 border-black px-4 py-1 rounded-full shadow-[3px_3px_0px_#000] rotate-[-2deg]">
              <Flame className="w-4 h-4 fill-black text-black" />
              <span className="font-black text-xs uppercase tracking-wider">
                INDIA'S BOLDEST SNACK PROTOCOL
              </span>
            </div>

            {/* Oversized Display Typography */}
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.88] text-white drop-shadow-[5px_5px_0px_#000]">
              ZERO CHILL. <br />
              <span className="text-[#FFD60A] drop-shadow-[5px_5px_0px_#000]">MAXIMUM</span> <br />
              CRUNCH.
            </h1>

            <p className="text-base sm:text-lg font-bold text-black/90 max-w-xl leading-relaxed bg-[#FFFDF5] p-4 border-3 border-black shadow-[4px_4px_0px_#000]">
              Handcrafted in small batches with cold-pressed oils, Rajasthani red chillies, and 100% real Indian ingredients. No bland mass-market junk.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/concept-c-snackattack/shop"
                className="bg-[#FFD60A] text-black font-black text-sm uppercase tracking-wider px-8 py-4 border-3 border-black shadow-[5px_5px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[3px_3px_0px_#000] transition-all inline-flex items-center gap-2"
              >
                <span>Snatch The Stash</span>
                <ArrowRight className="w-5 h-5 stroke-[3]" />
              </Link>
              <Link
                href="/concept-c-snackattack/our-story"
                className="bg-white text-black font-black text-sm uppercase tracking-wider px-6 py-4 border-3 border-black shadow-[5px_5px_0px_#000] hover:bg-[#FF007F] hover:text-white transition-all"
              >
                Read Manifesto
              </Link>
            </div>

            {/* Indian Trust Badges */}
            <div className="pt-4 flex flex-wrap items-center gap-4 text-xs font-mono font-bold text-black/80">
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 stroke-[3]" /> 100% Vegetarian
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 stroke-[3]" /> Zero Palm Oil
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 stroke-[3]" /> INR Pricing
              </span>
            </div>
          </div>

          {/* Right Hero Image Card */}
          <div className="lg:col-span-5 relative z-10">
            <div className="relative mx-auto max-w-md bg-white border-4 border-black rounded-3xl p-6 shadow-[10px_10px_0px_#000] rotate-2 hover:rotate-0 transition-transform">
              {/* Sticker Ribbon */}
              <div className="absolute -top-4 -right-4 bg-[#FF007F] text-white font-black text-xs uppercase px-4 py-1.5 border-3 border-black shadow-[3px_3px_0px_#000] rotate-12">
                CRUNCH CERTIFIED ⚡
              </div>

              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#FFD60A] border-3 border-black mb-4">
                <SafeImage
                  src={heroItem?.primaryImage || "/images/products/kettle-cooked-sea-salt-crisps.jpg"}
                  alt={heroItem?.name || "Desi Fire Masala Chips"}
                  concept="snack-attack"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase font-bold text-[#FF5400]">
                    FEATURED DROP #01
                  </span>
                  <span className="font-black text-lg text-black">
                    ₹{heroItem?.packSizes?.[0]?.priceInr || 99}
                  </span>
                </div>
                <h3 className="font-black text-2xl uppercase tracking-tight text-black">
                  {heroItem?.name || "Desi Fire Masala Chips"}
                </h3>
                <p className="text-xs text-neutral-700 font-medium line-clamp-2">
                  {heroItem?.subtitle || "Kettle-cooked golden potatoes tossed in roasted Mathania chillies, amchur & rock salt."}
                </p>
                <Link
                  href={`/concept-c-snackattack/product/${heroItem?.slug || "masala-chips"}`}
                  className="block w-full py-3 bg-[#FF5400] text-black font-black uppercase text-xs text-center border-2 border-black shadow-[3px_3px_0px_#000] hover:bg-[#FFD60A] transition-colors"
                >
                  View Details &amp; Order &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Banner */}
      <div className="bg-[#FFD60A] border-b-4 border-black py-2.5">
        <MarqueeBanner
          items={[
            "10/10 SPICE BOMBER 🔥",
            "RATLAM TEEKHA SEV",
            "MIND-BLOWING DESI POTATO CHIPS",
            "ZERO TRANS FAT",
            "DOPAMINE DELIVERY ACROSS INDIA",
            "AUTHENTIC HIMALAYAN SALT POPCORN",
          ]}
          speedSec={20}
          itemClassName="font-black text-sm uppercase tracking-wider text-black"
        />
      </div>

      {/* Featured Drops Grid */}
      <section className="py-16 md:py-24 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-block bg-[#FF007F] text-white font-black text-xs uppercase px-3 py-1 border-2 border-black shadow-[2px_2px_0px_#000] mb-2">
              THE ARSENAL
            </div>
            <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-black">
              CRAVE-KILLING SNACK LINEUP
            </h2>
          </div>
          <Link
            href="/concept-c-snackattack/shop"
            className="font-black text-xs uppercase tracking-wider text-black underline underline-offset-4 hover:text-[#FF5400] flex items-center gap-1 self-start md:self-auto"
          >
            <span>Browse Full Catalogue ({products.length} Products)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product) => (
            <SnackProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Experimental Brand Banner Strip */}
      <section className="bg-black text-white border-y-4 border-black py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 border-3 border-zinc-800 rounded-2xl bg-[#141414] shadow-[4px_4px_0px_#FF5400]">
            <div className="text-4xl mb-3">🔥</div>
            <h3 className="font-black text-xl uppercase tracking-tight text-[#FFD60A] mb-2">
              REAL DESI SPICES
            </h3>
            <p className="text-xs font-mono text-zinc-400">
              Stone-ground amchur, Kashmiri mirch, and Tellicherry black pepper. No synthetic chili sprays.
            </p>
          </div>

          <div className="p-6 border-3 border-zinc-800 rounded-2xl bg-[#141414] shadow-[4px_4px_0px_#FF007F]">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="font-black text-xl uppercase tracking-tight text-[#FF007F] mb-2">
              THUNDERING CRUNCH
            </h3>
            <p className="text-xs font-mono text-zinc-400">
              Kettle-fried at exact temperatures to guarantee a loud, satisfying snap that wakes up your brain.
            </p>
          </div>

          <div className="p-6 border-3 border-zinc-800 rounded-2xl bg-[#141414] shadow-[4px_4px_0px_#FFD60A]">
            <div className="text-4xl mb-3">📦</div>
            <h3 className="font-black text-xl uppercase tracking-tight text-[#FF5400] mb-2">
              EXPRESS DISPATCH
            </h3>
            <p className="text-xs font-mono text-zinc-400">
              Packed fresh in airtight nitrogen-flushed zipper pouches. Shipped across India in 48 hours.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
