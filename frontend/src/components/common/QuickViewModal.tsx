"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useQuickView } from "@/hooks/useQuickView";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { useToast } from "@/hooks/useToast";
import SafeImage from "@/components/common/SafeImage";
import {
  X,
  Plus,
  Minus,
  ShoppingBag,
  Heart,
  ShieldCheck,
  Check,
  ArrowRight,
  Eye,
} from "lucide-react";

export default function QuickViewModal() {
  const { selectedProduct, isOpen, closeQuickView, concept } = useQuickView();
  const { addItem, openCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { addToast } = useToast();

  const [selectedPackIndex, setSelectedPackIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!isOpen || !selectedProduct) return null;

  const packOption = selectedProduct.packSizes[selectedPackIndex] || selectedProduct.packSizes[0];
  const activeImage = selectedProduct.images.gallery[activeImageIndex] || selectedProduct.images.primary;
  const wishlisted = isWishlisted(selectedProduct.id);

  const handleAddToCart = () => {
    addItem(selectedProduct, packOption, quantity);
    addToast(
      `Added ${quantity}× ${selectedProduct.name} to Tote`,
      `${packOption.title} (${packOption.netQuantity}) • ₹${packOption.price * quantity}`
    );
    closeQuickView();
    openCart();
  };

  const handleToggleWishlist = () => {
    toggleWishlist(selectedProduct.id);
    addToast(
      wishlisted ? "Removed from Reserve" : "Saved to Curated Reserve",
      selectedProduct.name
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
      onClick={closeQuickView}
    >
      <div
        className={`max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative border ${
          concept === "flavourverse"
            ? "bg-[#1F0E1C] text-[#FFF4E8] border-[#FF9F1C]/40"
            : concept === "purepantry"
            ? "bg-white text-[#1E3A2F] border-[#E3E8DC] rounded-3xl"
            : "bg-white text-black border-4 border-black shadow-[8px_8px_0_0_#000]"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeQuickView}
          className={`absolute top-4 right-4 p-2 transition-colors ${
            concept === "flavourverse"
              ? "text-[#F5B99C] hover:text-white"
              : concept === "purepantry"
              ? "text-[#1E3A2F]/60 hover:text-[#1E3A2F]"
              : "bg-black text-[#FFE600] border-2 border-black hover:bg-[#FF2A85] hover:text-white"
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left Column: Image Gallery */}
          <div className="space-y-4">
            <div
              className={`relative aspect-square w-full overflow-hidden ${
                concept === "flavourverse"
                  ? "bg-black/40 border border-[#3D2439]"
                  : concept === "purepantry"
                  ? "bg-[#FAF7F2] rounded-2xl"
                  : "bg-black border-2 border-black"
              }`}
            >
              <SafeImage
                src={activeImage}
                alt={selectedProduct.name}
                concept={concept}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Nav */}
            <div className="flex gap-2 overflow-x-auto pb-1">
              {[selectedProduct.images.primary, ...selectedProduct.images.gallery].slice(0, 4).map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-16 h-16 relative overflow-hidden flex-shrink-0 border-2 transition-all ${
                    activeImageIndex === idx
                      ? concept === "flavourverse"
                        ? "border-[#FF9F1C]"
                        : concept === "purepantry"
                        ? "border-[#1E3A2F]"
                        : "border-black"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <SafeImage
                    src={img}
                    alt={`${selectedProduct.name} thumb ${idx}`}
                    concept={concept}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Details & Actions */}
          <div className="space-y-6">
            <div>
              <span
                className={`text-xs font-mono uppercase tracking-widest block mb-1 ${
                  concept === "flavourverse"
                    ? "text-[#FF9F1C]"
                    : concept === "purepantry"
                    ? "text-[#C16042]"
                    : "bg-black text-[#FFE600] px-2 py-0.5 inline-block font-black"
                }`}
              >
                {selectedProduct.category.name}
              </span>
              <h2
                className={`text-2xl sm:text-3xl font-bold tracking-tight mb-2 ${
                  concept === "flavourverse" ? "font-serif text-white" : ""
                }`}
              >
                {selectedProduct.name}
              </h2>
              <p
                className={`text-xs font-mono mb-4 ${
                  concept === "flavourverse"
                    ? "text-[#F5B99C]/80"
                    : concept === "purepantry"
                    ? "text-[#1E3A2F]/70"
                    : "text-black/80 font-bold"
                }`}
              >
                {selectedProduct.subtitle}
              </p>

              {/* Price Line */}
              <div className="flex items-baseline gap-3">
                <span
                  className={`text-2xl font-bold font-mono ${
                    concept === "flavourverse"
                      ? "text-[#FF9F1C]"
                      : concept === "purepantry"
                      ? "text-[#1E3A2F]"
                      : "text-[#FF2A85] text-3xl font-black"
                  }`}
                >
                  ₹{packOption.price}
                </span>
                {packOption.compareAtPrice && (
                  <span className="text-sm font-mono text-neutral-400 line-through">
                    ₹{packOption.compareAtPrice}
                  </span>
                )}
                {packOption.compareAtPrice && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-green-500/20 text-green-400 font-bold uppercase">
                    Save ₹{packOption.compareAtPrice - packOption.price}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-xs leading-relaxed opacity-80">
              {selectedProduct.description}
            </p>

            {/* Pack Size Selector */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider mb-2 opacity-75 font-semibold">
                Select Pack Size / Quantity:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {selectedProduct.packSizes.map((ps, idx) => (
                  <button
                    key={ps.id}
                    onClick={() => setSelectedPackIndex(idx)}
                    className={`p-3 text-left border transition-all text-xs font-mono ${
                      selectedPackIndex === idx
                        ? concept === "flavourverse"
                          ? "border-[#FF9F1C] bg-[#FF9F1C]/15 text-[#FF9F1C] font-bold"
                          : concept === "purepantry"
                          ? "border-[#1E3A2F] bg-[#FAF7F2] text-[#1E3A2F] font-bold"
                          : "border-2 border-black bg-[#FFE600] text-black font-black shadow-[2px_2px_0_0_#000]"
                        : "border-neutral-700/40 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <div className="font-bold">{ps.title}</div>
                    <div className="text-[10px] opacity-75">{ps.netQuantity} • ₹{ps.price}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Controls & Add to Cart */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <div
                  className={`flex items-center border px-3 py-2 text-xs font-mono ${
                    concept === "flavourverse"
                      ? "border-[#3D2439] bg-[#120811]"
                      : concept === "purepantry"
                      ? "border-[#E3E8DC] bg-[#FAF7F2] rounded-xl"
                      : "border-2 border-black bg-white"
                  }`}
                >
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1 hover:opacity-100 opacity-60"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center font-bold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1 hover:opacity-100 opacity-60"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-3 px-6 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                    concept === "flavourverse"
                      ? "bg-[#FF9F1C] hover:bg-[#ffa938] text-black"
                      : concept === "purepantry"
                      ? "bg-[#1E3A2F] hover:bg-[#274c3d] text-white rounded-full font-semibold"
                      : "bg-[#FF2A85] text-white font-black border-2 border-black shadow-[3px_3px_0_0_#000] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Tote • ₹{packOption.price * quantity}</span>
                </button>

                <button
                  onClick={handleToggleWishlist}
                  className={`p-3 border transition-colors ${
                    wishlisted
                      ? "bg-rose-500/20 border-rose-500 text-rose-400"
                      : "border-neutral-700/40 opacity-70 hover:opacity-100"
                  }`}
                >
                  <Heart className={`w-4 h-4 ${wishlisted ? "fill-rose-400" : ""}`} />
                </button>
              </div>

              {/* View Full PDP Link */}
              <div className="pt-2 text-center">
                <Link
                  href={`/concept-${concept === "flavourverse" ? "a-flavourverse" : concept === "purepantry" ? "b-purepantry" : "c-snackattack"}/product/${selectedProduct.slug}`}
                  onClick={closeQuickView}
                  className="text-xs font-mono uppercase tracking-widest opacity-80 hover:opacity-100 hover:underline inline-flex items-center gap-1.5"
                >
                  <span>Inspect Complete Nutrition & Provenance Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
