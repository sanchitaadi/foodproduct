"use client";

import React, { useEffect, useState } from "react";
import { useComparison } from "@/hooks/useComparison";
import { Scale, X, ArrowRight } from "lucide-react";

interface ComparisonFloatingBarProps {
  concept: "flavourverse" | "purepantry" | "snackattack";
}

export default function ComparisonFloatingBar({ concept }: ComparisonFloatingBarProps) {
  const { comparedProductIds, openComparison, clearComparison } = useComparison();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || comparedProductIds.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div
        className={`flex items-center gap-3 px-4 py-2.5 rounded-full shadow-2xl backdrop-blur-md border ${
          concept === "flavourverse"
            ? "bg-[#1C0B1B]/95 border-[#FF9F1C] text-[#FFF4E8]"
            : concept === "purepantry"
            ? "bg-[#F7F4EE]/95 border-[#4A5844] text-[#2B2D2F]"
            : "bg-[#FFE600] border-2 border-black shadow-[4px_4px_0px_#000] text-black"
        }`}
      >
        <button
          onClick={openComparison}
          className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider hover:opacity-80 transition-opacity"
        >
          <Scale className="w-4 h-4 text-amber-500" />
          <span>
            Compare ({comparedProductIds.length}/4) Specs
          </span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={clearComparison}
          className="p-1 rounded-full hover:bg-black/10 transition-colors opacity-70 hover:opacity-100"
          title="Clear comparison"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
