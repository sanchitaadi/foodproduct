"use client";

import { create } from "zustand";

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: "success" | "info" | "warning";
}

interface ToastState {
  toasts: ToastMessage[];
  addToast: (title: string, description?: string, type?: "success" | "info" | "warning") => void;
  removeToast: (id: string) => void;
}

export const useToast = create<ToastState>()((set) => ({
  toasts: [],

  addToast: (title, description, type = "success") => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    set((state) => ({
      toasts: [...state.toasts, { id, title, description, type }],
    }));

    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, 3500);
  },

  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },
}));
