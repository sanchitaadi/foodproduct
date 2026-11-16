"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Zap, ArrowUpRight, Flame, Heart } from "lucide-react";
import { MarqueeBanner } from "@/components/animation/MarqueeBanner";

export function SnackAttackFooter() {
  const pathname = usePathname();
  let basePath = "/concepts/pop-cult";
  let brandName = "POP CULT";

  if (pathname?.includes("pop-snacks")) {
    basePath = "/concepts/pop-snacks";
    brandName = "POP SNACKS";
  } else if (pathname?.includes("snack-attack")) {
    basePath = "/concepts/snack-attack";
    brandName = "SNACK ATTACK";
  }

  return (
    <footer className="bg-black text-white border-t-4 border-black select-none">
      {/* Loud animated ticker */}
      <div className="bg-[#FF007F] text-white py-2 border-b-2 border-black overflow-hidden">
        <MarqueeBanner
          items={[
            "PEACHY PLATE FOODS • 100% INDIAN SNACK HUSTLE",
            "HOT CHILLIES FROM RAJASTHAN",
            "MIND-BLOWING CRUNCH MATRIX",
            "GEN-Z CRAVE CULTURE",
            "ZERO BORING NACHOS",
          ]}
          speedSec={18}
          itemClassName="font-black text-sm uppercase tracking-wider text-black"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#FFD60A] border-2 border-white flex items-center justify-center">
                <Zap className="w-5 h-5 text-black fill-black" />
              </div>
              <span className="font-black text-2xl tracking-tighter text-[#FF5400]">
                {brandName}
              </span>
            </div>
            <p className="text-xs text-zinc-400 font-mono leading-relaxed">
              Design 01 for Peachy Plate Foods. Loud, unapologetic, dopamine-loaded packaged snacks for India. Zero trans fats, maximum fire.
            </p>
            <div className="inline-block bg-[#FFD60A] text-black font-black text-[10px] px-2.5 py-1 border border-white rotate-[-2deg]">
              FSSAI LIC: 10022043000881 [DEMO]
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-black text-sm uppercase text-[#FFD60A] tracking-wider mb-3">
              Explore Munchies
            </h4>
            <ul className="space-y-2 text-xs font-bold uppercase text-zinc-300">
              <li>
                <Link href={`${basePath}/shop`} className="hover:text-[#FF5400] transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href={`${basePath}/product/masala-chips`} className="hover:text-[#FF5400] transition-colors">
                  Desi Fire Masala Chips
                </Link>
              </li>
              <li>
                <Link href={`${basePath}/product/peri-peri-makhana`} className="hover:text-[#FF5400] transition-colors">
                  Peri Peri Makhana
                </Link>
              </li>
            </ul>
          </div>

          {/* Business & Manifesto */}
          <div>
            <h4 className="font-black text-sm uppercase text-[#FF007F] tracking-wider mb-3">
              About Peachy Plate
            </h4>
            <ul className="space-y-2 text-xs font-bold uppercase text-zinc-300">
              <li>
                <Link href={`${basePath}/about`} className="hover:text-[#FF5400] transition-colors">
                  Our Brand Manifesto
                </Link>
              </li>
              <li>
                <Link href={`${basePath}/contact`} className="hover:text-[#FF5400] transition-colors">
                  Contact & Wholesale
                </Link>
              </li>
              <li>
                <Link href="/concepts" className="text-[#FFD60A] hover:underline">
                  Compare All 4 Design Options
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="bg-[#1C1C1E] border-2 border-white p-5 rounded-2xl shadow-[4px_4px_0px_#FF5400]">
            <h4 className="font-black text-sm text-[#FFD60A] uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-[#FF5400]" />
              <span>Get Secret Snack Drops</span>
            </h4>
            <p className="text-[11px] text-zinc-400 font-mono mb-3">
              10% off your first box + exclusive tasting samples delivered to your hostel or desk.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="YOUR.NAME@CAMPUS.IN"
                className="w-full text-xs px-3 py-2 bg-black border border-zinc-700 text-white rounded-lg outline-none font-mono focus:border-[#FF5400]"
              />
              <button className="bg-[#FF5400] hover:bg-[#FFD60A] text-black font-black text-xs px-3 py-2 rounded-lg transition-colors border border-black shrink-0">
                JOIN
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div>
            © 2026 Peachy Plate Foods Pvt Ltd • Packaged Food E-Commerce Prototype (Design 01)
          </div>
          <div className="flex gap-4">
            <Link href="/checkout" className="hover:text-white">Demo Checkout</Link>
            <Link href="/account" className="hover:text-white">My Account</Link>
            <Link href="/admin" className="hover:text-white">Admin Dashboard</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
