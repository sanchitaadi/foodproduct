"use client";

import React, { useState } from "react";
import { useAdminStore } from "@/lib/admin/adminStore";
import SafeImage from "@/components/common/SafeImage";
import { Image as ImageIcon, Plus, Trash2, Copy, Check, Filter, X } from "lucide-react";

export default function AdminGalleryPage() {
  const { galleryImages, addGalleryImage, deleteGalleryImage } = useAdminStore();

  const [conceptFilter, setConceptFilter] = useState("all");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [newImage, setNewImage] = useState({
    title: "",
    url: "",
    concept: "flavourverse",
    size: "450 KB",
  });

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImage.url.trim() || !newImage.title.trim()) return;

    addGalleryImage({
      title: newImage.title.trim(),
      url: newImage.url.trim(),
      concept: newImage.concept,
      size: newImage.size,
    });

    setIsUploadModalOpen(false);
    setNewImage({
      title: "",
      url: "",
      concept: "flavourverse",
      size: "450 KB",
    });
  };

  const handleCopyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const filteredImages = galleryImages.filter(
    (img) => conceptFilter === "all" || img.concept === conceptFilter
  );

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-white tracking-wide">
            Media Asset Gallery
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Organize high-resolution packaged food photography, packaging mockups, and atmosphere assets.
          </p>
        </div>

        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-bold uppercase rounded-xl text-xs font-mono flex items-center gap-1.5 shadow-lg shadow-amber-500/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Add Media Asset</span>
        </button>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-3 text-xs font-mono">
        <Filter className="w-3.5 h-3.5 text-slate-400" />
        <select
          value={conceptFilter}
          onChange={(e) => setConceptFilter(e.target.value)}
          className="bg-[#0F172A] border border-slate-800 rounded-xl px-3 py-2 text-white"
        >
          <option value="all">All Storefront Assets ({galleryImages.length})</option>
          <option value="flavourverse">Concept A: Flavourverse</option>
          <option value="purepantry">Concept B: Pure & Pantry</option>
          <option value="snackattack">Concept C: Snack Attack</option>
        </select>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredImages.map((img) => (
          <div
            key={img.id}
            className="rounded-2xl bg-[#0F172A] border border-slate-800 overflow-hidden group hover:border-slate-700 transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-square w-full bg-black/40">
                <SafeImage
                  src={img.url}
                  alt={img.title}
                  concept="flavourverse"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span
                  className={`absolute top-2.5 left-2.5 text-[9px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                    img.concept === "flavourverse"
                      ? "bg-purple-500 text-white"
                      : img.concept === "purepantry"
                      ? "bg-emerald-500 text-white"
                      : "bg-yellow-400 text-black"
                  }`}
                >
                  {img.concept}
                </span>
              </div>

              <div className="p-4 space-y-1">
                <h4 className="font-bold text-white text-xs truncate font-sans">{img.title}</h4>
                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                  <span>Size: {img.size}</span>
                  <span>{img.createdAt}</span>
                </div>
              </div>
            </div>

            <div className="p-3 border-t border-slate-800 bg-slate-900/40 flex items-center justify-between text-xs font-mono">
              <button
                onClick={() => handleCopyUrl(img.id, img.url)}
                className="text-slate-400 hover:text-amber-400 flex items-center gap-1 text-[11px]"
              >
                {copiedId === img.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy URL</span>
                  </>
                )}
              </button>

              <button
                onClick={() => deleteGalleryImage(img.id)}
                className="text-slate-500 hover:text-rose-400 p-1"
                title="Delete Media Asset"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-[#0F172A] border border-slate-700 rounded-3xl p-6 shadow-2xl space-y-4 text-xs font-mono">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold font-serif text-white text-lg">Add Food Media Asset</h3>
              <button onClick={() => setIsUploadModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <label className="block text-slate-400 mb-1 font-bold">Image Description / Title *</label>
                <input
                  type="text"
                  required
                  value={newImage.title}
                  onChange={(e) => setNewImage({ ...newImage, title: e.target.value })}
                  placeholder="e.g. Kashmiri Walnuts Packaging Atelier"
                  className="w-full bg-[#1A2338] border border-slate-700 rounded-xl px-3.5 py-2.5 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-bold">Direct Image URL *</label>
                <input
                  type="text"
                  required
                  value={newImage.url}
                  onChange={(e) => setNewImage({ ...newImage, url: e.target.value })}
                  placeholder="https://... or /images/..."
                  className="w-full bg-[#1A2338] border border-slate-700 rounded-xl px-3.5 py-2.5 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Target Concept</label>
                  <select
                    value={newImage.concept}
                    onChange={(e) => setNewImage({ ...newImage, concept: e.target.value })}
                    className="w-full bg-[#1A2338] border border-slate-700 rounded-xl px-3 py-2 text-white"
                  >
                    <option value="flavourverse">Concept 1: Flavourverse</option>
                    <option value="purepantry">Concept 2: Pure & Pantry</option>
                    <option value="snackattack">Concept 3: Snack Attack</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Estimated Size</label>
                  <input
                    type="text"
                    value={newImage.size}
                    onChange={(e) => setNewImage({ ...newImage, size: e.target.value })}
                    className="w-full bg-[#1A2338] border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold uppercase"
                >
                  Register Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
