"use client";

import React, { useEffect, useState } from "react";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { DEMO_PRODUCTS, DemoProduct } from "@/lib/demo-catalog";
import ProductCard from "@/components/common/ProductCard";
import { Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

interface RecentlyViewedSectionProps {
  concept: "flavourverse" | "purepantry" | "snackattack";
  title?: string;
  subtitle?: string;
}

export default function RecentlyViewedSection({
  concept,
  title = "Recently Explored Provisions",
  subtitle = "Quickly revisit items you inspected during this tasting session.",
}: RecentlyViewedSectionProps) {
  const { viewedIds } = useRecentlyViewed();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || viewedIds.length === 0) return null;

  const products = DEMO_PRODUCTS.filter((p) => viewedIds.includes(p.id)).slice(0, 4);
  if (products.length === 0) return null;

  const conceptPath =
    concept === "flavourverse"
      ? "concept-a-flavourverse"
      : concept === "purepantry"
      ? "concept-b-purepantry"
      : "concept-c-snackattack";

  return (
    <section
      className={`py-20 px-6 border-b ${
        concept === "flavourverse"
          ? "bg-[#180A16] border-[#3D2439] text-[#FFF4E8]"
          : concept === "purepantry"
          ? "bg-white border-[#E3E8DC] text-[#1E3A2F]"
          : "bg-white border-b-4 border-black text-black"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest opacity-70 mb-2">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Personalized Tasting Log</span>
            </div>
            <h2
              className={`text-2xl sm:text-4xl font-bold uppercase tracking-tight ${
                concept === "flavourverse"
                  ? "font-serif text-white"
                  : concept === "purepantry"
                  ? "font-serif text-[#1E3A2F]"
                  : "font-black"
              }`}
            >
              {title}
            </h2>
            <p className="text-xs font-mono opacity-70 mt-1 max-w-md">{subtitle}</p>
          </div>

          <Link
            href={`/${conceptPath}/shop`}
            className="text-xs font-mono uppercase tracking-wider font-bold hover:underline inline-flex items-center gap-1.5 opacity-80 hover:opacity-100"
          >
            <span>Explore All 12 Provisions</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} concept={concept} />
          ))}
        </div>
      </div>
    </section>
  );
}
