"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAdminStore, AdminBrandConcept } from "@/lib/admin/adminStore";
import { Sparkles, ExternalLink, Edit2, CheckCircle, ShieldCheck, X } from "lucide-react";

export default function AdminBrandsPage() {
  const { concepts, updateConcept } = useAdminStore();

  const [editingConcept, setEditingConcept] = useState<AdminBrandConcept | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    headline: "",
    subhead: "",
    tagline: "",
    ctaText: "",
    ctaLink: "",
    accentColor: "",
    status: "active" as "active" | "maintenance",
  });

  const conceptList: AdminBrandConcept[] = [
    concepts.flavourverse,
    concepts.purepantry,
    concepts.snackattack,
  ];

  const handleOpenEdit = (concept: AdminBrandConcept) => {
    setEditingConcept(concept);
    setFormData({
      name: concept.name,
      headline: concept.headline,
      subhead: concept.subhead,
      tagline: concept.tagline,
      ctaText: concept.ctaText,
      ctaLink: concept.ctaLink,
      accentColor: concept.accentColor,
      status: concept.status,
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingConcept) return;

    updateConcept(editingConcept.id, {
      ...formData,
    });
    setEditingConcept(null);
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-white tracking-wide">
            The Three Storefront Concepts (Brand Identities)
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Independent visual identities and digital merchandising for Peachy Plate&apos;s three distinct customer universes.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {conceptList.map((brand) => (
          <div
            key={brand.id}
            className={`p-6 rounded-3xl border flex flex-col justify-between space-y-6 shadow-2xl transition-all ${
              brand.id === "flavourverse"
                ? "bg-gradient-to-b from-[#1F0E1C] via-[#160B14] to-[#0D050C] border-[#FF9F1C]/40"
                : brand.id === "purepantry"
                ? "bg-gradient-to-b from-[#1E3A2F]/30 via-[#10201A] to-[#0A1410] border-[#E3E8DC]/30"
                : "bg-gradient-to-b from-[#FFE600]/15 via-[#141200] to-[#0B0A00] border-[#FFE600]/40"
            }`}
          >
            <div className="space-y-4">
              {/* Concept Pill & Status */}
              <div className="flex items-center justify-between">
                <span
                  className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider"
                  style={{
                    backgroundColor: `${brand.accentColor}25`,
                    color: brand.accentColor,
                    borderColor: `${brand.accentColor}50`,
                  }}
                >
                  {brand.id === "flavourverse"
                    ? "Concept 1 • Editorial"
                    : brand.id === "purepantry"
                    ? "Concept 2 • Organic"
                    : "Concept 3 • Maximalist"}
                </span>

                <span
                  className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded uppercase ${
                    brand.status === "active" ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-300"
                  }`}
                >
                  {brand.status}
                </span>
              </div>

              {/* Title & Tagline */}
              <div>
                <h2
                  className={`text-2xl font-black tracking-tight ${
                    brand.id === "flavourverse"
                      ? "font-serif text-[#FFF4E8]"
                      : brand.id === "purepantry"
                      ? "font-serif text-white tracking-wide"
                      : "italic text-white"
                  }`}
                >
                  {brand.name}
                </h2>
                <div className="text-[10px] font-mono text-slate-400 mt-1 uppercase tracking-widest font-bold">
                  {brand.tagline}
                </div>
              </div>

              {/* Headline & Description */}
              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2">
                <div className="text-xs font-bold text-white font-sans">&ldquo;{brand.headline}&rdquo;</div>
                <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                  {brand.subhead}
                </p>
              </div>

              {/* Route & Styling specs */}
              <div className="text-xs font-mono text-slate-400 space-y-1.5 pt-2">
                <div className="flex justify-between">
                  <span>Storefront Route:</span>
                  <strong className="text-white">
                    {brand.id === "flavourverse"
                      ? "/concept-a-flavourverse"
                      : brand.id === "purepantry"
                      ? "/concept-b-purepantry"
                      : "/concept-c-snackattack"}
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span>Accent Tone:</span>
                  <span className="flex items-center gap-1.5 font-bold text-white">
                    <span
                      className="w-3 h-3 rounded-full border border-black/40"
                      style={{ backgroundColor: brand.accentColor }}
                    />
                    {brand.accentColor}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Call to Action:</span>
                  <strong className="text-white">{brand.ctaText}</strong>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
              <button
                onClick={() => handleOpenEdit(brand)}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 flex items-center gap-1.5 transition-colors"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit Brand Copy</span>
              </button>

              <Link
                href={
                  brand.id === "flavourverse"
                    ? "/concept-a-flavourverse"
                    : brand.id === "purepantry"
                    ? "/concept-b-purepantry"
                    : "/concept-c-snackattack"
                }
                target="_blank"
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center gap-1.5 transition-colors font-bold"
              >
                <span>Launch Live</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingConcept && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-[#0F172A] border border-slate-700 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold font-serif text-white text-lg">
                Edit Concept: {editingConcept.name}
              </h3>
              <button onClick={() => setEditingConcept(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-slate-400 mb-1 font-bold">Concept Headline</label>
                <input
                  type="text"
                  required
                  value={formData.headline}
                  onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                  className="w-full bg-[#1A2338] border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-sans text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-bold">Supporting Brand Narrative</label>
                <textarea
                  rows={3}
                  value={formData.subhead}
                  onChange={(e) => setFormData({ ...formData, subhead: e.target.value })}
                  className="w-full bg-[#1A2338] border border-slate-700 rounded-xl px-3.5 py-2 text-white font-sans text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">CTA Button Text</label>
                  <input
                    type="text"
                    value={formData.ctaText}
                    onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                    className="w-full bg-[#1A2338] border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full bg-[#1A2338] border border-slate-700 rounded-xl px-3 py-2 text-white"
                  >
                    <option value="active">Active Online</option>
                    <option value="maintenance">Maintenance</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingConcept(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold uppercase"
                >
                  Save Concept Settings
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
