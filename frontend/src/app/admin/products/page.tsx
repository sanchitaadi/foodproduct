"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAdminStore } from "@/lib/admin/adminStore";
import { DemoProduct, PackSizeOption } from "@/lib/demo-catalog";
import SafeImage from "@/components/common/SafeImage";
import {
  Package,
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Copy,
  Star,
  Sparkles,
  ShieldCheck,
  Eye,
  X,
  Check,
  AlertCircle,
} from "lucide-react";

export default function AdminProductsPage() {
  const { products, addProduct, updateProduct, deleteProduct, duplicateProduct, togglePublish, toggleFeatured } =
    useAdminStore();

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [editingProduct, setEditingProduct] = useState<DemoProduct | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form State for Add / Edit
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    subtitle: "",
    description: "",
    story: "",
    categorySlug: "salty-obsessions",
    categoryName: "Salty Obsessions",
    categoryMood: "salty" as "sweet" | "salty" | "better-bites" | "liquid" | "chocolate" | "pantry",
    basePrice: 249,
    compareAtPrice: 299,
    primaryImage: "/images/products/gourmet-sorghum-crisps.jpg",
    ingredients: "Slow-popped sorghum, olive oil, sea salt, dried Italian summer truffle.",
    allergens: "Made in a facility that also processes tree nuts.",
    storage: "Store in a cool, dry pantry away from direct sunlight.",
    shelfLife: "9 Months from packaging",
    fssaiLicenseNumber: "10021011000428",
    originState: "Karnataka, India",
    hsnCode: "19059040",
    isBestseller: false,
    isFeatured: true,
    isNew: true,
  });

  const categories = [
    { slug: "salty-obsessions", name: "Salty Obsessions", mood: "salty" },
    { slug: "liquid-happiness", name: "Liquid Happiness", mood: "liquid" },
    { slug: "chocolate-therapy", name: "Chocolate Therapy", mood: "chocolate" },
    { slug: "better-bites", name: "Better Bites", mood: "better-bites" },
    { slug: "pantry-essentials", name: "Pantry Essentials", mood: "pantry" },
    { slug: "sweet-cravings", name: "Sweet Cravings", mood: "sweet" },
  ];

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(search.toLowerCase()) ||
      p.packSizes.some((ps) => ps.sku.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = categoryFilter === "all" || p.category.slug === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      slug: "",
      subtitle: "",
      description: "",
      story: "",
      categorySlug: "salty-obsessions",
      categoryName: "Salty Obsessions",
      categoryMood: "salty",
      basePrice: 249,
      compareAtPrice: 299,
      primaryImage: "/images/products/gourmet-sorghum-crisps.jpg",
      ingredients: "Slow-popped sorghum, olive oil, sea salt, dried Italian summer truffle.",
      allergens: "Made in a facility that also processes tree nuts.",
      storage: "Store in a cool, dry pantry away from direct sunlight.",
      shelfLife: "9 Months from packaging",
      fssaiLicenseNumber: "10021011000428",
      originState: "Karnataka, India",
      hsnCode: "19059040",
      isBestseller: false,
      isFeatured: true,
      isNew: true,
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (p: DemoProduct) => {
    setEditingProduct(p);
    setFormData({
      name: p.name,
      slug: p.slug,
      subtitle: p.subtitle,
      description: p.description,
      story: p.story || "",
      categorySlug: p.category.slug,
      categoryName: p.category.name,
      categoryMood: p.category.mood,
      basePrice: p.price,
      compareAtPrice: p.compareAtPrice || p.price + 50,
      primaryImage: p.images.primary,
      ingredients: p.ingredients,
      allergens: p.allergens,
      storage: p.storage,
      shelfLife: p.shelfLife,
      fssaiLicenseNumber: p.fssaiLicenseNumber || "10021011000428",
      originState: p.originState || "India",
      hsnCode: p.hsnCode || "19059040",
      isBestseller: p.isBestseller,
      isFeatured: p.isFeatured,
      isNew: p.isNew || false,
    });
    setIsAddModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedCategory = categories.find((c) => c.slug === formData.categorySlug) || categories[0];

    const slug =
      formData.slug.trim() ||
      formData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const packSizes: PackSizeOption[] = [
      {
        id: `pk-${Date.now()}-1`,
        title: "Standard Pack",
        packSize: "150 g",
        netQuantity: "150 g",
        weightGrams: 150,
        price: Number(formData.basePrice),
        compareAtPrice: Number(formData.compareAtPrice),
        sku: `PP-${slug.slice(0, 3).toUpperCase()}-150`,
        inStock: true,
      },
      {
        id: `pk-${Date.now()}-2`,
        title: "Trio Multi-Pack",
        packSize: "3 x 150 g",
        netQuantity: "450 g",
        weightGrams: 450,
        price: Number(formData.basePrice) * 3 - 50,
        compareAtPrice: Number(formData.compareAtPrice) * 3,
        sku: `PP-${slug.slice(0, 3).toUpperCase()}-450`,
        inStock: true,
      },
    ];

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        name: formData.name,
        slug,
        subtitle: formData.subtitle,
        description: formData.description,
        story: formData.story,
        price: Number(formData.basePrice),
        compareAtPrice: Number(formData.compareAtPrice),
        category: {
          id: selectedCategory.slug,
          name: selectedCategory.name,
          slug: selectedCategory.slug,
          mood: selectedCategory.mood as any,
        },
        images: {
          ...editingProduct.images,
          primary: formData.primaryImage,
        },
        ingredients: formData.ingredients,
        allergens: formData.allergens,
        storage: formData.storage,
        shelfLife: formData.shelfLife,
        fssaiLicenseNumber: formData.fssaiLicenseNumber,
        originState: formData.originState,
        hsnCode: formData.hsnCode,
        isBestseller: formData.isBestseller,
        isFeatured: formData.isFeatured,
        isNew: formData.isNew,
      });
    } else {
      addProduct({
        name: formData.name,
        slug,
        subtitle: formData.subtitle,
        description: formData.description,
        story: formData.story,
        price: Number(formData.basePrice),
        compareAtPrice: Number(formData.compareAtPrice),
        category: {
          id: selectedCategory.slug,
          name: selectedCategory.name,
          slug: selectedCategory.slug,
          mood: selectedCategory.mood as any,
        },
        packSizes,
        images: {
          primary: formData.primaryImage,
          secondary: formData.primaryImage,
          gallery: [formData.primaryImage],
          ingredientPhoto: formData.primaryImage,
        },
        ingredients: formData.ingredients,
        allergens: formData.allergens,
        storage: formData.storage,
        shelfLife: formData.shelfLife,
        dietaryTags: ["Gluten-Free", "Vegetarian", "FSSAI Verified"],
        nutrition: {
          servingSize: "30g",
          servingsPerContainer: 5,
          energyKcal: 135,
          proteinG: 2.8,
          totalFatG: 4.5,
          saturatedFatG: 0.8,
          transFatG: 0,
          carbsG: 21,
          totalSugarsG: 1.2,
          addedSugarsG: 0,
          dietaryFiberG: 3.2,
          sodiumMg: 140,
          isSampleData: false,
        },
        isBestseller: formData.isBestseller,
        isFeatured: formData.isFeatured,
        isNew: formData.isNew,
        fssaiLicenseNumber: formData.fssaiLicenseNumber,
        originState: formData.originState,
        hsnCode: formData.hsnCode,
        gstRatePercent: 5.0,
        tasteNotes: ["Crispy", "Savory", "Authentic"],
        rating: 5,
        reviewsCount: 1,
      });
    }

    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-white tracking-wide">
            Packaged Foods Product Catalog
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Manage food SKUs, multi-pack variants, MRP, selling price, and FSSAI nutrition.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-bold uppercase rounded-xl text-xs font-mono flex items-center gap-1.5 shadow-lg shadow-amber-500/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Add New Food Provision</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between items-stretch sm:items-center text-xs font-mono">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by provision title, subtitle, or SKU..."
            className="w-full bg-[#0F172A] border border-slate-800 rounded-xl px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
          />
          <Search className="w-4 h-4 text-slate-500 absolute right-3 top-3" />
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-[#0F172A] border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400 text-xs font-mono"
            >
              <option value="all">All Pantry Categories ({products.length})</option>
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono min-w-[750px]">
            <thead className="bg-slate-900/80 border-b border-slate-800 text-slate-400 uppercase text-[10px]">
              <tr>
                <th className="py-3 px-4">Food Provision</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Pack Variants</th>
                <th className="py-3 px-4">Base Price</th>
                <th className="py-3 px-4">FSSAI Status</th>
                <th className="py-3 px-4">Badges</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                  {/* Item Image & Title */}
                  <td className="py-3 px-4 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-black/40 border border-slate-800 relative shrink-0">
                      <SafeImage
                        src={p.images.primary}
                        alt={p.name}
                        concept="flavourverse"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-white font-sans text-sm truncate max-w-xs">{p.name}</div>
                      <div className="text-[11px] text-slate-400 truncate max-w-xs">{p.subtitle}</div>
                      <div className="text-[9px] text-slate-500 font-mono mt-0.5">
                        SKU: {p.packSizes[0]?.sku || "N/A"}
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-3 px-4 text-slate-300 font-sans">{p.category.name}</td>

                  {/* Variants */}
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-amber-300 font-bold">
                      {p.packSizes.length} Pack Sizes
                    </span>
                  </td>

                  {/* Price */}
                  <td className="py-3 px-4">
                    <span className="font-bold text-white text-sm">₹{p.price}</span>
                    {p.compareAtPrice && (
                      <span className="text-[10px] text-slate-500 line-through ml-1.5">
                        ₹{p.compareAtPrice}
                      </span>
                    )}
                  </td>

                  {/* FSSAI */}
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1 text-emerald-400">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Compliant</span>
                    </span>
                    <div className="text-[9px] text-slate-500">#{p.fssaiLicenseNumber || "10021011000428"}</div>
                  </td>

                  {/* Status Badges */}
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1">
                      {p.isBestseller && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
                          Bestseller
                        </span>
                      )}
                      {p.isFeatured && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold">
                          Featured
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-4 text-right space-x-1.5">
                    <Link
                      href={`/concept-a-flavourverse/product/${p.slug}`}
                      target="_blank"
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 inline-block"
                      title="Preview in Storefront"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </Link>

                    <button
                      onClick={() => handleOpenEdit(p)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-amber-500 hover:text-black text-amber-400 transition-colors inline-block"
                      title="Edit Provision"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => duplicateProduct(p.id)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors inline-block"
                      title="Duplicate SKU"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => deleteProduct(p.id)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-500 hover:text-white text-rose-400 transition-colors inline-block"
                      title="Delete / Archive"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================
          ADD / EDIT PRODUCT MODAL
          ======================================================== */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-[#0F172A] border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <div>
                <h3 className="text-xl font-bold font-serif text-white">
                  {editingProduct ? `Edit Provision: ${editingProduct.name}` : "Create New Food Provision"}
                </h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  Changes immediately reflect across Flavourverse, Pure & Pantry, and Snack Attack.
                </p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-5 text-xs font-mono">
              {/* General Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1 font-bold">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Slow-Popped Artisan Sorghum Crisps"
                    className="w-full bg-[#1A2338] border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-sans text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-bold">Pantry Category *</label>
                  <select
                    value={formData.categorySlug}
                    onChange={(e) => setFormData({ ...formData, categorySlug: e.target.value })}
                    className="w-full bg-[#1A2338] border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-sans text-sm focus:outline-none focus:border-amber-400"
                  >
                    {categories.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-bold">Subtitle / Flavour Profile *</label>
                <input
                  type="text"
                  required
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="e.g. Wild Italian Truffle & Cold-Pressed Olive Oil"
                  className="w-full bg-[#1A2338] border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-sans text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-bold">Full Sensory Description *</label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detailed gastronomic notes, culinary preparation, and texture..."
                  className="w-full bg-[#1A2338] border border-slate-700 rounded-xl px-3.5 py-2 text-white font-sans text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Pricing & Image */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1 font-bold">Base Selling Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={formData.basePrice}
                    onChange={(e) => setFormData({ ...formData, basePrice: Number(e.target.value) })}
                    className="w-full bg-[#1A2338] border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-mono text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-bold">MRP / Compare At (₹)</label>
                  <input
                    type="number"
                    value={formData.compareAtPrice}
                    onChange={(e) => setFormData({ ...formData, compareAtPrice: Number(e.target.value) })}
                    className="w-full bg-[#1A2338] border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-mono text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-bold">Image URL / Path *</label>
                  <input
                    type="text"
                    required
                    value={formData.primaryImage}
                    onChange={(e) => setFormData({ ...formData, primaryImage: e.target.value })}
                    className="w-full bg-[#1A2338] border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-mono text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Regulatory & FSSAI */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                <div className="text-[11px] font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>FSSAI Regulatory & Nutritional Compliance (2026)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-400 mb-1">Ingredients Statement</label>
                    <input
                      type="text"
                      value={formData.ingredients}
                      onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
                      className="w-full bg-[#1A2338] border border-slate-700 rounded-xl px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Allergen Declarations</label>
                    <input
                      type="text"
                      value={formData.allergens}
                      onChange={(e) => setFormData({ ...formData, allergens: e.target.value })}
                      className="w-full bg-[#1A2338] border border-slate-700 rounded-xl px-3 py-2 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-400 mb-1">FSSAI License #</label>
                    <input
                      type="text"
                      value={formData.fssaiLicenseNumber}
                      onChange={(e) => setFormData({ ...formData, fssaiLicenseNumber: e.target.value })}
                      className="w-full bg-[#1A2338] border border-slate-700 rounded-xl px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">HSN Commodity Code</label>
                    <input
                      type="text"
                      value={formData.hsnCode}
                      onChange={(e) => setFormData({ ...formData, hsnCode: e.target.value })}
                      className="w-full bg-[#1A2338] border border-slate-700 rounded-xl px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Shelf Life Period</label>
                    <input
                      type="text"
                      value={formData.shelfLife}
                      onChange={(e) => setFormData({ ...formData, shelfLife: e.target.value })}
                      className="w-full bg-[#1A2338] border border-slate-700 rounded-xl px-3 py-2 text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Status Toggles */}
              <div className="flex flex-wrap gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                  <input
                    type="checkbox"
                    checked={formData.isBestseller}
                    onChange={(e) => setFormData({ ...formData, isBestseller: e.target.checked })}
                    className="w-4 h-4 rounded text-amber-500"
                  />
                  <span>Mark as Bestseller</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="w-4 h-4 rounded text-purple-500"
                  />
                  <span>Feature in Collections</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                  <input
                    type="checkbox"
                    checked={formData.isNew}
                    onChange={(e) => setFormData({ ...formData, isNew: e.target.checked })}
                    className="w-4 h-4 rounded text-emerald-500"
                  />
                  <span>New Harvest Arrival</span>
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold uppercase tracking-wider shadow-lg shadow-amber-500/20"
                >
                  {editingProduct ? "Save Changes" : "Publish Provision"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
