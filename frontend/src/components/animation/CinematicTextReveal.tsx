"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface CinematicTextRevealProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  delay?: number;
  stagger?: number;
  direction?: "up" | "down" | "fade";
}

export function CinematicTextReveal({
  text,
  className = "",
  as: Component = "h1",
  delay = 0.1,
  stagger = 0.04,
  direction = "up",
}: CinematicTextRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const words = text.split(" ");

  if (shouldReduceMotion) {
    return <Component className={className}>{text}</Component>;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 30 : direction === "down" ? -30 : 0,
      filter: "blur(6px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1], // easeOutExpo
      },
    },
  };

  return (
    <Component className={`inline-block ${className}`}>
      <motion.span
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="inline-flex flex-wrap gap-x-[0.3em] gap-y-1"
      >
        {words.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            variants={wordVariants}
            className="inline-block transform-gpu"
          >
            {word}
          </motion.span>
        ))}
      </motion.span>
    </Component>
  );
}

export default CinematicTextReveal;
