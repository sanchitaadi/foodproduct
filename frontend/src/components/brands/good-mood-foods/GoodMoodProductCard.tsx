"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Leaf, Plus, Sparkles } from "lucide-react";
import { PackagedFoodProduct } from "@/types/products";
import { SafeImage } from "@/components/common/SafeImage";
import { useCart } from "@/hooks/useCart";

interface GoodMoodProductCardProps {
  product: PackagedFoodProduct;
  basePath?: string;
}

export function GoodMoodProductCard({ product, basePath }: GoodMoodProductCardProps) {
  const pathname = usePathname();
  const { addItem } = useCart();
  const primaryPack = product.packSizes[0];

  let currentBasePath = basePath;
  if (!currentBasePath) {
    if (pathname?.includes("pure-co")) {
      currentBasePath = "/concepts/pure-co";
    } else if (pathname?.includes("goodness-co")) {
      currentBasePath = "/concepts/goodness-co";
    } else {
      currentBasePath = "/concepts/pure-co";
    }
  }

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const cartProduct = {
      id: Number(product.id.replace(/\D/g, "")) || 2,
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
      badge: product.brandVibes.goodMoodNote || "ORGANIC",
    };

    addItem(cartProduct, primaryPack.label, 1);
  };

  return (
    <Link
      href={`${currentBasePath}/product/${product.slug}`}
      className="group bg-white text-[#232B25] border border-[#E2DDD5] rounded-3xl p-5 shadow-[0_10px_35px_rgba(95,121,101,0.06)] hover:shadow-[0_15px_40px_rgba(95,121,101,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        {/* Soft Organic Badge */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="bg-[#EEF3EE] text-[#435C4A] text-[10px] font-serif italic px-3 py-1 rounded-full border border-[#5F7965]/20">
            {product.brandVibes.goodMoodNote || "Mindful Provision"}
          </span>
          <span className="text-[11px] font-serif text-[#67756B]">
            ★ {product.rating}
          </span>
        </div>

        {/* Product Image */}
        <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-[#F7F4EE] mb-4">
          <SafeImage
            src={product.primaryImage}
            alt={product.name}
            concept="good-mood-foods"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Title & Subtitle */}
        <h3 className="font-serif text-lg text-[#232B25] group-hover:text-[#5F7965] transition-colors line-clamp-1 mb-1">
          {product.name}
        </h3>
        <p className="text-xs text-[#67756B] font-light line-clamp-2 leading-relaxed mb-4">
          {product.subtitle}
        </p>
      </div>

      {/* Pricing & Add to Cart */}
      <div className="pt-3 border-t border-[#E2DDD5] flex items-center justify-between">
        <div>
          <span className="font-serif text-lg text-[#232B25]">
            ₹{primaryPack.priceInr}
          </span>
          <div className="text-[10px] text-[#67756B]">{primaryPack.label}</div>
        </div>

        <button
          onClick={handleQuickAdd}
          className="bg-[#5F7965] text-white p-2.5 rounded-full hover:bg-[#4d6452] shadow-sm hover:shadow transition-all"
          title="Add to Pantry"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>
    </Link>
  );
}
