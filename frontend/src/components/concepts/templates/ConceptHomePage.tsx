"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Leaf, Zap, ArrowRight, ShieldCheck } from "lucide-react";
import { DEMO_PRODUCTS } from "@/lib/demo-catalog";
import MegaMenuHeader from "@/components/common/MegaMenuHeader";
import ProductCard from "@/components/common/ProductCard";
import ProductOfTheWeekSection from "@/components/common/ProductOfTheWeekSection";
import ExploreByMoodSection from "@/components/common/ExploreByMoodSection";
import CompleteTheCollectionSection from "@/components/common/CompleteTheCollectionSection";
import RecentlyViewedSection from "@/components/common/RecentlyViewedSection";
import NewsletterSection from "@/components/common/NewsletterSection";
import PinCodeChecker from "@/components/common/PinCodeChecker";
import { ConceptKey, getConceptTheme } from "./conceptTheme";

export default function ConceptHomePage({ concept }: { concept: ConceptKey }) {
  const theme = getConceptTheme(concept);
  const bestsellers = DEMO_PRODUCTS.filter((p) => p.isBestseller).slice(0, 4);

  const heroImage =
    concept === "flavourverse"
      ? "https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=800&q=80"
      : concept === "purepantry"
      ? "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80"
      : "https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=800&q=80";

  return (
    <div className={`min-h-screen flex flex-col ${theme.bgClass} selection:bg-[#FF9F1C] selection:text-black`}>
      <MegaMenuHeader concept={concept} />

      {/* Hero Section */}
      <section className={`relative overflow-hidden pt-12 pb-20 md:py-28 px-4 sm:px-6 lg:px-8 ${theme.bannerClass}`}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest ${theme.badgeClass}`}>
              {concept === "flavourverse" && <Sparkles className="w-3.5 h-3.5" />}
              {concept === "purepantry" && <Leaf className="w-3.5 h-3.5" />}
              {concept === "snackattack" && <Zap className="w-3.5 h-3.5 fill-black" />}
              <span>{theme.code} • {theme.name}</span>
            </div>

            <h1 className={`text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] ${theme.fontClass}`}>
              {concept === "flavourverse" && (
                <>
                  CRAFTED FOR <br />
                  <span className="italic font-light text-[#FF9F1C]">CULINARY SOULS</span> &amp; SENSORY MINDS.
                </>
              )}
              {concept === "purepantry" && (
                <>
                  NOURISH MINDFULLY. <br />
                  <span className="italic font-light text-[#C86D51]">SAVOR HONESTLY.</span>
                </>
              )}
              {concept === "snackattack" && (
                <>
                  UNAPOLOGETIC <br />
                  <span className="text-[#70E000] drop-shadow-[4px_4px_0px_#000]">CRUNCH.</span> <br />
                  ZERO CHILL.
                </>
              )}
            </h1>

            <p className="text-base sm:text-lg opacity-85 font-normal max-w-xl leading-relaxed">
              {concept === "flavourverse" &&
                "Single-estate Malabar dark chocolate, slow-popped Himalayan sorghum, and cold botanical elixirs. Packaged with zero compromise, backed by rigorous FSSAI compliance."}
              {concept === "purepantry" &&
                "Warm terracotta, deep sage, raw linen textures, and serene serif typography. Focused on clean-label transparency, FSSAI nutrition tables, and whole provisions."}
              {concept === "snackattack" &&
                "Hyper-vibrant pop art, electric neon lime, hot peach, and neo-brutalist solid black drop-shadows. Crafted for crave-chasers and crunch obsessives."}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href={`${theme.basePath}/shop`}
                className={`inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all ${theme.btnPrimaryClass}`}
              >
                <span>Explore Provisions</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/"
                className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all ${theme.btnSecondaryClass}`}
              >
                <span>Back to 3 Concepts Launchpad</span>
              </Link>
            </div>

            {/* Trust strip */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-current/15 text-xs font-mono opacity-80">
              <div>
                <span className="font-bold block text-sm">100% CLEAN</span>
                <span>Zero palm oil or HFCS</span>
              </div>
              <div>
                <span className="font-bold block text-sm">FSSAI AUDITED</span>
                <span>Statutory batch testing</span>
              </div>
              <div>
                <span className="font-bold block text-sm">PAN-INDIA</span>
                <span>24-48 hr dispatch</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-current/20 shadow-2xl p-4 bg-black/20">
              <img
                src={heroImage}
                alt={theme.name}
                className="rounded-xl w-full h-[380px] object-cover"
              />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl backdrop-blur-md bg-black/70 border border-white/10 text-xs text-white">
                <span className="text-[#FF9F1C] font-mono font-bold uppercase tracking-wider block mb-1">
                  Artisanal Harvest of the Season
                </span>
                <span className="font-bold text-base block font-serif">
                  {concept === "flavourverse"
                    ? "Single-Estate Malabar Dark Bar (74%)"
                    : concept === "purepantry"
                    ? "Slow-Roasted Mamra Almonds & Pecan Crunch"
                    : "Kettle-Cooked Smoked Sea Salt Crisps"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pincode Serviceability */}
      <section className="py-6 px-4 max-w-7xl mx-auto w-full">
        <PinCodeChecker concept={concept} />
      </section>

      {/* Bestsellers */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest opacity-60 block mb-2">
              Curated Selection
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold">
              Bestselling Culinary Provisions
            </h2>
          </div>
          <Link
            href={`${theme.basePath}/shop`}
            className="text-xs font-mono underline opacity-70 hover:opacity-100 flex items-center gap-1"
          >
            <span>View All Provisions</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestsellers.map((product) => (
            <ProductCard key={product.id} product={product} concept={concept} />
          ))}
        </div>
      </section>

      {/* Product of the Week */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <ProductOfTheWeekSection concept={concept} productId={concept === "flavourverse" ? 3 : concept === "purepantry" ? 4 : 1} />
      </section>

      {/* Explore By Mood */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <ExploreByMoodSection concept={concept} />
      </section>

      {/* Complete Collection */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <CompleteTheCollectionSection concept={concept} />
      </section>

      {/* Recently Viewed */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <RecentlyViewedSection concept={concept} />
      </section>

      {/* Newsletter */}
      <NewsletterSection concept={concept} />
    </div>
  );
}
