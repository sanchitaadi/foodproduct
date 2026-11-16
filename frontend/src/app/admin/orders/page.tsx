"use client";

import React, { useState } from "react";
import { useAdminStore, AdminOrder } from "@/lib/admin/adminStore";
import {
  Truck,
  Search,
  Filter,
  FileText,
  Printer,
  X,
  CheckCircle,
  Clock,
  ArrowRight,
  Package,
  MapPin,
  Ban,
  ExternalLink,
} from "lucide-react";

export default function AdminOrdersPage() {
  const { orders, updateOrderStatus, assignCourier, cancelOrder, addOrderInternalNote } = useAdminStore();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [conceptFilter, setConceptFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);

  // Fulfillment Drawer Inputs
  const [courierInput, setCourierInput] = useState("Delhivery Air Express");
  const [awbInput, setAwbInput] = useState("");
  const [trackingUrlInput, setTrackingUrlInput] = useState("");
  const [noteInput, setNoteInput] = useState("");

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.customerEmail.toLowerCase().includes(search.toLowerCase()) ||
      (o.awbCode && o.awbCode.toLowerCase().includes(search.toLowerCase()));
    const matchesStatus = statusFilter === "all" || o.orderStatus === statusFilter;
    const matchesConcept = conceptFilter === "all" || o.concept === conceptFilter;
    return matchesSearch && matchesStatus && matchesConcept;
  });

  const handleOpenDetail = (order: AdminOrder) => {
    setSelectedOrder(order);
    setCourierInput(order.courierName || "Delhivery Air Express");
    setAwbInput(order.awbCode || "");
    setTrackingUrlInput(order.trackingUrl || "");
    setNoteInput(order.internalNotes || "");
  };

  const handleSaveFulfillment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder) return;

    if (awbInput.trim()) {
      assignCourier(
        selectedOrder.id,
        courierInput,
        awbInput.trim(),
        trackingUrlInput || `https://track.courier.in/${awbInput.trim()}`
      );
    }
    if (noteInput.trim()) {
      addOrderInternalNote(selectedOrder.id, noteInput.trim());
    }

    // Refresh selected order view
    const updated = useAdminStore.getState().orders.find((o) => o.id === selectedOrder.id);
    setSelectedOrder(updated || null);
  };

  const handleCancel = () => {
    if (!selectedOrder) return;
    if (confirm(`Cancel Order ${selectedOrder.id}? Reserved inventory will be automatically restored to warehouse.`)) {
      cancelOrder(selectedOrder.id, "Cancelled by Admin in Dispatch Console");
      const updated = useAdminStore.getState().orders.find((o) => o.id === selectedOrder.id);
      setSelectedOrder(updated || null);
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-white tracking-wide">
            Consignment Dispatch & Order Management
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Track customer orders across Flavourverse, Pure & Pantry, and Snack Attack with courier AWB generation.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between items-stretch sm:items-center text-xs font-mono">
        <div className="relative flex-1 max-w-sm">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Order ID, Customer, or AWB..."
            className="w-full bg-[#0F172A] border border-slate-800 rounded-xl px-4 py-2.5 text-white text-xs placeholder:text-slate-500"
          />
          <Search className="w-4 h-4 text-slate-500 absolute right-3 top-3" />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={conceptFilter}
            onChange={(e) => setConceptFilter(e.target.value)}
            className="bg-[#0F172A] border border-slate-800 rounded-xl px-3 py-2 text-white text-xs font-mono"
          >
            <option value="all">All 3 Concepts</option>
            <option value="flavourverse">Concept 1: Flavourverse</option>
            <option value="purepantry">Concept 2: Pure & Pantry</option>
            <option value="snackattack">Concept 3: Snack Attack</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#0F172A] border border-slate-800 rounded-xl px-3 py-2 text-white text-xs font-mono"
          >
            <option value="all">All Statuses ({orders.length})</option>
            <option value="placed">Placed</option>
            <option value="packed">Packed</option>
            <option value="dispatched">Dispatched</option>
            <option value="in_transit">In Transit</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono min-w-[800px]">
            <thead className="bg-slate-900/80 border-b border-slate-800 text-slate-400 uppercase text-[10px]">
              <tr>
                <th className="py-3 px-4">Order ID & Date</th>
                <th className="py-3 px-4">Concept</th>
                <th className="py-3 px-4">Customer & City</th>
                <th className="py-3 px-4">Items</th>
                <th className="py-3 px-4">Carrier & AWB</th>
                <th className="py-3 px-4 text-right">Grand Total</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-bold text-amber-300">{ord.id}</div>
                    <div className="text-[10px] text-slate-500">{ord.createdAt.slice(0, 10)}</div>
                  </td>

                  <td className="py-3 px-4">
                    <span
                      className={`text-[9px] px-2 py-0.5 rounded font-mono font-bold uppercase ${
                        ord.concept === "flavourverse"
                          ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                          : ord.concept === "purepantry"
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                          : "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
                      }`}
                    >
                      {ord.concept}
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    <div className="font-bold text-white">{ord.customerName}</div>
                    <div className="text-[10px] text-slate-400">
                      {ord.shippingAddress.city} ({ord.shippingAddress.pincode})
                    </div>
                  </td>

                  <td className="py-3 px-4 text-slate-300">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-200">
                      {ord.items.length} Provisions
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    {ord.awbCode ? (
                      <div>
                        <div className="text-white font-bold">{ord.courierName}</div>
                        <div className="text-[10px] text-amber-400">AWB: {ord.awbCode}</div>
                      </div>
                    ) : (
                      <span className="text-[10px] text-slate-500 italic">Pending Courier</span>
                    )}
                  </td>

                  <td className="py-3 px-4 text-right font-bold text-white text-sm">
                    ₹{ord.total.toFixed(2)}
                  </td>

                  <td className="py-3 px-4">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                        ord.orderStatus === "delivered"
                          ? "bg-emerald-500/20 text-emerald-400"
                          : ord.orderStatus === "cancelled"
                          ? "bg-rose-500/20 text-rose-400"
                          : ord.orderStatus === "in_transit"
                          ? "bg-blue-500/20 text-blue-400"
                          : "bg-amber-500/20 text-amber-300"
                      }`}
                    >
                      {ord.orderStatus}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleOpenDetail(ord)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-amber-500 hover:text-black text-amber-400 transition-colors font-bold text-[11px]"
                    >
                      Fulfill &rarr;
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================
          ORDER DETAIL & FULFILLMENT MODAL / DRAWER
          ======================================================== */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-[#0F172A] border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 my-8 max-h-[90vh] overflow-y-auto">
            {/* Top Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold font-serif text-white">Order {selectedOrder.id}</h3>
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-mono font-bold uppercase">
                    {selectedOrder.concept}
                  </span>
                </div>
                <div className="text-xs text-slate-400 font-mono mt-0.5">
                  Placed on {selectedOrder.createdAt.slice(0, 10)} • Payment: {selectedOrder.paymentStatus}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsInvoiceOpen(true)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-bold flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>GST Invoice</span>
                </button>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Customer & Address Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500">Customer Patron</span>
                <div className="text-white font-bold text-sm mt-1">{selectedOrder.customerName}</div>
                <div className="text-slate-400">{selectedOrder.customerEmail}</div>
                <div className="text-slate-400">{selectedOrder.customerPhone}</div>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500">Shipping Destination</span>
                <div className="text-white mt-1">{selectedOrder.shippingAddress.street}</div>
                <div className="text-slate-300">
                  {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} -{" "}
                  {selectedOrder.shippingAddress.pincode}
                </div>
                <div className="text-slate-500">Phone: {selectedOrder.shippingAddress.phone}</div>
              </div>
            </div>

            {/* Line Items */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                Ordered Food Provisions
              </h4>
              <div className="divide-y divide-slate-800/80 border border-slate-800 rounded-xl overflow-hidden bg-slate-900/40">
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="p-3 flex items-center justify-between text-xs font-mono">
                    <div>
                      <div className="font-bold text-white font-sans">{item.productName}</div>
                      <div className="text-[10px] text-slate-400">
                        {item.packSizeTitle} • SKU: {item.sku}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-white">
                        {item.quantity} × ₹{item.price} = ₹{item.price * item.quantity}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Calculation */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono space-y-1.5">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal:</span>
                  <span>₹{selectedOrder.subtotal.toFixed(2)}</span>
                </div>
                {selectedOrder.discount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount ({selectedOrder.couponCode || "PROMO"}):</span>
                    <span>-₹{selectedOrder.discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-400">
                  <span>GST Tax (5% FSSAI):</span>
                  <span>₹{selectedOrder.gstAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Shipping:</span>
                  <span>{selectedOrder.shippingFee === 0 ? "FREE" : `₹${selectedOrder.shippingFee}`}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-slate-800">
                  <span>Grand Total Payable:</span>
                  <span className="text-amber-400">₹{selectedOrder.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Fulfillment Actions Form */}
            <form onSubmit={handleSaveFulfillment} className="space-y-4 text-xs font-mono p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="font-bold text-white uppercase tracking-wider text-[11px] flex items-center gap-2">
                <Truck className="w-4 h-4 text-amber-400" />
                <span>Logistics Dispatch Assignment</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Carrier Partner</label>
                  <select
                    value={courierInput}
                    onChange={(e) => setCourierInput(e.target.value)}
                    className="w-full bg-[#1A2338] border border-slate-700 rounded-xl px-3 py-2 text-white"
                  >
                    <option value="Delhivery Air Express">Delhivery Air Express</option>
                    <option value="Blue Dart Apex">Blue Dart Apex</option>
                    <option value="DTDC Priority">DTDC Priority</option>
                    <option value="Xpressbees Prime">Xpressbees Prime</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Waybill (AWB) Code</label>
                  <input
                    type="text"
                    value={awbInput}
                    onChange={(e) => setAwbInput(e.target.value)}
                    placeholder="e.g. DEL849201948"
                    className="w-full bg-[#1A2338] border border-slate-700 rounded-xl px-3 py-2 text-white font-bold"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Status Progression</label>
                  <select
                    value={selectedOrder.orderStatus}
                    onChange={(e) => updateOrderStatus(selectedOrder.id, e.target.value as any)}
                    className="w-full bg-[#1A2338] border border-slate-700 rounded-xl px-3 py-2 text-white font-bold"
                  >
                    <option value="placed">Placed</option>
                    <option value="verified">Verified</option>
                    <option value="packed">Packed</option>
                    <option value="dispatched">Dispatched</option>
                    <option value="in_transit">In Transit</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Internal Warehouse Note</label>
                <input
                  type="text"
                  value={noteInput}
                  onChange={(e) => setNoteInput(e.target.value)}
                  placeholder="e.g. Batch #042 sealed with thermal wrap"
                  className="w-full bg-[#1A2338] border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-3.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold"
                >
                  Cancel Order & Release Stock
                </button>

                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold uppercase"
                >
                  Save Dispatch Updates
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          PRINTABLE GST TAX INVOICE MODAL
          ======================================================== */}
      {isInvoiceOpen && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white text-black p-8 rounded-2xl shadow-2xl font-mono text-xs my-8 max-h-[90vh] overflow-y-auto print:p-0">
            <div className="flex justify-between items-start border-b pb-4 mb-4">
              <div>
                <h2 className="text-xl font-serif font-black tracking-wide">PEACHY PLATE FOODS</h2>
                <p className="text-[10px] text-slate-600">Peachy Plate Gourmet Retail Pvt Ltd</p>
                <p className="text-[10px] text-slate-600">FSSAI Central Lic: 10021011000428</p>
                <p className="text-[10px] text-slate-600">GSTIN: 07AAAAA0000A1Z5</p>
              </div>
              <div className="text-right">
                <div className="text-base font-bold">TAX INVOICE</div>
                <div className="text-slate-600">Inv #: INV-{selectedOrder.id}</div>
                <div className="text-slate-600">Date: {selectedOrder.createdAt.slice(0, 10)}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pb-4 border-b text-[11px] mb-4">
              <div>
                <strong className="block text-slate-700">Billed & Shipped To:</strong>
                <div>{selectedOrder.customerName}</div>
                <div>{selectedOrder.shippingAddress.street}</div>
                <div>
                  {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} -{" "}
                  {selectedOrder.shippingAddress.pincode}
                </div>
                <div>Phone: {selectedOrder.shippingAddress.phone}</div>
              </div>
              <div className="text-right">
                <strong className="block text-slate-700">Dispatch Details:</strong>
                <div>Carrier: {selectedOrder.courierName || "Delhivery Air"}</div>
                <div>AWB: {selectedOrder.awbCode || "PENDING"}</div>
                <div>Concept: {selectedOrder.concept.toUpperCase()}</div>
              </div>
            </div>

            <div className="overflow-x-auto mb-4">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-black text-slate-700">
                    <th className="py-2">Item</th>
                    <th className="py-2">Pack</th>
                    <th className="py-2 text-right">Qty</th>
                    <th className="py-2 text-right">Price</th>
                    <th className="py-2 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {selectedOrder.items.map((i, idx) => (
                    <tr key={idx}>
                      <td className="py-2 font-bold font-sans">{i.productName}</td>
                      <td className="py-2">{i.packSizeTitle}</td>
                      <td className="py-2 text-right">{i.quantity}</td>
                      <td className="py-2 text-right">₹{i.price.toFixed(2)}</td>
                      <td className="py-2 text-right font-bold">₹{(i.price * i.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end pt-2 border-t border-black mb-6">
              <div className="w-64 space-y-1 text-right">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>₹{selectedOrder.subtotal.toFixed(2)}</span>
                </div>
                {selectedOrder.discount > 0 && (
                  <div className="flex justify-between text-green-700">
                    <span>Discount:</span>
                    <span>-₹{selectedOrder.discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>GST (5%):</span>
                  <span>₹{selectedOrder.gstAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold border-t border-black pt-1">
                  <span>Total (INR):</span>
                  <span>₹{selectedOrder.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-300">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-black text-white font-bold rounded-lg uppercase text-xs"
              >
                Print / Save PDF
              </button>
              <button
                onClick={() => setIsInvoiceOpen(false)}
                className="px-4 py-2 bg-slate-200 text-slate-800 font-bold rounded-lg text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
