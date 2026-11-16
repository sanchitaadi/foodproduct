"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Terminal, ShoppingBag, Menu, X, Radio } from "lucide-react";
import { useCart } from "@/hooks/useCart";

export function CrunchCultNav() {
  const pathname = usePathname();
  const { getItemCount, openCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  let basePath = "/concepts/crunch-mode";
  let brandName = "CRUNCH MODE";
  let brandSub = "PEACHY PLATE FOODS // DESIGN 03";

  if (pathname?.includes("crave-cult")) {
    basePath = "/concepts/crave-cult";
    brandName = "CRAVE CULT";
  } else if (pathname?.includes("crunch-cult")) {
    basePath = "/concepts/crunch-cult";
    brandName = "CRUNCH CULT";
  }

  return (
    <header className="sticky top-11 z-40 bg-[#0A0A0A] text-[#F2F2F2] border-b border-zinc-800 select-none font-mono">
      {/* Top Cyber Ticker */}
      <div className="bg-black text-[#CCFF00] py-1 px-4 text-[11px] tracking-widest uppercase border-b border-zinc-800 flex justify-between items-center">
        <span className="flex items-center gap-2">
          <Radio className="w-3 h-3 text-[#CCFF00] animate-pulse" />
          <span>PEACHY PLATE FOODS • [SYS:BATCH_DROP_04_LIVE] • ALL INDIAN SHIPMENTS ENCRYPTED</span>
        </span>
        <span className="hidden md:inline text-zinc-500 text-[10px]">VERIFIED FOOD PROTOCOL v1.4</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Wordmark */}
        <Link href={basePath} className="group flex items-center gap-3">
          <div className="w-8 h-8 bg-[#CCFF00] text-black font-black flex items-center justify-center text-xs">
            CM
          </div>
          <div>
            <span className="font-black tracking-widest text-xl text-[#F2F2F2] uppercase group-hover:text-[#CCFF00] transition-colors">
              {brandName}
            </span>
            <span className="hidden sm:block text-[9px] tracking-[0.25em] text-zinc-500 uppercase -mt-0.5">
              {brandSub}
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs tracking-widest uppercase">
          <Link
            href={basePath}
            className="text-zinc-400 hover:text-[#CCFF00] transition-colors"
          >
            [01] Index
          </Link>
          <Link
            href={`${basePath}/shop`}
            className="text-zinc-400 hover:text-[#CCFF00] transition-colors"
          >
            [02] Drops
          </Link>
          <Link
            href={`${basePath}/about`}
            className="text-zinc-400 hover:text-[#CCFF00] transition-colors"
          >
            [03] Protocol
          </Link>
          <Link
            href={`${basePath}/contact`}
            className="text-zinc-400 hover:text-[#CCFF00] transition-colors"
          >
            [04] Uplink
          </Link>
        </nav>

        {/* Right CTA / Cart */}
        <div className="flex items-center gap-3">
          <button
            onClick={openCart}
            className="relative bg-zinc-900 border border-zinc-700 px-3.5 py-1.5 hover:border-[#CCFF00] hover:text-[#CCFF00] transition-colors flex items-center gap-2 text-xs"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#CCFF00]" />
            <span className="hidden sm:inline">[STASH]</span>
            <span className="bg-[#CCFF00] text-black px-1.5 py-0.2 text-[10px] font-bold">
              {getItemCount()}
            </span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 border border-zinc-700 text-zinc-300"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-zinc-950 border-t border-zinc-800 p-4 space-y-2 text-xs tracking-widest uppercase">
          <Link
            href={basePath}
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-[#CCFF00] border-b border-zinc-800"
          >
            [01] Index Home
          </Link>
          <Link
            href={`${basePath}/shop`}
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-zinc-300 border-b border-zinc-800"
          >
            [02] Batch Drops Catalog
          </Link>
          <Link
            href={`${basePath}/about`}
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-zinc-300 border-b border-zinc-800"
          >
            [03] Underground Protocol
          </Link>
          <Link
            href={`${basePath}/contact`}
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-zinc-300"
          >
            [04] Communications Uplink
          </Link>
        </div>
      )}
    </header>
  );
}
