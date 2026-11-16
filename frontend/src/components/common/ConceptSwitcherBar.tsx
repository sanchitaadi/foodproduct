"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, Leaf, Zap, ShoppingBag, Layers, ShieldCheck, Settings } from "lucide-react";
import { useCart } from "@/hooks/useCart";

export const ConceptSwitcherBar: React.FC = () => {
  const pathname = usePathname();
  const { getItemCount, openCart } = useCart();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const concepts = [
    {
      id: "all-concepts",
      label: "All 3 Concepts",
      href: "/",
      exact: true,
      icon: Layers,
      activeColor: "bg-white text-black font-bold shadow-sm",
    },
    {
      id: "flavourverse",
      label: "A: FLAVOURVERSE",
      href: "/concept-a-flavourverse",
      matchPrefix: "/concept-a-flavourverse",
      icon: Sparkles,
      activeColor: "bg-[#FF9F1C] text-black font-black shadow-md",
    },
    {
      id: "purepantry",
      label: "B: PURE & PANTRY",
      href: "/concept-b-purepantry",
      matchPrefix: "/concept-b-purepantry",
      icon: Leaf,
      activeColor: "bg-[#4A5844] text-white font-serif font-bold shadow-md",
    },
    {
      id: "snackattack",
      label: "C: SNACK ATTACK",
      href: "/concept-c-snackattack",
      matchPrefix: "/concept-c-snackattack",
      icon: Zap,
      activeColor: "bg-[#70E000] text-black font-black border border-black shadow-[2px_2px_0px_#000]",
    },
  ];

  return (
    <div className="sticky top-0 z-50 w-full backdrop-blur-xl bg-black/90 border-b border-white/10 text-white px-3 sm:px-6 py-2.5 text-xs transition-all shadow-xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Brand badge */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF9F1C] animate-pulse" />
          <span className="font-mono tracking-wider uppercase text-neutral-300 font-bold group-hover:text-white transition-colors text-[11px] sm:text-xs">
            3 FOOD CONCEPTS
          </span>
        </Link>

        {/* Concepts Selector Tabs */}
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-0.5 scrollbar-none">
          {concepts.map((concept) => {
            const Icon = concept.icon;
            const isActive = concept.exact
              ? pathname === concept.href
              : pathname.startsWith(concept.matchPrefix || concept.href);

            return (
              <Link
                key={concept.id}
                href={concept.href}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] whitespace-nowrap transition-all ${
                  isActive
                    ? concept.activeColor
                    : "text-neutral-400 hover:text-white hover:bg-white/10"
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span>{concept.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Right side utilities: Admin & Cart */}
        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/admin"
            className={`hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono transition-all ${
              pathname.startsWith("/admin")
                ? "bg-amber-400 text-black font-bold"
                : "text-amber-400 hover:bg-amber-400/10 border border-amber-400/30"
            }`}
          >
            <Settings className="w-3 h-3" />
            <span>Admin Portal</span>
          </Link>

          <button
            onClick={openCart}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all text-[11px] font-bold"
            aria-label="Open Cart"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Cart</span>
            {mounted && getItemCount() > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#FF9F1C] text-black font-mono text-[10px] flex items-center justify-center font-bold">
                {getItemCount()}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConceptSwitcherBar;
