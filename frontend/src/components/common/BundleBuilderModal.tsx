"use client";

import React, { useState } from "react";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/useToast";
import { DEMO_PRODUCTS, DemoProduct } from "@/lib/demo-catalog";
import SafeImage from "@/components/common/SafeImage";
import { X, Plus, Check, ShoppingBag, Sparkles, Tag, ArrowRight } from "lucide-react";

interface BundleBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  concept?: "flavourverse" | "purepantry" | "snackattack";
}

export default function BundleBuilderModal({
  isOpen,
  onClose,
  concept = "flavourverse",
}: BundleBuilderModalProps) {
  const { addItem, openCart } = useCart();
  const { addToast } = useToast();

  const [selectedIds, setSelectedIds] = useState<number[]>([1, 3, 4]); // 3 default items

  if (!isOpen) return null;

  const toggleSelect = (productId: number) => {
    if (selectedIds.includes(productId)) {
      if (selectedIds.length <= 1) {
        alert("Please keep at least 1 provision in your custom collection.");
        return;
      }
      setSelectedIds(selectedIds.filter((id) => id !== productId));
    } else {
      if (selectedIds.length >= 6) {
        alert("You can select up to 6 provisions per bundle.");
        return;
      }
      setSelectedIds([...selectedIds, productId]);
    }
  };

  const selectedProducts = DEMO_PRODUCTS.filter((p) => selectedIds.includes(p.id));
  const rawSubtotal = selectedProducts.reduce((acc, p) => acc + p.price, 0);

  // Bundle discount tiers: 3 items = 10% off, 4+ items = 15% off
  const discountRate = selectedProducts.length >= 4 ? 0.15 : selectedProducts.length >= 3 ? 0.1 : 0;
  const bundleSavings = rawSubtotal * discountRate;
  const bundleTotal = rawSubtotal - bundleSavings;

  const handleAddBundleToCart = () => {
    selectedProducts.forEach((product) => {
      addItem(product, product.packSizes[0], 1);
    });
    addToast(
      `Added ${selectedProducts.length}-Pack Bundle to Tote`,
      `Bundle Savings: ₹${bundleSavings.toFixed(0)} • Total: ₹${bundleTotal.toFixed(0)}`
    );
    onClose();
    openCart();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className={`max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 rounded-2xl relative border ${
          concept === "flavourverse"
            ? "bg-[#1F0E1C] text-[#FFF4E8] border-[#FF9F1C]/40"
            : concept === "purepantry"
            ? "bg-white text-[#1E3A2F] border-[#E3E8DC]"
            : "bg-[#FFE600] text-black border-4 border-black shadow-[8px_8px_0_0_#000]"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 opacity-70 hover:opacity-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest bg-amber-500/20 text-amber-400 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Custom Collection Builder</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif uppercase tracking-tight">
            Curate Your Peachy Plate Bundle
          </h2>
          <p className="text-xs font-mono opacity-80 mt-1">
            Pick 3 or more provisions to unlock tiered multi-pack savings (10% off 3 items, 15% off 4+ items).
          </p>
        </div>

        {/* Product Selection Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
          {DEMO_PRODUCTS.map((product) => {
            const isSelected = selectedIds.includes(product.id);
            return (
              <div
                key={product.id}
                onClick={() => toggleSelect(product.id)}
                className={`cursor-pointer p-3 border rounded-xl transition-all flex flex-col justify-between ${
                  isSelected
                    ? concept === "flavourverse"
                      ? "border-[#FF9F1C] bg-[#FF9F1C]/15"
                      : concept === "purepantry"
                      ? "border-[#1E3A2F] bg-[#FAF7F2]"
                      : "border-2 border-black bg-white shadow-[3px_3px_0_0_#000]"
                    : "border-neutral-700/40 opacity-70 hover:opacity-100"
                }`}
              >
                <div>
                  <div className="relative aspect-square w-full rounded-lg overflow-hidden mb-2 bg-black/40">
                    <SafeImage
                      src={product.images.primary}
                      alt={product.name}
                      concept={concept}
                      className="w-full h-full object-cover"
                    />
                    {isSelected && (
                      <div className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    )}
                  </div>
                  <h4 className="text-xs font-bold truncate">{product.name}</h4>
                  <p className="text-[10px] font-mono opacity-70">{product.packSizes[0]?.title}</p>
                </div>

                <div className="pt-2 mt-2 border-t border-neutral-700/20 flex justify-between items-center text-xs font-mono">
                  <span className="font-bold">₹{product.price}</span>
                  <span
                    className={`text-[10px] uppercase font-bold ${
                      isSelected ? "text-emerald-400" : "opacity-60"
                    }`}
                  >
                    {isSelected ? "Selected" : "+ Add"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Calculation & Add All */}
        <div className="p-4 sm:p-6 rounded-2xl bg-black/40 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs font-mono space-y-1 text-center sm:text-left">
            <div>
              <span className="opacity-70">Selected Items: </span>
              <span className="font-bold">{selectedProducts.length} Provisions</span>
            </div>
            <div>
              <span className="opacity-70">Catalogue Value: </span>
              <span className="line-through text-neutral-400">₹{rawSubtotal.toFixed(0)}</span>
              {bundleSavings > 0 && (
                <span className="text-emerald-400 font-bold ml-2">
                  (Save ₹{bundleSavings.toFixed(0)} • {(discountRate * 100).toFixed(0)}% Off)
                </span>
              )}
            </div>
            <div className="text-base font-bold font-sans">
              <span>Bundle Total: </span>
              <span className="text-amber-400 font-mono text-xl">₹{bundleTotal.toFixed(0)}</span>
            </div>
          </div>

          <button
            onClick={handleAddBundleToCart}
            className="w-full sm:w-auto px-8 py-3.5 bg-amber-400 hover:bg-amber-300 text-black font-bold uppercase text-xs tracking-wider rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Add Entire Collection to Tote</span>
          </button>
        </div>
      </div>
    </div>
  );
}
