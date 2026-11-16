"use client";

import React, { useState } from "react";
import Link from "next/link";
import MegaMenuHeader from "@/components/common/MegaMenuHeader";
import NewsletterSection from "@/components/common/NewsletterSection";
import { ConceptKey, getConceptTheme } from "./conceptTheme";
import { ArrowLeft, Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";

export default function ConceptContactPage({ concept }: { concept: ConceptKey }) {
  const theme = getConceptTheme(concept);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Customer Inquiry",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className={`min-h-screen flex flex-col ${theme.bgClass}`}>
      <MegaMenuHeader concept={concept} />

      {/* Banner */}
      <section className={`py-16 px-4 sm:px-6 lg:px-8 ${theme.bannerClass}`}>
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <Link
            href={theme.basePath}
            className="inline-flex items-center gap-1.5 text-xs font-mono opacity-70 hover:opacity-100 mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to {theme.name}</span>
          </Link>
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase ${theme.badgeClass}`}>
            <span>Customer Support &amp; Concierge</span>
          </div>
          <h1 className={`text-4xl sm:text-6xl font-bold tracking-tight ${theme.fontClass}`}>
            Get in Touch
          </h1>
          <p className="text-base opacity-85 max-w-xl mx-auto">
            Questions regarding statutory FSSAI certificates, order status, corporate gifting, or pantry wholesale? Our concierge responds within 4 business hours.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Info Col */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <h2 className="text-xl font-bold font-serif mb-2">Concierge &amp; Dispatch HQ</h2>
            <p className="text-xs opacity-75 leading-relaxed font-mono">
              Peachy Plate Foods Pvt. Ltd. • Pan-India Packaged Foods DTC
            </p>
          </div>

          <div className="space-y-4 text-xs font-mono">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-current/15">
              <MapPin className="w-4 h-4 text-[#FF9F1C] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block text-sm">Fulfillment Center</span>
                <span className="opacity-75 leading-relaxed block">
                  Plot 44, Udyog Vihar Phase IV, Gurugram, Haryana - 122015, India
                </span>
                <span className="opacity-50 text-[10px] block mt-1">FSSAI Lic #10019041000572</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-current/15">
              <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <span className="font-bold block">Support &amp; Wholesale</span>
                <span className="opacity-75">hello@peachyplate.example</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-current/15">
              <Phone className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <span className="font-bold block">Toll-Free Helpline</span>
                <span className="opacity-75">1800-420-PEACH (Mon - Sat, 9am - 7pm IST)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form Col */}
        <div className="lg:col-span-7">
          <div className="p-8 rounded-2xl bg-white/5 border border-current/15">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="text-xl font-bold font-serif">Message Dispatched!</h3>
                <p className="text-xs opacity-75 max-w-sm mx-auto">
                  Thank you for reaching out. A client support specialist will follow up with you within 4 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-mono underline opacity-70 hover:opacity-100"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 text-xs font-mono">
                <div>
                  <label className="block mb-1 opacity-70 uppercase tracking-wider">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Sanchit Aadi"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:border-current text-sm font-sans"
                  />
                </div>

                <div>
                  <label className="block mb-1 opacity-70 uppercase tracking-wider">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@domain.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:border-current text-sm font-sans"
                  />
                </div>

                <div>
                  <label className="block mb-1 opacity-70 uppercase tracking-wider">Inquiry Type</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:outline-none text-sm text-black"
                  >
                    <option value="Customer Inquiry">Customer &amp; Product Support</option>
                    <option value="Corporate Gifting">Corporate Bulk Gifting</option>
                    <option value="Wholesale Distribution">Retail &amp; Pantry Distribution</option>
                    <option value="Regulatory">FSSAI &amp; Labelling Verification</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1 opacity-70 uppercase tracking-wider">Message</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us what you need..."
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:border-current text-sm font-sans"
                  />
                </div>

                <button
                  type="submit"
                  className={`w-full py-4 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${theme.btnPrimaryClass}`}
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <NewsletterSection concept={concept} />
    </div>
  );
}
