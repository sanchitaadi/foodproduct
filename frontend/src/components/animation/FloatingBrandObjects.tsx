"use client";

import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { BrandConceptId } from "@/types/brand";

interface FloatingBrandObjectsProps {
  brandId: BrandConceptId;
  count?: number;
  className?: string;
}

export function FloatingBrandObjects({
  brandId,
  count = 6,
  className = "",
}: FloatingBrandObjectsProps) {
  const shouldReduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || shouldReduceMotion) return null;

  const renderItem = (index: number) => {
    switch (brandId) {
      case "flavourverse": {
        const atelierPillars = [
          { symbol: "✦", text: "Curated Provisions" },
          { symbol: "◈", text: "Artisanal Single-Origin" },
          { symbol: "★", text: "Michelin-Grade Palate" },
          { symbol: "✦", text: "Culinary Atelier" },
          { symbol: "◈", text: "Heritage Spices" },
          { symbol: "★", text: "Zero Added Preservatives" },
        ];
        const p = atelierPillars[index % atelierPillars.length];
        return (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1F0E1C]/80 border border-[#FF9F1C]/40 text-xs font-serif text-[#FF9F1C] shadow-lg select-none backdrop-blur-sm">
            <span>{p.symbol}</span>
            <span className="italic tracking-wider">{p.text}</span>
          </div>
        );
      }

      case "purepantry": {
        const items = [
          { symbol: "🌱", label: "Cold-Pressed" },
          { symbol: "✨", label: "Clean Label" },
          { symbol: "🌾", label: "Foxtail Millet" },
          { symbol: "🍃", label: "Stone-Ground" },
          { symbol: "☀️", label: "Mindful Nourishment" },
          { symbol: "🫐", label: "Polyphenol Rich" },
        ];
        const item = items[index % items.length];
        return (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-[#E5E0D5] text-xs font-sans text-[#1E3A2F] shadow-sm select-none">
            <span>{item.symbol}</span>
            <span className="font-medium">{item.label}</span>
          </div>
        );
      }

      case "snackattack":
      default: {
        const stickers = [
          { text: "10/10 CRUNCH ⚡", bg: "bg-[#FFE600]", rotate: -8 },
          { text: "MAX FLAVOUR 🔥", bg: "bg-[#FF2A85] text-white", rotate: 6 },
          { text: "SPICE OVERLOAD", bg: "bg-black text-[#FFE600]", rotate: -5 },
          { text: "ZERO CHILL 💥", bg: "bg-[#00E5FF]", rotate: 10 },
          { text: "SNACK ATTACK!", bg: "bg-white text-black", rotate: -12 },
          { text: "LOUD CRUNCH", bg: "bg-[#FF2A85] text-white", rotate: 4 },
        ];
        const s = stickers[index % stickers.length];
        return (
          <div
            className={`px-3 py-1 font-black text-xs uppercase tracking-wider border-2 border-black shadow-[3px_3px_0px_#000] select-none ${s.bg}`}
            style={{ transform: `rotate(${s.rotate}deg)` }}
          >
            {s.text}
          </div>
        );
      }
    }
  };

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {Array.from({ length: count }).map((_, i) => {
        const randomX = (i * 16 + 8) % 85;
        const randomDuration = 12 + (i % 4) * 3;
        const randomDelay = i * 1.5;

        return (
          <motion.div
            key={i}
            initial={{ y: "110%", opacity: 0 }}
            animate={{
              y: "-20%",
              opacity: [0, 0.75, 0.75, 0],
            }}
            transition={{
              duration: randomDuration,
              delay: randomDelay,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              position: "absolute",
              left: `${randomX}%`,
            }}
          >
            {renderItem(i)}
          </motion.div>
        );
      })}
    </div>
  );
}

export default FloatingBrandObjects;
