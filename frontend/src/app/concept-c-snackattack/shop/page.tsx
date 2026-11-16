"use client";

import React, { useState, useEffect } from "react";
import { ProductRepository } from "@/lib/api/repository";
import { PackagedFoodProduct, IndianFoodCategory } from "@/types/products";
import { SnackProductCard } from "@/components/brands/snack-attack/SnackProductCard";
import { Search, SlidersHorizontal, Flame, PackageSearch } from "lucide-react";
import { BrandLoader } from "@/components/animation/BrandLoader";

export default function SnackAttackShopPage() {
  const [products, setProducts] = useState<PackagedFoodProduct[]>([]);
  const [categories, setCategories] = useState<IndianFoodCategory[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const [allProds, allCats] = await Promise.all([
        ProductRepository.getAllProducts({
          categorySlug: activeCategory === "all" ? undefined : activeCategory,
          searchQuery: searchQuery || undefined,
          sortBy,
          brandConceptId: "snack-attack",
        }),
        ProductRepository.getCategories(),
      ]);
      setProducts(allProds);
      setCategories(allCats);
      setLoading(false);
    }
    fetchData();
  }, [activeCategory, searchQuery, sortBy]);

  return (
    <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-12 w-full">
      {/* Header */}
      <div className="bg-[#FF5400] text-black border-4 border-black p-8 rounded-3xl shadow-[6px_6px_0px_#000] mb-10">
        <div className="inline-block bg-[#FFD60A] text-black font-black text-xs uppercase px-3 py-1 border-2 border-black rotate-[-2deg] mb-3">
          COMPLETE INDIAN MUNCHIE ARSENAL
        </div>
        <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white drop-shadow-[3px_3px_0px_#000]">
          SHOP ALL SNACKS
        </h1>
        <p className="text-sm sm:text-base font-bold text-black mt-2 max-w-xl">
          Everything from spicy Ratlami sev to kettle chips and dark chocolates. All priced in INR with free pan-India shipping over ₹499.
        </p>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="bg-white border-3 border-black rounded-2xl p-4 shadow-[4px_4px_0px_#000] mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search masala chips, makhana, cookies..."
              className="w-full pl-9 pr-4 py-2 border-2 border-black rounded-xl text-xs font-bold text-black outline-none focus:bg-[#FFFDF5]"
            />
          </div>

          {/* Sort selector */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <span className="text-xs font-black uppercase text-neutral-700">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 border-2 border-black rounded-xl text-xs font-black uppercase bg-[#FFD60A] text-black outline-none"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-4 py-1.5 rounded-xl border-2 border-black font-black text-xs uppercase whitespace-nowrap transition-all ${
              activeCategory === "all"
                ? "bg-[#FF5400] text-white shadow-[2px_2px_0px_#000]"
                : "bg-white text-black hover:bg-[#FFD60A]"
            }`}
          >
            All Munchies
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.slug)}
              className={`px-4 py-1.5 rounded-xl border-2 border-black font-black text-xs uppercase whitespace-nowrap transition-all ${
                activeCategory === c.slug
                  ? "bg-[#FF5400] text-white shadow-[2px_2px_0px_#000]"
                  : "bg-white text-black hover:bg-[#FFD60A]"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="py-20">
          <BrandLoader brandId="snack-attack" message="SCOOPING SNACK CATALOG..." />
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <SnackProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-white border-3 border-black rounded-2xl p-12 text-center shadow-[4px_4px_0px_#000]">
          <PackageSearch className="w-12 h-12 mx-auto text-neutral-400 mb-3" />
          <h3 className="font-black text-xl uppercase text-black">NO MUNCHIES FOUND</h3>
          <p className="text-xs text-neutral-600 font-mono mt-1">Try tweaking your search keywords or resetting filters.</p>
          <button
            onClick={() => {
              setActiveCategory("all");
              setSearchQuery("");
            }}
            className="mt-4 px-4 py-2 bg-[#FFD60A] text-black font-black text-xs uppercase border-2 border-black shadow-[2px_2px_0px_#000]"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
