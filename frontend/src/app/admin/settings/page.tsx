"use client";

import React, { useState } from "react";
import { useAdminStore } from "@/lib/admin/adminStore";
import {
  Settings,
  ShieldCheck,
  CreditCard,
  MapPin,
  Save,
  CheckCircle,
  AlertTriangle,
  Lock,
  Clock,
  Sparkles,
} from "lucide-react";

export default function AdminSettingsPage() {
  const { settings, updateSettings, togglePincodeCod } = useAdminStore();

  const [form, setForm] = useState({
    storeName: settings.storeName,
    legalEntity: settings.legalEntity,
    fssaiLicense: settings.fssaiLicense,
    gstin: settings.gstin,
    defaultTaxRatePercent: settings.defaultTaxRatePercent,
    standardShippingFee: settings.standardShippingFee,
    freeShippingThreshold: settings.freeShippingThreshold,
    contactEmail: settings.contactEmail,
    contactPhone: settings.contactPhone,
    maintenanceMode: settings.maintenanceMode,
  });

  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-8 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-white tracking-wide">
            Store & Regulatory Governance Settings
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-1">
            FSSAI license declarations, GST tax configuration, and Pan-India delivery parameters.
          </p>
        </div>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-2">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>Store settings and PIN serviceability parameters saved successfully!</span>
        </div>
      )}

      {/* ========================================================
          PAYMENT GATEWAY — STRICTLY COMING SOON
          ======================================================== */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-blue-500/10 border-2 border-amber-500/40 relative overflow-hidden shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-amber-500/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-black text-lg text-white">Payment Gateway Engine</h3>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-black font-mono font-bold text-[10px] uppercase">
                  Coming Soon
                </span>
              </div>
              <p className="text-xs text-slate-300 font-mono mt-0.5">
                Razorpay, UPI, & Net Banking Gateway Integration Architecture
              </p>
            </div>
          </div>

          <div className="px-3 py-1 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] font-mono text-amber-300 flex items-center gap-1.5 self-start sm:self-auto">
            <Lock className="w-3.5 h-3.5" />
            <span>Phase 2 Production Milestone</span>
          </div>
        </div>

        <div className="pt-4 space-y-3 text-xs text-slate-300 font-sans leading-relaxed">
          <p>
            Online payment processing is intentionally held in <strong>&ldquo;Coming Soon&rdquo;</strong> status.
            In accordance with system specifications, no live API credentials, fake merchant transactions, or dummy cards are processed.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-mono">
            <div className="p-3 rounded-xl bg-black/40 border border-white/5">
              <div className="text-[10px] text-slate-400 uppercase">Primary Gateway</div>
              <div className="text-white font-bold mt-0.5">Razorpay India (Planned)</div>
              <div className="text-[10px] text-amber-400">Server-Side Signature Ready</div>
            </div>

            <div className="p-3 rounded-xl bg-black/40 border border-white/5">
              <div className="text-[10px] text-slate-400 uppercase">Checkout Status</div>
              <div className="text-white font-bold mt-0.5">Demo Simulation Notice</div>
              <div className="text-[10px] text-emerald-400">Zero Customer Charge Risk</div>
            </div>

            <div className="p-3 rounded-xl bg-black/40 border border-white/5">
              <div className="text-[10px] text-slate-400 uppercase">Cash on Delivery</div>
              <div className="text-white font-bold mt-0.5">PIN Serviceability Controlled</div>
              <div className="text-[10px] text-slate-400">Restricted per Hub Matrix</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* Legal & Regulatory */}
        <div className="p-6 rounded-2xl bg-[#0F172A] border border-slate-800 space-y-4 text-xs font-mono">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <h3 className="font-serif font-bold text-white text-base">Legal Entity & Tax Registration</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 mb-1 font-bold">Store Brand Trade Name *</label>
              <input
                type="text"
                required
                value={form.storeName}
                onChange={(e) => setForm({ ...form, storeName: e.target.value })}
                className="w-full bg-[#1A2338] border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-sans text-sm"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-bold">Registered Legal Entity *</label>
              <input
                type="text"
                required
                value={form.legalEntity}
                onChange={(e) => setForm({ ...form, legalEntity: e.target.value })}
                className="w-full bg-[#1A2338] border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-sans text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-slate-400 mb-1 font-bold">FSSAI Central License # *</label>
              <input
                type="text"
                required
                value={form.fssaiLicense}
                onChange={(e) => setForm({ ...form, fssaiLicense: e.target.value })}
                className="w-full bg-[#1A2338] border border-slate-700 rounded-xl px-3.5 py-2.5 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-bold">Corporate GSTIN Number *</label>
              <input
                type="text"
                required
                value={form.gstin}
                onChange={(e) => setForm({ ...form, gstin: e.target.value })}
                className="w-full bg-[#1A2338] border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-bold"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-bold">Default Food GST Tax Rate (%) *</label>
              <input
                type="number"
                step="0.5"
                required
                value={form.defaultTaxRatePercent}
                onChange={(e) => setForm({ ...form, defaultTaxRatePercent: Number(e.target.value) })}
                className="w-full bg-[#1A2338] border border-slate-700 rounded-xl px-3.5 py-2.5 text-white"
              />
            </div>
          </div>
        </div>

        {/* Shipping & Delivery */}
        <div className="p-6 rounded-2xl bg-[#0F172A] border border-slate-800 space-y-4 text-xs font-mono">
          <h3 className="font-serif font-bold text-white text-base pb-3 border-b border-slate-800">
            Pan-India Logistics & Delivery Economics
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 mb-1 font-bold">Free Shipping Minimum Threshold (₹) *</label>
              <input
                type="number"
                required
                value={form.freeShippingThreshold}
                onChange={(e) => setForm({ ...form, freeShippingThreshold: Number(e.target.value) })}
                className="w-full bg-[#1A2338] border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-bold"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-bold">Standard Delivery Fee (₹) *</label>
              <input
                type="number"
                required
                value={form.standardShippingFee}
                onChange={(e) => setForm({ ...form, standardShippingFee: Number(e.target.value) })}
                className="w-full bg-[#1A2338] border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 mb-1">Customer Support Email</label>
              <input
                type="email"
                value={form.contactEmail}
                onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
                className="w-full bg-[#1A2338] border border-slate-700 rounded-xl px-3.5 py-2 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Customer Concierge Helpline</label>
              <input
                type="text"
                value={form.contactPhone}
                onChange={(e) => setForm({ ...form, contactPhone: e.target.value })}
                className="w-full bg-[#1A2338] border border-slate-700 rounded-xl px-3.5 py-2 text-white"
              />
            </div>
          </div>
        </div>

        {/* Maintenance Toggle */}
        <div className="p-4 rounded-2xl bg-[#0F172A] border border-slate-800 flex items-center justify-between text-xs font-mono">
          <div>
            <div className="font-bold text-white">Store Maintenance Mode</div>
            <div className="text-slate-400 text-[11px]">Temporarily display maintenance banner on storefronts</div>
          </div>
          <input
            type="checkbox"
            checked={form.maintenanceMode}
            onChange={(e) => setForm({ ...form, maintenanceMode: e.target.checked })}
            className="w-5 h-5 rounded text-amber-500"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold uppercase tracking-wider text-xs font-mono flex items-center gap-2 shadow-lg shadow-amber-500/20"
          >
            <Save className="w-4 h-4" />
            <span>Save Store Governance Settings</span>
          </button>
        </div>
      </form>

      {/* PIN Code Serviceability Matrix */}
      <div className="p-6 rounded-2xl bg-[#0F172A] border border-slate-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-amber-400" />
            <h3 className="font-serif font-bold text-white text-base">
              PIN-Code Dispatch Matrix & COD Availability
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-500">7 Metro Hubs Verified</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono min-w-[650px]">
            <thead className="bg-slate-900/60 border-b border-slate-800 text-slate-400 uppercase text-[10px]">
              <tr>
                <th className="py-2.5 px-3">PIN Code</th>
                <th className="py-2.5 px-3">Hub City</th>
                <th className="py-2.5 px-3">State</th>
                <th className="py-2.5 px-3">Transit Time</th>
                <th className="py-2.5 px-3">COD Permission</th>
                <th className="py-2.5 px-3 text-right">Toggle COD</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {settings.pincodes.map((pin) => (
                <tr key={pin.pincode} className="hover:bg-slate-800/30">
                  <td className="py-3 px-3 font-bold text-amber-300">{pin.pincode}</td>
                  <td className="py-3 px-3 text-white">{pin.city}</td>
                  <td className="py-3 px-3 text-slate-400">{pin.state}</td>
                  <td className="py-3 px-3 text-slate-300">{pin.leadDays}</td>
                  <td className="py-3 px-3">
                    {pin.codAvailable ? (
                      <span className="text-emerald-400 font-bold">✓ COD Active</span>
                    ) : (
                      <span className="text-rose-400 font-bold">✗ Prepaid Only</span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => togglePincodeCod(pin.pincode)}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px]"
                    >
                      Toggle
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
