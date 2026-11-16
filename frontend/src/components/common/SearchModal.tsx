"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, X, ArrowRight, Star, Sparkles, Clock } from "lucide-react";
import { DEMO_PRODUCTS, DemoProduct } from "@/lib/demo-catalog";
import SafeImage from "./SafeImage";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  concept?: "flavourverse" | "purepantry" | "snackattack";
  conceptRoutePrefix?: string;
}

export default function SearchModal({
  isOpen,
  onClose,
  concept = "flavourverse",
  conceptRoutePrefix,
}: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const prefix =
    conceptRoutePrefix ||
    (concept === "flavourverse"
      ? "/concept-a-flavourverse"
      : concept === "purepantry"
      ? "/concept-b-purepantry"
      : "/concept-c-snackattack");

  const tags = ["Gluten-Free", "Vegan", "100% Organic", "Zero Refined Sugar", "Keto-Friendly"];
  const popularSearches = ["Sorghum Crisps", "74% Dark Bar", "Kashmiri Walnuts", "White Peach Soda", "Granola"];

  const results = useMemo(() => {
    return DEMO_PRODUCTS.filter((product) => {
      const matchesQuery =
        !query.trim() ||
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.ingredients.toLowerCase().includes(query.toLowerCase()) ||
        product.category.name.toLowerCase().includes(query.toLowerCase());

      const matchesTag = !selectedTag || product.dietaryTags.includes(selectedTag);

      return matchesQuery && matchesTag;
    });
  }, [query, selectedTag]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-4 sm:pt-20 p-2 sm:p-4">
      {/* Backdrop */}
      <div onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-md" />

      <div className="relative w-full max-w-2xl bg-[#141414] border border-white/15 rounded-2xl shadow-2xl overflow-hidden z-10 text-white animate-in fade-in duration-150">
        {/* Search Input Bar */}
        <div className="flex items-center px-6 py-4 border-b border-white/10 gap-3">
          <Search className="w-5 h-5 text-neutral-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search provisions, ingredients, chocolates, drinks..."
            className="w-full bg-transparent text-white placeholder:text-neutral-500 text-sm focus:outline-none font-sans"
          />
          {query && (
            <button onClick={() => setQuery("")} className="text-neutral-400 hover:text-white text-xs font-mono">
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Popular Searches Pills */}
        {!query && (
          <div className="px-6 py-3 border-b border-white/5 bg-black/40 flex items-center gap-2 overflow-x-auto text-xs font-mono">
            <span className="text-neutral-500 shrink-0 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" /> Popular:
            </span>
            {popularSearches.map((term) => (
              <button
                key={term}
                onClick={() => setQuery(term)}
                className="px-2.5 py-1 rounded-full bg-white/5 text-neutral-300 hover:bg-white/15 hover:text-white transition-colors shrink-0 text-[11px]"
              >
                {term}
              </button>
            ))}
          </div>
        )}

        {/* Filter Tags */}
        <div className="px-6 py-2.5 border-b border-white/5 bg-black/20 flex items-center gap-2 overflow-x-auto text-xs font-mono">
          <span className="text-neutral-500 shrink-0">Filter:</span>
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
              className={`px-3 py-0.5 rounded-full shrink-0 transition-all text-[11px] ${
                selectedTag === tag
                  ? "bg-[#FF9F1C] text-black font-semibold"
                  : "bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-4 divide-y divide-white/5">
          {results.length === 0 ? (
            <div className="text-center py-12 text-neutral-400 text-sm font-mono">
              No provisions found matching &ldquo;{query}&rdquo;.
            </div>
          ) : (
            results.map((product) => (
              <Link
                key={product.id}
                href={`${prefix}/product/${product.slug}`}
                onClick={onClose}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors group"
              >
                <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-neutral-900 border border-white/10 shrink-0">
                  <SafeImage
                    src={product.images.primary}
                    alt={product.name}
                    concept={concept}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-mono uppercase text-[#FF9F1C]">
                    {product.category.name}
                  </span>
                  <h4 className="text-sm font-semibold text-white group-hover:underline truncate">
                    {product.name}
                  </h4>
                  <p className="text-xs text-neutral-400 truncate font-mono">
                    {product.packSizes[0]?.title} ({product.packSizes[0]?.netQuantity}) • ₹{product.price}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-white shrink-0 group-hover:translate-x-1 transition-transform" />
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
export { SearchModal };
