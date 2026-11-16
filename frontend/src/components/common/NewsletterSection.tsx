"use client";

import React, { useState } from "react";
import { Mail, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/useToast";

interface NewsletterSectionProps {
  concept: "flavourverse" | "purepantry" | "snackattack";
}

export default function NewsletterSection({ concept }: NewsletterSectionProps) {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { addToast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) return;

    setIsSubscribed(true);
    addToast(
      "15% Privilege Code Unlocked!",
      "Use code PEACHY15 at checkout on your next order."
    );
  };

  return (
    <section
      className={`py-24 px-6 border-b text-center relative overflow-hidden ${
        concept === "flavourverse"
          ? "bg-[#140812] border-[#3D2439] text-[#FFF4E8]"
          : concept === "purepantry"
          ? "bg-white border-[#E3E8DC] text-[#1E3A2F]"
          : "bg-black border-b-4 border-black text-[#FFE600]"
      }`}
    >
      <div className="max-w-2xl mx-auto space-y-6 relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest bg-amber-500/20 text-amber-400 font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The Connoisseur Gazette</span>
        </div>

        <h2
          className={`text-3xl sm:text-5xl font-black uppercase tracking-tight ${
            concept === "flavourverse"
              ? "font-serif text-white"
              : concept === "purepantry"
              ? "font-serif text-[#1E3A2F]"
              : "text-[#FFE600] italic transform -rotate-1"
          }`}
        >
          Unlock Private Tasting Allocations
        </h2>

        <p className="text-xs sm:text-sm font-mono opacity-80 leading-relaxed max-w-lg mx-auto">
          Subscribe for early access to micro-batch harvests, seasonal single-estate chocolates, and secret drops. Instant 15% privilege code upon signup.
        </p>

        {isSubscribed ? (
          <div className="p-6 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 font-mono text-xs max-w-md mx-auto space-y-2">
            <CheckCircle2 className="w-8 h-8 mx-auto" />
            <div className="font-bold text-sm uppercase">You Are On The Private Register</div>
            <p className="opacity-90">
              Your 15% privilege code is: <strong className="text-white text-sm">PEACHY15</strong> (applied automatically in cart).
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2"
          >
            <div className="relative flex-1">
              <Mail className="w-4 h-4 opacity-50 absolute left-4 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="w-full bg-white/5 border border-current/20 rounded-xl px-10 py-3 text-xs font-mono placeholder:opacity-40 focus:outline-none focus:border-amber-400"
              />
            </div>

            <button
              type="submit"
              className="py-3 px-6 bg-amber-400 hover:bg-amber-300 text-black font-bold uppercase text-xs tracking-wider rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 flex-shrink-0"
            >
              <span>Join Circle</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
