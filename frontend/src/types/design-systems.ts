/**
 * PEACHY PLATE — Design System Contract & Concept Token Definitions
 * Enables pluggable themes while binding to the single shared commerce core.
 */

export type DesignConceptId = "flavourverse" | "pure-pantry" | "snack-attack";

export interface DesignSystemMeta {
  id: DesignConceptId;
  name: string;
  tagline: string;
  routePrefix: string;
  vibeDescription: string;
  designInspirations: string[];
  themeClass: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    textPrimary: string;
    textSecondary: string;
    border: string;
    badgeBg: string;
    badgeText: string;
  };
  typography: {
    headingFontClass: string;
    bodyFontClass: string;
    headingStyleDescription: string;
  };
  cardRadius: string;
  buttonStyleClass: string;
  animationProfile: "cinematic-editorial" | "serene-organic" | "bouncy-pop";
}

export const DESIGN_CONCEPTS: Record<DesignConceptId, DesignSystemMeta> = {
  flavourverse: {
    id: "flavourverse",
    name: "FLAVOURVERSE",
    tagline: "Bold Editorial Food Universe",
    routePrefix: "/concept-a-flavourverse",
    vibeDescription: "High-contrast culinary storytelling, asymmetric layouts, rich plum & saffron tones, dramatic lighting.",
    designInspirations: ["Atmosphere Studio", "The Safari Stitch"],
    themeClass: "theme-flavourverse",
    colors: {
      primary: "#1F0E1C", // Deep Plum
      secondary: "#2A1827", // Card plum
      accent: "#FF9F1C", // Saffron Glow
      background: "#110D09", // Truffle Black
      surface: "#2A1827",
      textPrimary: "#FAF6F0", // Cream
      textSecondary: "#9D889A",
      border: "#3D2439",
      badgeBg: "rgba(255, 159, 28, 0.15)",
      badgeText: "#FF9F1C",
    },
    typography: {
      headingFontClass: "font-flavourverseDisplay",
      bodyFontClass: "font-flavourverseBody",
      headingStyleDescription: "Editorial, high-contrast serif headlines with wide tracking and italic accents.",
    },
    cardRadius: "rounded-editorial",
    buttonStyleClass: "bg-flavourverse-saffron text-flavourverse-truffle font-semibold hover:bg-opacity-90 transition-all duration-300",
    animationProfile: "cinematic-editorial",
  },
  "pure-pantry": {
    id: "pure-pantry",
    name: "PURE & PANTRY",
    tagline: "Modern Organic & Wellness",
    routePrefix: "/concept-b-purepantry",
    vibeDescription: "Warm terracotta & sage, clean botanical lines, transparent ingredient nutrition, calming minimalism.",
    designInspirations: ["Raas Life", "Blute Life"],
    themeClass: "theme-purepantry",
    colors: {
      primary: "#4A5844", // Deep Sage
      secondary: "#C86D51", // Warm Terracotta
      accent: "#C86D51",
      background: "#F7F4EE", // Raw Linen
      surface: "#FFFFFF",
      textPrimary: "#2B2D2F", // Charcoal
      textSecondary: "#7E827A",
      border: "#E2DDD3",
      badgeBg: "#F0F3EE",
      badgeText: "#4A5844",
    },
    typography: {
      headingFontClass: "font-purepantryDisplay",
      bodyFontClass: "font-purepantryBody",
      headingStyleDescription: "Warm, humanist serif headlines paired with spacious, legible sans-serif body copy.",
    },
    cardRadius: "rounded-organic",
    buttonStyleClass: "bg-purepantry-sage text-white font-medium hover:bg-opacity-95 shadow-organic-soft transition-all duration-200",
    animationProfile: "serene-organic",
  },
  "snack-attack": {
    id: "snack-attack",
    name: "SNACK ATTACK",
    tagline: "Maximalist Snack Culture",
    routePrefix: "/concept-c-snackattack",
    vibeDescription: "Hyper-vibrant pops of electric lime & punchy peach, neo-brutalist solid offset shadows, sticker badges, crunch sounds.",
    designInspirations: ["Local All Natural Soda", "Kruncho"],
    themeClass: "theme-snackattack",
    colors: {
      primary: "#0D0D0D", // Deep Ink
      secondary: "#FF6B6B", // Hot Peach
      accent: "#70E000", // Electric Lime
      background: "#FFFDF9", // Off-white Paper
      surface: "#FFFFFF",
      textPrimary: "#0D0D0D",
      textSecondary: "#5A5A5A",
      border: "#0D0D0D",
      badgeBg: "#FFB703", // Neon Cheddar
      badgeText: "#0D0D0D",
    },
    typography: {
      headingFontClass: "font-snackattackDisplay",
      bodyFontClass: "font-snackattackBody",
      headingStyleDescription: "Chunky, expressive neo-grotesque display headers with uppercase punch.",
    },
    cardRadius: "rounded-snack",
    buttonStyleClass: "bg-snackattack-lime text-snackattack-ink border-2 border-black shadow-snack-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none font-bold transition-all",
    animationProfile: "bouncy-pop",
  },
};
