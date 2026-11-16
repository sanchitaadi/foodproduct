"use client";

import React from "react";
import { useToast } from "@/hooks/useToast";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            className="pointer-events-auto flex items-start gap-3 p-4 rounded-xl bg-slate-900/95 text-white border border-slate-700 shadow-2xl backdrop-blur-md"
          >
            {toast.type === "success" && (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            )}
            {toast.type === "warning" && (
              <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            )}
            {toast.type === "info" && (
              <Info className="w-5 h-5 text-sky-400 flex-shrink-0 mt-0.5" />
            )}

            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold font-sans tracking-wide text-white">
                {toast.title}
              </div>
              {toast.description && (
                <div className="text-[11px] font-mono text-slate-300 mt-0.5">
                  {toast.description}
                </div>
              )}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
