"use client";

import React, { useState } from "react";
import { Zap, Send, Phone, Mail, MapPin, CheckCircle2 } from "lucide-react";
import { ContactService } from "@/lib/api/services";

export default function SnackAttackContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    inquiryType: "general" as "general" | "wholesale" | "press" | "bulk_order",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [responseMsg, setResponseMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await ContactService.submitInquiry({
        ...formData,
        brandConceptId: "snack-attack",
      });
      setStatus("success");
      setResponseMsg(res.message);
    } catch (err: any) {
      setStatus("error");
      setResponseMsg(err.message || "Failed to submit. Please try again.");
    }
  };

  return (
    <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-12 w-full">
      <div className="bg-[#FF5400] text-black border-4 border-black p-8 rounded-3xl shadow-[6px_6px_0px_#000] mb-10">
        <div className="inline-block bg-[#FFD60A] text-black font-black text-xs uppercase px-3 py-1 border-2 border-black rotate-[-2deg] mb-3">
          HQ COMMUNICATIONS
        </div>
        <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white drop-shadow-[3px_3px_0px_#000]">
          HOLLER AT SNACK ATTACK
        </h1>
        <p className="text-sm sm:text-base font-bold text-black mt-2 max-w-xl">
          Got a new flavor suggestion? Want to stock us at your campus cafe or retail shelf? Shoot us a dispatch.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white border-4 border-black rounded-3xl p-6 sm:p-8 shadow-[6px_6px_0px_#000]">
          {status === "success" ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#FFD60A] border-3 border-black mx-auto flex items-center justify-center text-3xl shadow-[3px_3px_0px_#000]">
                ⚡
              </div>
              <h3 className="text-2xl font-black uppercase text-black">DISPATCH RECEIVED!</h3>
              <p className="text-xs font-mono text-neutral-700 max-w-md mx-auto">{responseMsg}</p>
              <button
                onClick={() => {
                  setStatus("idle");
                  setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    subject: "",
                    message: "",
                    inquiryType: "general",
                  });
                }}
                className="px-6 py-3 bg-[#FF5400] text-black font-black uppercase text-xs border-2 border-black shadow-[3px_3px_0px_#000]"
              >
                Send Another Dispatch
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase text-black mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border-2 border-black rounded-xl text-xs font-bold outline-none focus:bg-[#FFFDF5]"
                    placeholder="Kabir Singh"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase text-black mb-1">Your Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 border-2 border-black rounded-xl text-xs font-bold outline-none focus:bg-[#FFFDF5]"
                    placeholder="kabir@gmail.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase text-black mb-1">WhatsApp / Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 border-2 border-black rounded-xl text-xs font-bold outline-none focus:bg-[#FFFDF5]"
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase text-black mb-1">Inquiry Type</label>
                  <select
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value as any })}
                    className="w-full px-3 py-2 border-2 border-black rounded-xl text-xs font-black uppercase bg-[#FFD60A] outline-none"
                  >
                    <option value="general">Fan Mail &amp; Flavors</option>
                    <option value="wholesale">Retail &amp; Distribution</option>
                    <option value="bulk_order">Campus &amp; Office Events</option>
                    <option value="press">Creator / Collab</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-black mb-1">Message</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 border-2 border-black rounded-xl text-xs font-bold outline-none focus:bg-[#FFFDF5]"
                  placeholder="Drop your thoughts, taste review, or wholesale requirements..."
                />
              </div>

              {status === "error" && (
                <p className="text-xs font-mono font-bold text-red-600 bg-red-100 p-2 border border-red-500 rounded-lg">
                  {responseMsg}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full py-4 bg-[#FF5400] text-black font-black uppercase text-xs tracking-wider border-3 border-black shadow-[4px_4px_0px_#000] hover:bg-[#FFD60A] transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 stroke-[3]" />
                <span>{status === "submitting" ? "TRANSMITTING..." : "FIRE OFF DISPATCH"}</span>
              </button>
            </form>
          )}
        </div>

        {/* Side Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#FFD60A] border-4 border-black rounded-3xl p-6 shadow-[6px_6px_0px_#000] space-y-4">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 fill-black" />
              <h3 className="font-black text-lg uppercase text-black">RAPID DISPATCH</h3>
            </div>
            <p className="text-xs font-medium text-black leading-relaxed">
              We respond to all munchie inquiries within 2 hours during active roasting hours (10 AM - 8 PM IST).
            </p>
            <div className="space-y-2 text-xs font-mono font-bold text-black border-t-2 border-black pt-3">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>holler@peachyplate.in</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+91 (080) 4123-PEACH</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Koramangala 4th Block, Bengaluru, India</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
