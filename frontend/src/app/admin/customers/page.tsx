"use client";

import React, { useState } from "react";
import { useAdminStore, AdminCustomer } from "@/lib/admin/adminStore";
import { Users, Search, ShieldCheck, Mail, Phone, MapPin, Star, X } from "lucide-react";

export default function AdminCustomersPage() {
  const { customers, updateCustomerStatus } = useAdminStore();

  const [search, setSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<AdminCustomer | null>(null);

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search) ||
      c.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-white tracking-wide">
            Customer Patrons & CRM
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Registered patrons, delivery destinations, GSTIN records, and lifetime value across all 3 concepts.
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md text-xs font-mono">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by patron name, email, phone, or city..."
          className="w-full bg-[#0F172A] border border-slate-800 rounded-xl px-4 py-2.5 text-white placeholder:text-slate-500"
        />
        <Search className="w-4 h-4 text-slate-500 absolute right-3 top-3" />
      </div>

      {/* Customer Table */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono min-w-[700px]">
            <thead className="bg-slate-900/80 border-b border-slate-800 text-slate-400 uppercase text-[10px]">
              <tr>
                <th className="py-3 px-4">Patron Name</th>
                <th className="py-3 px-4">Contact Coordinates</th>
                <th className="py-3 px-4">Primary Location</th>
                <th className="py-3 px-4">GSTIN Status</th>
                <th className="py-3 px-4 text-right">Lifetime Spend</th>
                <th className="py-3 px-4">Patron Tier</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredCustomers.map((c) => (
                <tr key={c.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-bold text-white font-sans text-sm">{c.name}</div>
                    <div className="text-[10px] text-slate-500">ID: {c.id}</div>
                  </td>

                  <td className="py-3 px-4">
                    <div className="text-slate-300">{c.email}</div>
                    <div className="text-[10px] text-slate-500">{c.phone}</div>
                  </td>

                  <td className="py-3 px-4 text-slate-300">
                    {c.city}, {c.state} ({c.pincode})
                  </td>

                  <td className="py-3 px-4">
                    {c.gstin ? (
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-[10px]">
                        {c.gstin}
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-500 italic">B2C Retail</span>
                    )}
                  </td>

                  <td className="py-3 px-4 text-right">
                    <div className="font-bold text-amber-400 text-sm">₹{c.totalSpend.toFixed(2)}</div>
                    <div className="text-[10px] text-slate-500">{c.totalOrders} Orders</div>
                  </td>

                  <td className="py-3 px-4">
                    <span
                      className={`text-[9px] px-2 py-0.5 rounded font-bold uppercase ${
                        c.status === "vip"
                          ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                          : c.status === "flagged"
                          ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                          : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => setSelectedCustomer(c)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold"
                    >
                      Inspect Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Detail Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-[#0F172A] border border-slate-700 rounded-3xl p-6 shadow-2xl space-y-5 text-xs font-mono">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold font-serif text-white text-lg">{selectedCustomer.name}</h3>
              <button onClick={() => setSelectedCustomer(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-400">Patron ID:</span>
                <span className="font-bold text-white">{selectedCustomer.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Email:</span>
                <span className="text-white">{selectedCustomer.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Phone:</span>
                <span className="text-white">{selectedCustomer.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Registered:</span>
                <span className="text-slate-300">{selectedCustomer.registeredAt.slice(0, 10)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">GSTIN Tax Registration:</span>
                <span className="text-emerald-400 font-bold">{selectedCustomer.gstin || "None (Retail)"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Total Lifetime Value:</span>
                <span className="text-amber-400 font-bold text-sm">₹{selectedCustomer.totalSpend.toFixed(2)}</span>
              </div>

              <div className="pt-3 border-t border-slate-800 space-y-2">
                <span className="text-slate-400 block font-bold">Tier Management</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => updateCustomerStatus(selectedCustomer.id, "active")}
                    className={`px-3 py-1.5 rounded-lg font-bold text-xs ${
                      selectedCustomer.status === "active" ? "bg-emerald-500 text-black" : "bg-slate-800 text-slate-300"
                    }`}
                  >
                    Active
                  </button>
                  <button
                    onClick={() => updateCustomerStatus(selectedCustomer.id, "vip")}
                    className={`px-3 py-1.5 rounded-lg font-bold text-xs ${
                      selectedCustomer.status === "vip" ? "bg-purple-500 text-white" : "bg-slate-800 text-slate-300"
                    }`}
                  >
                    VIP Patron
                  </button>
                  <button
                    onClick={() => updateCustomerStatus(selectedCustomer.id, "flagged")}
                    className={`px-3 py-1.5 rounded-lg font-bold text-xs ${
                      selectedCustomer.status === "flagged" ? "bg-rose-500 text-white" : "bg-slate-800 text-slate-300"
                    }`}
                  >
                    Flagged
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedCustomer(null)}
                className="px-4 py-2 bg-slate-800 text-slate-200 rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
