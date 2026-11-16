"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { BrandConceptId, getBrandMeta } from "@/types/brand";

export interface BrandIntroCurtainProps {
  brandId: BrandConceptId;
  durationMs?: number;
  brandName?: string;
  tagline?: string;
}

export function BrandIntroCurtain({
  brandId,
  durationMs = 1200,
  brandName,
  tagline,
}: BrandIntroCurtainProps) {
  const [isVisible, setIsVisible] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, durationMs);
    return () => clearTimeout(timer);
  }, [durationMs]);

  if (shouldReduceMotion || !isVisible) return null;

  const meta = getBrandMeta(brandId);
  const displayName = brandName || meta.name;
  const displayTagline = tagline || meta.tagline;

  const brandStyles: Partial<
    Record<
      BrandConceptId,
      {
        bg: string;
        titleClass: string;
        taglineClass: string;
        badgeText: string;
        borderClass: string;
      }
    >
  > = {
    "pop-cult": {
      bg: "bg-[#FFE600] text-black",
      titleClass: "font-black tracking-tight uppercase text-6xl md:text-8xl text-black",
      taglineClass: "font-black text-white bg-[#FF2A85] px-4 py-1.5 text-sm tracking-widest uppercase mt-4 border-2 border-black shadow-[4px_4px_0px_#000]",
      badgeText: "⚡ POP CULT • MAXIMALIST GEN-Z FOOD VIBES ⚡",
      borderClass: "border-4 border-black",
    },
    "pop-snacks": {
      bg: "bg-[#FFE600] text-black",
      titleClass: "font-black tracking-tight uppercase text-6xl md:text-8xl text-black",
      taglineClass: "font-black text-white bg-[#FF2A85] px-4 py-1.5 text-sm tracking-widest uppercase mt-4 border-2 border-black shadow-[4px_4px_0px_#000]",
      badgeText: "⚡ POP SNACKS • MAXIMALIST GEN-Z FOOD VIBES ⚡",
      borderClass: "border-4 border-black",
    },
    "snack-attack": {
      bg: "bg-[#FFE600] text-black",
      titleClass: "font-black tracking-tight uppercase text-6xl md:text-8xl text-black",
      taglineClass: "font-black text-white bg-[#FF2A85] px-4 py-1.5 text-sm tracking-widest uppercase mt-4 border-2 border-black shadow-[4px_4px_0px_#000]",
      badgeText: "⚡ SNACK ATTACK • MAXIMALIST SNACK CULTURE ⚡",
      borderClass: "border-4 border-black",
    },
    "pure-co": {
      bg: "bg-[#FAF7F2] text-[#1E3A2F]",
      titleClass: "font-serif font-light tracking-wide text-5xl md:text-7xl text-[#1E3A2F]",
      taglineClass: "font-sans tracking-widest text-xs uppercase text-[#4A5844] mt-4",
      badgeText: "PURE & CO. • ORGANIC NUTRITION & LUXURY WELLNESS",
      borderClass: "border border-[#E5E0D5]",
    },
    "goodness-co": {
      bg: "bg-[#FAF7F2] text-[#1E3A2F]",
      titleClass: "font-serif font-light tracking-wide text-5xl md:text-7xl text-[#1E3A2F]",
      taglineClass: "font-sans tracking-widest text-xs uppercase text-[#4A5844] mt-4",
      badgeText: "GOODNESS CO. • ORGANIC NUTRITION & LUXURY WELLNESS",
      borderClass: "border border-[#E5E0D5]",
    },
    "good-mood-foods": {
      bg: "bg-[#FAF7F2] text-[#1E3A2F]",
      titleClass: "font-serif font-light tracking-wide text-5xl md:text-7xl text-[#1E3A2F]",
      taglineClass: "font-sans tracking-widest text-xs uppercase text-[#4A5844] mt-4",
      badgeText: "GOOD MOOD FOODS • BOTANICAL WELLNESS",
      borderClass: "border border-[#E5E0D5]",
    },
    "crunch-mode": {
      bg: "bg-[#0A0A0A] text-[#E0E0E0]",
      titleClass: "font-mono font-black uppercase text-5xl md:text-7xl text-[#CCFF00] tracking-tighter",
      taglineClass: "font-mono text-xs uppercase tracking-widest text-[#A0A0A0] mt-4",
      badgeText: "⚡ CRUNCH MODE // NEO-BRUTALIST TASTE ARCHITECTURE ⚡",
      borderClass: "border-2 border-[#CCFF00]",
    },
    "crave-cult": {
      bg: "bg-[#0A0A0A] text-[#E0E0E0]",
      titleClass: "font-mono font-black uppercase text-5xl md:text-7xl text-[#CCFF00] tracking-tighter",
      taglineClass: "font-mono text-xs uppercase tracking-widest text-[#A0A0A0] mt-4",
      badgeText: "⚡ CRAVE CULT // NEO-BRUTALIST FOOD MATRIX ⚡",
      borderClass: "border-2 border-[#CCFF00]",
    },
    "crunch-cult": {
      bg: "bg-[#0A0A0A] text-[#E0E0E0]",
      titleClass: "font-mono font-black uppercase text-5xl md:text-7xl text-[#CCFF00] tracking-tighter",
      taglineClass: "font-mono text-xs uppercase tracking-widest text-[#A0A0A0] mt-4",
      badgeText: "⚡ CRUNCH CULT // SUBVERSIVE SNACKING SYNDICATE ⚡",
      borderClass: "border-2 border-[#CCFF00]",
    },
    "happy-bites": {
      bg: "bg-[#FFF8F0] text-[#5C3D2E]",
      titleClass: "font-sans font-black tracking-tight text-5xl md:text-7xl text-[#FF6B6B]",
      taglineClass: "font-sans text-sm font-medium text-[#7D5A50] mt-4",
      badgeText: "✨ HAPPY BITES • SCRAPBOOK COMFORT SNACKS ✨",
      borderClass: "border-2 border-dashed border-[#FFB4A2]",
    },
    "happy-cravings": {
      bg: "bg-[#FFF8F0] text-[#5C3D2E]",
      titleClass: "font-sans font-black tracking-tight text-5xl md:text-7xl text-[#FF6B6B]",
      taglineClass: "font-sans text-sm font-medium text-[#7D5A50] mt-4",
      badgeText: "✨ HAPPY CRAVINGS • CUTE PASTEL SNACKS ✨",
      borderClass: "border-2 border-dashed border-[#FFB4A2]",
    },
  };

  const currentStyle = brandStyles[brandId] || brandStyles["pop-cult"]!;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20, transition: { duration: 0.5, ease: "easeInOut" } }}
          className={`fixed inset-0 z-50 flex flex-col items-center justify-center pointer-events-none ${currentStyle.bg}`}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className={`p-8 md:p-12 text-center rounded-2xl max-w-xl mx-4 ${currentStyle.borderClass}`}
          >
            <span className="text-[11px] font-mono font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-black/10 inline-block mb-3">
              {currentStyle.badgeText}
            </span>
            <h1 className={currentStyle.titleClass}>{displayName}</h1>
            <p className={currentStyle.taglineClass}>{displayTagline}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default BrandIntroCurtain;
