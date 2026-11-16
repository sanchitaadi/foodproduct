"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, ShoppingBag, Sparkles, Menu, X } from "lucide-react";
import { useCart } from "@/hooks/useCart";

export function HappyCravingsNav() {
  const pathname = usePathname();
  const isHappyBites = pathname?.includes("happy-bites");
  const basePath = isHappyBites ? "/concepts/happy-bites" : "/concepts/happy-cravings";
  const brandName = isHappyBites ? "Happy Bites" : "Happy Cravings";

  const { getItemCount, openCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-11 z-40 bg-[#FFF9F5]/95 backdrop-blur-md text-[#4A3E3D] border-b-2 border-[#F5D5CB] select-none">
      {/* Top Gingham Ticker */}
      <div className="bg-[#FFE66D] text-[#4A3E3D] py-1 px-4 text-xs font-bold text-center border-b border-[#F5D5CB] flex justify-between items-center">
        <span className="flex items-center gap-1.5 mx-auto">
          <span>✨</span>
          <span>SWEET LITTLE BITES OF PURE JOY • FREE SHIPPING OVER ₹499 IN INDIA</span>
          <span>✨</span>
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
        {/* Wordmark */}
        <Link href={basePath} className="group flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-[#FF9E7D] text-white flex items-center justify-center shadow-[0_4px_12px_rgba(255,158,125,0.3)] group-hover:rotate-6 transition-transform">
            <Heart className="w-5 h-5 fill-white" />
          </div>
          <div>
            <span className="font-extrabold text-2xl tracking-tight text-[#FF9E7D]">
              {brandName}
            </span>
            <span className="hidden sm:block text-[10px] font-bold text-[#F8A5C2] -mt-1">
              Sweet bites & cozy bakes 🍪
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-bold text-[#4A3E3D]">
          <Link
            href={basePath}
            className="hover:text-[#FF9E7D] transition-colors"
          >
            Home 🏡
          </Link>
          <Link
            href={`${basePath}/shop`}
            className="hover:text-[#FF9E7D] transition-colors"
          >
            Treats Shop 🍓
          </Link>
          <Link
            href={`${basePath}/about`}
            className="hover:text-[#FF9E7D] transition-colors"
          >
            Our Story 📖
          </Link>
          <Link
            href={`${basePath}/contact`}
            className="hover:text-[#FF9E7D] transition-colors"
          >
            Say Hello 👋
          </Link>
        </nav>

        {/* Right CTA / Cart */}
        <div className="flex items-center gap-3">
          <button
            onClick={openCart}
            className="relative bg-white border-2 border-[#F5D5CB] px-4 py-2 rounded-full text-xs font-bold text-[#4A3E3D] hover:border-[#FF9E7D] hover:text-[#FF9E7D] shadow-[0_4px_10px_rgba(245,213,203,0.4)] transition-all flex items-center gap-2"
          >
            <ShoppingBag className="w-4 h-4 text-[#FF9E7D]" />
            <span className="hidden sm:inline">Treat Bag</span>
            <span className="w-5 h-5 rounded-full bg-[#FF9E7D] text-white text-[11px] font-extrabold flex items-center justify-center">
              {getItemCount()}
            </span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-white border border-[#F5D5CB] text-[#4A3E3D]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FFF9F5] border-t-2 border-[#F5D5CB] p-4 space-y-3 font-bold text-xs">
          <Link
            href={basePath}
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-[#FF9E7D] border-b border-[#F5D5CB]/60"
          >
            Home 🏡
          </Link>
          <Link
            href={`${basePath}/shop`}
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-[#4A3E3D] hover:text-[#FF9E7D] border-b border-[#F5D5CB]/60"
          >
            Treats Shop 🍓
          </Link>
          <Link
            href={`${basePath}/about`}
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-[#4A3E3D] hover:text-[#FF9E7D] border-b border-[#F5D5CB]/60"
          >
            Our Story 📖
          </Link>
          <Link
            href={`${basePath}/contact`}
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-[#4A3E3D] hover:text-[#FF9E7D]"
          >
            Say Hello 👋
          </Link>
        </div>
      )}
    </header>
  );
}
