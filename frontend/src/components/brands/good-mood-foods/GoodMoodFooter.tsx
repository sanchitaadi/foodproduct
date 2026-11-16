"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Leaf, ArrowRight, Heart } from "lucide-react";

export function GoodMoodFooter() {
  const pathname = usePathname();
  let basePath = "/concepts/pure-co";
  let brandName = "PURE & CO.";

  if (pathname?.includes("goodness-co")) {
    basePath = "/concepts/goodness-co";
    brandName = "GOODNESS CO.";
  } else if (pathname?.includes("good-mood-foods")) {
    basePath = "/concepts/good-mood-foods";
    brandName = "GOOD MOOD FOODS";
  }

  return (
    <footer className="bg-[#232B25] text-[#F7F4EE] border-t border-[#37453A] select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#A5C4A3] text-[#232B25] flex items-center justify-center">
                <Leaf className="w-4 h-4" />
              </div>
              <span className="font-serif italic text-2xl tracking-tight text-[#F7F4EE]">
                {brandName}
              </span>
            </div>
            <p className="text-xs font-light text-[#A5C4A3]/80 leading-relaxed font-sans">
              Design 02 for Peachy Plate Foods. Cultivating serene vitality with single-origin Indian ingredients, ancient millets, and stone-ground botanical nutrition.
            </p>
            <div className="text-[10px] font-mono text-[#A5C4A3]/60">
              FSSAI Lic. No: 10021011000342 [DEMO COMPLIANCE]
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif italic text-sm text-[#A5C4A3] tracking-wider mb-4">
              Pantry Collections
            </h4>
            <ul className="space-y-2.5 text-xs font-light text-[#F7F4EE]/75">
              <li>
                <Link href={`${basePath}/shop`} className="hover:text-white transition-colors">
                  All Provisions
                </Link>
              </li>
              <li>
                <Link href={`${basePath}/product/peri-peri-makhana`} className="hover:text-white transition-colors">
                  Roasted Peri Peri Fox Nut Makhana
                </Link>
              </li>
              <li>
                <Link href={`${basePath}/product/roasted-almonds`} className="hover:text-white transition-colors">
                  Slow-Roasted Mamra Almonds
                </Link>
              </li>
              <li>
                <Link href={`${basePath}/product/peanut-butter`} className="hover:text-white transition-colors">
                  Saurashtra Stone-Ground Peanut Butter
                </Link>
              </li>
            </ul>
          </div>

          {/* Philosophy */}
          <div>
            <h4 className="font-serif italic text-sm text-[#A5C4A3] tracking-wider mb-4">
              Mindful Creed
            </h4>
            <ul className="space-y-2.5 text-xs font-light text-[#F7F4EE]/75">
              <li>
                <Link href={`${basePath}/about`} className="hover:text-white transition-colors">
                  Botanical Sourcing Creed
                </Link>
              </li>
              <li>
                <Link href={`${basePath}/contact`} className="hover:text-white transition-colors">
                  Wholesale & Spa Inquiries
                </Link>
              </li>
              <li>
                <Link href="/concepts" className="text-[#A5C4A3] hover:underline">
                  Compare Alternative Designs
                </Link>
              </li>
            </ul>
          </div>

          {/* Quiet Newsletter */}
          <div className="bg-[#1C231E] border border-[#37453A] p-6 rounded-2xl">
            <h4 className="font-serif italic text-sm text-[#F7F4EE] mb-2">
              The Seasonal Chronicle
            </h4>
            <p className="text-[11px] font-light text-[#A5C4A3]/80 mb-4 leading-relaxed">
              Quiet dispatches regarding seasonal harvests, indigenous grains, and mindful living.
            </p>
            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="inscribe@wellness.in"
                className="w-full text-xs px-3.5 py-2.5 bg-[#232B25] border border-[#37453A] text-white rounded-full outline-none font-light focus:border-[#A5C4A3]"
              />
              <button className="w-full bg-[#5F7965] hover:bg-[#4d6452] text-white font-serif text-xs py-2 rounded-full transition-colors">
                Receive Inscriptions
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 border-t border-[#37453A] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-light text-[#A5C4A3]/60">
          <div>
            © 2026 Peachy Plate Foods Pvt Ltd • Packaged Food E-Commerce Prototype (Design 02)
          </div>
          <div className="flex gap-4">
            <Link href="/checkout" className="hover:text-white">Demo Checkout</Link>
            <Link href="/account" className="hover:text-white">Customer Sanctuary</Link>
            <Link href="/admin" className="hover:text-white">Admin Management</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
