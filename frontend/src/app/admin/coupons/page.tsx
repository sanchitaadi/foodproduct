"use client";

import React, { useState } from "react";
import { useAdminStore, AdminCoupon } from "@/lib/admin/adminStore";
import { Tag, Plus, Edit2, Trash2, CheckCircle, PauseCircle, PlayCircle, X } from "lucide-react";

export default function AdminCouponsPage() {
  const { coupons, addCoupon, deleteCoupon, toggleCouponStatus } = useAdminStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    code: "",
    type: "percentage" as "percentage" | "fixed",
    value: 15,
    minSpend: 499,
    maxDiscount: 300,
    usageLimit: 500,
    startDate: new Date().toISOString().slice(0, 10),
    expiryDate: "2026-12-31",
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.code.trim()) return;

    addCoupon({
      code: formData.code.trim().toUpperCase(),
      type: formData.type,
      value: Number(formData.value),
      minSpend: Number(formData.minSpend),
      maxDiscount: formData.maxDiscount ? Number(formData.maxDiscount) : undefined,
      usageLimit: Number(formData.usageLimit),
      startDate: formData.startDate,
      expiryDate: formData.expiryDate,
      status: "active",
    });

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-white tracking-wide">
            Promotions & Privilege Engine
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Create discount codes, cart-level privileges, and minimum spend rules across all 3 concepts.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-bold uppercase rounded-xl text-xs font-mono flex items-center gap-1.5 shadow-lg shadow-amber-500/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>New Discount Code</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {coupons.map((cp) => (
          <div
            key={cp.id}
            className="p-5 rounded-2xl bg-[#0F172A] border border-slate-800 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-base font-black tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-xl">
                  {cp.code}
                </span>

                <span
                  className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded uppercase ${
                    cp.status === "active"
                      ? "bg-emerald-500/20 text-emerald-400"
                      : cp.status === "paused"
                      ? "bg-amber-500/20 text-amber-300"
                      : "bg-slate-800 text-slate-500"
                  }`}
                >
                  {cp.status}
                </span>
              </div>

              <div className="text-xl font-bold font-mono text-white">
                {cp.type === "percentage" ? `${cp.value}% OFF` : `₹${cp.value} OFF`}
              </div>
              <p className="text-xs text-slate-400 mt-1 font-mono">
                Min spend: <strong>₹{cp.minSpend}</strong> {cp.maxDiscount && `• Cap: ₹${cp.maxDiscount}`}
              </p>
            </div>

            <div className="space-y-3 pt-3 border-t border-slate-800 text-xs font-mono">
              <div className="flex justify-between text-slate-400">
                <span>Usage Progress:</span>
                <span className="text-white font-bold">
                  {cp.usedCount} / {cp.usageLimit}
                </span>
              </div>

              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-amber-400 h-full rounded-full"
                  style={{ width: `${Math.min(100, (cp.usedCount / cp.usageLimit) * 100)}%` }}
                />
              </div>

              <div className="text-[10px] text-slate-500">
                Valid until: {cp.expiryDate}
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => toggleCouponStatus(cp.id)}
                  className="text-xs text-amber-400 hover:underline flex items-center gap-1"
                >
                  {cp.status === "active" ? (
                    <>
                      <PauseCircle className="w-3.5 h-3.5" />
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <PlayCircle className="w-3.5 h-3.5" />
                      <span>Resume</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => deleteCoupon(cp.id)}
                  className="text-xs text-rose-400 hover:text-rose-300 p-1"
                  title="Delete Coupon"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-[#0F172A] border border-slate-700 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold font-serif text-white text-lg">Create Promotional Privilege</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-slate-400 mb-1 font-bold">Coupon Code *</label>
                <input
                  type="text"
                  required
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                  placeholder="e.g. MONSOON20"
                  className="w-full bg-[#1A2338] border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-mono text-sm uppercase font-bold focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-bold">Discount Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                    className="w-full bg-[#1A2338] border border-slate-700 rounded-xl px-3 py-2 text-white"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed INR (₹)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-bold">Discount Value</label>
                  <input
                    type="number"
                    required
                    value={formData.value}
                    onChange={(e) => setFormData({ ...formData, value: Number(e.target.value) })}
                    className="w-full bg-[#1A2338] border border-slate-700 rounded-xl px-3 py-2 text-white font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Minimum Cart Spend (₹)</label>
                  <input
                    type="number"
                    value={formData.minSpend}
                    onChange={(e) => setFormData({ ...formData, minSpend: Number(e.target.value) })}
                    className="w-full bg-[#1A2338] border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Max Cap (₹, Optional)</label>
                  <input
                    type="number"
                    value={formData.maxDiscount}
                    onChange={(e) => setFormData({ ...formData, maxDiscount: Number(e.target.value) })}
                    className="w-full bg-[#1A2338] border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Max Total Usages</label>
                  <input
                    type="number"
                    value={formData.usageLimit}
                    onChange={(e) => setFormData({ ...formData, usageLimit: Number(e.target.value) })}
                    className="w-full bg-[#1A2338] border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Expiry Date</label>
                  <input
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                    className="w-full bg-[#1A2338] border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
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
                  Activate Code
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
