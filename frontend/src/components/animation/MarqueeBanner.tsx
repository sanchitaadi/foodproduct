"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface MarqueeBannerProps {
  items: string[];
  separator?: string;
  speedSec?: number;
  direction?: "left" | "right";
  className?: string;
  itemClassName?: string;
}

export function MarqueeBanner({
  items,
  separator = "•",
  speedSec = 22,
  direction = "left",
  className = "",
  itemClassName = "",
}: MarqueeBannerProps) {
  const shouldReduceMotion = useReducedMotion();

  // Combine items with separators
  const content = items.map((item, i) => (
    <span key={i} className={`inline-flex items-center gap-6 ${itemClassName}`}>
      <span>{item}</span>
      <span className="opacity-40">{separator}</span>
    </span>
  ));

  if (shouldReduceMotion) {
    return (
      <div className={`overflow-x-auto whitespace-nowrap flex gap-6 ${className}`}>
        {content}
      </div>
    );
  }

  const initialX = direction === "left" ? "0%" : "-50%";
  const animateX = direction === "left" ? "-50%" : "0%";

  return (
    <div className={`overflow-hidden whitespace-nowrap select-none flex ${className}`}>
      <motion.div
        className="flex shrink-0 items-center gap-6"
        animate={{ x: [initialX, animateX] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speedSec,
            ease: "linear",
          },
        }}
      >
        {content}
        {content}
        {content}
        {content}
      </motion.div>
    </div>
  );
}
