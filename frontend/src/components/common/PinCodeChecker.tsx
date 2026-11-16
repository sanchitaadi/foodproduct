"use client";

import React, { useState } from "react";
import { MapPin, CheckCircle2, Truck, AlertCircle, Clock } from "lucide-react";

interface PinCodeCheckerProps {
  concept: "flavourverse" | "purepantry" | "snackattack";
}

// Major serviceable test hubs
const KNOWN_PIN_HUBS: Record<string, { city: string; state: string; days: string }> = {
  "560001": { city: "Bengaluru", state: "Karnataka", days: "Next Day Delivery" },
  "560038": { city: "Bengaluru (Indiranagar)", state: "Karnataka", days: "Same Day Dispatch" },
  "110001": { city: "New Delhi", state: "Delhi", days: "2 Business Days" },
  "400001": { city: "Mumbai", state: "Maharashtra", days: "2 Business Days" },
  "700001": { city: "Kolkata", state: "West Bengal", days: "3 Business Days" },
  "600001": { city: "Chennai", state: "Tamil Nadu", days: "2 Business Days" },
  "500001": { city: "Hyderabad", state: "Telangana", days: "2 Business Days" },
  "411001": { city: "Pune", state: "Maharashtra", days: "2 Business Days" },
  "380001": { city: "Ahmedabad", state: "Gujarat", days: "2-3 Business Days" },
  "122001": { city: "Gurugram", state: "Haryana", days: "2 Business Days" },
};

export default function PinCodeChecker({ concept }: PinCodeCheckerProps) {
  const [pin, setPin] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [hubInfo, setHubInfo] = useState<{ city: string; state: string; days: string } | null>(null);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPin = pin.trim();

    if (!/^\d{6}$/.test(cleanPin)) {
      setStatus("error");
      setHubInfo(null);
      return;
    }

    if (KNOWN_PIN_HUBS[cleanPin]) {
      setHubInfo(KNOWN_PIN_HUBS[cleanPin]);
    } else {
      setHubInfo({ city: "Pan-India Hub", state: "India", days: "3-4 Business Days" });
    }
    setStatus("success");
  };

  return (
    <div
      className={`p-4 rounded-2xl border text-xs ${
        concept === "flavourverse"
          ? "bg-[#251022] border-[#3D1D38] text-[#FFF4E8]"
          : concept === "purepantry"
          ? "bg-[#F3EFE6] border-[#DDD6C7] text-[#2B2D2F]"
          : "bg-white border-2 border-black shadow-[3px_3px_0px_#000] text-black"
      }`}
    >
      <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider mb-2">
        <Truck className={`w-4 h-4 ${concept === "flavourverse" ? "text-[#FF9F1C]" : concept === "purepantry" ? "text-[#4A5844]" : "text-[#FF6B6B]"}`} />
        <span>Check Delivery & Serviceability</span>
      </div>

      <form onSubmit={handleCheck} className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            maxLength={6}
            value={pin}
            onChange={(e) => {
              setPin(e.target.value);
              if (status !== "idle") setStatus("idle");
            }}
            placeholder="Enter 6-digit PIN (e.g. 560001)"
            className={`w-full px-3 py-2 rounded-xl text-xs font-mono focus:outline-none transition-all ${
              concept === "flavourverse"
                ? "bg-[#180A16] border border-[#4A2544] text-white placeholder-white/40 focus:border-[#FF9F1C]"
                : concept === "purepantry"
                ? "bg-white border border-[#DDD6C7] text-[#2B2D2F] placeholder-neutral-400 focus:border-[#4A5844]"
                : "bg-white border-2 border-black font-bold placeholder-neutral-500"
            }`}
          />
        </div>
        <button
          type="submit"
          className={`px-4 py-2 rounded-xl font-bold uppercase text-[11px] tracking-wider transition-all ${
            concept === "flavourverse"
              ? "bg-[#FF9F1C] text-black hover:bg-[#ffa938]"
              : concept === "purepantry"
              ? "bg-[#4A5844] text-white hover:bg-[#3D4938]"
              : "bg-[#70E000] text-black border-2 border-black shadow-[2px_2px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5"
          }`}
        >
          Check
        </button>
      </form>

      {status === "error" && (
        <div className="flex items-center gap-1.5 text-red-500 mt-2 font-mono text-[11px]">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>Please enter a valid 6-digit Indian PIN code.</span>
        </div>
      )}

      {status === "success" && hubInfo && (
        <div
          className={`mt-2.5 pt-2.5 border-t space-y-1 font-mono text-[11px] ${
            concept === "flavourverse"
              ? "border-[#3D1D38] text-[#F5B99C]"
              : concept === "purepantry"
              ? "border-[#DDD6C7] text-[#4A5844]"
              : "border-black text-black"
          }`}
        >
          <div className="flex items-center gap-1.5 font-bold">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>Serviceable: {hubInfo.city}, {hubInfo.state}</span>
          </div>
          <div className="flex items-center gap-1.5 opacity-80 pl-5">
            <Clock className="w-3 h-3" />
            <span>Estimated Delivery: {hubInfo.days} • Free shipping over ₹499</span>
          </div>
        </div>
      )}
    </div>
  );
}
