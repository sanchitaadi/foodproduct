"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { DEMO_PRODUCTS } from "@/lib/demo-catalog";
import MegaMenuHeader from "@/components/common/MegaMenuHeader";
import ProductCard from "@/components/common/ProductCard";
import { ConceptKey, getConceptTheme } from "./conceptTheme";

const CATEGORY_NAMES: Record<string, { title: string; desc: string }> = {
  "salty-obsessions": {
    title: "Salty Obsessions",
    desc: "Single-origin sorghum puffs, roasted Himalayan kernels, and cracked-pepper crisps. Crafted for savory perfection.",
  },
  "liquid-happiness": {
    title: "Liquid Happiness",
    desc: "Botanical fizzy sodas, wild white peach nectars, and fermented adaptogen elixirs.",
  },
  "chocolate-therapy": {
    title: "Chocolate Therapy",
    desc: "Single-estate 74% Malabar dark chocolate, sea salt crumbles, and heritage cacao bars.",
  },
  "better-bites": {
    title: "Better Bites",
    desc: "Slow-roasted jumbo Mamra almonds, Kashmiri walnuts, and organic nutrient-dense trail mixes.",
  },
  "pantry-essentials": {
    title: "Pantry Essentials",
    desc: "A2 cultured bilona ghee, raw wild forest honey, and ancient stoneground spice blends.",
  },
  "sweet-cravings": {
    title: "Sweet Cravings",
    desc: "Wild berry energy drops, unrefined palm jaggery bites, and crunchy cocoa biscuits.",
  },
};

export default function ConceptCategoryPage({
  concept,
  slug,
}: {
  concept: ConceptKey;
  slug: string;
}) {
  const theme = getConceptTheme(concept);
  const info = CATEGORY_NAMES[slug] || {
    title: slug.replace(/-/g, " ").toUpperCase(),
    desc: "Handcrafted packaged food provisions formulated with pure ingredients.",
  };

  const products = DEMO_PRODUCTS.filter((p) => p.category.slug === slug);

  return (
    <div className={`min-h-screen flex flex-col ${theme.bgClass}`}>
      <MegaMenuHeader concept={concept} />

      {/* Hero Banner */}
      <section className={`py-12 px-4 sm:px-6 lg:px-8 border-b ${theme.bannerClass}`}>
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider opacity-70">
            <Link href={theme.basePath} className="hover:underline">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href={`${theme.basePath}/shop`} className="hover:underline">Collections</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="opacity-100 font-bold">{info.title}</span>
          </div>

          <h1 className={`text-3xl sm:text-5xl font-black uppercase tracking-tight ${theme.fontClass}`}>
            {info.title}
          </h1>
          <p className="max-w-2xl text-sm sm:text-base opacity-85 leading-relaxed">
            {info.desc}
          </p>
        </div>
      </section>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-current/10 text-xs font-mono opacity-80">
          <span>{products.length} provisions in this collection</span>
          <Link href={`${theme.basePath}/shop`} className="inline-flex items-center gap-1 hover:underline">
            <ArrowLeft className="w-3 h-3" />
            <span>View All Provisions</span>
          </Link>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} concept={concept} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center space-y-4">
            <p className="text-base opacity-75">No provisions found under this specific collection.</p>
            <Link
              href={`${theme.basePath}/shop`}
              className={`inline-block px-6 py-2.5 rounded-xl text-xs uppercase font-bold ${theme.btnPrimaryClass}`}
            >
              Back to Catalog
            </Link>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-auto border-t border-current/10 py-10 px-4 text-center text-xs font-mono opacity-70">
        <p>© 2026 Peachy Plate Foods Ltd. • {theme.name} Edition • FSSAI Lic. No. 10019022009876</p>
      </footer>
    </div>
  );
}
