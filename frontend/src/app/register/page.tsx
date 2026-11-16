"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserPlus, Mail, Lock, Phone, User, ArrowRight, ArrowLeft } from "lucide-react";
import { useCustomerAuth } from "@/hooks/useCustomerAuth";

export default function CustomerRegisterPage() {
  const router = useRouter();
  const { register } = useCustomerAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email.includes("@")) {
      setError("Please provide a valid email address.");
      return;
    }
    const ok = register(formData.name, formData.email, formData.phone, formData.password);
    if (ok) {
      router.push("/account");
    } else {
      setError("Registration could not be completed.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D11] text-zinc-100 py-16 px-4 flex items-center justify-center font-sans selection:bg-[#CCFF00] selection:text-black">
      <div className="w-full max-w-md space-y-6">
        <Link
          href="/concepts"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-[#CCFF00] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO CONCEPTS SHOWCASE</span>
        </Link>

        <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-8 space-y-6 shadow-2xl">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-[#CCFF00]/10 border border-[#CCFF00]/30 text-[#CCFF00] flex items-center justify-center mx-auto mb-2">
              <UserPlus className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-black text-white uppercase tracking-tight">Create Account</h1>
            <p className="text-xs text-zinc-400">
              Join the Gen-Z packaged food collective for order tracking and exclusive batch drops
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Karan Mehra"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white outline-none focus:border-[#CCFF00]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="karan@domain.com"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white outline-none focus:border-[#CCFF00]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">Mobile (+91)</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white outline-none focus:border-[#CCFF00]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white outline-none focus:border-[#CCFF00]"
                />
              </div>
            </div>

            {error && (
              <div className="p-3 bg-rose-950/40 border border-rose-500/40 rounded-xl text-xs text-rose-400">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#CCFF00] hover:bg-white text-black font-mono font-black text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
            >
              <span>Create Account</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-center text-xs text-zinc-500">
            Already registered?{" "}
            <Link href="/login" className="text-[#CCFF00] hover:underline font-bold">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
