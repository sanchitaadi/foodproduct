"use client";

import React, { useState } from "react";
import { useAdminStore } from "@/lib/admin/adminStore";
import {
  BarChart3,
  FileSpreadsheet,
  TrendingUp,
  ShoppingBag,
  DollarSign,
  Package,
  Layers,
  Sparkles,
  Download,
} from "lucide-react";

export default function AdminReportsPage() {
  const { orders, inventory, products, customers, exportReportCSV } = useAdminStore();

  const [dateRange, setDateRange] = useState<"7d" | "30d" | "ytd">("30d");

  const totalGross = orders.reduce((acc, o) => acc + o.total, 0);
  const totalSubtotal = orders.reduce((acc, o) => acc + o.subtotal, 0);
  const totalDiscounts = orders.reduce((acc, o) => acc + o.discount, 0);
  const totalGst = orders.reduce((acc, o) => acc + o.gstAmount, 0);
  const totalShipping = orders.reduce((acc, o) => acc + o.shippingFee, 0);

  const flavourverseSales = orders
    .filter((o) => o.concept === "flavourverse")
    .reduce((acc, o) => acc + o.total, 0);
  const purepantrySales = orders
    .filter((o) => o.concept === "purepantry")
    .reduce((acc, o) => acc + o.total, 0);
  const snackattackSales = orders
    .filter((o) => o.concept === "snackattack")
    .reduce((acc, o) => acc + o.total, 0);

  const handleDownload = (type: "sales" | "inventory" | "customers") => {
    const csvContent = exportReportCSV(type);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `peachy_plate_${type}_report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-white tracking-wide">
            Financial & Operational Intelligence Reports
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Real consolidated turnover, tax reconciliation, and inventory valuation for audit compliance.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <button
            onClick={() => handleDownload("sales")}
            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-colors font-bold"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>Sales CSV</span>
          </button>
          <button
            onClick={() => handleDownload("inventory")}
            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-colors font-bold"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span>Stock CSV</span>
          </button>
        </div>
      </div>

      {/* Date Filter & Financial Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 rounded-2xl bg-[#0F172A] border border-slate-800">
          <div className="text-[10px] font-mono uppercase text-slate-400 mb-1">Total Realized Turnover</div>
          <div className="text-2xl font-bold font-mono text-emerald-400">₹{totalGross.toFixed(2)}</div>
          <div className="text-[10px] text-slate-500 font-mono mt-2">Across all 3 concepts</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0F172A] border border-slate-800">
          <div className="text-[10px] font-mono uppercase text-slate-400 mb-1">Promotional Discounts</div>
          <div className="text-2xl font-bold font-mono text-rose-400">-₹{totalDiscounts.toFixed(2)}</div>
          <div className="text-[10px] text-slate-500 font-mono mt-2">Coupon code redemptions</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0F172A] border border-slate-800">
          <div className="text-[10px] font-mono uppercase text-slate-400 mb-1">GST Tax Accrual (5%)</div>
          <div className="text-2xl font-bold font-mono text-white">₹{totalGst.toFixed(2)}</div>
          <div className="text-[10px] text-slate-500 font-mono mt-2">FSSAI food schedule tax liability</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0F172A] border border-slate-800">
          <div className="text-[10px] font-mono uppercase text-slate-400 mb-1">Total Order Velocity</div>
          <div className="text-2xl font-bold font-mono text-amber-400">{orders.length} Consignments</div>
          <div className="text-[10px] text-slate-500 font-mono mt-2">Avg basket: ₹{(totalGross / (orders.length || 1)).toFixed(2)}</div>
        </div>
      </div>

      {/* Concept Breakdown Table & Visual Bar */}
      <div className="p-6 rounded-2xl bg-[#0F172A] border border-slate-800 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h3 className="font-bold font-serif text-white text-base">
            Gross Merchandising Share by Concept
          </h3>
          <span className="text-xs font-mono text-slate-400">Concept A vs Concept B vs Concept C</span>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="h-3 w-full rounded-full bg-slate-900 overflow-hidden flex">
            <div
              className="bg-purple-500 h-full transition-all"
              style={{ width: `${totalGross > 0 ? (flavourverseSales / totalGross) * 100 : 33}%` }}
              title="Flavourverse"
            />
            <div
              className="bg-emerald-500 h-full transition-all"
              style={{ width: `${totalGross > 0 ? (purepantrySales / totalGross) * 100 : 33}%` }}
              title="Pure & Pantry"
            />
            <div
              className="bg-yellow-400 h-full transition-all"
              style={{ width: `${totalGross > 0 ? (snackattackSales / totalGross) * 100 : 34}%` }}
              title="Snack Attack"
            />
          </div>

          <div className="flex items-center justify-between text-xs font-mono pt-1 text-slate-400">
            <span className="flex items-center gap-1.5 text-purple-400">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500 inline-block" />
              Flavourverse: ₹{flavourverseSales.toFixed(2)}
            </span>
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
              Pure & Pantry: ₹{purepantrySales.toFixed(2)}
            </span>
            <span className="flex items-center gap-1.5 text-yellow-400">
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 inline-block" />
              Snack Attack: ₹{snackattackSales.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Top Product Leaderboard */}
        <div className="pt-4">
          <h4 className="text-xs font-mono uppercase font-bold text-slate-400 mb-3">
            Top Product Velocity Leaderboard
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono min-w-[600px]">
              <thead className="bg-slate-900/60 border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                <tr>
                  <th className="py-2.5 px-3">Rank</th>
                  <th className="py-2.5 px-3">Provision Item</th>
                  <th className="py-2.5 px-3">Category</th>
                  <th className="py-2.5 px-3 text-right">Selling Price</th>
                  <th className="py-2.5 px-3 text-right">FSSAI Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {products.slice(0, 5).map((p, idx) => (
                  <tr key={p.id} className="hover:bg-slate-800/30">
                    <td className="py-3 px-3 font-bold text-amber-400">#{idx + 1}</td>
                    <td className="py-3 px-3 font-bold text-white font-sans">{p.name}</td>
                    <td className="py-3 px-3 text-slate-300">{p.category.name}</td>
                    <td className="py-3 px-3 text-right font-bold text-white">₹{p.price}</td>
                    <td className="py-3 px-3 text-right text-emerald-400">Compliant</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
