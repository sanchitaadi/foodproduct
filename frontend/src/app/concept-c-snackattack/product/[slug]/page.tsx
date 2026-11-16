"use client";

import React, { useEffect, useState, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductRepository } from "@/lib/api/repository";
import { PackagedFoodProduct, PackSizeOption } from "@/types/products";
import SafeImage from "@/components/common/SafeImage";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/useToast";
import { BrandLoader } from "@/components/animation/BrandLoader";
import {
  Zap,
  Flame,
  Check,
  Star,
  ShieldCheck,
  Truck,
  ArrowLeft,
  ShoppingBag,
  Info,
  Plus,
  Minus
} from "lucide-react";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default function SnackAttackProductDetailPage({ params }: ProductPageProps) {
  const resolvedParams = use(params);
  const [product, setProduct] = useState<PackagedFoodProduct | null>(null);
  const [selectedPack, setSelectedPack] = useState<PackSizeOption | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isAdded, setIsAdded] = useState(false);
  const { addItem, openCart } = useCart();
  const { addToast } = useToast();

  useEffect(() => {
    async function loadProduct() {
      const p = await ProductRepository.getProductBySlug(resolvedParams.slug);
      if (p) {
        setProduct(p);
        setSelectedPack(p.packSizes[0]);
      }
      setLoading(false);
    }
    loadProduct();
  }, [resolvedParams.slug]);

  if (loading) {
    return (
      <div className="py-24">
        <BrandLoader brandId="snack-attack" message="UNWRAPPING PRODUCT DETAILS..." />
      </div>
    );
  }

  if (!product || !selectedPack) {
    return notFound();
  }

  const handleAddToCart = () => {
    addItem(product, selectedPack, quantity);
    setIsAdded(true);
    addToast(
      "Stashed!",
      `${quantity}x ${product.name} (${selectedPack.label}) added to basket.`,
      "success"
    );
    setTimeout(() => setIsAdded(false), 2000);
    openCart();
  };

  return (
    <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-10 w-full">
      {/* Back button */}
      <Link
        href="/concept-c-snackattack/shop"
        className="inline-flex items-center gap-1.5 text-xs font-black uppercase text-black hover:text-[#FF5400] mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Snacks</span>
      </Link>

      {/* Main Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white border-4 border-black rounded-3xl p-6 sm:p-10 shadow-[8px_8px_0px_#000] mb-12">
        {/* Gallery / Images */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#FFD60A] border-3 border-black">
            <SafeImage
              src={product.primaryImage}
              alt={product.name}
              concept="snack-attack"
              className="w-full h-full object-cover"
            />
            {product.brandVibes.snackAttackBadge && (
              <div className="absolute top-4 left-4 bg-[#FF007F] text-white font-black text-xs uppercase px-3 py-1 border-2 border-black rotate-[-6deg] shadow-[3px_3px_0px_#000]">
                {product.brandVibes.snackAttackBadge}
              </div>
            )}
          </div>
        </div>

        {/* Product Info & Actions */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-[#FFD60A] text-black text-xs font-black uppercase px-2.5 py-0.5 border-2 border-black">
                {product.categoryName}
              </span>
              <div className="flex items-center gap-1 text-xs font-black bg-neutral-100 px-2 py-0.5 border border-black rounded">
                <Star className="w-3.5 h-3.5 fill-[#FF5400] text-[#FF5400]" />
                <span>{product.rating}</span>
                <span className="text-neutral-500 font-mono text-[10px]">({product.reviewCount} reviews)</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-black">
              {product.name}
            </h1>
            <p className="text-sm font-bold text-neutral-700 mt-2">
              {product.subtitle}
            </p>
          </div>

          {/* Pricing Row */}
          <div className="bg-[#FFFDF5] border-3 border-black p-4 rounded-2xl shadow-[4px_4px_0px_#000] flex items-baseline gap-4">
            <span className="text-3xl sm:text-4xl font-black text-black">
              ₹{selectedPack.priceInr * quantity}
            </span>
            {selectedPack.compareAtPriceInr && (
              <span className="text-base line-through font-bold text-neutral-400">
                ₹{selectedPack.compareAtPriceInr * quantity}
              </span>
            )}
            <span className="bg-[#FF007F] text-white font-black text-[10px] uppercase px-2 py-0.5 border border-black rotate-1">
              FREE SHIPPING &gt; ₹499
            </span>
          </div>

          {/* Pack Size Selector */}
          <div className="space-y-2">
            <span className="block text-xs font-black uppercase text-black">Select Your Pack Size:</span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {product.packSizes.map((pack) => (
                <button
                  key={pack.id}
                  onClick={() => setSelectedPack(pack)}
                  className={`p-3 border-2 border-black rounded-xl text-left transition-all ${
                    selectedPack.id === pack.id
                      ? "bg-[#FF5400] text-white shadow-[3px_3px_0px_#000] translate-x-[-1px] translate-y-[-1px]"
                      : "bg-white text-black hover:bg-[#FFD60A]"
                  }`}
                >
                  <span className="font-black text-xs block">{pack.label}</span>
                  <span className="font-mono text-[11px] block opacity-90">₹{pack.priceInr}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center border-2 border-black rounded-xl overflow-hidden bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-[#FFD60A] transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 font-black text-sm">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-[#FFD60A] transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 py-4 bg-[#FFD60A] text-black font-black uppercase text-xs tracking-wider border-3 border-black shadow-[4px_4px_0px_#000] hover:bg-[#FF5400] hover:text-white transition-all flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4 stroke-[3]" />
                <span>{isAdded ? "STASHED IN BAG!" : "SNATCH TO BAG"}</span>
              </button>
            </div>
          </div>

          {/* Sensory Description & Ingredients */}
          <div className="border-t-2 border-black/10 pt-4 space-y-4">
            <div>
              <h4 className="font-black text-xs uppercase text-black mb-1">Munchie Profile</h4>
              <p className="text-xs text-neutral-700 leading-relaxed font-medium">{product.longDescription || product.shortDescription || product.subtitle}</p>
            </div>
            <div>
              <h4 className="font-black text-xs uppercase text-black mb-1">Real Ingredients</h4>
              <p className="text-xs text-neutral-700 font-mono">{product.ingredientsList}</p>
            </div>
          </div>

          {/* FSSAI Statutory Info */}
          <div className="p-3 rounded-xl bg-neutral-100 border border-neutral-300 flex items-center justify-between text-[11px] font-mono text-neutral-700">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>FSSAI Lic: 10019022009876</span>
            </div>
            <span>100% VEGETARIAN</span>
          </div>
        </div>
      </div>
    </div>
  );
}
