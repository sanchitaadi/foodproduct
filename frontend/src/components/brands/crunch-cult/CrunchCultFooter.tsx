"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Terminal, Radio } from "lucide-react";
import { MarqueeBanner } from "@/components/animation/MarqueeBanner";

export function CrunchCultFooter() {
  const pathname = usePathname();
  const isCraveCult = pathname?.includes("crave-cult");
  const basePath = isCraveCult ? "/concepts/crave-cult" : "/concepts/crunch-cult";
  const brandName = isCraveCult ? "CRAVE CULT" : "CRUNCH CULT";

  return (
    <footer className="bg-black text-zinc-400 border-t border-zinc-800 select-none font-mono">
      {/* Brutalist Ticker */}
      <div className="bg-zinc-950 border-b border-zinc-800 py-2">
        <MarqueeBanner
          items={[
            `SYS://${brandName.replace(/\s+/g, "_")}_EST_2026`,
            "BATCH_AUTHENTICATED",
            "100% CACAO • 0% COMPROMISE",
            "STREETWEAR MEETS EDIBLE HYPERCRUNCH",
            "ALL GOODS DISPATCHED VIA AIR EXPRESS",
          ]}
          speedSec={20}
          itemClassName="text-xs uppercase tracking-widest text-[#CCFF00]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#CCFF00]" />
              <span className="font-mono font-black text-xl tracking-widest text-white uppercase">
                {brandName}
              </span>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Industrial grade packaged food engineering. Single-estate dark chocolate blocks, cold-filtered whey matrix fuel, and limited harvest drops for the subculture.
            </p>
            <div className="text-[10px] text-zinc-600">
              FSSAI REG: 10019041000572 [DEMO SIMULATION]
            </div>
          </div>

          {/* Quick drops */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#CCFF00] mb-3">
              [SYSTEM DROPS]
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href={`${basePath}/shop`} className="hover:text-white transition-colors">
                  All Active Drops
                </Link>
              </li>
              <li>
                <Link href={`${basePath}/product/dark-chocolate`} className="hover:text-white transition-colors">
                  Malabar 74% Cacao Block
                </Link>
              </li>
              <li>
                <Link href={`${basePath}/product/protein-bars`} className="hover:text-white transition-colors">
                  Whey 20G Matrix Bar
                </Link>
              </li>
              <li>
                <Link href={`${basePath}/product/masala-chips`} className="hover:text-white transition-colors">
                  Overclock Kettle Masala
                </Link>
              </li>
            </ul>
          </div>

          {/* Protocol specs */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#CCFF00] mb-3">
              [SPEC SHEETS]
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href={`${basePath}/about`} className="hover:text-white transition-colors">
                  Underground Protocol Manifesto
                </Link>
              </li>
              <li>
                <Link href={`${basePath}/about`} className="hover:text-white transition-colors">
                  Lab Analysis & COA
                </Link>
              </li>
              <li>
                <Link href={`${basePath}/contact`} className="hover:text-white transition-colors">
                  Transmission Uplink
                </Link>
              </li>
              <li>
                <Link href="/concepts" className="hover:text-[#CCFF00] transition-colors">
                  [Switch Brand Concept]
                </Link>
              </li>
            </ul>
          </div>

          {/* Encryption / Dispatch */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#CCFF00]">
              [DISPATCH UPLINK]
            </h4>
            <p className="text-[11px] text-zinc-500 leading-relaxed">
              Join the private drop SMS / Telegram dispatch list for drop notifications before general public clearance.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="HANDLE@DOMAIN.XYZ"
                className="bg-[#121214] border border-zinc-800 text-xs px-3 py-2 text-white outline-none focus:border-[#CCFF00] w-full font-mono"
              />
              <button className="bg-[#CCFF00] text-black text-xs font-bold px-3 py-2 hover:bg-white transition-colors">
                SUBMIT
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-zinc-600">
          <div>
            © 2026 {brandName} // ALL RIGHTS RESERVED • TARGET MARKET: INDIA
          </div>
          <div className="flex gap-4">
            <Link href="/checkout" className="hover:text-zinc-400">DEMO CHECKOUT</Link>
            <Link href="/account" className="hover:text-zinc-400">ACCOUNT</Link>
            <Link href="/concepts" className="text-[#CCFF00]">CONCEPT SWITCHER</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
