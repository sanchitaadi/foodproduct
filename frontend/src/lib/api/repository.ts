import { PackagedFoodProduct, IndianFoodCategory } from "@/types/products";
import { BrandConceptId } from "@/types/brand";
import { SHARED_INDIAN_PRODUCTS, PRODUCT_CATEGORIES } from "@/lib/catalog/products";
import { CatalogService } from "./services";
import { API_CONFIG } from "./config";

export interface ProductFilters {
  categorySlug?: string;
  brandConceptId?: BrandConceptId;
  searchQuery?: string;
  sortBy?: "featured" | "price-asc" | "price-desc" | "rating";
}

/**
 * PRODUCT REPOSITORY (Data Access Abstraction)
 * Decouples Next.js UI components from direct data sources.
 * Seamlessly interfaces with PHP REST API + MySQL with automatic fallback to local demo data.
 */
export const ProductRepository = {
  async getAllProducts(filters?: ProductFilters): Promise<PackagedFoodProduct[]> {
    let items: PackagedFoodProduct[] = [];

    if (!API_CONFIG.isDemoMode) {
      try {
        items = await CatalogService.getProducts({
          category: filters?.categorySlug,
          brand: filters?.brandConceptId,
          search: filters?.searchQuery,
        });
      } catch (err) {
        console.warn("[ProductRepository] Remote PHP API unavailable, using local catalogue fallback:", err);
        items = SHARED_INDIAN_PRODUCTS;
      }
    } else {
      items = [...SHARED_INDIAN_PRODUCTS];
    }

    // Apply filtering
    if (filters?.categorySlug) {
      items = items.filter((p) => p.categorySlug === filters.categorySlug);
    }

    if (filters?.brandConceptId) {
      const targetId = filters.brandConceptId;
      const isMatch = (featured?: string) => {
        if (!featured) return false;
        if (featured === targetId) return true;
        if (targetId === "flavourverse" && (featured === "flavourverse" || featured === "concept-a-flavourverse")) return true;
        if (targetId === "purepantry" && (featured === "purepantry" || featured === "pure-pantry" || featured === "concept-b-purepantry")) return true;
        if (targetId === "snackattack" && (featured === "snackattack" || featured === "snack-attack" || featured === "concept-c-snackattack")) return true;
        return false;
      };

      // In multi-brand storefront, each brand features specific hero items and carries the full Indian catalog
      // Products with matched featuredConceptId are prioritized
      items = [...items].sort((a, b) => {
        if (isMatch(a.featuredConceptId) && !isMatch(b.featuredConceptId)) return -1;
        if (!isMatch(a.featuredConceptId) && isMatch(b.featuredConceptId)) return 1;
        return 0;
      });
    }

    if (filters?.searchQuery) {
      const q = filters.searchQuery.toLowerCase().trim();
      items = items.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.tastingNotes.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Apply sorting
    if (filters?.sortBy === "price-asc") {
      items.sort((a, b) => a.packSizes[0].priceInr - b.packSizes[0].priceInr);
    } else if (filters?.sortBy === "price-desc") {
      items.sort((a, b) => b.packSizes[0].priceInr - a.packSizes[0].priceInr);
    } else if (filters?.sortBy === "rating") {
      items.sort((a, b) => b.rating - a.rating);
    }

    return items;
  },

  async getProductBySlug(slug: string): Promise<PackagedFoodProduct | null> {
    if (!API_CONFIG.isDemoMode) {
      try {
        const item = await CatalogService.getProductBySlug(slug);
        if (item) return item;
      } catch (err) {
        console.warn("[ProductRepository] Remote fetch failed, falling back to local dataset:", err);
      }
    }

    const match = SHARED_INDIAN_PRODUCTS.find((p) => p.slug === slug);
    return match || null;
  },

  async getCategories(): Promise<IndianFoodCategory[]> {
    if (!API_CONFIG.isDemoMode) {
      try {
        const categories = await CatalogService.getCategories();
        if (categories && categories.length > 0) return categories;
      } catch (err) {
        console.warn("[ProductRepository] Remote categories fetch failed, using local categories:", err);
      }
    }

    return PRODUCT_CATEGORIES;
  },

  async getCategoryBySlug(slug: string): Promise<IndianFoodCategory | null> {
    const categories = await this.getCategories();
    return categories.find((c) => c.slug === slug) || null;
  },
};
