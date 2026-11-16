"use client";

import React from "react";
import Link from "next/link";
import MegaMenuHeader from "@/components/common/MegaMenuHeader";
import NewsletterSection from "@/components/common/NewsletterSection";
import { ConceptKey, getConceptTheme } from "./conceptTheme";
import { ArrowLeft, Sparkles, Eye } from "lucide-react";
import SafeImage from "@/components/common/SafeImage";

export default function ConceptGalleryPage({ concept }: { concept: ConceptKey }) {
  const theme = getConceptTheme(concept);

  const galleryItems = [
    {
      title: "Single-Estate Malabar Harvest",
      caption: "Single-origin cacao pods fermented in wooden troughs across Idukki, Kerala.",
      src: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Wild Mountain Walnuts",
      caption: "High-altitude jumbo walnut orchards along the Kashmir Himalayan belt.",
      src: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Slow-Roasted Mamra Almonds",
      caption: "Cold-pan dry roasted with Himalayan pink crystal salt.",
      src: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Prebiotic White Peach Soda",
      caption: "Sparkling botanical infusion with cold-pressed peach puree.",
      src: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Ancient Grains & Millet Crisps",
      caption: "Popped heritage sorghum seasoned with cold-pressed stone mustard oil.",
      src: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Maple Pecan Superfood Granola",
      caption: "Slow-baked rolled oats with organic amber maple reduction.",
      src: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <div className={`min-h-screen flex flex-col ${theme.bgClass}`}>
      <MegaMenuHeader concept={concept} />

      {/* Banner */}
      <section className={`py-16 px-4 sm:px-6 lg:px-8 ${theme.bannerClass}`}>
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <Link
            href={theme.basePath}
            className="inline-flex items-center gap-1.5 text-xs font-mono opacity-70 hover:opacity-100 mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to {theme.name}</span>
          </Link>
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase ${theme.badgeClass}`}>
            <span>Visual Sensory Archives</span>
          </div>
          <h1 className={`text-4xl sm:text-6xl font-bold tracking-tight ${theme.fontClass}`}>
            The Culinary Gallery
          </h1>
          <p className="text-base opacity-85 max-w-xl mx-auto">
            A visual documentation of our smallholder sourcing, harvest estates, and pristine packaged provisions.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryItems.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl overflow-hidden border border-current/15 bg-white/5 p-3 flex flex-col justify-between group hover:shadow-2xl transition-all"
            >
              <div className="relative aspect-video rounded-xl overflow-hidden mb-4 bg-black/20">
                <SafeImage
                  src={item.src}
                  alt={item.title}
                  concept={concept}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="px-2 pb-2">
                <h3 className="font-bold text-base font-serif mb-1">{item.title}</h3>
                <p className="text-xs opacity-70 font-sans leading-relaxed">{item.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <NewsletterSection concept={concept} />
    </div>
  );
}
