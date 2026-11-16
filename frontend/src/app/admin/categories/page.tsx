"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAdminStore, AdminCategory } from "@/lib/admin/adminStore";
import SafeImage from "@/components/common/SafeImage";
import { Layers, Plus, Edit2, Trash2, CheckCircle, ArrowRight, X } from "lucide-react";

export default function AdminCategoriesPage() {
  const { categories, addCategory, updateCategory, deleteCategory } = useAdminStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<AdminCategory | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    image: "/images/products/gourmet-sorghum-crisps.jpg",
    displayOrder: 1,
    status: "active" as "active" | "inactive",
  });

  const handleOpenAdd = () => {
    setEditingCategory(null);
    setFormData({
      name: "",
      slug: "",
      description: "",
      image: "/images/products/gourmet-sorghum-crisps.jpg",
      displayOrder: categories.length + 1,
      status: "active",
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (c: AdminCategory) => {
    setEditingCategory(c);
    setFormData({
      name: c.name,
      slug: c.slug,
      description: c.description,
      image: c.image,
      displayOrder: c.displayOrder,
      status: c.status,
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const slug =
      formData.slug.trim() ||
      formData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    if (editingCategory) {
      updateCategory(editingCategory.id, {
        ...formData,
        slug,
      });
    } else {
      addCategory({
        ...formData,
        slug,
        productCount: 0,
      });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-white tracking-wide">
            Pantry & Snack Categories
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Configure taxonomies for collections across Flavourverse, Pure & Pantry, and Snack Attack.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-bold uppercase rounded-xl text-xs font-mono flex items-center gap-1.5 shadow-lg shadow-amber-500/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>New Category</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories.map((c) => (
          <div
            key={c.id}
            className="p-5 rounded-2xl bg-[#0F172A] border border-slate-800 space-y-4 hover:border-slate-700 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-xl overflow-hidden bg-black/40 border border-slate-700 shrink-0 relative">
                <SafeImage
                  src={c.image}
                  alt={c.name}
                  concept="flavourverse"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-500 uppercase">
                    Order #{c.displayOrder}
                  </span>
                  <span
                    className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded uppercase ${
                      c.status === "active" ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {c.status}
                  </span>
                </div>
                <h3 className="font-bold text-white text-base truncate font-serif">{c.name}</h3>
                <div className="text-[11px] font-mono text-amber-400">/{c.slug}</div>
              </div>
            </div>

            <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
              {c.description}
            </p>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">
                Products: <strong className="text-white">{c.productCount || 3} SKUs</strong>
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEdit(c)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-amber-500 hover:text-black text-amber-400 transition-colors"
                  title="Edit Category"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => deleteCategory(c.id)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-500 hover:text-white text-rose-400 transition-colors"
                  title="Delete Category"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-[#0F172A] border border-slate-700 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold font-serif text-white text-lg">
                {editingCategory ? `Edit: ${editingCategory.name}` : "Create Category"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-slate-400 mb-1 font-bold">Category Title *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Salty Obsessions"
                  className="w-full bg-[#1A2338] border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-sans text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-bold">Slug URL Identifier</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="e.g. salty-obsessions"
                  className="w-full bg-[#1A2338] border border-slate-700 rounded-xl px-3.5 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-bold">Curated Description</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Summary for category header..."
                  className="w-full bg-[#1A2338] border border-slate-700 rounded-xl px-3.5 py-2 text-white font-sans text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-bold">Category Image URL</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full bg-[#1A2338] border border-slate-700 rounded-xl px-3.5 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Display Order</label>
                  <input
                    type="number"
                    value={formData.displayOrder}
                    onChange={(e) => setFormData({ ...formData, displayOrder: Number(e.target.value) })}
                    className="w-full bg-[#1A2338] border border-slate-700 rounded-xl px-3.5 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full bg-[#1A2338] border border-slate-700 rounded-xl px-3.5 py-2 text-white"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold uppercase"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
