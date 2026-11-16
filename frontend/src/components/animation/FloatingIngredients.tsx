"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import SafeImage from "../common/SafeImage";

interface FloatingIngredientsProps {
  concept: "flavourverse" | "purepantry" | "snackattack";
  className?: string;
}

export function FloatingIngredients({ concept, className = "" }: FloatingIngredientsProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return null;

  if (concept === "flavourverse") {
    return (
      <div className={`absolute inset-0 pointer-events-none overflow-hidden z-10 ${className}`}>
        {/* Floating Cacao Nib */}
        <motion.div
          animate={{
            y: [-12, 12, -12],
            rotate: [-6, 6, -6],
            x: [0, 8, 0],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-16 left-[8%] w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-[#FF9F1C]/30 shadow-2xl overflow-hidden backdrop-blur-sm bg-black/40"
        >
          <SafeImage
            src="/images/ingredients/cacao-beans.jpg"
            alt="Single-origin cacao"
            concept="flavourverse"
            fill
            className="object-cover opacity-80 hover:scale-110 transition-transform"
          />
        </motion.div>

        {/* Floating Golden Saffron Shimmer */}
        <motion.div
          animate={{
            y: [10, -15, 10],
            rotate: [10, -10, 10],
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-24 right-[10%] w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-[#FF9F1C]/40 shadow-2xl overflow-hidden backdrop-blur-sm bg-black/40"
        >
          <SafeImage
            src="/images/ingredients/golden-almonds.jpg"
            alt="Golden almond"
            concept="flavourverse"
            fill
            className="object-cover opacity-85 hover:scale-110 transition-transform"
          />
        </motion.div>

        {/* Glowing Culinary Ambient Light */}
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-[#FF9F1C]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#D62839]/15 rounded-full blur-3xl" />
      </div>
    );
  }

  if (concept === "purepantry") {
    return (
      <div className={`absolute inset-0 pointer-events-none overflow-hidden z-10 ${className}`}>
        {/* Sunlight Flare */}
        <motion.div
          animate={{
            opacity: [0.35, 0.65, 0.35],
            scale: [1, 1.08, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 -right-20 w-96 h-96 bg-[#FAF0CA]/50 rounded-full blur-3xl pointer-events-none"
        />

        {/* Floating Mountain Walnut */}
        <motion.div
          animate={{
            y: [-8, 10, -8],
            rotate: [-4, 4, -4],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-[12%] w-16 h-16 sm:w-20 sm:h-20 rounded-2xl shadow-xl overflow-hidden border border-[#4A5844]/20 bg-white/60 backdrop-blur-sm"
        >
          <SafeImage
            src="/images/ingredients/mountain-walnut.jpg"
            alt="Mountain walnut"
            concept="purepantry"
            fill
            className="object-cover opacity-90"
          />
        </motion.div>

        {/* Floating Ancient Grains */}
        <motion.div
          animate={{
            y: [12, -10, 12],
            rotate: [5, -5, 5],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute bottom-20 left-[10%] w-16 h-16 sm:w-20 sm:h-20 rounded-2xl shadow-xl overflow-hidden border border-[#4A5844]/20 bg-white/60 backdrop-blur-sm"
        >
          <SafeImage
            src="/images/ingredients/ancient-grains.jpg"
            alt="Harvest grains"
            concept="purepantry"
            fill
            className="object-cover opacity-90"
          />
        </motion.div>
      </div>
    );
  }

  // Concept C: snackattack
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden z-10 ${className}`}>
      {/* Floating Crisp Badge */}
      <motion.div
        animate={{
          y: [-15, 15, -15],
          rotate: [-12, 12, -12],
        }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-12 left-[6%] border-2 border-black bg-[#FFB703] text-black font-black text-xs px-3 py-1.5 rounded-full shadow-[3px_3px_0px_#000]"
      >
        💥 CRUNCH ALERT!
      </motion.div>

      {/* Floating 10/10 Crunch Factor */}
      <motion.div
        animate={{
          y: [14, -14, 14],
          rotate: [8, -8, 8],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute bottom-16 right-[8%] border-2 border-black bg-[#70E000] text-black font-black text-xs px-3 py-1.5 rounded-xl shadow-[3px_3px_0px_#000]"
      >
        ⚡ ZERO BORING BITES
      </motion.div>

      {/* Floating Peach Pop */}
      <motion.div
        animate={{
          scale: [0.95, 1.05, 0.95],
          rotate: [-5, 5, -5],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-28 right-[15%] w-14 h-14 rounded-2xl border-2 border-black bg-[#FF6B6B] overflow-hidden shadow-[4px_4px_0px_#000]"
      >
        <SafeImage
          src="/images/ingredients/wild-peach.jpg"
          alt="Wild peach pop"
          concept="snackattack"
          fill
          className="object-cover"
        />
      </motion.div>
    </div>
  );
}

export default FloatingIngredients;
