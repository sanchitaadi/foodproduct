"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Zap, Plus, Flame, Star, Check } from "lucide-react";
import { PackagedFoodProduct } from "@/types/products";
import { SafeImage } from "@/components/common/SafeImage";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/useToast";

interface SnackProductCardProps {
  product: PackagedFoodProduct | any;
  basePath?: string;
}

export function SnackProductCard({ product, basePath }: SnackProductCardProps) {
  const pathname = usePathname();
  const { addItem, openCart } = useCart();
  const { addToast } = useToast();
  const [isAdded, setIsAdded] = useState(false);

  let currentBasePath = basePath;
  if (!currentBasePath) {
    if (pathname?.includes("concept-c-snackattack")) {
      currentBasePath = "/concept-c-snackattack";
    } else if (pathname?.includes("pop-cult")) {
      currentBasePath = "/concepts/pop-cult";
    } else if (pathname?.includes("pop-snacks")) {
      currentBasePath = "/concepts/pop-snacks";
    } else if (pathname?.includes("snack-attack")) {
      currentBasePath = "/concept-c-snackattack";
    } else {
      currentBasePath = "/concept-c-snackattack";
    }
  }

  // Handle both PackagedFoodProduct and DemoProduct shapes
  const primaryPack = product.packSizes?.[0] || {
    id: "std",
    label: "Standard Pack",
    title: "Standard Pack",
    packSize: "Standard",
    priceInr: product.price || 99,
    price: product.price || 99,
    compareAtPriceInr: product.compareAtPrice,
    netQuantity: "100g",
    weightGrams: 100,
    inStock: true
  };

  const price = primaryPack.priceInr || primaryPack.price || product.price || 99;
  const compareAt = primaryPack.compareAtPriceInr || primaryPack.compareAtPrice;
  const primaryImg = product.primaryImage || product.images?.primary || "/images/products/kettle-cooked-sea-salt-crisps.jpg";
  const badgeText = product.brandVibes?.snackAttackBadge || (product.isBestseller ? "BESTSELLER 🔥" : "10/10 CRUNCH");

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addItem(product, primaryPack, 1);
    setIsAdded(true);
    addToast(
      "Stashed!",
      `1x ${product.name} added to your munchie bag.`,
      "success"
    );
    setTimeout(() => setIsAdded(false), 1500);
    openCart();
  };

  return (
    <Link
      href={`${currentBasePath}/product/${product.slug}`}
      className="group bg-[#FFFDF5] text-black border-3 border-black rounded-2xl p-4 shadow-[5px_5px_0px_#0A0A0A] hover:shadow-[7px_7px_0px_#FF007F] hover:-translate-y-1 transition-all flex flex-col justify-between"
    >
      <div>
        {/* Top Sticker Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="bg-[#FFD60A] text-black text-[10px] font-black uppercase px-2 py-0.5 border-2 border-black rotate-[-3deg] shadow-[2px_2px_0px_#000]">
            {badgeText}
          </span>
          <div className="flex items-center gap-1 text-[11px] font-black bg-white px-1.5 py-0.5 border border-black rounded">
            <Star className="w-3 h-3 fill-[#FF5400] text-[#FF5400]" />
            <span>{product.rating || 4.8}</span>
          </div>
        </div>

        {/* Product Image Frame */}
        <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#FFD60A]/20 border-2 border-black mb-3">
          <SafeImage
            src={primaryImg}
            alt={product.name}
            concept="snack-attack"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Title & Subtitle */}
        <div className="space-y-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#FF5400] block">
            {product.categoryName || product.category?.name || "Desi Munchies"}
          </span>
          <h3 className="font-black text-base uppercase tracking-tight text-black group-hover:text-[#FF5400] transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-[11px] text-neutral-600 font-medium line-clamp-2 leading-relaxed">
            {product.subtitle || product.tagline || product.description}
          </p>
        </div>
      </div>

      {/* Footer: Price & Quick Add */}
      <div className="pt-4 mt-3 border-t-2 border-black/10 flex items-center justify-between gap-2">
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-black text-lg text-black">₹{price}</span>
            {compareAt && (
              <span className="text-xs font-bold line-through text-neutral-400">
                ₹{compareAt}
              </span>
            )}
          </div>
          <span className="text-[9px] font-mono font-bold text-neutral-500 block">
            {primaryPack.label || primaryPack.packSize || primaryPack.netQuantity || "100g Pouch"}
          </span>
        </div>

        <button
          onClick={handleQuickAdd}
          className={`px-3 py-2 border-2 border-black font-black text-xs uppercase shadow-[2px_2px_0px_#000] hover:shadow-[1px_1px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] transition-all flex items-center gap-1 ${
            isAdded ? "bg-emerald-400 text-black" : "bg-[#FFD60A] text-black hover:bg-[#FF5400] hover:text-white"
          }`}
          aria-label={`Add ${product.name} to bag`}
        >
          {isAdded ? (
            <>
              <Check className="w-3.5 h-3.5 stroke-[3]" />
              <span>Added!</span>
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span>Stash</span>
            </>
          )}
        </button>
      </div>
    </Link>
  );
}
