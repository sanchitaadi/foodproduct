"use client";

import React, { useState } from "react";
import { DEMO_PRODUCTS, DemoProduct } from "@/lib/demo-catalog";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/useToast";
import SafeImage from "@/components/common/SafeImage";
import { Plus, Check, ShoppingBag, Sparkles } from "lucide-react";
import Link from "next/link";

interface FrequentlyBoughtTogetherProps {
  currentProduct: DemoProduct;
  concept: "flavourverse" | "purepantry" | "snackattack";
}

export default function FrequentlyBoughtTogether({
  currentProduct,
  concept,
}: FrequentlyBoughtTogetherProps) {
  const { addItem, openCart } = useCart();
  const { addToast } = useToast();
  const [added, setAdded] = useState(false);

  // Pick complementary product
  const complementary =
    DEMO_PRODUCTS.find(
      (p) => p.id !== currentProduct.id && p.category.slug !== currentProduct.category.slug
    ) || DEMO_PRODUCTS[(currentProduct.id % DEMO_PRODUCTS.length)];

  const totalPrice = currentProduct.price + complementary.price;
  const bundlePrice = Math.round(totalPrice * 0.9); // 10% bundle discount
  const savings = totalPrice - bundlePrice;

  const handleAddBoth = () => {
    addItem(currentProduct, currentProduct.packSizes[0], 1);
    addItem(complementary, complementary.packSizes[0], 1);
    setAdded(true);
    addToast(
      "Bundle Added to Tote",
      `Saved ₹${savings} with pairing discount!`
    );
    setTimeout(() => setAdded(false), 2000);
  };

  const conceptPath =
    concept === "flavourverse"
      ? "concept-a-flavourverse"
      : concept === "purepantry"
      ? "concept-b-purepantry"
      : "concept-c-snackattack";

  return (
    <div
      className={`p-6 rounded-3xl border mt-8 ${
        concept === "flavourverse"
          ? "bg-[#241021] border-[#4A2544] text-[#FFF4E8]"
          : concept === "purepantry"
          ? "bg-white border-[#E2DDD3] text-[#2B2D2F]"
          : "bg-white border-3 border-black shadow-[6px_6px_0px_#000] text-black"
      }`}
    >
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-black/10">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-amber-500 font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Frequently Bought Together</span>
          </div>
          <h3
            className={`text-lg font-bold mt-0.5 ${
              concept === "flavourverse"
                ? "font-serif text-white"
                : concept === "purepantry"
                ? "font-serif text-[#4A5844]"
                : "font-black uppercase"
            }`}
          >
            The Perfect Culinary Pairing
          </h3>
        </div>
        <span className="text-[11px] font-mono font-bold bg-amber-500/20 text-amber-600 px-2.5 py-1 rounded-full">
          Save 10%
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
        {/* Visual Pair */}
        <div className="sm:col-span-7 flex items-center gap-3">
          {/* Item 1 */}
          <div className="flex-1 flex items-center gap-2">
            <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-neutral-900 border border-black/10 flex-shrink-0">
              <SafeImage
                src={currentProduct.images.primary}
                alt={currentProduct.name}
                concept={concept}
                fill
                className="object-cover"
              />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold truncate">{currentProduct.name}</div>
              <div className="text-[11px] font-mono opacity-70">₹{currentProduct.price}</div>
            </div>
          </div>

          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-black/10 text-xs font-bold flex-shrink-0">
            <Plus className="w-3.5 h-3.5" />
          </div>

          {/* Item 2 */}
          <div className="flex-1 flex items-center gap-2">
            <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-neutral-900 border border-black/10 flex-shrink-0">
              <SafeImage
                src={complementary.images.primary}
                alt={complementary.name}
                concept={concept}
                fill
                className="object-cover"
              />
            </div>
            <div className="min-w-0">
              <Link
                href={`/${conceptPath}/product/${complementary.slug}`}
                className="text-xs font-bold truncate hover:underline block"
              >
                {complementary.name}
              </Link>
              <div className="text-[11px] font-mono opacity-70">₹{complementary.price}</div>
            </div>
          </div>
        </div>

        {/* Pricing & CTA */}
        <div className="sm:col-span-5 flex flex-col sm:items-end justify-center pt-2 sm:pt-0 border-t sm:border-t-0 sm:border-l border-black/10 sm:pl-4">
          <div className="text-right mb-2">
            <div className="text-xs text-neutral-400 line-through">Total: ₹{totalPrice}</div>
            <div className="text-base font-black">
              Combo: <span className="text-emerald-500">₹{bundlePrice}</span>
            </div>
          </div>

          <button
            onClick={handleAddBoth}
            className={`w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${
              concept === "flavourverse"
                ? "bg-[#FF9F1C] text-black hover:bg-[#ffa938]"
                : concept === "purepantry"
                ? "bg-[#4A5844] text-white hover:bg-[#3D4938]"
                : "bg-[#70E000] text-black border-2 border-black shadow-[2px_2px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5"
            }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Pairing Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Add Both to Tote</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
