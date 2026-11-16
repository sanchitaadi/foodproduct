"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { useCustomerAuth } from "@/hooks/useCustomerAuth";
import { DEMO_PRODUCTS } from "@/lib/demo-catalog";
import SafeImage from "@/components/common/SafeImage";
import {
  ShoppingBag,
  Heart,
  Search,
  User,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Flame,
  Leaf,
  Layers,
  ShieldCheck,
  Package,
} from "lucide-react";
import SearchModal from "@/components/common/SearchModal";

interface MegaMenuHeaderProps {
  concept: "flavourverse" | "purepantry" | "snackattack";
}

export default function MegaMenuHeader({ concept }: MegaMenuHeaderProps) {
  const pathname = usePathname();
  const { getItemCount, openCart } = useCart();
  const { wishlistIds } = useWishlist();
  const { customer, isLoggedIn } = useCustomerAuth();

  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoriesAccordionOpen, setIsCategoriesAccordionOpen] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  const itemCount = getItemCount();
  const wishlistCount = wishlistIds.length;

  // Track scroll state for frosted glass effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Handle Escape key to close mobile drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const basePath =
    concept === "flavourverse"
      ? "/concept-a-flavourverse"
      : concept === "purepantry"
      ? "/concept-b-purepantry"
      : "/concept-c-snackattack";

  const categories = [
    {
      name: "Salty Obsessions",
      slug: "salty-obsessions",
      count: "3 Provisions",
      image: "/images/products/gourmet-sorghum-crisps.jpg",
    },
    {
      name: "Liquid Happiness",
      slug: "liquid-happiness",
      count: "2 Sodas",
      image: "/images/products/prebiotic-white-peach-soda.jpg",
    },
    {
      name: "Chocolate Therapy",
      slug: "chocolate-therapy",
      count: "2 Reserves",
      image: "/images/products/malabar-dark-chocolate-74.jpg",
    },
    {
      name: "Better Bites",
      slug: "better-bites",
      count: "3 Harvests",
      image: "/images/products/kashmiri-jumbo-walnuts.jpg",
    },
    {
      name: "Pantry Essentials",
      slug: "pantry-essentials",
      count: "4 Provisions",
      image: "/images/products/wild-forest-honey.jpg",
    },
    {
      name: "Sweet Cravings",
      slug: "sweet-cravings",
      count: "3 Provisions",
      image: "/images/products/alphonso-mango-chili-pops.jpg",
    },
  ];

  const featuredProduct = DEMO_PRODUCTS[2]; // 74% Malabar Dark Bar

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled ? "shadow-xl backdrop-blur-xl" : ""
        } ${
          concept === "flavourverse"
            ? "bg-[#1F0E1C]/95 text-[#FFF4E8] border-b border-[#3D2439]"
            : concept === "purepantry"
            ? "bg-[#FAF7F2]/95 text-[#1E3A2F] border-b border-[#E3E8DC]"
            : "bg-white text-black border-b-4 border-black shadow-[0_4px_0_0_#000]"
        }`}
      >
        {/* ========================================================
            MOBILE HEADER BAR (lg:hidden)
            Layout: Left Hamburger | Center Logo | Right Icons (Search, Wishlist, Cart)
            ======================================================== */}
        <div className="lg:hidden flex items-center justify-between px-3 sm:px-5 h-16 w-full">
          {/* Left: Animated Hamburger Button (min 44x44px touch target) */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className={`w-11 h-11 flex items-center justify-center rounded-xl transition-all focus:outline-none focus:ring-2 ${
              concept === "flavourverse"
                ? "text-[#FF9F1C] hover:bg-[#FF9F1C]/10 focus:ring-[#FF9F1C]"
                : concept === "purepantry"
                ? "text-[#1E3A2F] hover:bg-[#1E3A2F]/10 focus:ring-[#1E3A2F]"
                : "text-black hover:bg-black/10 focus:ring-black border-2 border-black shadow-[2px_2px_0_0_#000]"
            }`}
            aria-label="Open mobile navigation menu"
          >
            <Menu className="w-6 h-6 stroke-[2.2]" />
          </button>

          {/* Center: Brand Logo (Centered, touch-friendly, links to concept home) */}
          <Link
            href={basePath}
            className="flex flex-col items-center justify-center text-center px-2 py-1 max-w-[200px] sm:max-w-none group"
          >
            <span
              className={`text-lg sm:text-xl font-black uppercase tracking-tight leading-none truncate ${
                concept === "flavourverse"
                  ? "font-serif text-[#FF9F1C]"
                  : concept === "purepantry"
                  ? "font-serif text-[#1E3A2F] tracking-wide"
                  : "italic tracking-tighter text-black transform -rotate-1 font-black"
              }`}
            >
              {concept === "flavourverse"
                ? "PEACHY PLATE"
                : concept === "purepantry"
                ? "PURE & PANTRY"
                : "SNACK ATTACK!"}
            </span>
            <span
              className={`text-[8px] font-mono tracking-[0.2em] uppercase mt-0.5 ${
                concept === "flavourverse"
                  ? "text-[#F5B99C]"
                  : concept === "purepantry"
                  ? "text-[#C16042]"
                  : "bg-black text-[#FFE600] px-1 font-bold rounded-sm"
              }`}
            >
              {concept === "flavourverse"
                ? "FLAVOURVERSE"
                : concept === "purepantry"
                ? "CLEAN FOODS"
                : "CRUNCH HQ"}
            </span>
          </Link>

          {/* Right: Quick Action Icons (Search, Wishlist, Cart) */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Search Icon (min 44x44px target) */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
                concept === "flavourverse"
                  ? "text-[#FFF4E8] hover:text-[#FF9F1C]"
                  : concept === "purepantry"
                  ? "text-[#1E3A2F] hover:text-[#C16042]"
                  : "text-black hover:bg-black/10"
              }`}
              aria-label="Search food products"
            >
              <Search className="w-5 h-5 stroke-[2.2]" />
            </button>

            {/* Wishlist Link with Live Badge (min 44x44px target) */}
            <Link
              href={`${basePath}/account`}
              className={`w-10 h-10 flex items-center justify-center relative rounded-lg transition-colors ${
                concept === "flavourverse"
                  ? "text-[#FFF4E8] hover:text-[#FF9F1C]"
                  : concept === "purepantry"
                  ? "text-[#1E3A2F] hover:text-[#C16042]"
                  : "text-black hover:bg-black/10"
              }`}
              aria-label={`Wishlist (${wishlistCount} items)`}
            >
              <Heart className="w-5 h-5 stroke-[2.2]" />
              {wishlistCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-rose-500 text-white font-mono text-[9px] font-bold flex items-center justify-center shadow-sm">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Bag Button with Live Item Count Pill (min 44x44px target) */}
            <button
              onClick={openCart}
              className={`h-10 px-2.5 sm:px-3 flex items-center gap-1.5 rounded-lg text-xs font-bold transition-all ${
                concept === "flavourverse"
                  ? "bg-[#FF9F1C] text-black hover:bg-[#ffa938]"
                  : concept === "purepantry"
                  ? "bg-[#1E3A2F] text-white hover:bg-[#274c3d] rounded-full"
                  : "bg-[#FF2A85] text-white font-black border-2 border-black shadow-[2px_2px_0_0_#000] active:translate-x-[1px] active:translate-y-[1px]"
              }`}
              aria-label={`Open shopping cart with ${itemCount} items`}
            >
              <ShoppingBag className="w-4 h-4 stroke-[2.4]" />
              <span className="font-mono text-xs font-bold">{itemCount}</span>
            </button>
          </div>
        </div>

        {/* ========================================================
            DESKTOP HEADER (hidden lg:flex)
            Layout: Brand Logo on Left | Center Mega Navigation | Right Utilities
            ======================================================== */}
        <div className="hidden lg:flex max-w-7xl mx-auto px-6 py-4 items-center justify-between">
          {/* Left: Brand Logo */}
          <Link href={basePath} className="flex flex-col group">
            <span
              className={`text-2xl sm:text-3xl font-black uppercase tracking-tight leading-none ${
                concept === "flavourverse"
                  ? "font-serif text-[#FF9F1C]"
                  : concept === "purepantry"
                  ? "font-serif text-[#1E3A2F] tracking-wide"
                  : "italic tracking-tighter text-black transform -rotate-1"
              }`}
            >
              {concept === "flavourverse"
                ? "PEACHY PLATE"
                : concept === "purepantry"
                ? "PURE & PANTRY"
                : "SNACK ATTACK!"}
            </span>
            <span
              className={`text-[9px] font-mono tracking-[0.25em] uppercase mt-0.5 ${
                concept === "flavourverse"
                  ? "text-[#F5B99C]"
                  : concept === "purepantry"
                  ? "text-[#C16042]"
                  : "bg-black text-[#FFE600] px-1 font-bold w-fit"
              }`}
            >
              {concept === "flavourverse"
                ? "FLAVOURVERSE ARCHIVE"
                : concept === "purepantry"
                ? "EST. 2026 • CLEAN PROVISIONS"
                : "CRUNCH HQ"}
            </span>
          </Link>

          {/* Center: Desktop Navigation Links with Mega Menu */}
          <nav className="flex items-center gap-7 text-xs uppercase tracking-widest font-semibold">
            <Link
              href={basePath}
              className={`transition-colors py-2 ${
                pathname === basePath ? "font-bold border-b-2" : "opacity-80 hover:opacity-100"
              }`}
            >
              Home
            </Link>

            {/* Mega Menu Trigger */}
            <div
              className="relative py-2 cursor-pointer"
              onMouseEnter={() => setIsMegaMenuOpen(true)}
              onMouseLeave={() => setIsMegaMenuOpen(false)}
            >
              <div className="flex items-center gap-1 opacity-80 hover:opacity-100">
                <span>Collections</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </div>

              {/* Mega Menu Dropdown */}
              {isMegaMenuOpen && (
                <div
                  className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-[760px] transition-all z-50"
                >
                  <div
                    className={`p-6 border shadow-2xl backdrop-blur-2xl rounded-2xl grid grid-cols-12 gap-6 ${
                      concept === "flavourverse"
                        ? "bg-[#1F0E1C] text-[#FFF4E8] border-[#FF9F1C]/40"
                        : concept === "purepantry"
                        ? "bg-white text-[#1E3A2F] border-[#E3E8DC]"
                        : "bg-[#FFE600] text-black border-4 border-black shadow-[6px_6px_0_0_#000]"
                    }`}
                  >
                    {/* Categories (8 cols) */}
                    <div className="col-span-8 space-y-3">
                      <div className="flex justify-between items-center text-[11px] font-mono uppercase pb-2 border-b border-neutral-700/20">
                        <span className="font-bold">Explore By Pantry Category</span>
                        <Link href={`${basePath}/shop`} className="hover:underline">
                          View All 12 SKUs &rarr;
                        </Link>
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-1">
                        {categories.map((cat) => (
                          <Link
                            key={cat.slug}
                            href={`${basePath}/category/${cat.slug}`}
                            className="flex items-center gap-3 p-2 rounded-xl transition-all hover:bg-black/10 group/cat"
                          >
                            <div className="w-12 h-12 rounded-lg overflow-hidden bg-black/40 border border-neutral-700/20 relative flex-shrink-0">
                              <SafeImage
                                src={cat.image}
                                alt={cat.name}
                                concept={concept}
                                className="w-full h-full object-cover group-hover/cat:scale-105 transition-transform"
                              />
                            </div>
                            <div>
                              <div className="font-bold text-xs font-sans group-hover/cat:underline">
                                {cat.name}
                              </div>
                              <div className="text-[10px] font-mono opacity-70">
                                {cat.count}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Featured Item in Mega Menu (4 cols) */}
                    <div className="col-span-4 p-4 rounded-xl bg-black/10 border border-neutral-700/20 flex flex-col justify-between">
                      <div>
                        <span className="text-[9px] font-mono uppercase tracking-widest font-bold opacity-75 block mb-2">
                          Featured This Season
                        </span>
                        <div className="relative aspect-square w-full rounded-lg overflow-hidden mb-2 bg-black/40">
                          <SafeImage
                            src={featuredProduct.images.primary}
                            alt={featuredProduct.name}
                            concept={concept}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h4 className="font-bold text-xs line-clamp-1">{featuredProduct.name}</h4>
                        <p className="text-[11px] font-mono font-bold mt-1">₹{featuredProduct.price}</p>
                      </div>

                      <Link
                        href={`${basePath}/product/${featuredProduct.slug}`}
                        className="mt-3 text-[10px] font-mono uppercase font-bold flex items-center justify-between hover:underline pt-2 border-t border-neutral-700/20"
                      >
                        <span>Taste Profile</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              href={`${basePath}/shop`}
              className={`transition-colors py-2 ${
                pathname.includes("/shop") ? "font-bold border-b-2" : "opacity-80 hover:opacity-100"
              }`}
            >
              Shop All
            </Link>

            <Link
              href={`${basePath}/gallery`}
              className={`transition-colors py-2 ${
                pathname.includes("/gallery") ? "font-bold border-b-2" : "opacity-80 hover:opacity-100"
              }`}
            >
              Gallery
            </Link>

            <Link
              href={`${basePath}/our-story`}
              className={`transition-colors py-2 ${
                pathname.includes("/our-story") ? "font-bold border-b-2" : "opacity-80 hover:opacity-100"
              }`}
            >
              Our Story
            </Link>

            <Link
              href={`${basePath}/track-order`}
              className={`transition-colors py-2 ${
                pathname.includes("/track-order") ? "font-bold border-b-2" : "opacity-80 hover:opacity-100"
              }`}
            >
              Track Order
            </Link>
          </nav>

          {/* Right Utilities: Search, Wishlist, Account, Cart */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Open search"
              className="p-2 opacity-80 hover:opacity-100 transition-opacity"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Wishlist Link */}
            <Link
              href={`${basePath}/account`}
              aria-label="Wishlist"
              className="p-2 opacity-80 hover:opacity-100 relative transition-opacity"
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white font-mono text-[9px] font-bold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Customer Account with Staff Admin Dropdown */}
            <div className="relative group">
              <Link
                href={isLoggedIn ? `${basePath}/account` : `${basePath}/login`}
                aria-label="Customer Account"
                className="p-2 opacity-80 hover:opacity-100 transition-opacity flex items-center gap-1"
              >
                <User className="w-4 h-4" />
              </Link>
              <div className="absolute right-0 top-full pt-1.5 w-48 hidden group-hover:block z-50">
                <div className="p-2 rounded-xl bg-[#131B2E] border border-slate-700 shadow-2xl text-xs font-mono space-y-1">
                  <Link
                    href={`${basePath}/account`}
                    className="block p-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white"
                  >
                    My Patron Account
                  </Link>
                  <Link
                    href="/admin"
                    className="block p-2 rounded-lg text-amber-400 hover:bg-slate-800 font-bold border-t border-slate-800 flex items-center justify-between"
                  >
                    <span>Staff Admin Panel</span>
                    <span className="text-[9px] bg-amber-500/20 px-1 rounded">2.0</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Cart Button */}
            <button
              onClick={openCart}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                concept === "flavourverse"
                  ? "bg-[#FF9F1C] hover:bg-[#ffa938] text-black shadow-lg shadow-amber-500/10"
                  : concept === "purepantry"
                  ? "bg-[#1E3A2F] hover:bg-[#274c3d] text-white rounded-full"
                  : "bg-[#FF2A85] text-white font-black border-2 border-black shadow-[3px_3px_0_0_#000] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>
                {concept === "flavourverse"
                  ? "Pantry Tote"
                  : concept === "purepantry"
                  ? "Basket"
                  : "Stash"}
              </span>
              <span className="font-mono text-xs font-bold">({itemCount})</span>
            </button>
          </div>
        </div>

        {/* ========================================================
            DEDICATED FULL-HEIGHT MOBILE NAVIGATION DRAWER
            Slide-over with backdrop blur, body scroll lock & concept styling
            ======================================================== */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            {/* Dark Backdrop Overlay with Blur */}
            <div
              className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Slide-over Drawer Content */}
            <div
              className={`relative z-10 w-[88%] max-w-sm h-full flex flex-col justify-between shadow-2xl overflow-y-auto transform transition-transform duration-300 ease-in-out ${
                concept === "flavourverse"
                  ? "bg-[#1F0E1C] text-[#FFF4E8] border-r border-[#3D2439]"
                  : concept === "purepantry"
                  ? "bg-[#FAF7F2] text-[#1E3A2F] border-r border-[#E3E8DC]"
                  : "bg-[#FFE600] text-black border-r-4 border-black font-black"
              }`}
            >
              {/* Drawer Top Bar: Brand + Close Button */}
              <div
                className={`flex items-center justify-between p-5 border-b sticky top-0 z-20 backdrop-blur-md ${
                  concept === "flavourverse"
                    ? "bg-[#1F0E1C]/90 border-[#3D2439]"
                    : concept === "purepantry"
                    ? "bg-[#FAF7F2]/90 border-[#E3E8DC]"
                    : "bg-[#FFE600] border-b-4 border-black"
                }`}
              >
                <div className="flex flex-col">
                  <span
                    className={`text-xl font-black uppercase tracking-tight ${
                      concept === "flavourverse"
                        ? "font-serif text-[#FF9F1C]"
                        : concept === "purepantry"
                        ? "font-serif text-[#1E3A2F]"
                        : "italic text-black"
                    }`}
                  >
                    {concept === "flavourverse"
                      ? "PEACHY PLATE"
                      : concept === "purepantry"
                      ? "PURE & PANTRY"
                      : "SNACK ATTACK!"}
                  </span>
                  <span
                    className={`text-[9px] font-mono tracking-widest uppercase ${
                      concept === "flavourverse"
                        ? "text-[#F5B99C]"
                        : concept === "purepantry"
                        ? "text-[#C16042]"
                        : "bg-black text-[#FFE600] px-1 font-bold w-fit mt-0.5"
                    }`}
                  >
                    {concept === "flavourverse"
                      ? "EDITORIAL GASTRONOMY"
                      : concept === "purepantry"
                      ? "CLEAN PANTRY LIVING"
                      : "CRUNCH HEADQUARTERS"}
                  </span>
                </div>

                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`w-11 h-11 flex items-center justify-center rounded-xl transition-all focus:outline-none ${
                    concept === "flavourverse"
                      ? "text-[#FFF4E8] hover:bg-[#3D2439]"
                      : concept === "purepantry"
                      ? "text-[#1E3A2F] hover:bg-[#E3E8DC]"
                      : "text-black border-2 border-black bg-white shadow-[2px_2px_0_0_#000]"
                  }`}
                  aria-label="Close navigation menu"
                >
                  <X className="w-5 h-5 stroke-[2.5]" />
                </button>
              </div>

              {/* Drawer Body: Search + Nav Links */}
              <div className="p-5 space-y-6 flex-1">
                {/* Mobile Quick Search Bar */}
                <div
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsSearchOpen(true);
                  }}
                  className={`p-3 rounded-xl flex items-center gap-3 cursor-pointer transition-all ${
                    concept === "flavourverse"
                      ? "bg-[#2A1426] border border-[#3D2439] text-[#F5B99C] hover:border-[#FF9F1C]/40"
                      : concept === "purepantry"
                      ? "bg-white border border-[#E3E8DC] text-neutral-500 hover:border-[#1E3A2F]/40"
                      : "bg-white border-2 border-black text-black shadow-[3px_3px_0_0_#000]"
                  }`}
                >
                  <Search className="w-4 h-4 flex-shrink-0" />
                  <span className="text-xs font-mono uppercase tracking-wider">
                    Search 12 food provisions...
                  </span>
                </div>

                {/* Primary Nav Links */}
                <nav className="space-y-1">
                  <Link
                    href={basePath}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center justify-between p-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-colors ${
                      pathname === basePath
                        ? concept === "flavourverse"
                          ? "bg-[#FF9F1C] text-black"
                          : concept === "purepantry"
                          ? "bg-[#1E3A2F] text-white"
                          : "bg-black text-[#FFE600]"
                        : "hover:bg-black/10"
                    }`}
                  >
                    <span>Home</span>
                    <ChevronRight className="w-4 h-4 opacity-50" />
                  </Link>

                  <Link
                    href={`${basePath}/shop`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center justify-between p-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-colors ${
                      pathname.includes("/shop")
                        ? concept === "flavourverse"
                          ? "bg-[#FF9F1C] text-black"
                          : concept === "purepantry"
                          ? "bg-[#1E3A2F] text-white"
                          : "bg-black text-[#FFE600]"
                        : "hover:bg-black/10"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>Shop All Provisions</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/20 text-current">
                        12 SKUs
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 opacity-50" />
                  </Link>

                  {/* Expandable Collections / Categories Accordion */}
                  <div
                    className={`rounded-xl border overflow-hidden transition-all ${
                      concept === "flavourverse"
                        ? "border-[#3D2439] bg-[#2A1426]/50"
                        : concept === "purepantry"
                        ? "border-[#E3E8DC] bg-white/70"
                        : "border-2 border-black bg-white"
                    }`}
                  >
                    <button
                      onClick={() => setIsCategoriesAccordionOpen(!isCategoriesAccordionOpen)}
                      className="w-full flex items-center justify-between p-3 text-sm font-bold uppercase tracking-wider text-left"
                    >
                      <div className="flex items-center gap-2">
                        <Layers className="w-4 h-4" />
                        <span>Curated Collections</span>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isCategoriesAccordionOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isCategoriesAccordionOpen && (
                      <div className="px-3 pb-3 pt-1 space-y-1.5 border-t border-neutral-700/10">
                        {categories.map((cat) => (
                          <Link
                            key={cat.slug}
                            href={`${basePath}/category/${cat.slug}`}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center justify-between p-2 rounded-lg text-xs font-medium hover:bg-black/10 transition-colors group"
                          >
                            <div className="flex items-center gap-2.5">
                              <div className="w-7 h-7 rounded-md overflow-hidden bg-black/30 border border-neutral-700/20 relative flex-shrink-0">
                                <SafeImage
                                  src={cat.image}
                                  alt={cat.name}
                                  concept={concept}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <span className="font-semibold group-hover:underline">
                                {cat.name}
                              </span>
                            </div>
                            <span className="text-[10px] font-mono opacity-70">
                              {cat.count}
                            </span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Secondary Storefront Links */}
                  <Link
                    href={`${basePath}/shop?filter=new`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl text-xs font-mono uppercase tracking-wider hover:bg-black/10 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>New Harvest Arrivals</span>
                    </div>
                    <span className="text-[10px] bg-rose-500/20 text-rose-300 px-1.5 py-0.5 rounded">
                      FRESH
                    </span>
                  </Link>

                  <Link
                    href={`${basePath}/gallery`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl text-xs font-mono uppercase tracking-wider hover:bg-black/10 transition-colors"
                  >
                    <span>Visual Food Gallery</span>
                    <ChevronRight className="w-4 h-4 opacity-50" />
                  </Link>

                  <Link
                    href={`${basePath}/our-story`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl text-xs font-mono uppercase tracking-wider hover:bg-black/10 transition-colors"
                  >
                    <span>Our Story & Sourcing</span>
                    <ChevronRight className="w-4 h-4 opacity-50" />
                  </Link>

                  <Link
                    href={`${basePath}/track-order`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl text-xs font-mono uppercase tracking-wider hover:bg-black/10 transition-colors"
                  >
                    <span>Track Order (AWB)</span>
                    <ChevronRight className="w-4 h-4 opacity-50" />
                  </Link>

                  <Link
                    href={`${basePath}/contact`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl text-xs font-mono uppercase tracking-wider hover:bg-black/10 transition-colors"
                  >
                    <span>Contact Concierge</span>
                    <ChevronRight className="w-4 h-4 opacity-50" />
                  </Link>
                </nav>

                {/* Account & Wishlist Shortcuts */}
                <div className="pt-4 border-t border-neutral-700/20 space-y-2">
                  <div className="text-[10px] font-mono uppercase tracking-widest opacity-60 px-3">
                    Customer Account
                  </div>

                  <Link
                    href={isLoggedIn ? `${basePath}/account` : `${basePath}/login`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl text-xs font-mono uppercase tracking-wider hover:bg-black/10 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{isLoggedIn ? `Account (${customer?.name || "Guest"})` : "Sign In / Register"}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 opacity-50" />
                  </Link>

                  <Link
                    href={`${basePath}/account`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl text-xs font-mono uppercase tracking-wider hover:bg-black/10 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-rose-500" />
                      <span>Saved Curations</span>
                    </div>
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-rose-500 text-white">
                      {wishlistCount}
                    </span>
                  </Link>

                  <Link
                    href="/admin"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl text-xs font-mono uppercase tracking-wider text-amber-400 hover:bg-black/10 transition-colors border border-amber-500/20"
                  >
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-amber-400" />
                      <span>Staff Admin Console</span>
                    </div>
                    <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded font-bold">
                      2.0
                    </span>
                  </Link>
                </div>
              </div>

              {/* Drawer Footer: Cart Action + Compliance */}
              <div
                className={`p-5 border-t sticky bottom-0 z-20 backdrop-blur-md space-y-3 ${
                  concept === "flavourverse"
                    ? "bg-[#1F0E1C]/95 border-[#3D2439]"
                    : concept === "purepantry"
                    ? "bg-[#FAF7F2]/95 border-[#E3E8DC]"
                    : "bg-[#FFE600] border-t-4 border-black"
                }`}
              >
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    openCart();
                  }}
                  className={`w-full py-3.5 px-4 rounded-xl flex items-center justify-between font-bold text-xs uppercase tracking-wider shadow-lg transition-all ${
                    concept === "flavourverse"
                      ? "bg-[#FF9F1C] text-black hover:bg-[#ffa938]"
                      : concept === "purepantry"
                      ? "bg-[#1E3A2F] text-white hover:bg-[#274c3d] rounded-full"
                      : "bg-[#FF2A85] text-white font-black border-2 border-black shadow-[3px_3px_0_0_#000]"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4" />
                    <span>
                      {concept === "flavourverse"
                        ? "Open Pantry Tote"
                        : concept === "purepantry"
                        ? "View Basket"
                        : "Open Snack Stash"}
                    </span>
                  </div>
                  <span className="font-mono text-xs">({itemCount} items)</span>
                </button>

                <div className="flex items-center justify-between text-[9px] font-mono opacity-60">
                  <div className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>FSSAI #10021011000428</span>
                  </div>
                  <span>Pan-India Free Shipping ₹499+</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Global Instant Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        concept={concept}
      />
    </>
  );
}
