"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Sparkles } from "lucide-react";
import { MarqueeBanner } from "@/components/animation/MarqueeBanner";

export function HappyCravingsFooter() {
  const pathname = usePathname();
  const isHappyBites = pathname?.includes("happy-bites");
  const basePath = isHappyBites ? "/concepts/happy-bites" : "/concepts/happy-cravings";
  const brandName = isHappyBites ? "Happy Bites" : "Happy Cravings";

  return (
    <footer className="bg-[#FFF0E8] text-[#4A3E3D] border-t-2 border-[#F5D5CB] select-none font-sans">
      <div className="bg-[#FFD3B6] py-2 border-b border-[#F5D5CB]">
        <MarqueeBanner
          items={[
            "COOKIE CRUMBS & SUNSHINE 🍪",
            "RATNAGIRI ALPHONSO MANGO GUMMIES 🥭",
            "SWEET LITTLE MOMENTS OF JOY ✨",
            "BAKED WITH PURE BUTTER & LOVE 💖",
            "HANDMADE SCRAPBOOK TREAT BOXES 🎁",
          ]}
          speedSec={20}
          itemClassName="text-xs font-bold text-[#4A3E3D] uppercase tracking-wider"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#FF9E7D] text-white flex items-center justify-center">
                <Heart className="w-4 h-4 fill-white" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-[#FF9E7D]">
                {brandName}
              </span>
            </div>
            <p className="text-xs text-[#8A7977] leading-relaxed">
              Sweet little packaged treats crafted for cozy afternoons, tea-time chats, and mood-boosting smiles.
            </p>
            <div className="text-[10px] font-mono text-[#8A7977]">
              FSSAI Lic No: 10020022001150 [DEMO]
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#FF9E7D] mb-3">
              Favorite Treats
            </h4>
            <ul className="space-y-2 text-xs font-semibold text-[#8A7977]">
              <li>
                <Link href={`${basePath}/shop`} className="hover:text-[#FF9E7D] transition-colors">
                  All Sweet Bites
                </Link>
              </li>
              <li>
                <Link href={`${basePath}/product/chocolate-cookies`} className="hover:text-[#FF9E7D] transition-colors">
                  Dark Cacao Butter Cookies
                </Link>
              </li>
              <li>
                <Link href={`${basePath}/product/fruit-gummies`} className="hover:text-[#FF9E7D] transition-colors">
                  Mango Passionfruit Vegan Gummies
                </Link>
              </li>
            </ul>
          </div>

          {/* Scrapbook pages */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#F8A5C2] mb-3">
              Cozy World
            </h4>
            <ul className="space-y-2 text-xs font-semibold text-[#8A7977]">
              <li>
                <Link href={`${basePath}/about`} className="hover:text-[#FF9E7D] transition-colors">
                  Our Scrapbook Story
                </Link>
              </li>
              <li>
                <Link href={`${basePath}/contact`} className="hover:text-[#FF9E7D] transition-colors">
                  Send A Sweet Note
                </Link>
              </li>
              <li>
                <Link href="/concepts" className="hover:text-[#FF9E7D] transition-colors">
                  All 4 Brand Systems
                </Link>
              </li>
            </ul>
          </div>

          {/* Sweet Newsletter */}
          <div className="bg-white border-2 border-[#F5D5CB] p-5 rounded-3xl shadow-sm">
            <h4 className="font-bold text-xs text-[#FF9E7D] uppercase tracking-wider mb-1">
              The Happy Letter 💌
            </h4>
            <p className="text-[11px] text-[#8A7977] mb-3">Get cute recipe doodles and free treats on your birthday!</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your.email@joy.com"
                className="w-full text-xs px-3 py-2 border border-[#F5D5CB] rounded-xl outline-none focus:border-[#FF9E7D] bg-[#FFF9F5]"
              />
              <button className="bg-[#FF9E7D] text-white px-3 py-2 rounded-xl text-xs font-bold hover:bg-[#ff8a63] transition-colors shrink-0">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[#F5D5CB] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8A7977]">
          <div>
            © 2026 {brandName} Bakery & Pantry • Made with love in India 🇮🇳
          </div>
          <div className="flex gap-4 font-bold">
            <Link href="/checkout" className="hover:text-[#FF9E7D]">Demo Checkout</Link>
            <Link href="/account" className="hover:text-[#FF9E7D]">My Account</Link>
            <Link href="/concepts" className="text-[#FF9E7D]">Compare Concepts</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
