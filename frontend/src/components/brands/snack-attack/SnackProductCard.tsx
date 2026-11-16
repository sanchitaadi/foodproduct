"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Zap, Plus, Flame, Star } from "lucide-react";
import { PackagedFoodProduct } from "@/types/products";
import { SafeImage } from "@/components/common/SafeImage";
import { useCart } from "@/hooks/useCart";

interface SnackProductCardProps {
  product: PackagedFoodProduct;
  basePath?: string;
}

export function SnackProductCard({ product, basePath }: SnackProductCardProps) {
  const pathname = usePathname();
  const { addItem } = useCart();
  const primaryPack = product.packSizes[0];

  let currentBasePath = basePath;
  if (!currentBasePath) {
    if (pathname?.includes("pop-cult")) {
      currentBasePath = "/concepts/pop-cult";
    } else if (pathname?.includes("pop-snacks")) {
      currentBasePath = "/concepts/pop-snacks";
    } else {
      currentBasePath = "/concepts/pop-cult";
    }
  }

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const cartProduct = {
      id: Number(product.id.replace(/\D/g, "")) || Math.floor(Math.random() * 1000) + 1,
      name: product.name,
      slug: product.slug,
      price: primaryPack.priceInr,
      originalPrice: primaryPack.compareAtPriceInr || primaryPack.priceInr + 30,
      images: {
        primary: product.primaryImage,
        gallery: product.galleryImages,
      },
      tagline: product.subtitle,
      packSizes: product.packSizes.map((p) => p.label),
      badge: product.brandVibes.snackAttackBadge || "POPULAR",
    };

    addItem(cartProduct, primaryPack.label, 1);
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
            {product.brandVibes.snackAttackBadge || "10/10 CRUNCH"}
          </span>
          <div className="flex items-center gap-1 text-[11px] font-black bg-white px-1.5 py-0.5 border border-black rounded">
            <Star className="w-3 h-3 fill-[#FF5400] text-[#FF5400]" />
            <span>{product.rating}</span>
          </div>
        </div>

        {/* Product Image */}
        <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-black/5 border-2 border-black mb-3">
          <SafeImage
            src={product.primaryImage}
            alt={product.name}
            concept="snack-attack"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Title & Subtitle */}
        <h3 className="font-black text-lg uppercase tracking-tight group-hover:text-[#FF5400] transition-colors line-clamp-1 mb-1">
          {product.name}
        </h3>
        <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed mb-4">
          {product.subtitle}
        </p>
      </div>

      {/* Pricing & Add to Cart */}
      <div className="pt-3 border-t-2 border-black flex items-center justify-between">
        <div>
          <span className="font-black text-xl text-black">
            ₹{primaryPack.priceInr}
          </span>
          <div className="text-[10px] text-neutral-500 font-mono">{primaryPack.label}</div>
        </div>

        <button
          onClick={handleQuickAdd}
          className="bg-[#FF5400] text-black p-2.5 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] hover:bg-[#FFD60A] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#000] transition-all"
          title="Add to Stash"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
        </button>
      </div>
    </Link>
  );
}
