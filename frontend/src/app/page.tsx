"use client";

import React from "react";
import Link from "next/link";
import { 
  Sparkles, 
  Leaf, 
  Zap, 
  ArrowRight, 
  Settings, 
  ShieldCheck, 
  ExternalLink,
  Layers,
  ShoppingBag,
  PackageCheck,
  Flame
} from "lucide-react";

export default function RootHomePage() {
  const concepts = [
    {
      id: "concept-a",
      code: "CONCEPT A",
      name: "FLAVOURVERSE",
      tagline: "Crafted for Culinary Souls & Sensory Minds.",
      description: "Bold editorial culinary universe. Magazine layouts, asymmetric grids, deep plum, saffron glow, and cinematic storytelling.",
      route: "/concept-a-flavourverse",
      shopRoute: "/concept-a-flavourverse/shop",
      sampleProductRoute: "/concept-a-flavourverse/product/malabar-dark-chocolate-74",
      accent: "#FF9F1C",
      accentBg: "bg-[#FF9F1C]",
      borderHover: "hover:border-[#FF9F1C]",
      badge: "Editorial Luxury",
      icon: Sparkles,
      vibe: "Deep Plum • Saffron Glow • Serif Elegance",
      colorSwatches: ["#1F0E1C", "#FF9F1C", "#FFF4E8", "#2A1428"]
    },
    {
      id: "concept-b",
      code: "CONCEPT B",
      name: "PURE & PANTRY",
      tagline: "Nourish Mindfully. Savor Honestly.",
      description: "Modern organic and wellness aesthetic. Warm terracotta, deep sage, raw linen textures, serene typography, and clean-label nutrition transparency.",
      route: "/concept-b-purepantry",
      shopRoute: "/concept-b-purepantry/shop",
      sampleProductRoute: "/concept-b-purepantry/product/slow-roasted-mamra-almonds",
      accent: "#4A5844",
      accentBg: "bg-[#4A5844]",
      borderHover: "hover:border-[#5F7965]",
      badge: "Organic Wellness",
      icon: Leaf,
      vibe: "Terracotta • Deep Sage • Raw Linen",
      colorSwatches: ["#4A5844", "#C86D51", "#F7F4EE", "#EDE8DE"]
    },
    {
      id: "concept-c",
      code: "CONCEPT C",
      name: "SNACK ATTACK",
      tagline: "Zero Chill. Maximum Crunch.",
      description: "Loud, unapologetic, maximalist Gen-Z snack identity. Electric orange, punch yellow, hot pink, and chunky 4px black borders with heavy crunch.",
      route: "/concept-c-snackattack",
      shopRoute: "/concept-c-snackattack/shop",
      sampleProductRoute: "/concept-c-snackattack/product/masala-chips",
      accent: "#FF5400",
      accentBg: "bg-[#FF5400]",
      borderHover: "hover:border-[#FF5400]",
      badge: "High-Voltage Munchies",
      icon: Zap,
      vibe: "Electric Orange • Punch Yellow • Hard Drop Shadows",
      colorSwatches: ["#FF5400", "#FFD60A", "#FF007F", "#000000"]
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-zinc-100 flex flex-col justify-between selection:bg-[#FF9F1C] selection:text-black">
      {/* Top Bar Strip */}
      <div className="bg-zinc-950 border-b border-zinc-800 py-2.5 px-4 text-center text-xs font-mono tracking-widest text-zinc-400 flex flex-wrap items-center justify-between gap-2">
        <span className="flex items-center gap-2 mx-auto sm:mx-0">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>PEACHY PLATE FOODS • THREE MASTER DESIGN CONCEPTS</span>
        </span>
        <div className="flex items-center gap-4 text-[11px] mx-auto sm:mx-0">
          <Link href="/admin" className="text-amber-400 hover:underline flex items-center gap-1 font-bold">
            <Settings className="w-3.5 h-3.5" />
            <span>Admin Back-Office Portal</span>
          </Link>
          <span className="text-zinc-700">|</span>
          <span className="text-zinc-400 font-mono">FSSAI Lic. 10019022009876</span>
        </div>
      </div>

      {/* Main Content Showcase */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 w-full flex-1 flex flex-col justify-center">
        
        {/* Hero Header */}
        <div className="text-center max-w-4xl mx-auto mb-16 space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono uppercase tracking-widest text-[#FF9F1C]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Master Multi-Concept Food E-Commerce Architecture</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white uppercase leading-none">
            THREE VISUAL WORLDS. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9F1C] via-[#FF6B6B] to-[#70E000]">
              ONE PACKAGED FOOD ENGINE.
            </span>
          </h1>

          <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Test and experience three completely distinct visual identities crafted for Indian packaged foods (artisanal snacks, botanical beverages, single-estate cacao, and clean pantry staples) over a unified shopping, cart, and administrative engine.
          </p>
        </div>

        {/* 3 Master Concept Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {concepts.map((concept) => {
            const Icon = concept.icon;
            return (
              <div
                key={concept.id}
                className={`group p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800 ${concept.borderHover} transition-all duration-300 flex flex-col justify-between hover:shadow-2xl relative overflow-hidden`}
              >
                {/* Top Badge */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-zinc-800 text-zinc-300">
                      {concept.code}
                    </span>
                    <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full border border-zinc-700 text-zinc-400">
                      {concept.badge}
                    </span>
                  </div>

                  {/* Brand Name */}
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight flex items-center gap-2">
                      <Icon className="w-6 h-6 text-[#FF9F1C]" style={{ color: concept.accent }} />
                      <span>{concept.name}</span>
                    </h2>
                    <p className="text-xs font-mono text-zinc-400 italic mt-1">
                      "{concept.tagline}"
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed pt-2">
                    {concept.description}
                  </p>

                  {/* Color Swatches */}
                  <div className="pt-2">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block mb-1.5">
                      Brand Palette:
                    </span>
                    <div className="flex items-center gap-2">
                      {concept.colorSwatches.map((color, idx) => (
                        <div
                          key={idx}
                          className="w-6 h-6 rounded-md border border-zinc-700 shadow-sm"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                      <span className="text-[10px] font-mono text-zinc-400 ml-1">{concept.vibe}</span>
                    </div>
                  </div>
                </div>

                {/* Action Links */}
                <div className="space-y-3 pt-8 border-t border-zinc-800 mt-6">
                  {/* Primary Launch Button */}
                  <Link
                    href={concept.route}
                    className="w-full py-3.5 px-4 rounded-xl text-center font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg group-hover:scale-[1.02]"
                    style={{
                      backgroundColor: concept.accent,
                      color: concept.id === "concept-b" ? "#ffffff" : "#000000"
                    }}
                  >
                    <span>Launch Storefront ({concept.code})</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  {/* Subpage Quick Nav */}
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                    <Link
                      href={concept.shopRoute}
                      className="py-2 px-3 rounded-lg bg-zinc-800/80 hover:bg-zinc-800 text-zinc-300 hover:text-white text-center transition-colors flex items-center justify-center gap-1"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Shop Catalog</span>
                    </Link>
                    <Link
                      href={concept.sampleProductRoute}
                      className="py-2 px-3 rounded-lg bg-zinc-800/80 hover:bg-zinc-800 text-zinc-300 hover:text-white text-center transition-colors flex items-center justify-center gap-1"
                    >
                      <PackageCheck className="w-3 h-3" />
                      <span>Product Detail</span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Feature Grid Banner */}
        <div className="rounded-2xl bg-zinc-900/40 border border-zinc-800 p-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <span className="text-xs font-mono text-[#FF9F1C] uppercase font-bold tracking-wider">01 • Unified Backend</span>
            <h3 className="text-base font-bold text-white">Shared Cart &amp; Pricing</h3>
            <p className="text-xs text-zinc-400">Cart items and promo coupons seamlessly persist across concept switches.</p>
          </div>
          <div className="space-y-1">
            <span className="text-xs font-mono text-[#4A5844] uppercase font-bold tracking-wider">02 • Statutory Compliance</span>
            <h3 className="text-base font-bold text-white">FSSAI Nutrition Panels</h3>
            <p className="text-xs text-zinc-400">Per 100g statutory nutritional declarations, allergens, and dietary badges on all PDPs.</p>
          </div>
          <div className="space-y-1">
            <span className="text-xs font-mono text-[#70E000] uppercase font-bold tracking-wider">03 • Operations Ready</span>
            <h3 className="text-base font-bold text-white">Admin Management Portal</h3>
            <p className="text-xs text-zinc-400">Live order management, stock adjustments, batch tracking, and storefront switcher.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-8 px-4 text-center text-xs font-mono text-zinc-500">
        <p>© 2026 Peachy Plate Foods Ltd. • Three Visual Design Concepts Platform • All Rights Reserved</p>
      </footer>
    </div>
  );
}
