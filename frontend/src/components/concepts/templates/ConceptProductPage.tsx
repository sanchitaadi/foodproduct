"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Sparkles, 
  Leaf, 
  Zap, 
  ShieldCheck, 
  ShoppingBag, 
  Heart, 
  Check, 
  Share2, 
  Truck, 
  RotateCcw, 
  Award, 
  Star,
  ChevronRight,
  Plus,
  Minus
} from "lucide-react";
import { DEMO_PRODUCTS, DemoProduct } from "@/lib/demo-catalog";
import MegaMenuHeader from "@/components/common/MegaMenuHeader";
import SafeImage from "@/components/common/SafeImage";
import PinCodeChecker from "@/components/common/PinCodeChecker";
import ProductCard from "@/components/common/ProductCard";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { useToast } from "@/hooks/useToast";
import { ConceptKey, getConceptTheme } from "./conceptTheme";

interface ConceptProductPageProps {
  concept: ConceptKey;
  slug: string;
}

export default function ConceptProductPage({ concept, slug }: ConceptProductPageProps) {
  const theme = getConceptTheme(concept);
  const { addItem, openCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { addToast } = useToast();

  const product: DemoProduct =
    DEMO_PRODUCTS.find((p) => p.slug === slug) || DEMO_PRODUCTS[0];

  const [selectedPackIndex, setSelectedPackIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product.images.primary);
  const [isAdded, setIsAdded] = useState(false);

  const packOption = product.packSizes[selectedPackIndex] || product.packSizes[0];
  const currentPrice = packOption.price;
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    addItem(product, packOption, quantity);
    setIsAdded(true);
    addToast(
      "Added to Cart!",
      `${quantity}x ${product.name} (${packOption.packSize}) added.`,
      "success"
    );
    setTimeout(() => setIsAdded(false), 2000);
    openCart();
  };

  const handleBuyNow = () => {
    addItem(product, packOption, quantity);
    window.location.href = "/checkout";
  };

  const relatedProducts = DEMO_PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className={`min-h-screen flex flex-col ${theme.bgClass}`}>
      <MegaMenuHeader concept={concept} />

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 w-full">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider opacity-70">
          <Link href={theme.basePath} className="hover:underline">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href={`${theme.basePath}/shop`} className="hover:underline">Provisions</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="opacity-100 font-bold truncate max-w-xs">{product.name}</span>
        </div>
      </div>

      {/* Main Product Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14">
          
          {/* Left Column: Visual Gallery */}
          <div className="lg:col-span-6 space-y-4">
            {/* Primary Featured Image Frame */}
            <div className={`relative aspect-square w-full rounded-2xl overflow-hidden bg-black/10 border ${theme.cardBorderClass} shadow-xl`}>
              <SafeImage
                src={selectedImage}
                alt={product.name}
                concept={concept}
                className="w-full h-full object-cover transition-all duration-300"
              />
              {product.isBestseller && (
                <div className={`absolute top-4 left-4 text-xs font-mono font-black uppercase px-3 py-1 rounded-full ${theme.badgeClass}`}>
                  BESTSELLER
                </div>
              )}
            </div>

            {/* Thumbnail Carousel */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {[product.images.primary, ...(product.images.gallery || [])].map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                    selectedImage === img
                      ? "border-[#FF9F1C] scale-105 shadow-md"
                      : "border-current/20 opacity-70 hover:opacity-100"
                  }`}
                >
                  <SafeImage
                    src={img}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    concept={concept}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* FSSAI Quality Stamp */}
            <div className="p-4 rounded-xl bg-black/5 border border-current/10 flex items-center justify-between text-xs font-mono opacity-80">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>FSSAI Lic. No. 10019022009876</span>
              </div>
              <span className="font-bold">100% PURE INGREDIENTS</span>
            </div>
          </div>

          {/* Right Column: PDP Purchase Controls & Specifications */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-mono uppercase tracking-widest text-[#FF9F1C] font-bold">
                  {product.category.name}
                </span>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-2.5 rounded-full border transition-all ${
                    wishlisted
                      ? "bg-rose-500 text-white border-rose-500"
                      : "border-current/20 hover:bg-black/10"
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${wishlisted ? "fill-current" : ""}`} />
                </button>
              </div>

              <h1 className={`text-3xl sm:text-4xl font-extrabold tracking-tight mt-1 ${theme.fontClass}`}>
                {product.name}
              </h1>

              {product.subtitle && (
                <p className="text-sm opacity-80 mt-2 font-mono italic">
                  "{product.subtitle}"
                </p>
              )}

              {/* Rating Strip */}
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center gap-1 text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span className="font-bold text-sm">{product.rating}</span>
                </div>
                <span className="opacity-40">•</span>
                <span className="text-xs opacity-75 font-mono">{product.reviewsCount} Verified Customer Reviews</span>
              </div>
            </div>

            {/* Price block */}
            <div className="p-4 rounded-2xl bg-black/5 border border-current/10 space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-black font-mono">
                  ₹{currentPrice * quantity}
                </span>
                {packOption.compareAtPrice && (
                  <span className="text-sm line-through opacity-50 font-mono">
                    ₹{packOption.compareAtPrice * quantity}
                  </span>
                )}
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-600 font-bold">
                  SAVE {Math.round((1 - currentPrice / (packOption.compareAtPrice || currentPrice)) * 100)}%
                </span>
              </div>
              <p className="text-[11px] font-mono opacity-70">
                Inclusive of all taxes (GST 12%). Free delivery above ₹499.
              </p>
            </div>

            {/* Pack Size Selector */}
            <div className="space-y-2.5">
              <label className="block text-xs font-mono uppercase tracking-wider font-bold">
                Select Pack Size / Quantity:
              </label>
              <div className="grid grid-cols-3 gap-3">
                {product.packSizes.map((pack, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedPackIndex(idx)}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      selectedPackIndex === idx
                        ? "border-[#FF9F1C] bg-[#FF9F1C]/10 font-bold shadow-sm"
                        : "border-current/20 hover:border-current/40"
                    }`}
                  >
                    <div className="text-xs font-bold">{pack.packSize}</div>
                    <div className="text-sm font-mono mt-1">₹{pack.price}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Counter & Action Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-current/20 rounded-xl overflow-hidden bg-black/5">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-black/10 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 font-mono font-bold text-sm">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-black/10 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-3.5 px-6 rounded-xl font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-all ${theme.btnPrimaryClass}`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{isAdded ? "Added to Basket!" : "Add to Cart"}</span>
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                className={`w-full py-3.5 px-6 rounded-xl font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-all ${theme.btnSecondaryClass}`}
              >
                <span>Express Instant Checkout</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* PinCode Checker */}
            <div className="pt-2">
              <PinCodeChecker concept={concept} />
            </div>

            {/* Story / Description */}
            <div className="pt-4 border-t border-current/15 space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider font-mono">Sensory Formulation</h3>
              <p className="text-sm opacity-85 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* FSSAI Nutrition Facts Table */}
            {product.nutrition && (
              <div className="p-4 rounded-xl bg-black/5 border border-current/15 space-y-3">
                <div className="flex items-center justify-between border-b border-current/15 pb-2">
                  <h4 className="font-bold text-xs font-mono uppercase tracking-wider">
                    Statutory Nutrition Declarations (Per 100g)
                  </h4>
                  <span className="text-[10px] font-mono opacity-70">FSSAI Lab Verified</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                  <div className="p-2 rounded bg-black/5">
                    <span className="opacity-60 block text-[10px]">ENERGY</span>
                    <span className="font-bold">{product.nutrition.energyKcal} kcal</span>
                  </div>
                  <div className="p-2 rounded bg-black/5">
                    <span className="opacity-60 block text-[10px]">PROTEIN</span>
                    <span className="font-bold">{product.nutrition.proteinG}g</span>
                  </div>
                  <div className="p-2 rounded bg-black/5">
                    <span className="opacity-60 block text-[10px]">CARBS</span>
                    <span className="font-bold">{product.nutrition.carbsG}g</span>
                  </div>
                  <div className="p-2 rounded bg-black/5">
                    <span className="opacity-60 block text-[10px]">TOTAL FAT</span>
                    <span className="font-bold">{product.nutrition.totalFatG}g</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* You may also like */}
        <section className="mt-20 pt-10 border-t border-current/15">
          <div className="flex items-center justify-between mb-8">
            <h2 className={`text-2xl font-bold ${theme.fontClass}`}>Complementary Provisions</h2>
            <Link href={`${theme.basePath}/shop`} className="text-xs font-mono uppercase hover:underline">
              View All &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} concept={concept} />
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="mt-auto border-t border-current/10 py-10 px-4 text-center text-xs font-mono opacity-70">
        <p>© 2026 Peachy Plate Foods Ltd. • {theme.name} Edition • FSSAI Lic. No. 10019022009876</p>
      </footer>
    </div>
  );
}
