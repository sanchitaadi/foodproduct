"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { 
  Filter, 
  Search, 
  SlidersHorizontal, 
  Sparkles, 
  Check, 
  ArrowRight,
  PackageSearch
} from "lucide-react";
import { DEMO_PRODUCTS, DemoProduct } from "@/lib/demo-catalog";
import MegaMenuHeader from "@/components/common/MegaMenuHeader";
import ProductCard from "@/components/common/ProductCard";
import { ConceptKey, getConceptTheme } from "./conceptTheme";

const CATEGORIES = [
  { name: "All Categories", slug: "all" },
  { name: "Salty Obsessions", slug: "salty-obsessions" },
  { name: "Liquid Happiness", slug: "liquid-happiness" },
  { name: "Chocolate Therapy", slug: "chocolate-therapy" },
  { name: "Better Bites", slug: "better-bites" },
  { name: "Pantry Essentials", slug: "pantry-essentials" },
  { name: "Sweet Cravings", slug: "sweet-cravings" },
];

const DIETARY_FILTERS = [
  "All",
  "Gluten-Free",
  "Vegan",
  "Organic",
  "High-Protein",
  "Zero Refined Sugar",
];

export default function ConceptShopPage({ concept }: { concept: ConceptKey }) {
  const theme = getConceptTheme(concept);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDiet, setSelectedDiet] = useState("All");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo(() => {
    return DEMO_PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== "all" && product.category.slug !== selectedCategory) {
        return false;
      }
      // Dietary filter
      if (selectedDiet !== "All") {
        const matchesDiet = (product.dietaryTags || []).some(
          (d: string) => d.toLowerCase().replace(/[-\s]/g, "") === selectedDiet.toLowerCase().replace(/[-\s]/g, "")
        );
        if (!matchesDiet) return false;
      }
      // Search filter
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const matches =
          product.name.toLowerCase().includes(q) ||
          (product.subtitle && product.subtitle.toLowerCase().includes(q)) ||
          (product.description && product.description.toLowerCase().includes(q));
        if (!matches) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return (b.rating || 4.5) - (a.rating || 4.5);
      return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
    });
  }, [selectedCategory, selectedDiet, sortBy, searchQuery]);

  return (
    <div className={`min-h-screen flex flex-col ${theme.bgClass}`}>
      <MegaMenuHeader concept={concept} />

      {/* Header Banner */}
      <section className={`py-12 px-4 sm:px-6 lg:px-8 border-b ${theme.bannerClass}`}>
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest opacity-80">
            <Link href={theme.basePath} className="hover:underline">Home</Link>
            <span>/</span>
            <span>All Provisions</span>
          </div>
          <h1 className={`text-3xl sm:text-5xl font-black tracking-tight ${theme.fontClass}`}>
            THE COMPLETE PANTRY ARCHIVE
          </h1>
          <p className="max-w-2xl text-sm sm:text-base opacity-85">
            Explore 12 clean-label, artisan packaged food formulations. 100% compliant with FSSAI statutory nutritional declarations and batch testing.
          </p>
        </div>
      </section>

      {/* Main Catalog View */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
        {/* Filter & Sort Controls */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center pb-8 border-b border-current/10">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50" />
            <input
              type="text"
              placeholder="Search by flavor, ingredient, or recipe..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/10 border border-current/15 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9F1C]"
            />
          </div>

          {/* Sort selector */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono uppercase opacity-70 shrink-0">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 rounded-xl bg-black/10 border border-current/15 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#FF9F1C]"
            >
              <option value="featured">Featured / Bestsellers</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-none border-b border-current/10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.slug
                  ? theme.btnPrimaryClass
                  : "bg-black/10 hover:bg-black/20 opacity-80 hover:opacity-100"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Dietary Pills */}
        <div className="flex items-center gap-2 overflow-x-auto py-3 text-xs">
          <span className="text-[11px] font-mono uppercase opacity-60 mr-2 shrink-0">Dietary:</span>
          {DIETARY_FILTERS.map((diet) => (
            <button
              key={diet}
              onClick={() => setSelectedDiet(diet)}
              className={`px-3 py-1 rounded-lg text-[11px] font-mono transition-all ${
                selectedDiet === diet
                  ? "bg-emerald-600 text-white font-bold"
                  : "bg-black/5 hover:bg-black/15 opacity-75"
              }`}
            >
              {diet}
            </button>
          ))}
        </div>

        {/* Results Counter */}
        <div className="py-4 text-xs font-mono opacity-70 flex justify-between items-center">
          <span>Showing {filteredProducts.length} of {DEMO_PRODUCTS.length} provisions</span>
          {(selectedCategory !== "all" || selectedDiet !== "All" || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSelectedDiet("All");
                setSearchQuery("");
              }}
              className="underline hover:opacity-100 font-bold"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                concept={concept}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center space-y-4">
            <PackageSearch className="w-12 h-12 mx-auto opacity-40" />
            <h3 className="text-xl font-bold">No provisions match your criteria</h3>
            <p className="text-sm opacity-70">Try resetting filters or searching for another flavor profile.</p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSelectedDiet("All");
                setSearchQuery("");
              }}
              className={`px-6 py-2.5 rounded-xl text-xs uppercase font-bold ${theme.btnPrimaryClass}`}
            >
              Reset Filters
            </button>
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
