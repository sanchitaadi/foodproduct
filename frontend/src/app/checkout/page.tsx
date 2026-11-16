"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Truck,
  CreditCard,
  MapPin,
  CheckCircle2,
  ArrowRight,
  ShoppingBag,
  Sparkles,
  QrCode,
  AlertCircle,
  Tag,
  ArrowLeft,
} from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useCustomerAuth } from "@/hooks/useCustomerAuth";
import { useOrderStore } from "@/hooks/useOrderStore";
import { SafeImage } from "@/components/common/SafeImage";

const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

export default function CheckoutPage() {
  const router = useRouter();
  const {
    items,
    getSubtotal,
    getShipping,
    getEstimatedTax,
    getTotal,
    appliedCoupon,
    couponDiscount,
    applyCoupon,
    removeCoupon,
    clearCart,
  } = useCart();
  const { customer, isLoggedIn } = useCustomerAuth();
  const { createOrder } = useOrderStore();

  const [mounted, setMounted] = useState(false);
  const [shippingSpeed, setShippingSpeed] = useState<"standard" | "express">("standard");
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "upi" | "card">("upi");
  const [promoCodeInput, setPromoCodeInput] = useState("");
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Address fields
  const [formData, setFormData] = useState({
    fullName: customer?.addresses[0]?.fullName || customer?.name || "Aaditya Vikram",
    phone: customer?.addresses[0]?.phone || customer?.phone || "+91 98765 43210",
    email: customer?.email || "aadi@peachyplate.in",
    flat: "Flat 402, Royal Palms",
    street: "Outer Ring Road, Bellandur",
    landmark: "Near Ecospace Tech Park",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560103",
  });

  const [pincodeVerified, setPincodeVerified] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const subtotal = getSubtotal();
  const baseShipping = getShipping();
  const expressFee = shippingSpeed === "express" ? 99 : 0;
  const shippingFee = baseShipping + expressFee;
  const tax = getEstimatedTax();
  const totalPayable = subtotal - couponDiscount + shippingFee + tax;

  const handlePincodeChange = (pin: string) => {
    setFormData((prev) => ({ ...prev, pincode: pin }));
    if (pin.length === 6 && /^\d+$/.test(pin)) {
      setPincodeVerified(true);
    } else {
      setPincodeVerified(false);
    }
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoCodeInput.trim()) return;
    const ok = applyCoupon(promoCodeInput.trim());
    if (ok) {
      setPromoMessage({ text: "Promo coupon applied! 15% discount granted.", isError: false });
      setPromoCodeInput("");
    } else {
      setPromoMessage({ text: "Invalid code or min ₹499 order required. (Try PEACHY15 or WELCOME10)", isError: true });
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setIsSubmitting(true);

    const paymentLabel =
      paymentMethod === "cod"
        ? "Cash on Delivery"
        : paymentMethod === "upi"
        ? "Razorpay / UPI / Cards (Phase 3)"
        : "Razorpay / UPI / Cards (Phase 3)";

    const newOrder = createOrder({
      concept: "flavourverse",
      items,
      subtotal,
      discount: couponDiscount,
      couponCode: appliedCoupon || undefined,
      shipping: shippingFee,
      gst: tax,
      total: totalPayable,
      status: "placed",
      paymentStatus: "Paid (Demo Simulation)",
      paymentMethod: paymentLabel,
      customerName: formData.fullName,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      shippingAddress: {
        fullName: formData.fullName,
        phone: formData.phone,
        street: `${formData.flat}, ${formData.street}`,
        landmark: formData.landmark,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
      },
      courier: shippingSpeed === "express" ? "BlueDart Air Express" : "Delhivery Surface",
      awb: `BD-IN-${Math.floor(100000000 + Math.random() * 900000000)}`,
      estimatedDelivery:
        shippingSpeed === "express"
          ? "Delivering in 1-2 Business Days"
          : "Delivering in 3-5 Business Days",
    });

    // Clear cart and redirect
    clearCart();
    setTimeout(() => {
      router.push(`/order-confirmation/${newOrder.id}`);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#0D0D11] text-zinc-100 py-10 px-4 sm:px-6 lg:px-8 selection:bg-[#CCFF00] selection:text-black">
      <div className="max-w-7xl mx-auto">
        {/* Top Breadcrumb & Demo Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <Link
            href="/concepts"
            className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-[#CCFF00] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>RETURN TO BRAND SHOWCASE</span>
          </Link>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span>DEMO CHECKOUT MODE • NO ACTUAL CARD OR PAYMENT REQUIRED</span>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-12 text-center max-w-lg mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center mx-auto text-zinc-400">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-white">Your Cart Is Empty</h2>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Explore our 4 concept stores to pick Indian packaged chips, chocolates, or cookies before proceeding to checkout.
            </p>
            <div className="pt-2">
              <Link
                href="/concepts"
                className="inline-block px-6 py-3 rounded-xl bg-[#CCFF00] text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-white transition-colors"
              >
                Browse Concept Stores
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 7 Cols: Address, Speed, Payment */}
            <div className="lg:col-span-7 space-y-6">
              {/* Step 1: Shipping Address */}
              <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-5">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#CCFF00]/10 text-[#CCFF00] font-mono font-bold flex items-center justify-center text-xs">
                      1
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-white tracking-wide">
                        Shipping Address (India)
                      </h2>
                      <p className="text-xs text-zinc-400">Pan-India door-to-door courier delivery</p>
                    </div>
                  </div>
                  <MapPin className="w-5 h-5 text-zinc-500" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Aaditya Vikram"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#CCFF00]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1">
                      Mobile Number (+91) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#CCFF00]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">
                    Email Address (For Dispatch Tracking & Invoice) *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="aadi@peachyplate.in"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#CCFF00]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1">
                      Flat / House No. / Building *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.flat}
                      onChange={(e) => setFormData({ ...formData, flat: e.target.value })}
                      placeholder="Flat 402, Royal Palms"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#CCFF00]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1">
                      Street / Area / Locality *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.street}
                      onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                      placeholder="Outer Ring Road, Bellandur"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#CCFF00]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="Bengaluru"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#CCFF00]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1">
                      State *
                    </label>
                    <select
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-[#CCFF00]"
                    >
                      {INDIAN_STATES.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1">
                      6-Digit PIN Code *
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      required
                      value={formData.pincode}
                      onChange={(e) => handlePincodeChange(e.target.value)}
                      placeholder="560103"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#CCFF00]"
                    />
                  </div>
                </div>

                {pincodeVerified && (
                  <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-xl flex items-center gap-2 text-xs text-emerald-400">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>PIN Code {formData.pincode} verified: Serviceable via BlueDart & Delhivery Priority Network.</span>
                  </div>
                )}
              </div>

              {/* Step 2: Delivery Speed */}
              <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#CCFF00]/10 text-[#CCFF00] font-mono font-bold flex items-center justify-center text-xs">
                      2
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-white tracking-wide">
                        Delivery Speed
                      </h2>
                      <p className="text-xs text-zinc-400">Choose logistics speed for your shipment</p>
                    </div>
                  </div>
                  <Truck className="w-5 h-5 text-zinc-500" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div
                    onClick={() => setShippingSpeed("standard")}
                    className={`cursor-pointer p-4 rounded-xl border transition-all ${
                      shippingSpeed === "standard"
                        ? "bg-zinc-950 border-[#CCFF00] ring-1 ring-[#CCFF00]"
                        : "bg-zinc-950/50 border-zinc-800 hover:border-zinc-700"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-xs uppercase text-white">Standard Delivery</span>
                      <span className="text-xs font-mono text-emerald-400 font-bold">
                        {baseShipping === 0 ? "FREE" : `₹${baseShipping}`}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-400 leading-relaxed">
                      Estimated 3–5 business days across 19,000+ PIN codes.
                    </p>
                  </div>

                  <div
                    onClick={() => setShippingSpeed("express")}
                    className={`cursor-pointer p-4 rounded-xl border transition-all ${
                      shippingSpeed === "express"
                        ? "bg-zinc-950 border-[#CCFF00] ring-1 ring-[#CCFF00]"
                        : "bg-zinc-950/50 border-zinc-800 hover:border-zinc-700"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-xs uppercase text-white flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#CCFF00]" />
                        <span>Air Priority Express</span>
                      </span>
                      <span className="text-xs font-mono text-[#CCFF00] font-bold">
                        ₹{baseShipping + 99}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-400 leading-relaxed">
                      Next-day or 48-hour delivery with temperature-controlled packaging.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 3: Payment Method (Designated Demo Mode) */}
              <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#CCFF00]/10 text-[#CCFF00] font-mono font-bold flex items-center justify-center text-xs">
                      3
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-white tracking-wide">
                        Payment Selection (Demo Simulation)
                      </h2>
                      <p className="text-xs text-zinc-400">Zero real transaction required for evaluation</p>
                    </div>
                  </div>
                  <CreditCard className="w-5 h-5 text-zinc-500" />
                </div>

                <div className="space-y-3">
                  <div
                    onClick={() => setPaymentMethod("upi")}
                    className={`cursor-pointer p-4 rounded-xl border flex items-center justify-between transition-all ${
                      paymentMethod === "upi"
                        ? "bg-zinc-950 border-[#CCFF00] ring-1 ring-[#CCFF00]"
                        : "bg-zinc-950/50 border-zinc-800 hover:border-zinc-700"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                        <QrCode className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">Demo UPI / QR Code (Recommended)</div>
                        <div className="text-[11px] text-zinc-400">Google Pay, PhonePe, Paytm, BHIM instant simulation</div>
                      </div>
                    </div>
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded font-mono">
                      INSTANT VERIFY
                    </span>
                  </div>

                  <div
                    onClick={() => setPaymentMethod("cod")}
                    className={`cursor-pointer p-4 rounded-xl border flex items-center justify-between transition-all ${
                      paymentMethod === "cod"
                        ? "bg-zinc-950 border-[#CCFF00] ring-1 ring-[#CCFF00]"
                        : "bg-zinc-950/50 border-zinc-800 hover:border-zinc-700"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                        <Truck className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">Cash on Delivery (Demo COD)</div>
                        <div className="text-[11px] text-zinc-400">Pay cash upon verified delivery at doorstep</div>
                      </div>
                    </div>
                    <span className="text-[10px] bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded font-mono">
                      PAY ON DELIVERY
                    </span>
                  </div>

                  <div
                    onClick={() => setPaymentMethod("card")}
                    className={`cursor-pointer p-4 rounded-xl border flex items-center justify-between transition-all ${
                      paymentMethod === "card"
                        ? "bg-zinc-950 border-[#CCFF00] ring-1 ring-[#CCFF00]"
                        : "bg-zinc-950/50 border-zinc-800 hover:border-zinc-700"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
                        <CreditCard className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">Debit / Credit Card & NetBanking</div>
                        <div className="text-[11px] text-zinc-400">Visa, Mastercard, RuPay, HDFC, ICICI, SBI</div>
                      </div>
                    </div>
                    <span className="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded font-mono">
                      DEMO CARDS
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl flex items-start gap-2.5 text-xs text-zinc-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    No actual financial transaction will take place. Clicking &ldquo;Place Demo Order&rdquo; will generate an authentic tracking ID and invoice receipt stored in your local account.
                  </span>
                </div>
              </div>
            </div>

            {/* Right 5 Cols: Order Summary Sidebar */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 space-y-5 sticky top-20">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                  <h3 className="font-bold text-sm uppercase text-white tracking-wide">
                    Order Summary ({items.length} items)
                  </h3>
                  <Link href="/concepts" className="text-[11px] text-[#CCFF00] hover:underline font-mono">
                    Edit Cart
                  </Link>
                </div>

                {/* Items list */}
                <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-lg bg-zinc-950 border border-zinc-800 overflow-hidden shrink-0">
                          <SafeImage
                            src={item.image}
                            alt={item.productName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-bold text-white line-clamp-1">{item.productName}</div>
                          <div className="text-[10px] text-zinc-500 font-mono">
                            {item.packSizeTitle} × {item.quantity}
                          </div>
                        </div>
                      </div>
                      <div className="font-mono text-zinc-300 font-bold shrink-0">
                        ₹{item.price * item.quantity}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Promo Coupon Form */}
                <div className="pt-2 border-t border-zinc-800">
                  {appliedCoupon ? (
                    <div className="p-2.5 bg-emerald-950/40 border border-emerald-500/30 rounded-xl flex items-center justify-between text-xs text-emerald-400">
                      <div className="flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5" />
                        <span>Code &apos;{appliedCoupon}&apos; applied (-₹{couponDiscount})</span>
                      </div>
                      <button
                        type="button"
                        onClick={removeCoupon}
                        className="text-[11px] text-zinc-400 hover:text-white underline"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={promoCodeInput}
                          onChange={(e) => setPromoCodeInput(e.target.value.toUpperCase())}
                          placeholder="Coupon (e.g. PEACHY15)"
                          className="bg-zinc-950 border border-zinc-800 text-xs px-3 py-2 rounded-xl text-white outline-none focus:border-[#CCFF00] w-full font-mono uppercase"
                        />
                        <button
                          type="button"
                          onClick={handleApplyPromo}
                          className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-mono font-bold rounded-xl transition-colors"
                        >
                          Apply
                        </button>
                      </div>
                      {promoMessage && (
                        <p
                          className={`text-[11px] font-mono ${
                            promoMessage.isError ? "text-rose-400" : "text-emerald-400"
                          }`}
                        >
                          {promoMessage.text}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Pricing Breakdown */}
                <div className="border-t border-zinc-800 pt-3 space-y-2 text-xs font-mono text-zinc-400">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-white font-bold">₹{subtotal}</span>
                  </div>
                  {couponDiscount > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Coupon Discount</span>
                      <span>-₹{couponDiscount}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-white font-bold">
                      {shippingFee === 0 ? (
                        <span className="text-emerald-400 font-semibold">FREE (Over ₹499)</span>
                      ) : (
                        `₹${shippingFee}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated GST (5%)</span>
                    <span className="text-white font-bold">₹{tax}</span>
                  </div>
                  <div className="border-t border-zinc-800 pt-3 flex justify-between text-base font-bold text-white">
                    <span>Grand Total</span>
                    <span className="text-[#CCFF00]">₹{totalPayable}</span>
                  </div>
                </div>

                {/* Submit Place Order Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-[#CCFF00] hover:bg-white text-black font-mono font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(204,255,0,0.3)] disabled:opacity-50"
                >
                  <span>{isSubmitting ? "PROCESSING DEMO DISPATCH..." : "PLACE DEMO ORDER"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="text-center text-[10px] text-zinc-500 font-mono">
                  FSSAI Compliant Logistics • Pan-India Courier Network
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
