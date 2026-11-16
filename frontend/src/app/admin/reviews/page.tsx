"use client";

import React, { useState } from "react";
import { useAdminStore } from "@/lib/admin/adminStore";
import { Star, CheckCircle, XCircle, Trash2, Filter } from "lucide-react";

export default function AdminReviewsPage() {
  const { reviews, approveReview, rejectReview, deleteReview } = useAdminStore();

  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [ratingFilter, setRatingFilter] = useState<string>("all");

  const filteredReviews = reviews.filter((r) => {
    const matchesStatus = statusFilter === "all" || r.status === statusFilter;
    const matchesRating = ratingFilter === "all" || r.rating.toString() === ratingFilter;
    return matchesStatus && matchesRating;
  });

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-white tracking-wide">
            Customer Reviews & Tasting Notes Moderation
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Moderate consumer feedback across Flavourverse, Pure & Pantry, and Snack Attack provisions.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-[#0F172A] border border-slate-800 rounded-xl px-3 py-2 text-white"
        >
          <option value="all">All Moderation Statuses ({reviews.length})</option>
          <option value="pending">Pending Approval</option>
          <option value="approved">Approved & Published</option>
          <option value="rejected">Rejected / Hidden</option>
        </select>

        <select
          value={ratingFilter}
          onChange={(e) => setRatingFilter(e.target.value)}
          className="bg-[#0F172A] border border-slate-800 rounded-xl px-3 py-2 text-white"
        >
          <option value="all">All Star Ratings</option>
          <option value="5">5 Stars</option>
          <option value="4">4 Stars</option>
          <option value="3">3 Stars</option>
        </select>
      </div>

      {/* Reviews Table */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono min-w-[700px]">
            <thead className="bg-slate-900/80 border-b border-slate-800 text-slate-400 uppercase text-[10px]">
              <tr>
                <th className="py-3 px-4">Food Provision</th>
                <th className="py-3 px-4">Patron Author</th>
                <th className="py-3 px-4">Score</th>
                <th className="py-3 px-4">Review Text</th>
                <th className="py-3 px-4">Moderation</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredReviews.map((rev) => (
                <tr key={rev.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-white font-sans">{rev.productName}</td>
                  <td className="py-3 px-4 text-slate-300">
                    <div>{rev.authorName}</div>
                    <div className="text-[10px] text-slate-500">{rev.createdAt.slice(0, 10)}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center text-amber-400">
                      {"★".repeat(rev.rating)}
                      {"☆".repeat(5 - rev.rating)}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-300 max-w-sm">
                    <p className="line-clamp-2 leading-relaxed">{rev.comment}</p>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`text-[9px] px-2 py-0.5 rounded uppercase font-bold ${
                        rev.status === "approved"
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : rev.status === "pending"
                          ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                          : "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                      }`}
                    >
                      {rev.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right space-x-1.5">
                    {rev.status !== "approved" && (
                      <button
                        onClick={() => approveReview(rev.id)}
                        className="px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500 hover:text-black text-emerald-300 transition-colors"
                        title="Approve & Publish to Storefront"
                      >
                        Approve
                      </button>
                    )}
                    {rev.status !== "rejected" && (
                      <button
                        onClick={() => rejectReview(rev.id)}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-rose-500 hover:text-white text-rose-400 transition-colors"
                        title="Reject Review"
                      >
                        Reject
                      </button>
                    )}
                    <button
                      onClick={() => deleteReview(rev.id)}
                      className="p-1 rounded-lg bg-slate-800 hover:bg-rose-500 hover:text-white text-rose-400 transition-colors"
                      title="Permanently Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
