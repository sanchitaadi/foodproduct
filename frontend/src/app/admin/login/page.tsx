"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAdminStore, PRESET_ADMINS, AdminRole } from "@/lib/admin/adminStore";
import { ShieldCheck, Lock, ArrowRight, UserCheck, AlertCircle, Sparkles } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const { login } = useAdminStore();

  const [email, setEmail] = useState("admin@peachyplate.in");
  const [password, setPassword] = useState("Admin@2026!");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    setTimeout(() => {
      const res = login(email, password);
      if (res.success) {
        router.push("/admin");
      } else {
        setError(res.error || "Authentication failed.");
        setLoading(false);
      }
    }, 400);
  };

  const handleQuickRoleLogin = (presetEmail: string) => {
    setEmail(presetEmail);
    setPassword("Demo@2026!");
    const res = login(presetEmail);
    if (res.success) {
      router.push("/admin");
    }
  };

  return (
    <div className="min-h-screen bg-[#070B14] text-slate-100 flex flex-col justify-between p-4 sm:p-6 font-sans antialiased selection:bg-amber-500 selection:text-black">
      {/* Top Bar */}
      <div className="max-w-7xl w-full mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-xl font-serif font-black tracking-wider text-amber-400 group-hover:text-amber-300">
            PEACHY PLATE
          </span>
          <span className="text-[10px] font-mono uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded font-bold">
            STAFF CONSOLE
          </span>
        </Link>

        <Link
          href="/"
          className="text-xs font-mono text-slate-400 hover:text-white transition-colors"
        >
          &larr; Return to Storefront
        </Link>
      </div>

      {/* Login Card */}
      <div className="max-w-md w-full mx-auto my-12 p-6 sm:p-8 rounded-3xl bg-[#0F172A] border border-slate-800 shadow-2xl relative">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-mono uppercase font-bold flex items-center gap-1.5">
          <Lock className="w-3 h-3" />
          <span>Role-Based Staff Access</span>
        </div>

        <div className="text-center pt-2 mb-6">
          <h1 className="text-2xl font-bold font-serif text-white tracking-wide">
            Sign In to Enterprise Control
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Access catalog, inventory, orders, and content across all 3 concepts.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
          <div>
            <label className="block text-slate-400 mb-1.5 font-bold uppercase text-[11px]">
              Staff Corporate Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. admin@peachyplate.in"
              className="w-full bg-[#1A2338] border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400 text-sm font-sans"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-slate-400 font-bold uppercase text-[11px]">
                Staff Passcode
              </label>
              <span className="text-[10px] text-slate-500">Encrypted SHA-256</span>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-[#1A2338] border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400 text-sm font-sans"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-black font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 text-xs shadow-lg shadow-amber-500/20"
          >
            <span>{loading ? "Verifying Credentials..." : "Access Admin Console"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Role Switcher for Demonstration & Testing */}
        <div className="mt-8 pt-6 border-t border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">
            <span>One-Click Role Demonstration</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
            {PRESET_ADMINS.slice(0, 4).map((admin) => (
              <button
                key={admin.id}
                type="button"
                onClick={() => handleQuickRoleLogin(admin.email)}
                className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 text-left transition-all group"
              >
                <div className="font-bold text-white group-hover:text-amber-400 truncate">
                  {admin.name}
                </div>
                <div className="text-[10px] text-slate-400 truncate">{admin.roleLabel}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Notice */}
      <div className="max-w-md w-full mx-auto text-center space-y-2 text-[11px] font-mono text-slate-500">
        <div className="flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>FSSAI Central Regulatory License #10021011000428</span>
        </div>
        <div>All administrative operations logged and auditable under GST & FSSAI 2026 rules.</div>
      </div>
    </div>
  );
}
