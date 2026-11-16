"use client";

import React from "react";
import Link from "next/link";
import { useComparison } from "@/hooks/useComparison";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/useToast";
import { DEMO_PRODUCTS } from "@/lib/demo-catalog";
import SafeImage from "@/components/common/SafeImage";
import { X, Trash2, ShoppingBag, ShieldCheck, Check, Sparkles } from "lucide-react";

export default function ProductComparisonModal() {
  const { comparedProductIds, isOpen, closeComparison, removeFromCompare, clearComparison } = useComparison();
  const { addItem, openCart } = useCart();
  const { addToast } = useToast();

  if (!isOpen || comparedProductIds.length === 0) return null;

  const comparedProducts = DEMO_PRODUCTS.filter((p) => comparedProductIds.includes(p.id));

  const handleAddComparedToCart = (product: typeof DEMO_PRODUCTS[0]) => {
    addItem(product, product.packSizes[0], 1);
    addToast(`Added ${product.name} to Tote`, `₹${product.price}`);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-end sm:items-center justify-center p-3 sm:p-6"
      onClick={closeComparison}
    >
      <div
        className="max-w-6xl w-full bg-[#1A161F] text-white border border-[#FF9F1C]/40 p-6 sm:p-8 rounded-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-lg bg-[#FF9F1C]/20 text-[#FF9F1C]">
              <Sparkles className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-xl font-bold font-serif uppercase tracking-wider text-white">
                Provisions Specification Comparison
              </h2>
              <p className="text-xs font-mono text-neutral-400">
                Side-by-side FSSAI nutrition facts, serving weight, and ingredient metrics.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={clearComparison}
              className="text-xs font-mono text-neutral-400 hover:text-rose-400 px-3 py-1.5 border border-white/10 rounded-lg"
            >
              Clear All
            </button>
            <button
              onClick={closeComparison}
              className="text-xs font-mono text-neutral-400 hover:text-white p-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Comparison Grid */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-4 px-4 w-44 text-neutral-400 uppercase text-[11px]">Specification</th>
                {comparedProducts.map((p) => (
                  <th key={p.id} className="py-4 px-4 min-w-[200px] align-top">
                    <div className="relative aspect-square w-24 h-24 rounded-xl overflow-hidden mb-3 bg-black/40 border border-white/10">
                      <SafeImage
                        src={p.images.primary}
                        alt={p.name}
                        concept="flavourverse"
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => removeFromCompare(p.id)}
                        className="absolute top-1 right-1 p-1 bg-black/70 rounded text-neutral-400 hover:text-rose-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="font-bold text-sm text-white font-sans">{p.name}</div>
                    <div className="text-[#FF9F1C] font-bold text-base mt-1">₹{p.price}</div>
                    <button
                      onClick={() => handleAddComparedToCart(p)}
                      className="mt-3 w-full py-2 bg-[#FF9F1C] text-black font-bold uppercase rounded-lg text-[10px] hover:bg-[#ffa938] flex items-center justify-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Tote</span>
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <tr>
                <td className="py-3 px-4 font-bold text-neutral-400">Category</td>
                {comparedProducts.map((p) => (
                  <td key={p.id} className="py-3 px-4 text-white">{p.category.name}</td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-neutral-400">Pack Variant</td>
                {comparedProducts.map((p) => (
                  <td key={p.id} className="py-3 px-4 text-slate-300">
                    {p.packSizes[0]?.title} ({p.packSizes[0]?.netQuantity})
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-neutral-400">Energy (Calories)</td>
                {comparedProducts.map((p) => (
                  <td key={p.id} className="py-3 px-4 text-[#FF9F1C] font-bold">
                    {p.nutrition.energyKcal} kcal
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-neutral-400">Protein</td>
                {comparedProducts.map((p) => (
                  <td key={p.id} className="py-3 px-4 text-white">
                    {p.nutrition.proteinG}g
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-neutral-400">Total Dietary Fiber</td>
                {comparedProducts.map((p) => (
                  <td key={p.id} className="py-3 px-4 text-white">
                    {p.nutrition.dietaryFiberG}g
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-neutral-400">Total Fats</td>
                {comparedProducts.map((p) => (
                  <td key={p.id} className="py-3 px-4 text-white">
                    {p.nutrition.totalFatG}g (Trans fat: {p.nutrition.transFatG}g)
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-neutral-400">Sodium Level</td>
                {comparedProducts.map((p) => (
                  <td key={p.id} className="py-3 px-4 text-white">
                    {p.nutrition.sodiumMg} mg
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-neutral-400">FSSAI Status</td>
                {comparedProducts.map((p) => (
                  <td key={p.id} className="py-3 px-4 text-emerald-400">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> Verified
                    </span>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
