"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Leaf, ShoppingBag, Menu, X, Sparkles } from "lucide-react";
import { useCart } from "@/hooks/useCart";

export function GoodMoodNav() {
  const pathname = usePathname();
  const { getItemCount, openCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  let basePath = "/concepts/pure-co";
  let brandName = "PURE & CO.";
  let brandSub = "PEACHY PLATE FOODS // DESIGN 02";

  if (pathname?.includes("goodness-co")) {
    basePath = "/concepts/goodness-co";
    brandName = "GOODNESS CO.";
  } else if (pathname?.includes("good-mood-foods")) {
    basePath = "/concepts/good-mood-foods";
    brandName = "GOOD MOOD FOODS";
  }

  return (
    <header className="sticky top-11 z-40 bg-[#F7F4EE]/90 backdrop-blur-md text-[#232B25] border-b border-[#E2DDD5] select-none">
      {/* Top Quiet Announcement */}
      <div className="bg-[#EEF3EE] text-[#435C4A] py-1.5 px-4 text-xs font-serif italic text-center border-b border-[#E2DDD5]/60">
        Peachy Plate Foods • Slow-crafted botanical nutrition • Complimentary delivery on orders over ₹499
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
        {/* Brand Wordmark */}
        <Link href={basePath} className="group flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-[#5F7965] text-white flex items-center justify-center transition-transform group-hover:scale-105">
            <Leaf className="w-4 h-4 stroke-[2]" />
          </div>
          <div>
            <span className="font-serif italic font-normal text-2xl tracking-normal text-[#232B25]">
              {brandName}
            </span>
            <span className="hidden sm:block text-[9px] font-sans tracking-widest uppercase text-[#67756B]">
              {brandSub}
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs tracking-wider uppercase font-medium text-[#435C4A]">
          <Link
            href={basePath}
            className="hover:text-[#232B25] transition-colors"
          >
            Home
          </Link>
          <Link
            href={`${basePath}/shop`}
            className="hover:text-[#232B25] transition-colors"
          >
            Pantry
          </Link>
          <Link
            href={`${basePath}/about`}
            className="hover:text-[#232B25] transition-colors"
          >
            Philosophy
          </Link>
          <Link
            href={`${basePath}/contact`}
            className="hover:text-[#232B25] transition-colors"
          >
            Inquire
          </Link>
        </nav>

        {/* Right CTA / Cart */}
        <div className="flex items-center gap-3">
          <button
            onClick={openCart}
            className="relative bg-white border border-[#E2DDD5] px-4 py-2 rounded-full text-xs font-serif text-[#232B25] hover:border-[#5F7965] transition-colors flex items-center gap-2 shadow-sm"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#5F7965]" />
            <span className="hidden sm:inline">Harvest Basket</span>
            <span className="w-5 h-5 rounded-full bg-[#5F7965] text-white text-[10px] font-sans flex items-center justify-center">
              {getItemCount()}
            </span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full border border-[#E2DDD5] text-[#232B25]"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#F7F4EE] border-t border-[#E2DDD5] p-4 space-y-3 font-serif text-sm">
          <Link
            href={basePath}
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-[#232B25] border-b border-[#E2DDD5]/60"
          >
            Home
          </Link>
          <Link
            href={`${basePath}/shop`}
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-[#435C4A] hover:text-[#232B25] border-b border-[#E2DDD5]/60"
          >
            Pantry
          </Link>
          <Link
            href={`${basePath}/about`}
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-[#435C4A] hover:text-[#232B25] border-b border-[#E2DDD5]/60"
          >
            Philosophy
          </Link>
          <Link
            href={`${basePath}/contact`}
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-[#435C4A] hover:text-[#232B25]"
          >
            Inquire
          </Link>
        </div>
      )}
    </header>
  );
}
