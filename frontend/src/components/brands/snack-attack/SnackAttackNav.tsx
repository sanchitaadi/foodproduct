"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Zap, ShoppingBag, Flame, Menu, X, ArrowLeft } from "lucide-react";
import { useCart } from "@/hooks/useCart";

export function SnackAttackNav() {
  const pathname = usePathname();
  const { getItemCount, openCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  let basePath = "/concept-c-snackattack";
  let brandName = "SNACK ATTACK";
  let brandSub = "PEACHY PLATE FOODS // CONCEPT C";

  if (pathname?.includes("pop-snacks")) {
    basePath = "/concepts/pop-snacks";
    brandName = "POP SNACKS";
  } else if (pathname?.includes("concept-c-snackattack")) {
    basePath = "/concept-c-snackattack";
    brandName = "SNACK ATTACK";
  } else if (pathname?.includes("snack-attack")) {
    basePath = "/concepts/snack-attack";
    brandName = "SNACK ATTACK";
  }

  return (
    <header className="sticky top-11 z-40 bg-[#FF5400] text-black border-b-4 border-black select-none">
      {/* High-Voltage Ticker */}
      <div className="bg-[#FFD60A] text-black py-1 px-4 text-xs font-black uppercase tracking-wider border-b-2 border-black flex justify-between items-center overflow-hidden">
        <span className="flex items-center gap-1.5 shrink-0">
          <Flame className="w-3.5 h-3.5 fill-black" />
          <span>PEACHY PLATE FOODS • FREE DELIVERY ON ORDERS OVER ₹499 IN INDIA</span>
        </span>
        <span className="hidden md:inline font-mono text-[11px]">DELIVERING IN 2-4 DAYS ACROSS 19,000+ PIN CODES</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Brand Wordmark */}
        <Link href={basePath} className="group flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-[#FFD60A] border-3 border-black shadow-[3px_3px_0px_#000] flex items-center justify-center group-hover:rotate-6 transition-transform">
            <Zap className="w-6 h-6 fill-black text-black" />
          </div>
          <div>
            <span className="font-black tracking-tighter text-2xl sm:text-3xl uppercase text-black drop-shadow-[2px_2px_0px_#FFF]">
              {brandName}
            </span>
            <span className="hidden sm:block text-[9px] font-black uppercase tracking-widest text-black/80 -mt-1">
              {brandSub}
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href={basePath}
            className="font-black text-sm uppercase tracking-wider text-black hover:text-white transition-colors"
          >
            Home
          </Link>
          <Link
            href={`${basePath}/shop`}
            className="font-black text-sm uppercase tracking-wider text-black hover:text-white transition-colors"
          >
            Shop All Snacks
          </Link>
          <Link
            href={`${basePath}/our-story`}
            className="font-black text-sm uppercase tracking-wider text-black hover:text-white transition-colors"
          >
            Our Manifesto
          </Link>
          <Link
            href={`${basePath}/contact`}
            className="font-black text-sm uppercase tracking-wider text-black hover:text-white transition-colors"
          >
            Holler At Us
          </Link>
          <Link
            href="/"
            className="font-black text-xs uppercase tracking-wider text-black bg-white/80 hover:bg-white px-2.5 py-1 border border-black rounded transition-colors"
          >
            All 3 Concepts
          </Link>
        </nav>

        {/* Right CTA / Cart */}
        <div className="flex items-center gap-3">
          <button
            onClick={openCart}
            className="relative bg-[#FFD60A] border-2 border-black px-4 py-2 font-black text-xs uppercase shadow-[3px_3px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#000] transition-all flex items-center gap-2"
            aria-label="Open Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Stash Bag</span>
            <span className="bg-black text-[#FFD60A] px-1.5 py-0.5 rounded text-[10px] font-mono">
              {getItemCount()}
            </span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg border-2 border-black bg-[#FFD60A]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FF5400] border-t-2 border-black p-4 space-y-3 font-black text-sm uppercase">
          <Link
            href={basePath}
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 border-b border-black/20"
          >
            Home
          </Link>
          <Link
            href={`${basePath}/shop`}
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 border-b border-black/20"
          >
            Shop All Snacks
          </Link>
          <Link
            href={`${basePath}/our-story`}
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 border-b border-black/20"
          >
            Our Manifesto
          </Link>
          <Link
            href={`${basePath}/contact`}
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 border-b border-black/20"
          >
            Holler At Us
          </Link>
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2"
          >
            All 3 Concepts
          </Link>
        </div>
      )}
    </header>
  );
}
