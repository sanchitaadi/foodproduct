"use client";

import React, { useState } from "react";
import { useAdminStore, AdminRole, AdminUser, ROLE_PERMISSIONS } from "@/lib/admin/adminStore";
import { ShieldCheck, Plus, Check, X, Lock, UserCheck } from "lucide-react";

export default function AdminStaffPage() {
  const { staffList, updateStaffRole, toggleStaffStatus, addStaffMember } = useAdminStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "catalogue_manager" as AdminRole,
    roleLabel: "Catalogue Manager",
    status: "active" as "active" | "inactive",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
  });

  const roles: { role: AdminRole; label: string }[] = [
    { role: "super_admin", label: "Super Admin" },
    { role: "catalogue_manager", label: "Catalogue Manager" },
    { role: "inventory_manager", label: "Inventory & Stock Lead" },
    { role: "fulfilment_manager", label: "Fulfilment Lead" },
    { role: "customer_support", label: "Customer Care Lead" },
  ];

  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) return;

    addStaffMember({
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      role: formData.role,
      roleLabel: roles.find((r) => r.role === formData.role)?.label || "Staff",
      status: formData.status,
      avatar: formData.avatar,
    });

    setIsModalOpen(false);
    setFormData({
      name: "",
      email: "",
      role: "catalogue_manager",
      roleLabel: "Catalogue Manager",
      status: "active",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    });
  };

  const modules = [
    { key: "dashboard", label: "Executive Dashboard" },
    { key: "products", label: "Products Catalog" },
    { key: "categories", label: "Pantry Categories" },
    { key: "brands", label: "Concept Brands" },
    { key: "inventory", label: "Inventory & Stock" },
    { key: "orders", label: "Orders & Fulfillment" },
    { key: "customers", label: "Customer CRM" },
    { key: "coupons", label: "Coupons & Discounts" },
    { key: "reviews", label: "Review Moderation" },
    { key: "content", label: "Multi-Concept CMS" },
    { key: "gallery", label: "Media Asset Gallery" },
    { key: "reports", label: "Financial Reports" },
    { key: "staff", label: "Staff & RBAC" },
    { key: "settings", label: "Store Settings" },
  ];

  return (
    <div className="space-y-8 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-white tracking-wide">
            Staff Team & Role-Based Access Control (RBAC)
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Enforce least-privilege administrative access and review security permissions matrix.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-bold uppercase rounded-xl text-xs font-mono flex items-center gap-1.5 shadow-lg shadow-amber-500/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Provision Staff Member</span>
        </button>
      </div>

      {/* Staff Table */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono min-w-[700px]">
            <thead className="bg-slate-900/80 border-b border-slate-800 text-slate-400 uppercase text-[10px]">
              <tr>
                <th className="py-3 px-4">Staff Member</th>
                <th className="py-3 px-4">Corporate Email</th>
                <th className="py-3 px-4">Assigned Role</th>
                <th className="py-3 px-4">Last Console Activity</th>
                <th className="py-3 px-4">Account Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {staffList.map((member) => (
                <tr key={member.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold flex items-center justify-center shrink-0">
                      {member.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-white font-sans text-sm">{member.name}</div>
                      <div className="text-[10px] text-slate-500">ID: {member.id}</div>
                    </div>
                  </td>

                  <td className="py-3 px-4 text-slate-300">{member.email}</td>

                  <td className="py-3 px-4">
                    <select
                      value={member.role}
                      onChange={(e) => updateStaffRole(member.id, e.target.value as AdminRole)}
                      className="bg-[#1A2338] border border-slate-700 rounded-lg px-2.5 py-1 text-amber-300 font-bold text-xs"
                    >
                      {roles.map((r) => (
                        <option key={r.role} value={r.role}>
                          {r.label}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td className="py-3 px-4 text-slate-400">{member.lastLogin}</td>

                  <td className="py-3 px-4">
                    <span
                      className={`text-[9px] px-2 py-0.5 rounded uppercase font-bold ${
                        member.status === "active" ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-800 text-slate-500"
                      }`}
                    >
                      {member.status}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => toggleStaffStatus(member.id)}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px]"
                    >
                      {member.status === "active" ? "Deactivate" : "Activate"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Permissions Matrix */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold font-serif text-white text-base">
              Role-Based Access Control (RBAC) Permissions Matrix
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-500">Backend Enforced</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono min-w-[700px]">
            <thead className="bg-slate-900/60 border-b border-slate-800 text-slate-400 uppercase text-[10px]">
              <tr>
                <th className="py-2.5 px-3">System Module</th>
                <th className="py-2.5 px-3 text-center">Super Admin</th>
                <th className="py-2.5 px-3 text-center">Catalogue Mgr</th>
                <th className="py-2.5 px-3 text-center">Inventory Lead</th>
                <th className="py-2.5 px-3 text-center">Fulfilment Lead</th>
                <th className="py-2.5 px-3 text-center">Customer Care</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {modules.map((m) => (
                <tr key={m.key} className="hover:bg-slate-800/20">
                  <td className="py-2.5 px-3 font-bold text-white font-sans">{m.label}</td>
                  <td className="py-2.5 px-3 text-center">
                    <span className="text-emerald-400 font-bold">✓ Full</span>
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    {ROLE_PERMISSIONS.catalogue_manager.includes(m.key) ? (
                      <span className="text-emerald-400 font-bold">✓ Granted</span>
                    ) : (
                      <span className="text-slate-600">—</span>
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    {ROLE_PERMISSIONS.inventory_manager.includes(m.key) ? (
                      <span className="text-emerald-400 font-bold">✓ Granted</span>
                    ) : (
                      <span className="text-slate-600">—</span>
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    {ROLE_PERMISSIONS.fulfilment_manager.includes(m.key) ? (
                      <span className="text-emerald-400 font-bold">✓ Granted</span>
                    ) : (
                      <span className="text-slate-600">—</span>
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    {ROLE_PERMISSIONS.customer_support.includes(m.key) ? (
                      <span className="text-emerald-400 font-bold">✓ Granted</span>
                    ) : (
                      <span className="text-slate-600">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Staff Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-[#0F172A] border border-slate-700 rounded-3xl p-6 shadow-2xl space-y-4 text-xs font-mono">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold font-serif text-white text-lg">Provision New Staff Account</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddStaff} className="space-y-4">
              <div>
                <label className="block text-slate-400 mb-1 font-bold">Full Legal Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Vikram Singhania"
                  className="w-full bg-[#1A2338] border border-slate-700 rounded-xl px-3.5 py-2.5 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-bold">Corporate Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. vikram@peachyplate.in"
                  className="w-full bg-[#1A2338] border border-slate-700 rounded-xl px-3.5 py-2.5 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-bold">Administrative Role *</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as AdminRole })}
                  className="w-full bg-[#1A2338] border border-slate-700 rounded-xl px-3.5 py-2.5 text-white"
                >
                  {roles.map((r) => (
                    <option key={r.role} value={r.role}>
                      {r.label}
                    </option>
                  ))}
                </select>
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
                  Create Staff Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
