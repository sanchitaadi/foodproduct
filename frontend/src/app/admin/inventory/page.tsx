"use client";

import React, { useState } from "react";
import { useAdminStore } from "@/lib/admin/adminStore";
import {
  AlertTriangle,
  Plus,
  TrendingDown,
  TrendingUp,
  PackageCheck,
  History,
  ShieldCheck,
  CheckCircle,
  Clock,
  Search,
} from "lucide-react";

export default function AdminInventoryPage() {
  const { inventory, inventoryAuditLogs, adjustStock, currentAdmin } = useAdminStore();

  const [selectedSku, setSelectedSku] = useState(inventory[0]?.sku || "");
  const [changeQty, setChangeQty] = useState(25);
  const [reason, setReason] = useState<
    "Inward Restock" | "Damage / Spoilage" | "Cycle Count Correction" | "Order Return"
  >("Inward Restock");
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<"all" | "low" | "healthy">("all");
  const [feedback, setFeedback] = useState<{ message: string; isError: boolean } | null>(null);

  const totalOnHand = inventory.reduce((acc, i) => acc + i.stockOnHand, 0);
  const totalReserved = inventory.reduce((acc, i) => acc + i.reservedStock, 0);
  const lowStockCount = inventory.filter((i) => i.stockOnHand < i.lowStockThreshold).length;

  const handleAdjust = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    const delta = reason === "Damage / Spoilage" ? -Math.abs(changeQty) : Math.abs(changeQty);
    const res = adjustStock({
      sku: selectedSku,
      changeQty: delta,
      reason,
      adminName: currentAdmin?.name || "Dev Malhotra (Inventory Lead)",
    });

    if (res.success) {
      setFeedback({ message: res.message, isError: false });
    } else {
      setFeedback({ message: res.message, isError: true });
    }
  };

  const filteredInventory = inventory.filter((item) => {
    const matchesSearch =
      item.sku.toLowerCase().includes(search.toLowerCase()) ||
      item.productName.toLowerCase().includes(search.toLowerCase());
    if (filterType === "low") return matchesSearch && item.stockOnHand < item.lowStockThreshold;
    if (filterType === "healthy") return matchesSearch && item.stockOnHand >= item.lowStockThreshold;
    return matchesSearch;
  });

  return (
    <div className="space-y-8 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-white tracking-wide">
            Live Warehouse Inventory & Stock Ledger
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Real-time stock on hand, 15-minute temporary checkout reservations, and audited adjustments.
          </p>
        </div>
      </div>

      {/* Top Inventory Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-[#0F172A] border border-slate-800 p-5 rounded-2xl">
          <div className="text-xs font-mono uppercase text-slate-400 mb-2">Total Units On Hand</div>
          <div className="text-3xl font-bold font-mono text-white">{totalOnHand} Units</div>
          <div className="text-[11px] font-mono text-slate-500 mt-2">Across 24 artisan food variants</div>
        </div>

        <div className="bg-[#0F172A] border border-slate-800 p-5 rounded-2xl">
          <div className="text-xs font-mono uppercase text-slate-400 mb-2">Reserved (Checkout Hold)</div>
          <div className="text-3xl font-bold font-mono text-amber-400">{totalReserved} Units</div>
          <div className="text-[11px] font-mono text-amber-300 mt-2">Temporary 15-min order reservations</div>
        </div>

        <div className="bg-[#0F172A] border border-slate-800 p-5 rounded-2xl">
          <div className="text-xs font-mono uppercase text-slate-400 mb-2">Reorder Radar Warnings</div>
          <div className="text-3xl font-bold font-mono text-rose-400">{lowStockCount} SKUs</div>
          <div className="text-[11px] font-mono text-rose-300 mt-2">Below safety minimum (15 units)</div>
        </div>
      </div>

      {/* Stock Adjustment Form */}
      <div className="bg-[#0F172A] border border-slate-800 p-6 rounded-3xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Plus className="w-4 h-4 text-amber-400" />
            <h3 className="font-bold font-serif text-white text-base">Inward Stock Adjustment Engine</h3>
          </div>
          <span className="text-[10px] font-mono uppercase bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
            Operator: {currentAdmin?.name}
          </span>
        </div>

        {feedback && (
          <div
            className={`p-3 rounded-xl text-xs font-mono flex items-center gap-2 ${
              feedback.isError
                ? "bg-rose-500/10 border border-rose-500/30 text-rose-400"
                : "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
            }`}
          >
            <CheckCircle className="w-4 h-4 shrink-0" />
            <span>{feedback.message}</span>
          </div>
        )}

        <form onSubmit={handleAdjust} className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs font-mono">
          <div className="sm:col-span-2">
            <label className="block text-slate-400 mb-1 font-bold">Target Food SKU *</label>
            <select
              value={selectedSku}
              onChange={(e) => setSelectedSku(e.target.value)}
              className="w-full bg-[#1A2338] border border-slate-700 rounded-xl px-3 py-2.5 text-white font-sans text-xs focus:outline-none focus:border-amber-400"
            >
              {inventory.map((i) => (
                <option key={i.sku} value={i.sku}>
                  {i.sku} — {i.productName} ({i.packSizeTitle}) [Now: {i.stockOnHand}]
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-slate-400 mb-1 font-bold">Reason *</label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value as any)}
              className="w-full bg-[#1A2338] border border-slate-700 rounded-xl px-3 py-2.5 text-white text-xs focus:outline-none focus:border-amber-400"
            >
              <option value="Inward Restock">+ Inward Restock (Vendor Receipt)</option>
              <option value="Damage / Spoilage">- Damage / Spoilage Write-Off</option>
              <option value="Cycle Count Correction">± Cycle Count Audit Correction</option>
              <option value="Order Return">+ Customer Order Return</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-400 mb-1 font-bold">Quantity (Units) *</label>
            <div className="flex gap-2">
              <input
                type="number"
                min="1"
                required
                value={changeQty}
                onChange={(e) => setChangeQty(Number(e.target.value))}
                className="w-full bg-[#1A2338] border border-slate-700 rounded-xl px-3 py-2 text-white font-bold"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold uppercase rounded-xl shrink-0 transition-colors"
              >
                Commit
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Real-time Inventory Table */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-2xl overflow-hidden shadow-xl space-y-4 p-5">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs font-mono">
          <div className="relative flex-1 max-w-sm">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search SKU or item name..."
              className="w-full bg-[#1A2338] border border-slate-700 rounded-xl px-3 py-2 text-white text-xs"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-2.5" />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilterType("all")}
              className={`px-3 py-1.5 rounded-lg ${filterType === "all" ? "bg-amber-500 text-black font-bold" : "bg-slate-800 text-slate-300"}`}
            >
              All SKUs ({inventory.length})
            </button>
            <button
              onClick={() => setFilterType("low")}
              className={`px-3 py-1.5 rounded-lg ${filterType === "low" ? "bg-rose-500 text-white font-bold" : "bg-slate-800 text-slate-300"}`}
            >
              Low Stock Warnings ({lowStockCount})
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono min-w-[700px]">
            <thead className="bg-slate-900/80 border-b border-slate-800 text-slate-400 uppercase text-[10px]">
              <tr>
                <th className="py-3 px-3">SKU</th>
                <th className="py-3 px-3">Provision Name</th>
                <th className="py-3 px-3">Pack Variant</th>
                <th className="py-3 px-3 text-right">Available Stock</th>
                <th className="py-3 px-3 text-right">15-min Reserved</th>
                <th className="py-3 px-3">Warehouse Hub</th>
                <th className="py-3 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredInventory.map((item) => (
                <tr key={item.sku} className="hover:bg-slate-800/40">
                  <td className="py-3 px-3 font-bold text-amber-300">{item.sku}</td>
                  <td className="py-3 px-3 text-white font-sans">{item.productName}</td>
                  <td className="py-3 px-3 text-slate-300">
                    {item.packSizeTitle} ({item.netQuantity})
                  </td>
                  <td className="py-3 px-3 text-right font-bold text-white text-sm">{item.stockOnHand}</td>
                  <td className="py-3 px-3 text-right text-amber-400 font-bold">{item.reservedStock}</td>
                  <td className="py-3 px-3 text-slate-400 text-[11px]">{item.warehouseHub}</td>
                  <td className="py-3 px-3 text-right">
                    {item.stockOnHand < item.lowStockThreshold ? (
                      <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30 text-[10px]">
                        Low Stock Alert
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px]">
                        Healthy Level
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Immutable Stock Audit Ledger */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-amber-400" />
            <h3 className="font-bold font-serif text-white text-base">Immutable Stock Movement Audit Trail</h3>
          </div>
          <span className="text-[10px] font-mono text-slate-500">Audit Grade Ledger</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono min-w-[700px]">
            <thead className="bg-slate-900/60 border-b border-slate-800 text-slate-400 uppercase text-[10px]">
              <tr>
                <th className="py-2.5 px-3">Audit ID</th>
                <th className="py-2.5 px-3">SKU</th>
                <th className="py-2.5 px-3">Adjustment Reason</th>
                <th className="py-2.5 px-3">Previous Qty</th>
                <th className="py-2.5 px-3">Adjustment</th>
                <th className="py-2.5 px-3">New Balance</th>
                <th className="py-2.5 px-3">Staff Operator</th>
                <th className="py-2.5 px-3 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {inventoryAuditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-800/30">
                  <td className="py-3 px-3 font-bold text-slate-400">{log.id}</td>
                  <td className="py-3 px-3 font-bold text-amber-300">{log.sku}</td>
                  <td className="py-3 px-3 text-white">{log.reason}</td>
                  <td className="py-3 px-3 text-slate-400">{log.previousQty}</td>
                  <td className="py-3 px-3">
                    <span
                      className={`font-bold ${log.changeQty > 0 ? "text-emerald-400" : "text-rose-400"}`}
                    >
                      {log.changeQty > 0 ? `+${log.changeQty}` : log.changeQty}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-bold text-white">{log.newQty}</td>
                  <td className="py-3 px-3 text-slate-300">{log.adminName}</td>
                  <td className="py-3 px-3 text-right text-slate-500">{log.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
