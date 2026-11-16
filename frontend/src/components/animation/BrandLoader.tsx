"use client";

import React from "react";
import { motion } from "framer-motion";
import { BrandConceptId } from "@/types/brand";

interface BrandLoaderProps {
  brandId: BrandConceptId;
  message?: string;
  className?: string;
}

export function BrandLoader({ brandId, message, className = "" }: BrandLoaderProps) {
  switch (brandId) {
    case "flavourverse":
      return (
        <div className={`flex flex-col items-center justify-center p-8 text-center bg-[#1F0E1C] ${className}`}>
          <motion.div
            animate={{
              rotate: [0, 180, 360],
              scale: [0.95, 1.05, 0.95],
            }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-16 h-16 rounded-2xl bg-[#FF9F1C]/20 border border-[#FF9F1C] flex items-center justify-center text-3xl mb-4 text-[#FF9F1C]"
          >
            ✦
          </motion.div>
          <span className="font-serif italic text-[#FFF4E8] text-sm tracking-widest uppercase">
            {message || "Curating Culinary Atelier..."}
          </span>
        </div>
      );

    case "purepantry":
      return (
        <div className={`flex flex-col items-center justify-center p-8 text-center bg-[#FAF7F2] ${className}`}>
          <motion.div
            animate={{
              scale: [0.95, 1.08, 0.95],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
            className="w-14 h-14 rounded-full bg-[#EBF1EC] border border-[#1E3A2F]/30 flex items-center justify-center text-2xl mb-4 text-[#1E3A2F]"
          >
            🌿
          </motion.div>
          <span className="font-sans text-[#1E3A2F] text-sm tracking-wide">
            {message || "Nourishing with clean provisions..."}
          </span>
        </div>
      );

    case "snackattack":
    default:
      return (
        <div className={`flex flex-col items-center justify-center p-8 text-center bg-[#FFE600] ${className}`}>
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.15, 0.95, 1],
            }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
            className="w-16 h-16 rounded-2xl bg-[#FF2A85] border-4 border-black shadow-[4px_4px_0px_#000] flex items-center justify-center text-3xl mb-4"
          >
            ⚡
          </motion.div>
          <span className="font-black text-black uppercase tracking-wider text-sm bg-white px-3 py-1 border-2 border-black shadow-[2px_2px_0px_#000]">
            {message || "MAXIMUM CRUNCH LOADING..."}
          </span>
        </div>
      );
  }
}

export default BrandLoader;
