"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface StaggeredTypographyProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  className?: string;
  delay?: number;
  mode?: "words" | "chars";
}

export function StaggeredTypography({
  text,
  as: Component = "h1",
  className = "",
  delay = 0,
  mode = "words",
}: StaggeredTypographyProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <Component className={className}>{text}</Component>;
  }

  const items = mode === "words" ? text.split(" ") : text.split("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: mode === "words" ? 0.08 : 0.03,
        delayChildren: delay,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20, rotateX: 30 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <Component className={`inline-block perspective-500 ${className}`}>
      <motion.span
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className="inline-flex flex-wrap gap-x-[0.25em]"
      >
        {items.map((item, idx) => (
          <motion.span
            key={`${item}-${idx}`}
            variants={childVariants}
            className="inline-block transform-gpu"
          >
            {item}
            {mode === "chars" && item === " " ? "\u00A0" : ""}
          </motion.span>
        ))}
      </motion.span>
    </Component>
  );
}
