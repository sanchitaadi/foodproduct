/**
 * SHARED PACKAGED FOOD CATALOG TYPES
 * Realistic Indian Packaged Food Modeling with FSSAI, GST, HSN, and Nutrition specifications.
 * All entries are strictly marked as FICTIONAL DEMO PRODUCTS for design system demonstration.
 */

export interface PackSizeOption {
  id: string;
  weightGrams: number;
  label: string; // e.g. "85g Standard Pouch", "200g Party Pack", "500g Jar"
  priceInr: number;
  compareAtPriceInr?: number;
  sku: string;
  inStock: boolean;
  stockCount: number;
}

export interface NutritionFactsTable {
  servingSize: string; // e.g. "30g (approx. 1 bowl)"
  servingsPerPack: number;
  energyKcal: number;
  proteinG: number;
  totalCarbsG: number;
  dietaryFiberG: number;
  totalSugarsG: number;
  addedSugarsG: number;
  totalFatG: number;
  saturatedFatG: number;
  transFatG: number;
  sodiumMg: number;
  cholesterolMg: number;
}

export interface StatutoryCompliance {
  isFictionalDemo: true;
  fssaiLicenseNumber: string; // Fictional demo FSSAI format
  hsnCode: string; // Indian HSN code (e.g. "1905", "2008")
  gstRatePercent: number; // 5%, 12%, or 18%
  countryOfOrigin: "India";
  vegetarianClassification: "100% Vegetarian" | "Contains Egg" | "Vegan";
  shelfLifeMonths: number;
  storageInstructions: string;
  manufacturerName: string;
  manufacturerAddress: string;
  disclaimer: string;
}

export interface IndianFoodCategory {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  iconName: string;
}

export interface PackagedFoodProduct {
  id: string;
  slug: string;
  name: string;
  hindiName?: string; // e.g. "मसाला चिप्स", "पेरी पेरी मखाना"
  categorySlug: string;
  categoryName: string;
  subtitle: string;
  shortDescription: string;
  longDescription: string;
  tastingNotes: string[];
  ingredientsList: string;
  allergenAdvice: string;
  isBestseller?: boolean;
  isNewLaunch?: boolean;
  isLimitedDrop?: boolean;
  featuredConceptId?: string;
  rating: number;
  reviewCount: number;
  primaryImage: string;
  galleryImages: string[];
  packSizes: PackSizeOption[];
  nutrition: NutritionFactsTable;
  compliance: StatutoryCompliance;
  brandVibes: {
    snackAttackBadge?: string; // e.g. "10/10 SPICE BOMBER"
    goodMoodNote?: string; // e.g. "Slow Stone-Ground & Mindfully Roasted"
    crunchCultCode?: string; // e.g. "SYS_ITEM_09 // CRUNCH_RATING_98"
    happyCravingsDoodle?: string; // e.g. "Super Crunchy Yum Yum! ✨"
    flavourverseEditorial?: string;
    purePantryWellness?: string;
  };
}
