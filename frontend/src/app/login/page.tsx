"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, UserCheck, ShieldCheck, Sparkles, ArrowLeft } from "lucide-react";
import { useCustomerAuth } from "@/hooks/useCustomerAuth";

export default function CustomerLoginPage() {
  const router = useRouter();
  const { login } = useCustomerAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setError("Please provide a valid email address.");
      return;
    }
    const ok = login(email, password);
    if (ok) {
      router.push("/account");
    } else {
      setError("Login failed. Please check your credentials.");
    }
  };

  const handleQuickDemoLogin = () => {
    login("aadi@peachyplate.in", "demo12345");
    router.push("/account");
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
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-black text-white uppercase tracking-tight">Customer Sign In</h1>
            <p className="text-xs text-zinc-400">
              Access your order history, delivery tracking, and saved pantry stash
            </p>
          </div>

          {/* Quick Demo 1-Click Login Pill */}
          <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-2xl space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-[#CCFF00] font-bold">[DEMO EVALUATION]</span>
              <span className="text-[10px] text-zinc-500">1-CLICK LOGIN</span>
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Sign in instantly as demo customer with pre-configured orders, addresses, and wishlist items.
            </p>
            <button
              type="button"
              onClick={handleQuickDemoLogin}
              className="w-full py-2.5 rounded-xl bg-[#CCFF00] hover:bg-white text-black font-mono font-bold text-xs uppercase flex items-center justify-center gap-2 transition-colors"
            >
              <UserCheck className="w-4 h-4" />
              <span>Instant Login: Aaditya Vikram</span>
            </button>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-zinc-800 w-full" />
            <span className="bg-zinc-900 px-3 text-[10px] font-mono text-zinc-500 uppercase shrink-0">
              OR LOGIN WITH EMAIL
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
              className="w-full py-3.5 rounded-xl bg-white hover:bg-zinc-200 text-black font-mono font-black text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
            >
              <span>Sign In to Account</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-center text-xs text-zinc-500">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-[#CCFF00] hover:underline font-bold">
              Register here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
