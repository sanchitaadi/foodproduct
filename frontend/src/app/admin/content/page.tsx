"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAdminStore, AdminBrandConcept } from "@/lib/admin/adminStore";
import SafeImage from "@/components/common/SafeImage";
import { FileText, Eye, CheckCircle, ExternalLink, Save, Sparkles, Layers } from "lucide-react";

export default function AdminContentPage() {
  const { concepts, updateConcept } = useAdminStore();

  const [activeConceptTab, setActiveConceptTab] = useState<"flavourverse" | "purepantry" | "snackattack">(
    "flavourverse"
  );
  const [savedNotification, setSavedNotification] = useState(false);

  const currentConcept = concepts[activeConceptTab];

  const [form, setForm] = useState({
    name: currentConcept.name,
    headline: currentConcept.headline,
    subhead: currentConcept.subhead,
    tagline: currentConcept.tagline,
    heroImageDesktop: currentConcept.heroImageDesktop,
    heroImageMobile: currentConcept.heroImageMobile,
    ctaText: currentConcept.ctaText,
    ctaLink: currentConcept.ctaLink,
    accentColor: currentConcept.accentColor,
    status: currentConcept.status,
  });

  const handleTabChange = (key: "flavourverse" | "purepantry" | "snackattack") => {
    setActiveConceptTab(key);
    const c = concepts[key];
    setForm({
      name: c.name,
      headline: c.headline,
      subhead: c.subhead,
      tagline: c.tagline,
      heroImageDesktop: c.heroImageDesktop,
      heroImageMobile: c.heroImageMobile,
      ctaText: c.ctaText,
      ctaLink: c.ctaLink,
      accentColor: c.accentColor,
      status: c.status,
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateConcept(activeConceptTab, form);
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 2500);
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-white tracking-wide">
            Homepage & Multi-Concept CMS
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Independently manage hero banners, copy, and merchandising across Flavourverse, Pure & Pantry, and Snack Attack.
          </p>
        </div>

        <Link
          href={
            activeConceptTab === "flavourverse"
              ? "/concept-a-flavourverse"
              : activeConceptTab === "purepantry"
              ? "/concept-b-purepantry"
              : "/concept-c-snackattack"
          }
          target="_blank"
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-bold rounded-xl flex items-center gap-1.5 transition-colors self-start sm:self-auto"
        >
          <span>Live Storefront Preview</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Concept Switcher Tabs */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#0F172A] border border-slate-800 w-fit text-xs font-mono">
        <button
          onClick={() => handleTabChange("flavourverse")}
          className={`px-4 py-2 rounded-xl transition-all font-bold ${
            activeConceptTab === "flavourverse"
              ? "bg-[#FF9F1C] text-black shadow-md shadow-amber-500/20"
              : "text-slate-400 hover:text-white"
          }`}
        >
          1. FLAVOURVERSE (Editorial)
        </button>

        <button
          onClick={() => handleTabChange("purepantry")}
          className={`px-4 py-2 rounded-xl transition-all font-bold ${
            activeConceptTab === "purepantry"
              ? "bg-[#1E3A2F] text-white shadow-md"
              : "text-slate-400 hover:text-white"
          }`}
        >
          2. PURE & PANTRY (Organic)
        </button>

        <button
          onClick={() => handleTabChange("snackattack")}
          className={`px-4 py-2 rounded-xl transition-all font-bold ${
            activeConceptTab === "snackattack"
              ? "bg-[#FFE600] text-black shadow-md"
              : "text-slate-400 hover:text-white"
          }`}
        >
          3. SNACK ATTACK (Maximalist)
        </button>
      </div>

      {savedNotification && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-2">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>
            {form.name} CMS updates published successfully! Live storefront will display the new hero content.
          </span>
        </div>
      )}

      {/* Editor & Live Preview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Editor Form (7 cols) */}
        <div className="lg:col-span-7 bg-[#0F172A] border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="font-serif font-bold text-white text-base">
            Hero Section & Merchandising Content
          </h3>

          <form onSubmit={handleSave} className="space-y-4 text-xs font-mono">
            <div>
              <label className="block text-slate-400 mb-1 font-bold">Hero Headline *</label>
              <input
                type="text"
                required
                value={form.headline}
                onChange={(e) => setForm({ ...form, headline: e.target.value })}
                className="w-full bg-[#1A2338] border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-sans text-sm focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-bold">Brand Tagline & Edition Marker</label>
              <input
                type="text"
                value={form.tagline}
                onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                className="w-full bg-[#1A2338] border border-slate-700 rounded-xl px-3.5 py-2 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-bold">Supporting Narrative / Copy</label>
              <textarea
                rows={3}
                value={form.subhead}
                onChange={(e) => setForm({ ...form, subhead: e.target.value })}
                className="w-full bg-[#1A2338] border border-slate-700 rounded-xl px-3.5 py-2 text-white font-sans text-xs focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 mb-1">Desktop Hero Image URL</label>
                <input
                  type="text"
                  value={form.heroImageDesktop}
                  onChange={(e) => setForm({ ...form, heroImageDesktop: e.target.value })}
                  className="w-full bg-[#1A2338] border border-slate-700 rounded-xl px-3 py-2 text-white text-[11px]"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Mobile Hero Image URL</label>
                <input
                  type="text"
                  value={form.heroImageMobile}
                  onChange={(e) => setForm({ ...form, heroImageMobile: e.target.value })}
                  className="w-full bg-[#1A2338] border border-slate-700 rounded-xl px-3 py-2 text-white text-[11px]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 mb-1">CTA Button Text</label>
                <input
                  type="text"
                  value={form.ctaText}
                  onChange={(e) => setForm({ ...form, ctaText: e.target.value })}
                  className="w-full bg-[#1A2338] border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">CTA Button Link</label>
                <input
                  type="text"
                  value={form.ctaLink}
                  onChange={(e) => setForm({ ...form, ctaLink: e.target.value })}
                  className="w-full bg-[#1A2338] border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-amber-500/20"
              >
                <Save className="w-4 h-4" />
                <span>Publish Concept Changes</span>
              </button>
            </div>
          </form>
        </div>

        {/* Live Card Preview (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-widest font-bold">
            Live Visual Render Simulation
          </div>

          <div
            className={`p-6 rounded-3xl border shadow-2xl space-y-5 ${
              activeConceptTab === "flavourverse"
                ? "bg-[#1F0E1C] border-[#FF9F1C]/40 text-[#FFF4E8]"
                : activeConceptTab === "purepantry"
                ? "bg-[#FAF7F2] border-[#E3E8DC] text-[#1E3A2F]"
                : "bg-[#FFE600] border-4 border-black text-black"
            }`}
          >
            <div className="text-[9px] font-mono uppercase tracking-widest font-bold opacity-75">
              {form.tagline}
            </div>

            <h2
              className={`text-2xl font-black leading-tight ${
                activeConceptTab === "flavourverse"
                  ? "font-serif text-[#FFF4E8]"
                  : activeConceptTab === "purepantry"
                  ? "font-serif text-[#1E3A2F]"
                  : "italic text-black uppercase"
              }`}
            >
              {form.headline}
            </h2>

            <p className="text-xs leading-relaxed opacity-85 font-sans">{form.subhead}</p>

            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black/20 relative border border-current/10">
              <SafeImage
                src={form.heroImageDesktop}
                alt={form.name}
                concept={activeConceptTab}
                className="w-full h-full object-cover"
              />
            </div>

            <button
              className={`w-full py-3 rounded-xl font-bold uppercase text-xs tracking-wider ${
                activeConceptTab === "flavourverse"
                  ? "bg-[#FF9F1C] text-black"
                  : activeConceptTab === "purepantry"
                  ? "bg-[#1E3A2F] text-white"
                  : "bg-[#FF2A85] text-white border-2 border-black"
              }`}
            >
              {form.ctaText} &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
