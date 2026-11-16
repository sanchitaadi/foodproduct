"use client";

import React, { useState } from "react";
import Link from "next/link";
import { DemoProduct } from "@/lib/demo-catalog";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { useQuickView } from "@/hooks/useQuickView";
import { useComparison } from "@/hooks/useComparison";
import { useToast } from "@/hooks/useToast";
import SafeImage from "@/components/common/SafeImage";
import {
  ShoppingBag,
  Heart,
  Eye,
  Check,
  Sparkles,
  ArrowRight,
  Plus,
  Scale,
} from "lucide-react";

interface ProductCardProps {
  product: DemoProduct;
  concept?: "flavourverse" | "purepantry" | "snackattack";
  priority?: boolean;
}

export default function ProductCard({
  product,
  concept = "flavourverse",
  priority = false,
}: ProductCardProps) {
  const { addItem, openCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { openQuickView } = useQuickView();
  const { addToCompare, isInComparison, removeFromCompare } = useComparison();
  const { addToast } = useToast();

  const [isHovered, setIsHovered] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const packOption = product.packSizes[0];
  const wishlisted = isWishlisted(product.id);
  const comparing = isInComparison(product.id);

  const conceptPath =
    concept === "flavourverse"
      ? "concept-a-flavourverse"
      : concept === "purepantry"
      ? "concept-b-purepantry"
      : "concept-c-snackattack";

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, packOption, 1);
    setIsAdded(true);
    addToast(`Added ${product.name} to Tote`, `${packOption.title} • ₹${packOption.price}`);
    setTimeout(() => setIsAdded(false), 1600);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
    addToast(
      wishlisted ? "Removed from Curated Reserve" : "Saved to Curated Reserve",
      product.name
    );
  };

  const handleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (comparing) {
      removeFromCompare(product.id);
      addToast("Removed from Comparison", product.name, "info");
    } else {
      const ok = addToCompare(product.id);
      if (ok) addToast("Added to Side-by-Side Comparison", product.name, "info");
    }
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openQuickView(product, concept);
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative flex flex-col justify-between transition-all duration-300 ${
        concept === "flavourverse"
          ? "bg-[#2A1426]/40 border border-[#3D2439] hover:border-[#FF9F1C]/60"
          : concept === "purepantry"
          ? "bg-white border border-[#E3E8DC] rounded-3xl p-4 shadow-sm hover:shadow-md"
          : "bg-white border-4 border-black p-4 shadow-[6px_6px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0_0_#000]"
      }`}
    >
      <div>
        {/* Image Container with Secondary Hover Transition */}
        <div
          className={`relative aspect-square w-full overflow-hidden ${
            concept === "flavourverse"
              ? "bg-black/50"
              : concept === "purepantry"
              ? "bg-[#FAF7F2] rounded-2xl"
              : "bg-black border-2 border-black"
          }`}
        >
          {/* Primary Image */}
          <div
            className={`absolute inset-0 transition-opacity duration-500 ${
              isHovered && product.images.secondary ? "opacity-0" : "opacity-100"
            }`}
          >
            <SafeImage
              src={product.images.primary}
              alt={product.name}
              concept={concept}
              priority={priority}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Secondary Hover Image */}
          {product.images.secondary && (
            <div
              className={`absolute inset-0 transition-opacity duration-500 ${
                isHovered ? "opacity-100 scale-105" : "opacity-0"
              }`}
            >
              <SafeImage
                src={product.images.secondary}
                alt={`${product.name} alternate view`}
                concept={concept}
                className="w-full h-full object-cover transition-transform duration-700"
              />
            </div>
          )}

          {/* Top Badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
            {product.isBestseller && (
              <span
                className={`text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 font-bold ${
                  concept === "flavourverse"
                    ? "bg-[#FF9F1C] text-black"
                    : concept === "purepantry"
                    ? "bg-[#1E3A2F] text-white rounded-full"
                    : "bg-[#FFE600] text-black border border-black shadow-[2px_2px_0_0_#000]"
                }`}
              >
                Bestseller
              </span>
            )}
            {product.isNew && (
              <span
                className={`text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 font-bold ${
                  concept === "flavourverse"
                    ? "bg-[#D62839] text-white"
                    : concept === "purepantry"
                    ? "bg-[#C16042] text-white rounded-full"
                    : "bg-[#FF2A85] text-white border border-black shadow-[2px_2px_0_0_#000]"
                }`}
              >
                New Arrival
              </span>
            )}
          </div>

          {/* Wishlist Button (Top Right) */}
          <button
            onClick={handleWishlist}
            aria-label="Save to Wishlist"
            className={`absolute top-2.5 right-2.5 p-2 rounded-full z-10 transition-all ${
              wishlisted
                ? "bg-rose-500 text-white shadow-md"
                : "bg-black/50 text-white hover:bg-black/80 backdrop-blur-sm"
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${wishlisted ? "fill-white" : ""}`} />
          </button>

          {/* Quick View Button Hover Overlay */}
          <div
            className={`absolute inset-x-2 bottom-2 z-10 transition-all duration-300 flex items-center justify-center ${
              isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
            }`}
          >
            <button
              onClick={handleQuickViewClick}
              className={`w-full py-2 px-3 text-[11px] font-mono font-bold uppercase tracking-wider backdrop-blur-md flex items-center justify-center gap-1.5 transition-all ${
                concept === "flavourverse"
                  ? "bg-black/80 hover:bg-[#FF9F1C] text-white hover:text-black border border-[#FF9F1C]/40"
                  : concept === "purepantry"
                  ? "bg-white/95 hover:bg-[#1E3A2F] text-[#1E3A2F] hover:text-white rounded-full shadow-md"
                  : "bg-black text-[#FFE600] border-2 border-black hover:bg-[#FF2A85] hover:text-white"
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Quick View</span>
            </button>
          </div>
        </div>

        {/* Content Details */}
        <div className="pt-4 pb-2 px-1">
          <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest mb-1 opacity-70">
            <span>{product.category.name}</span>
            <span className="font-semibold text-emerald-400">Fresh Batch</span>
          </div>

          <Link href={`/${conceptPath}/product/${product.slug}`} className="block group/title">
            <h3
              className={`font-bold text-sm sm:text-base leading-snug line-clamp-1 mb-1 transition-colors ${
                concept === "flavourverse"
                  ? "font-serif text-white group-hover/title:text-[#FF9F1C]"
                  : concept === "purepantry"
                  ? "font-serif text-[#1E3A2F] group-hover/title:text-[#C16042]"
                  : "text-black group-hover/title:text-[#FF2A85]"
              }`}
            >
              {product.name}
            </h3>
          </Link>

          <p className="text-xs opacity-70 line-clamp-1 mb-3">
            {product.subtitle}
          </p>

          {/* Pack size indicator */}
          <div className="flex items-center justify-between text-[11px] font-mono mb-3">
            <span className="px-2 py-0.5 rounded bg-neutral-800/30 border border-neutral-700/30 opacity-80">
              {packOption.title} ({packOption.netQuantity})
            </span>

            {/* Compare Trigger */}
            <button
              onClick={handleCompare}
              className={`text-[10px] uppercase font-mono flex items-center gap-1 hover:underline ${
                comparing ? "text-amber-400 font-bold" : "opacity-60"
              }`}
            >
              <Scale className="w-3 h-3" />
              <span>{comparing ? "Comparing" : "Compare"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Pricing & Add to Cart Footer */}
      <div className="pt-3 border-t border-neutral-700/20 px-1 flex items-center justify-between gap-2">
        <div className="flex items-baseline gap-2">
          <span
            className={`text-base sm:text-lg font-mono font-bold ${
              concept === "flavourverse"
                ? "text-[#FF9F1C]"
                : concept === "purepantry"
                ? "text-[#1E3A2F]"
                : "text-black font-black"
            }`}
          >
            ₹{packOption.price}
          </span>
          {packOption.compareAtPrice && (
            <span className="text-[11px] font-mono text-neutral-400 line-through">
              ₹{packOption.compareAtPrice}
            </span>
          )}
        </div>

        <button
          onClick={handleQuickAdd}
          className={`py-2 px-3 text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${
            concept === "flavourverse"
              ? isAdded
                ? "bg-emerald-500 text-white"
                : "bg-[#FF9F1C] hover:bg-[#ffa938] text-black"
              : concept === "purepantry"
              ? isAdded
                ? "bg-emerald-600 text-white"
                : "bg-[#1E3A2F] hover:bg-[#274c3d] text-white rounded-full"
              : isAdded
              ? "bg-emerald-500 text-black border-2 border-black"
              : "bg-[#FF2A85] text-white font-black border-2 border-black shadow-[2px_2px_0_0_#000] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px]"
          }`}
        >
          {isAdded ? (
            <>
              <Check className="w-3.5 h-3.5 stroke-[3]" />
              <span>Added</span>
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
