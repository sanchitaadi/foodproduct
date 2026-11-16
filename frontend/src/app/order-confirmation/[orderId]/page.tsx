"use client";

import React, { useEffect, useState, use } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import {
  CheckCircle2,
  Package,
  Truck,
  Download,
  ArrowRight,
  ExternalLink,
  MapPin,
  Clock,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";
import { useOrderStore, PeachyOrder } from "@/hooks/useOrderStore";
import { SafeImage } from "@/components/common/SafeImage";

interface OrderConfirmationProps {
  params: Promise<{ orderId: string }>;
}

export default function OrderConfirmationPage({ params }: OrderConfirmationProps) {
  const resolvedParams = use(params);
  const { getOrderById } = useOrderStore();
  const [order, setOrder] = useState<PeachyOrder | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const found = getOrderById(resolvedParams.orderId);
    if (found) {
      setOrder(found);
      // Trigger celebratory confetti
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#CCFF00", "#FF5400", "#5F7965", "#FF9E7D"],
      });
    }
  }, [resolvedParams.orderId, getOrderById]);

  if (!mounted) return null;

  if (!order) {
    return (
      <div className="min-h-screen bg-[#0D0D11] text-zinc-100 py-16 px-4 flex items-center justify-center font-mono">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 max-w-md text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center mx-auto text-zinc-400">
            <Package className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold text-white uppercase">Order Record Not Found</h1>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Order identifier &apos;{resolvedParams.orderId}&apos; was not found in local browser session storage.
          </p>
          <div className="pt-2">
            <Link
              href="/concepts"
              className="inline-block px-6 py-2.5 rounded-xl bg-[#CCFF00] text-black font-bold text-xs uppercase hover:bg-white transition-colors"
            >
              Return to Showcase
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#0D0D11] text-zinc-100 py-12 px-4 sm:px-6 lg:px-8 selection:bg-[#CCFF00] selection:text-black font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Celebration Header */}
        <div className="bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800 rounded-3xl p-8 sm:p-12 text-center space-y-4 relative overflow-hidden">
          <div className="w-16 h-16 rounded-full bg-[#CCFF00]/10 border border-[#CCFF00]/40 text-[#CCFF00] flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(204,255,0,0.2)]">
            <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs font-mono">
            <span>DEMO ORDER DISPATCHED SUCCESSFULLY</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
            Thank You For Your Order!
          </h1>

          <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Your demonstration order <span className="text-[#CCFF00] font-mono font-bold">#{order.id}</span> has been confirmed. A simulated dispatch manifest has been issued with AWB tracking.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handlePrintReceipt}
              className="px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-mono text-xs uppercase flex items-center gap-2 transition-colors border border-zinc-700"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Print Tax Receipt</span>
            </button>

            <Link
              href="/account"
              className="px-5 py-2.5 rounded-xl bg-[#CCFF00] hover:bg-white text-black font-mono font-bold text-xs uppercase flex items-center gap-2 transition-colors"
            >
              <span>View in Account Orders</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Dispatch Tracker Timeline */}
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-4">
            <div>
              <span className="text-xs font-mono text-[#CCFF00] uppercase tracking-wider">
                Logistics Dispatch Milestone
              </span>
              <h2 className="text-lg font-bold text-white mt-0.5">Live Delivery Status Tracker</h2>
            </div>
            <div className="text-right text-xs font-mono text-zinc-400">
              <div>Courier: <span className="text-white font-bold">{order.courier}</span></div>
              <div>AWB Tracking: <span className="text-[#CCFF00]">{order.awb}</span></div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            {order.timeline.slice(0, 4).map((step, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-xl border relative ${
                  step.completed
                    ? "bg-zinc-950 border-emerald-500/40 text-emerald-400"
                    : step.current
                    ? "bg-zinc-950 border-[#CCFF00] text-[#CCFF00]"
                    : "bg-zinc-950/40 border-zinc-800 text-zinc-600"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] font-bold uppercase">Step 0{idx + 1}</span>
                  {step.completed && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                </div>
                <div className="text-xs font-bold text-white mb-1">{step.title}</div>
                <div className="text-[11px] text-zinc-400 leading-relaxed">{step.description}</div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl flex items-center justify-between text-xs font-mono text-zinc-400">
            <span className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#CCFF00]" />
              <span>Estimated Delivery: {order.estimatedDelivery}</span>
            </span>
            <span className="text-emerald-400 font-bold">{order.paymentStatus}</span>
          </div>
        </div>

        {/* Order Details & Summary */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Items breakdown */}
          <div className="md:col-span-7 bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-4">
            <h3 className="font-bold text-sm uppercase text-white tracking-wide border-b border-zinc-800 pb-3">
              Items In This Shipment ({order.items.length})
            </h3>

            <div className="divide-y divide-zinc-800 space-y-3">
              {order.items.map((item) => (
                <div key={item.id} className="pt-3 flex items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-zinc-800 overflow-hidden shrink-0">
                      <SafeImage
                        src={item.image}
                        alt={item.productName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-bold text-white">{item.productName}</div>
                      <div className="text-[11px] text-zinc-500 font-mono">
                        {item.packSizeTitle} × {item.quantity} units
                      </div>
                    </div>
                  </div>
                  <div className="font-mono text-zinc-300 font-bold">
                    ₹{item.price * item.quantity}
                  </div>
                </div>
              ))}
            </div>

            {/* Price lines */}
            <div className="border-t border-zinc-800 pt-4 space-y-2 text-xs font-mono text-zinc-400">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-white font-bold">₹{order.subtotal}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Discount Applied ({order.couponCode || "COUPON"})</span>
                  <span>-₹{order.discount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping Fee</span>
                <span className="text-white font-bold">
                  {order.shipping === 0 ? "FREE" : `₹${order.shipping}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>GST (5%)</span>
                <span className="text-white font-bold">₹{order.gst}</span>
              </div>
              <div className="border-t border-zinc-800 pt-3 flex justify-between text-base font-bold text-white">
                <span>Total Amount Paid</span>
                <span className="text-[#CCFF00]">₹{order.total}</span>
              </div>
            </div>
          </div>

          {/* Shipping Address Summary */}
          <div className="md:col-span-5 space-y-6">
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 space-y-4">
              <h3 className="font-bold text-sm uppercase text-white tracking-wide border-b border-zinc-800 pb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#CCFF00]" />
                <span>Destination Address</span>
              </h3>

              <div className="text-xs text-zinc-300 space-y-1 font-mono leading-relaxed">
                <div className="font-bold text-white font-sans">{order.shippingAddress.fullName}</div>
                <div>{order.shippingAddress.street}</div>
                {order.shippingAddress.landmark && <div>Landmark: {order.shippingAddress.landmark}</div>}
                <div>
                  {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
                </div>
                <div className="text-zinc-500 pt-1">Contact: {order.shippingAddress.phone}</div>
              </div>
            </div>

            <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 space-y-3">
              <h4 className="font-bold text-xs uppercase text-white tracking-wider">
                Explore Other Storefronts
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                You can switch between any of the 4 independent brand concepts at any time.
              </p>
              <div className="pt-1">
                <Link
                  href="/concepts"
                  className="block w-full py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-center font-mono text-xs uppercase text-white font-bold transition-colors"
                >
                  Return to Concept Showcase
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
