"use client";

import React, { useState } from "react";
import { DEMO_PRODUCTS, DemoProduct } from "@/lib/demo-catalog";
import ProductCard from "@/components/common/ProductCard";
import { Sparkles, Cookie, Flame, Zap, Droplets, Apple } from "lucide-react";

interface ExploreByMoodSectionProps {
  concept: "flavourverse" | "purepantry" | "snackattack";
}

type MoodType = "all" | "sweet" | "salty" | "crunchy" | "refreshing";

export default function ExploreByMoodSection({ concept }: ExploreByMoodSectionProps) {
  const [selectedMood, setSelectedMood] = useState<MoodType>("sweet");

  const moods: { id: MoodType; label: string; icon: React.ComponentType<{ className?: string }>; tag: string }[] = [
    { id: "sweet", label: "Sweet Cravings", icon: Cookie, tag: "Cacao & Confectionery" },
    { id: "salty", label: "Salty Obsessions", icon: Flame, tag: "Gourmet Crisps & Sea Salt" },
    { id: "crunchy", label: "Maximum Crunch", icon: Zap, tag: "Mamra Almonds & Pecans" },
    { id: "refreshing", label: "Liquid Refresh", icon: Droplets, tag: "Prebiotic Fruit Sodas" },
    { id: "all", label: "Complete Archive", icon: Sparkles, tag: "All 12 Artisan Provisions" },
  ];

  const filteredProducts = DEMO_PRODUCTS.filter((product) => {
    if (selectedMood === "all") return true;
    if (selectedMood === "sweet") return product.category.mood === "sweet" || product.category.mood === "chocolate";
    if (selectedMood === "salty") return product.category.mood === "salty";
    if (selectedMood === "crunchy") return product.category.mood === "better-bites" || product.slug.includes("granola") || product.slug.includes("crisps");
    if (selectedMood === "refreshing") return product.category.mood === "liquid";
    return true;
  });

  return (
    <section
      className={`py-24 px-6 border-b ${
        concept === "flavourverse"
          ? "bg-[#140812] border-[#3D2439] text-[#FFF4E8]"
          : concept === "purepantry"
          ? "bg-[#F4F6F0] border-[#E3E8DC] text-[#1E3A2F]"
          : "bg-white border-b-4 border-black text-black"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-widest bg-amber-500/15 text-amber-400 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Sensory Compass</span>
          </div>
          <h2
            className={`text-3xl sm:text-5xl font-bold uppercase tracking-tight mb-3 ${
              concept === "flavourverse"
                ? "font-serif text-white"
                : concept === "purepantry"
                ? "font-serif text-[#1E3A2F]"
                : "font-black italic transform -rotate-1"
            }`}
          >
            Explore By Sensory Mood
          </h2>
          <p className="text-sm font-mono opacity-80 leading-relaxed">
            Select your immediate appetite profile to filter our pantry provisions in real-time.
          </p>

          {/* Mood Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-8">
            {moods.map((m) => {
              const Icon = m.icon;
              const isSelected = selectedMood === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setSelectedMood(m.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 text-xs font-mono uppercase tracking-wider transition-all border ${
                    isSelected
                      ? concept === "flavourverse"
                        ? "bg-[#FF9F1C] text-black border-[#FF9F1C] font-bold shadow-lg shadow-amber-500/20"
                        : concept === "purepantry"
                        ? "bg-[#1E3A2F] text-white border-[#1E3A2F] font-semibold rounded-full"
                        : "bg-black text-[#FFE600] border-2 border-black font-black shadow-[3px_3px_0_0_#FF2A85]"
                      : concept === "purepantry"
                      ? "bg-white text-[#1E3A2F]/70 border-[#E3E8DC] hover:border-[#1E3A2F] rounded-full"
                      : "bg-black/20 text-neutral-300 border-neutral-700/40 hover:border-neutral-500"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{m.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Live Filtered Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} concept={concept} />
          ))}
        </div>
      </div>
    </section>
  );
}
