"use client";

import React, { useState } from "react";
import { DEMO_PRODUCTS, DemoProduct } from "@/lib/demo-catalog";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/useToast";
import SafeImage from "@/components/common/SafeImage";
import BundleBuilderModal from "@/components/common/BundleBuilderModal";
import { Sparkles, ShoppingBag, Plus, Check, ArrowRight, Layers } from "lucide-react";

interface CompleteTheCollectionSectionProps {
  concept: "flavourverse" | "purepantry" | "snackattack";
}

export default function CompleteTheCollectionSection({ concept }: CompleteTheCollectionSectionProps) {
  const { addItem, openCart } = useCart();
  const { addToast } = useToast();
  const [isBundleOpen, setIsBundleOpen] = useState(false);

  // Pair: Single-Estate Chocolate (3) + White Peach Soda (4)
  const pairA = DEMO_PRODUCTS[2];
  const pairB = DEMO_PRODUCTS[3];
  const pairTotal = pairA.price + pairB.price;
  const comboPrice = Math.round(pairTotal * 0.9); // 10% combo discount

  const handleAddPairToCart = () => {
    addItem(pairA, pairA.packSizes[0], 1);
    addItem(pairB, pairB.packSizes[0], 1);
    addToast(
      "Added Perfect Pairing to Tote",
      `${pairA.name} + ${pairB.name} (Special Pairing: ₹${comboPrice})`
    );
    openCart();
  };

  return (
    <>
      <section
        className={`py-24 px-6 border-b ${
          concept === "flavourverse"
            ? "bg-[#1E0D1B] border-[#3D2439] text-[#FFF4E8]"
            : concept === "purepantry"
            ? "bg-[#FAF7F2] border-[#E3E8DC] text-[#1E3A2F]"
            : "bg-[#FFE600] border-b-4 border-black text-black"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Perfect Pairing Box (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest bg-amber-500/20 text-amber-400 font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Chef & Sommelier Pairing of the Month</span>
              </div>

              <h2
                className={`text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight ${
                  concept === "flavourverse"
                    ? "font-serif text-white"
                    : concept === "purepantry"
                    ? "font-serif text-[#1E3A2F]"
                    : "font-black"
                }`}
              >
                Complete The Tasting Experience
              </h2>

              <p className="text-sm font-mono opacity-80 leading-relaxed max-w-xl">
                The rich, bittersweet astringency of 74% Malabar dark chocolate balanced by the crisp botanical effervescence of wild white peach nectar.
              </p>

              {/* Pair Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-black/30 border border-white/10 flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-black relative flex-shrink-0">
                    <SafeImage
                      src={pairA.images.primary}
                      alt={pairA.name}
                      concept={concept}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-mono opacity-70 uppercase">Provision 01</div>
                    <div className="text-xs font-bold truncate">{pairA.name}</div>
                    <div className="text-xs font-mono text-amber-400 font-bold">₹{pairA.price}</div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-black/30 border border-white/10 flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-black relative flex-shrink-0">
                    <SafeImage
                      src={pairB.images.primary}
                      alt={pairB.name}
                      concept={concept}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-mono opacity-70 uppercase">Provision 02</div>
                    <div className="text-xs font-bold truncate">{pairB.name}</div>
                    <div className="text-xs font-mono text-amber-400 font-bold">₹{pairB.price}</div>
                  </div>
                </div>
              </div>

              {/* Add Both Button */}
              <div className="flex flex-wrap items-center gap-4 pt-3">
                <button
                  onClick={handleAddPairToCart}
                  className="px-8 py-3.5 bg-amber-400 hover:bg-amber-300 text-black font-bold uppercase text-xs tracking-wider rounded-xl flex items-center gap-2 transition-all shadow-lg"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add Complementary Pair to Tote • ₹{comboPrice}</span>
                </button>

                <span className="text-xs font-mono opacity-70 line-through">
                  ₹{pairTotal}
                </span>
                <span className="text-xs font-mono text-emerald-400 font-bold">
                  (10% Pairing Incentive)
                </span>
              </div>
            </div>

            {/* Right: Custom Collection Builder CTA Card (5 cols) */}
            <div className="lg:col-span-5">
              <div
                className={`p-8 rounded-3xl border shadow-xl flex flex-col justify-between space-y-6 ${
                  concept === "flavourverse"
                    ? "bg-[#2A1426] border-[#FF9F1C]/40 text-[#FFF4E8]"
                    : concept === "purepantry"
                    ? "bg-white border-[#E3E8DC] text-[#1E3A2F]"
                    : "bg-white border-4 border-black text-black shadow-[8px_8px_0_0_#000]"
                }`}
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
                    <Layers className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold font-serif uppercase tracking-tight mb-2">
                    Custom Tasting Collection
                  </h3>
                  <p className="text-xs font-mono opacity-80 leading-relaxed mb-4">
                    Assemble your dream 3 to 6 product provision parcel. Pick and mix crisps, artisan chocolate, sodas, and dried fruits with tiered bundle savings.
                  </p>

                  <div className="space-y-2 text-xs font-mono opacity-80">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <span>3 Items: Automatic 10% Reduction</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <span>4+ Items: Automatic 15% Reduction</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setIsBundleOpen(true)}
                  className="w-full py-4 rounded-xl bg-[#FF9F1C] hover:bg-[#ffa938] text-black font-bold uppercase text-xs tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <span>Open Collection Builder</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      <BundleBuilderModal
        isOpen={isBundleOpen}
        onClose={() => setIsBundleOpen(false)}
        concept={concept}
      />
    </>
  );
}
