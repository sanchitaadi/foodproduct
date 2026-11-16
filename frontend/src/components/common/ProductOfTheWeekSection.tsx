"use client";

import React, { useState } from "react";
import Link from "next/link";
import { DEMO_PRODUCTS } from "@/lib/demo-catalog";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/useToast";
import SafeImage from "@/components/common/SafeImage";
import { Sparkles, ShoppingBag, ShieldCheck, ArrowRight, Star, Check } from "lucide-react";

interface ProductOfTheWeekProps {
  concept: "flavourverse" | "purepantry" | "snackattack";
  productId?: number;
}

export default function ProductOfTheWeekSection({
  concept,
  productId = 3, // Single-Estate Malabar Dark Bar 74%
}: ProductOfTheWeekProps) {
  const { addItem, openCart } = useCart();
  const { addToast } = useToast();
  const [selectedPackIndex, setSelectedPackIndex] = useState(0);
  const [isAdded, setIsAdded] = useState(false);

  const product = DEMO_PRODUCTS.find((p) => p.id === productId) || DEMO_PRODUCTS[2];
  const packOption = product.packSizes[selectedPackIndex] || product.packSizes[0];

  const handleQuickAdd = () => {
    addItem(product, packOption, 1);
    setIsAdded(true);
    addToast(`Added ${product.name} to Tote`, `${packOption.title} • ₹${packOption.price}`);
    setTimeout(() => setIsAdded(false), 1600);
  };

  const conceptPath =
    concept === "flavourverse"
      ? "concept-a-flavourverse"
      : concept === "purepantry"
      ? "concept-b-purepantry"
      : "concept-c-snackattack";

  return (
    <section
      className={`py-24 px-6 border-b relative overflow-hidden ${
        concept === "flavourverse"
          ? "bg-gradient-to-r from-[#200A1D] via-[#2D1229] to-[#160814] text-[#FFF4E8] border-[#3D2439]"
          : concept === "purepantry"
          ? "bg-[#FAF7F2] text-[#1E3A2F] border-[#E3E8DC]"
          : "bg-[#FFE600] text-black border-b-4 border-black"
      }`}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Big Feature Photography (6 cols) */}
        <div className="lg:col-span-6 relative">
          <div
            className={`relative aspect-[4/3] sm:aspect-square w-full overflow-hidden shadow-2xl ${
              concept === "flavourverse"
                ? "border-2 border-[#FF9F1C]/40 bg-black/40"
                : concept === "purepantry"
                ? "rounded-3xl border border-[#E3E8DC] bg-white shadow-lg"
                : "border-4 border-black bg-white shadow-[8px_8px_0_0_#000]"
            }`}
          >
            <SafeImage
              src={product.images.primary}
              alt={product.name}
              concept={concept}
              priority
              className="w-full h-full object-cover"
            />

            <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
              <span
                className={`px-3 py-1 text-xs font-mono font-bold uppercase tracking-widest ${
                  concept === "flavourverse"
                    ? "bg-[#D62839] text-white"
                    : concept === "purepantry"
                    ? "bg-[#1E3A2F] text-white rounded-full"
                    : "bg-black text-[#FFE600] border-2 border-black"
                }`}
              >
                PROVISION OF THE WEEK
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Editorial Dossier & Direct Actions (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest opacity-80">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{product.category.name} • Single Estate Reserve</span>
            </div>
            <h2
              className={`text-3xl sm:text-5xl font-black uppercase tracking-tight leading-tight ${
                concept === "flavourverse"
                  ? "font-serif text-white"
                  : concept === "purepantry"
                  ? "font-serif text-[#1E3A2F]"
                  : "text-black italic transform -rotate-1"
              }`}
            >
              {product.name}
            </h2>
            <p className="text-sm font-mono opacity-80 leading-relaxed max-w-xl">
              {product.subtitle}
            </p>
          </div>

          <p className="text-sm leading-relaxed opacity-90 max-w-xl font-serif italic">
            &ldquo;{product.story}&rdquo;
          </p>

          {/* Quick Specifications Strip */}
          <div className="grid grid-cols-3 gap-3 max-w-md text-xs font-mono py-3 border-y border-neutral-700/20">
            <div>
              <span className="opacity-60 block text-[10px] uppercase">Energy</span>
              <span className="font-bold text-amber-400">{product.nutrition.energyKcal} kcal</span>
            </div>
            <div>
              <span className="opacity-60 block text-[10px] uppercase">Protein</span>
              <span className="font-bold">{product.nutrition.proteinG}g</span>
            </div>
            <div>
              <span className="opacity-60 block text-[10px] uppercase">FSSAI Status</span>
              <span className="font-bold text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Certified
              </span>
            </div>
          </div>

          {/* Pack Options */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider mb-2 opacity-80 font-bold">
              Select Curated Pack:
            </label>
            <div className="flex flex-wrap gap-2">
              {product.packSizes.map((ps, idx) => (
                <button
                  key={ps.id}
                  onClick={() => setSelectedPackIndex(idx)}
                  className={`px-4 py-2 border text-xs font-mono transition-all ${
                    selectedPackIndex === idx
                      ? concept === "flavourverse"
                        ? "border-[#FF9F1C] bg-[#FF9F1C] text-black font-bold"
                        : concept === "purepantry"
                        ? "border-[#1E3A2F] bg-[#1E3A2F] text-white font-bold rounded-full"
                        : "border-2 border-black bg-black text-[#FFE600] font-black"
                      : "border-neutral-700/40 opacity-70 hover:opacity-100"
                  }`}
                >
                  {ps.title} ({ps.netQuantity}) • ₹{ps.price}
                </button>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={handleQuickAdd}
              className={`px-8 py-4 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-xl ${
                concept === "flavourverse"
                  ? isAdded
                    ? "bg-emerald-500 text-white"
                    : "bg-[#FF9F1C] hover:bg-[#ffa938] text-black"
                  : concept === "purepantry"
                  ? isAdded
                    ? "bg-emerald-600 text-white rounded-full"
                    : "bg-[#1E3A2F] hover:bg-[#274c3d] text-white rounded-full font-semibold"
                  : isAdded
                  ? "bg-emerald-500 text-black border-3 border-black font-black"
                  : "bg-[#FF2A85] text-white font-black border-3 border-black shadow-[4px_4px_0_0_#000] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Added to Tote!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Claim Provision • ₹{packOption.price}</span>
                </>
              )}
            </button>

            <Link
              href={`/${conceptPath}/product/${product.slug}`}
              className="text-xs font-mono uppercase tracking-widest font-bold opacity-80 hover:opacity-100 hover:underline flex items-center gap-1.5"
            >
              <span>View Full Dossier</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
