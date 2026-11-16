"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  street: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  type: "Home" | "Work" | "Other";
  isDefault: boolean;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  gstin?: string;
  createdAt: string;
  addresses: Address[];
}

interface CustomerAuthState {
  customer: Customer | null;
  isLoggedIn: boolean;
  login: (email: string, password?: string) => boolean;
  register: (name: string, email: string, phone: string, password?: string) => boolean;
  logout: () => void;
  updateProfile: (data: Partial<Pick<Customer, "name" | "phone" | "gstin">>) => void;
  addAddress: (address: Omit<Address, "id">) => void;
  updateAddress: (id: string, address: Partial<Address>) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
}

const DEFAULT_DEMO_CUSTOMER: Customer = {
  id: "CUST-8821",
  name: "Aaditya Vikram",
  email: "aadi@peachyplate.in",
  phone: "+91 98765 43210",
  gstin: "07AAAAA0000A1Z5",
  createdAt: "2026-01-15T10:00:00Z",
  addresses: [
    {
      id: "addr-1",
      fullName: "Aaditya Vikram",
      phone: "+91 98765 43210",
      street: "Flat 402, Royal Palms, Outer Ring Road, Bellandur",
      landmark: "Near Ecospace Tech Park",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560103",
      type: "Home",
      isDefault: true,
    },
    {
      id: "addr-2",
      fullName: "Aaditya Vikram (Studio)",
      phone: "+91 98765 43210",
      street: "Suite 3B, WeWork Galaxy, 43 Residency Road, Shanthala Nagar",
      landmark: "Opposite Bishop Cotton Boys School",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560025",
      type: "Work",
      isDefault: false,
    },
  ],
};

export const useCustomerAuth = create<CustomerAuthState>()(
  persist(
    (set, get) => ({
      customer: DEFAULT_DEMO_CUSTOMER,
      isLoggedIn: true,

      login: (email: string, password?: string) => {
        // Simple demo authentication: allow any valid email
        if (!email.includes("@")) return false;
        
        const existing = get().customer;
        if (existing && existing.email.toLowerCase() === email.toLowerCase()) {
          set({ isLoggedIn: true });
          return true;
        }

        // New or fallback customer session
        set({
          isLoggedIn: true,
          customer: {
            id: `CUST-${Math.floor(1000 + Math.random() * 9000)}`,
            name: email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
            email: email,
            phone: "+91 98765 00000",
            createdAt: new Date().toISOString(),
            addresses: DEFAULT_DEMO_CUSTOMER.addresses,
          },
        });
        return true;
      },

      register: (name: string, email: string, phone: string, password?: string) => {
        if (!name.trim() || !email.includes("@") || !phone.trim()) return false;
        set({
          isLoggedIn: true,
          customer: {
            id: `CUST-${Math.floor(1000 + Math.random() * 9000)}`,
            name: name.trim(),
            email: email.trim().toLowerCase(),
            phone: phone.trim(),
            createdAt: new Date().toISOString(),
            addresses: [],
          },
        });
        return true;
      },

      logout: () => {
        set({ isLoggedIn: false });
      },

      updateProfile: (data) => {
        set((state) => ({
          customer: state.customer ? { ...state.customer, ...data } : null,
        }));
      },

      addAddress: (addressData) => {
        const id = `addr-${Date.now()}`;
        const newAddress: Address = {
          ...addressData,
          id,
          isDefault: addressData.isDefault || false,
        };

        set((state) => {
          if (!state.customer) return state;
          let updatedAddresses = [...state.customer.addresses];
          if (newAddress.isDefault) {
            updatedAddresses = updatedAddresses.map((a) => ({ ...a, isDefault: false }));
          }
          if (updatedAddresses.length === 0) {
            newAddress.isDefault = true;
          }
          return {
            customer: {
              ...state.customer,
              addresses: [...updatedAddresses, newAddress],
            },
          };
        });
      },

      updateAddress: (id, addressData) => {
        set((state) => {
          if (!state.customer) return state;
          let updatedAddresses = state.customer.addresses.map((addr) =>
            addr.id === id ? { ...addr, ...addressData } : addr
          );
          if (addressData.isDefault) {
            updatedAddresses = updatedAddresses.map((a) =>
              a.id === id ? a : { ...a, isDefault: false }
            );
          }
          return {
            customer: {
              ...state.customer,
              addresses: updatedAddresses,
            },
          };
        });
      },

      deleteAddress: (id) => {
        set((state) => {
          if (!state.customer) return state;
          const remaining = state.customer.addresses.filter((a) => a.id !== id);
          if (remaining.length > 0 && !remaining.some((a) => a.isDefault)) {
            remaining[0].isDefault = true;
          }
          return {
            customer: {
              ...state.customer,
              addresses: remaining,
            },
          };
        });
      },

      setDefaultAddress: (id) => {
        set((state) => {
          if (!state.customer) return state;
          return {
            customer: {
              ...state.customer,
              addresses: state.customer.addresses.map((a) => ({
                ...a,
                isDefault: a.id === id,
              })),
            },
          };
        });
      },
    }),
    {
      name: "peachy-plate-customer-auth",
    }
  )
);
