"use client";

import React from "react";
import Link from "next/link";
import MegaMenuHeader from "@/components/common/MegaMenuHeader";
import NewsletterSection from "@/components/common/NewsletterSection";
import { ConceptKey, getConceptTheme } from "./conceptTheme";
import { ArrowLeft, Sparkles, ShieldCheck, Heart, Award, CheckCircle2 } from "lucide-react";

export default function ConceptOurStoryPage({ concept }: { concept: ConceptKey }) {
  const theme = getConceptTheme(concept);

  return (
    <div className={`min-h-screen flex flex-col ${theme.bgClass}`}>
      <MegaMenuHeader concept={concept} />

      {/* Hero Banner */}
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
            <span>Our Culinary Philosophy</span>
          </div>
          <h1 className={`text-4xl sm:text-6xl font-bold tracking-tight ${theme.fontClass}`}>
            The Story Behind Peachy Plate
          </h1>
          <p className="text-base sm:text-lg opacity-85 max-w-2xl mx-auto leading-relaxed">
            Reinventing Indian packaged foods through ancient crops, ethical harvesting, and uncompromising culinary integrity.
          </p>
        </div>
      </section>

      {/* Story Narrative */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12 flex-1">
        <div className="space-y-6 text-sm sm:text-base leading-relaxed opacity-90">
          <h2 className="text-2xl sm:text-3xl font-bold font-serif">
            A New Standard for Packaged Provisions
          </h2>
          <p>
            Peachy Plate was founded on a simple truth: packaged food should never be a compromise. For decades, supermarket shelves across India have been dominated by ultra-processed snacks laden with palm oil, excess sodium, and chemical enhancers.
          </p>
          <p>
            We set out to create something different—single-origin dark chocolate from Malabar, slow-roasted Mamra almonds from the valleys of Kashmir, and popped Himalayan sorghum crispness. Every provision in our catalog is clean-label, 100% vegetarian, and backed by complete statutory FSSAI compliance.
          </p>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div className="p-6 rounded-2xl bg-white/5 border border-current/15 space-y-3">
            <Sparkles className="w-6 h-6 text-[#FF9F1C]" />
            <h3 className="font-bold text-base">Ethical Single Harvest</h3>
            <p className="text-xs opacity-75 leading-relaxed">
              Direct partnerships with smallholder farms across Kerala, Kashmir, and Rajasthan ensure fair prices and extraordinary crop quality.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-current/15 space-y-3">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
            <h3 className="font-bold text-base">FSSAI Labelling Rigor</h3>
            <p className="text-xs opacity-75 leading-relaxed">
              Every package carries verifiable nutritional disclosures, ICMR-NIN RDA contributions, allergen warnings, and clean ingredients.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-current/15 space-y-3">
            <Award className="w-6 h-6 text-amber-400" />
            <h3 className="font-bold text-base">Fresh Small Batches</h3>
            <p className="text-xs opacity-75 leading-relaxed">
              We produce in strictly controlled, micro-batches to guarantee that what arrives at your doorstep has peak crispness and aromatic oils.
            </p>
          </div>
        </div>

        {/* Call to action */}
        <div className="p-8 rounded-2xl bg-white/5 border border-current/15 text-center space-y-4">
          <h3 className="text-xl font-bold font-serif">Experience The Difference</h3>
          <p className="text-xs opacity-75 max-w-md mx-auto">
            Discover our curated provisions with free pan-India cold delivery on orders over ₹499.
          </p>
          <Link
            href={`${theme.basePath}/shop`}
            className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-xs uppercase tracking-wider ${theme.btnPrimaryClass}`}
          >
            <span>Explore The Pantry</span>
          </Link>
        </div>
      </main>

      <NewsletterSection concept={concept} />
    </div>
  );
}
