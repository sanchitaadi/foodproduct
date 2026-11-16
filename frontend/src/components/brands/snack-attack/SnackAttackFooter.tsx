"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Zap, ArrowUpRight, Flame, Heart } from "lucide-react";
import { MarqueeBanner } from "@/components/animation/MarqueeBanner";

export function SnackAttackFooter() {
  const pathname = usePathname();
  let basePath = "/concept-c-snackattack";
  let brandName = "SNACK ATTACK";

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
    <footer className="bg-black text-white border-t-4 border-black select-none">
      {/* Loud animated ticker */}
      <div className="bg-[#FF007F] text-white py-2 border-b-2 border-black overflow-hidden">
        <MarqueeBanner
          items={[
            "PEACHY PLATE FOODS • 100% INDIAN SNACK HUSTLE",
            "HOT CHILLIES FROM RAJASTHAN",
            "MIND-BLOWING CRUNCH MATRIX",
            "GEN-Z CRAVE CULTURE",
            "ZERO BORING CHIPS",
            "100% VEGETARIAN",
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
              Concept C for Peachy Plate Foods. Loud, unapologetic, dopamine-loaded packaged snacks for India. Zero trans fats, maximum fire.
            </p>
            <div className="inline-block bg-[#FFD60A] text-black font-black text-[10px] px-2.5 py-1 border border-white rotate-[-2deg]">
              FSSAI LIC: 10019022009876
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
                  All Snacks
                </Link>
              </li>
              <li>
                <Link href={`${basePath}/product/kettle-cooked-sea-salt-crisps`} className="hover:text-[#FF5400] transition-colors">
                  Kettle Cooked Sea Salt Crisps
                </Link>
              </li>
              <li>
                <Link href={`${basePath}/product/spiced-millet-crackers`} className="hover:text-[#FF5400] transition-colors">
                  Spiced Millet Crackers
                </Link>
              </li>
              <li>
                <Link href={`${basePath}/product/gourmet-sorghum-crisps`} className="hover:text-[#FF5400] transition-colors">
                  Gourmet Sorghum Crisps
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
                <Link href={`${basePath}/our-story`} className="hover:text-[#FF5400] transition-colors">
                  Our Brand Manifesto
                </Link>
              </li>
              <li>
                <Link href={`${basePath}/contact`} className="hover:text-[#FF5400] transition-colors">
                  Contact & Wholesale
                </Link>
              </li>
              <li>
                <Link href={`${basePath}/track-order`} className="hover:text-[#FF5400] transition-colors">
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="/" className="text-[#FFD60A] hover:underline">
                  Back to 3 Concepts Launchpad
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="bg-[#141414] border-2 border-zinc-800 p-6 rounded-2xl shadow-[4px_4px_0px_#FFD60A] space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-black uppercase text-[#FFD60A]">
              <Flame className="w-4 h-4 fill-[#FFD60A]" />
              <span>THE DROP LIST</span>
            </div>
            <p className="text-xs text-zinc-400 font-mono">
              Get notified 15 minutes before high-heat snack drops hit the shelves.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="YOUR EMAIL..."
                className="bg-black border border-zinc-700 px-3 py-2 text-xs font-mono text-white rounded-lg flex-1 focus:border-[#FF5400] outline-none"
              />
              <button
                className="bg-[#FF5400] text-black font-black text-xs px-3 py-2 rounded-lg border border-black hover:bg-[#FFD60A] transition-colors"
              >
                JOIN
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <p>© 2026 Peachy Plate Foods Ltd. • Snack Attack (Concept C) • FSSAI Lic. 10019022009876</p>
          <div className="flex gap-4">
            <Link href="/" className="hover:text-white">All 3 Concepts</Link>
            <Link href="/admin" className="hover:text-white">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
