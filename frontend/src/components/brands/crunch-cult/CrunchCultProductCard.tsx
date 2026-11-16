"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plus } from "lucide-react";
import { PackagedFoodProduct } from "@/types/products";
import { SafeImage } from "@/components/common/SafeImage";
import { useCart } from "@/hooks/useCart";

interface CrunchCultProductCardProps {
  product: PackagedFoodProduct;
  basePath?: string;
}

export function CrunchCultProductCard({ product, basePath }: CrunchCultProductCardProps) {
  const pathname = usePathname();
  const { addItem } = useCart();
  const primaryPack = product.packSizes[0];

  let currentBasePath = basePath;
  if (!currentBasePath) {
    if (pathname?.includes("crunch-mode")) {
      currentBasePath = "/concepts/crunch-mode";
    } else if (pathname?.includes("crave-cult")) {
      currentBasePath = "/concepts/crave-cult";
    } else {
      currentBasePath = "/concepts/crunch-mode";
    }
  }

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const cartProduct = {
      id: Number(product.id.replace(/\D/g, "")) || 3,
      name: product.name,
      slug: product.slug,
      price: primaryPack.priceInr,
      originalPrice: primaryPack.compareAtPriceInr || primaryPack.priceInr + 50,
      images: {
        primary: product.primaryImage,
        gallery: product.galleryImages,
      },
      tagline: product.subtitle,
      packSizes: product.packSizes.map((p) => p.label),
      badge: product.brandVibes.crunchCultCode || "DROPPED",
    };

    addItem(cartProduct, primaryPack.label, 1);
  };

  return (
    <Link
      href={`${currentBasePath}/product/${product.slug}`}
      className="group bg-[#101012] text-[#F2F2F2] border border-zinc-800 hover:border-[#CCFF00] transition-colors flex flex-col justify-between p-4 relative font-mono select-none"
    >
      {/* Corner crosshairs */}
      <span className="absolute top-1 left-1 text-[9px] text-zinc-600 font-mono">+</span>
      <span className="absolute top-1 right-1 text-[9px] text-zinc-600 font-mono">+</span>

      <div>
        {/* Top Tag */}
        <div className="flex items-center justify-between text-[10px] text-zinc-500 mb-2">
          <span className="text-[#CCFF00]">
            {product.brandVibes.crunchCultCode || `[SYS//${product.slug.slice(0, 6).toUpperCase()}]`}
          </span>
          <span>INR</span>
        </div>

        {/* High-Contrast Image */}
        <div className="relative aspect-square w-full bg-black border border-zinc-900 mb-3 overflow-hidden">
          <SafeImage
            src={product.primaryImage}
            alt={product.name}
            concept="crunch-cult"
            className="w-full h-full object-cover filter contrast-125 group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Title & Tagline */}
        <h3 className="font-mono font-bold text-sm uppercase text-white group-hover:text-[#CCFF00] transition-colors line-clamp-1 mb-1">
          {product.name}
        </h3>
        <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed mb-4">
          {product.subtitle}
        </p>
      </div>

      {/* Pricing & Add */}
      <div className="pt-3 border-t border-zinc-900 flex items-center justify-between">
        <div>
          <span className="font-mono font-bold text-base text-[#CCFF00]">
            ₹{primaryPack.priceInr}
          </span>
          <div className="text-[9px] text-zinc-500">{primaryPack.label}</div>
        </div>

        <button
          onClick={handleQuickAdd}
          className="bg-zinc-900 border border-zinc-700 text-white p-2 hover:bg-[#CCFF00] hover:text-black hover:border-[#CCFF00] transition-colors"
          title="Acquire Drop"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
        </button>
      </div>
    </Link>
  );
}
