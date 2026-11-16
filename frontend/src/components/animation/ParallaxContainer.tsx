"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface ParallaxContainerProps {
  children: React.ReactNode;
  offset?: number;
  className?: string;
}

export function ParallaxContainer({
  children,
  offset = 20,
  className = "",
}: ParallaxContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * offset;
      const y = (e.clientY / innerHeight - 0.5) * offset;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [offset, shouldReduceMotion]);

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={containerRef}
      animate={{ x: mousePosition.x, y: mousePosition.y }}
      transition={{ type: "spring", stiffness: 100, damping: 25 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
