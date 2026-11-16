"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Plus, Sparkles } from "lucide-react";
import { PackagedFoodProduct } from "@/types/products";
import { SafeImage } from "@/components/common/SafeImage";
import { useCart } from "@/hooks/useCart";

interface HappyProductCardProps {
  product: PackagedFoodProduct;
  basePath?: string;
}

export function HappyProductCard({ product, basePath }: HappyProductCardProps) {
  const pathname = usePathname();
  const currentBasePath = basePath || (pathname?.includes("happy-bites") ? "/concepts/happy-bites" : "/concepts/happy-cravings");
  const { addItem } = useCart();
  const primaryPack = product.packSizes[0];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const cartProduct = {
      id: Number(product.id.replace(/\D/g, "")) || 4,
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
      badge: product.brandVibes.happyCravingsDoodle || "YUMMY",
    };

    addItem(cartProduct, primaryPack.label, 1);
  };

  return (
    <Link
      href={`${currentBasePath}/product/${product.slug}`}
      className="group bg-white text-[#4A3E3D] border-2 border-[#F5D5CB] rounded-3xl p-5 shadow-[0_8px_24px_rgba(255,158,125,0.15)] hover:shadow-[0_12px_28px_rgba(255,158,125,0.28)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between relative"
    >
      {/* Cute polaroid tape effect */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-[#FFE66D]/80 border border-[#F5D5CB] rotate-[-2deg] rounded-sm pointer-events-none" />

      <div>
        {/* Top Tag */}
        <div className="flex items-center justify-between gap-2 mb-3 mt-1">
          <span className="bg-[#FFE66D] text-[#4A3E3D] text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-[#F5D5CB]">
            {product.brandVibes.happyCravingsDoodle || "Sweet Treat ✨"}
          </span>
          <span className="text-xs font-bold text-[#FF9E7D] flex items-center gap-0.5">
            <Heart className="w-3 h-3 fill-[#FF9E7D]" />
            <span>{product.rating}</span>
          </span>
        </div>

        {/* Product Image */}
        <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#FFF9F5] border border-[#F5D5CB] mb-3">
          <SafeImage
            src={product.primaryImage}
            alt={product.name}
            concept="happy-cravings"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Title & Tagline */}
        <h3 className="font-extrabold text-base text-[#4A3E3D] group-hover:text-[#FF9E7D] transition-colors line-clamp-1 mb-1">
          {product.name}
        </h3>
        <p className="text-xs text-[#8A7977] line-clamp-2 leading-relaxed mb-4">
          {product.subtitle}
        </p>
      </div>

      {/* Pricing & Add to Cart */}
      <div className="pt-3 border-t border-[#F5D5CB] flex items-center justify-between">
        <div>
          <span className="font-extrabold text-lg text-[#FF9E7D]">
            ₹{primaryPack.priceInr}
          </span>
          <div className="text-[10px] text-[#8A7977] font-semibold">{primaryPack.label}</div>
        </div>

        <button
          onClick={handleQuickAdd}
          className="bg-[#FF9E7D] text-white p-2.5 rounded-full shadow-[0_4px_12px_rgba(255,158,125,0.35)] hover:bg-[#ff8a63] hover:scale-110 active:scale-95 transition-all"
          title="Add Treat"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>
    </Link>
  );
}
