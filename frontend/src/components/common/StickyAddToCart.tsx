"use client";

import React, { useEffect, useState } from "react";
import { DemoProduct, PackSizeOption } from "@/lib/demo-catalog";
import SafeImage from "@/components/common/SafeImage";
import { ShoppingBag, Check } from "lucide-react";

interface StickyAddToCartProps {
  product: DemoProduct;
  selectedPackSize: PackSizeOption;
  onAddToCart: () => void;
  concept: "flavourverse" | "purepantry" | "snackattack";
}

export default function StickyAddToCart({
  product,
  selectedPackSize,
  onAddToCart,
  concept,
}: StickyAddToCartProps) {
  const [visible, setVisible] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    onAddToCart();
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 px-2 sm:px-4 py-2 sm:py-3 animate-in slide-in-from-bottom duration-300">
      <div
        className={`max-w-4xl mx-auto rounded-2xl p-2.5 sm:p-4 flex items-center justify-between gap-2 sm:gap-4 shadow-2xl backdrop-blur-md border ${
          concept === "flavourverse"
            ? "bg-[#1A0B18]/95 border-[#FF9F1C]/40 text-[#FFF4E8]"
            : concept === "purepantry"
            ? "bg-[#F7F4EE]/95 border-[#4A5844]/30 text-[#2B2D2F]"
            : "bg-white/95 border-2 border-black shadow-[4px_4px_0px_#000] text-black"
        }`}
      >
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden flex-shrink-0 bg-neutral-900 border border-black/10">
            <SafeImage
              src={product.images.primary}
              alt={product.name}
              concept={concept}
              fill
              className="object-cover"
            />
          </div>
          <div className="min-w-0">
            <h4
              className={`text-xs sm:text-sm font-bold truncate max-w-[140px] sm:max-w-xs ${
                concept === "flavourverse"
                  ? "font-serif text-white"
                  : concept === "purepantry"
                  ? "font-serif text-[#4A5844]"
                  : "font-black uppercase"
              }`}
            >
              {product.name}
            </h4>
            <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs opacity-75 font-mono">
              <span className="truncate">{selectedPackSize.packSize}</span>
              <span>•</span>
              <span className="font-bold">₹{selectedPackSize.price}</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleClick}
          className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2 sm:py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex-shrink-0 ${
            concept === "flavourverse"
              ? "bg-[#FF9F1C] text-black hover:bg-[#ffa938] shadow-lg shadow-amber-500/20"
              : concept === "purepantry"
              ? "bg-[#4A5844] text-white hover:bg-[#3D4938]"
              : "bg-[#70E000] text-black border-2 border-black shadow-[2px_2px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
          }`}
        >
          {justAdded ? (
            <>
              <Check className="w-4 h-4 stroke-[3]" />
              <span>Added</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Bag • ₹{selectedPackSize.price}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
