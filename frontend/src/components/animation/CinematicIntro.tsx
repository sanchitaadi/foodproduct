"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Sparkles, FastForward } from "lucide-react";

interface CinematicIntroProps {
  concept: "flavourverse" | "purepantry" | "snackattack";
  title: string;
  tagline: string;
}

export function CinematicIntro({ concept, title, tagline }: CinematicIntroProps) {
  const [isVisible, setIsVisible] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // Show opening curtain for 1.4s, then slide away
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1400);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsVisible(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (shouldReduceMotion || !isVisible) return null;

  const bgConfig = {
    flavourverse: "bg-[#140812] text-[#FFF4E8]",
    purepantry: "bg-[#F4F6F0] text-[#1E3A2F]",
    snackattack: "bg-[#FFE600] text-black",
  }[concept];

  const accentColor = {
    flavourverse: "#FF9F1C",
    purepantry: "#88B04B",
    snackattack: "#FF2A85",
  }[concept];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
          className={`fixed inset-0 z-50 flex flex-col items-center justify-center p-6 ${bgConfig}`}
        >
          {/* Skip Intro Button */}
          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-6 right-6 px-3.5 py-1.5 rounded-full border border-current/20 hover:border-current text-xs font-mono uppercase tracking-widest flex items-center gap-1.5 transition-all opacity-70 hover:opacity-100 z-10"
          >
            <span>Skip Intro [ESC]</span>
            <FastForward className="w-3 h-3" />
          </button>

          {/* Central Logo & Tagline Reveal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.05, y: -20 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="text-center space-y-4 max-w-xl relative"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
              <span className="text-[11px] font-mono uppercase tracking-[0.3em] font-semibold opacity-80">
                PEACHY PLATE PROVISIONS
              </span>
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
            </div>

            <h1
              className={`text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight leading-none ${
                concept === "flavourverse"
                  ? "font-serif text-[#FF9F1C]"
                  : concept === "purepantry"
                  ? "font-serif text-[#1E3A2F]"
                  : "italic transform -rotate-1 text-black"
              }`}
            >
              {title}
            </h1>

            <div
              className={`inline-block px-4 py-1.5 border text-xs tracking-widest uppercase font-mono ${
                concept === "flavourverse"
                  ? "border-[#FF9F1C]/40 text-[#F5B99C]"
                  : concept === "purepantry"
                  ? "border-[#1E3A2F]/30 text-[#1E3A2F]"
                  : "border-2 border-black bg-black text-[#FFE600] font-black"
              }`}
            >
              {tagline}
            </div>

            <div className="pt-6">
              <div
                className="w-24 h-1 mx-auto rounded-full animate-pulse"
                style={{ backgroundColor: accentColor }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default CinematicIntro;
