/**
 * BRAND DESIGN SYSTEM TYPES — FOUR ALTERNATIVE WEBSITES FOR ONE FOOD BUSINESS
 * Single source of truth for the 4 creative design variations of Peachy Plate Foods:
 * 
 * Business Entity: PEACHY PLATE FOODS (Artisanal Indian Packaged Foods)
 * 
 * 1. POP CULT — Colourful maximalist Gen-Z (Electric orange, cherry, pink, yellow)
 * 2. PURE & CO. — Premium luxury minimalist (Sage green, cream, beige, ivory)
 * 3. CRUNCH MODE — Black, white and neon brutalist (Jet black, stark white, neon green)
 * 4. HAPPY BITES — Cute pastel aesthetic (Peach, lavender, pink, butter yellow)
 */

export type BrandConceptId =
  | "pop-cult"
  | "pure-co"
  | "crunch-mode"
  | "happy-bites"
  // Aliases for compatibility
  | "pop-snacks"
  | "goodness-co"
  | "crave-cult"
  | "snack-attack"
  | "good-mood-foods"
  | "crunch-cult"
  | "happy-cravings"
  | "flavourverse"
  | "purepantry"
  | "snackattack";

export interface BrandColorPalette {
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
  swatches: { name: string; hex: string }[];
}

export interface BrandTypographyConfig {
  displayFont: string;
  bodyFont: string;
  headingStyleDescription: string;
  tracking: string;
  taglineStyle: string;
}

export interface BrandIdentityMeta {
  id: BrandConceptId;
  name: string;
  umbrellaBusiness: string;
  code: string;
  conceptNumber: number;
  tagline: string;
  routePrefix: string;
  targetAudience: string;
  aestheticPillars: string[];
  visualIdentitySummary: string;
  colors: BrandColorPalette;
  typography: BrandTypographyConfig;
  cardStyle: {
    borderRadius: string;
    shadow: string;
    borderWidth: string;
    borderColor: string;
  };
  buttonStyle: string;
  vibePillars: {
    energy: "Ultra High" | "Zen Calm" | "Cyber Intense" | "Sweet Playful";
    gridType: "Asymmetric Staggered" | "Serene Minimal" | "Brutalist Wireframe" | "Scrapbook Polaroid";
    motionProfile: "Bouncy Spring" | "Smooth Organic Float" | "Glitch Snap" | "Playful Wiggle";
  };
  sampleTaglines: string[];
}

const POP_CULT_META: BrandIdentityMeta = {
  id: "pop-cult",
  name: "POP CULT",
  umbrellaBusiness: "Peachy Plate Foods",
  code: "DESIGN 01",
  conceptNumber: 1,
  tagline: "Electric Flavours. Maximum Energy.",
  routePrefix: "/concepts/pop-cult",
  targetAudience: "Gen-Z crave chasers, college hypebeasts & high-energy snackers",
  aestheticPillars: [
    "Colourful Maximalist Gen-Z",
    "Electric Orange, Hot Pink, Cherry Red & Punch Yellow",
    "Oversized Display Typography with Heavy Black Outlines",
    "Sticker Badges & Dynamic Asymmetrical Grids",
  ],
  visualIdentitySummary:
    "Maximalist energy bursting with electric orange, cherry red, hot pink, and punch yellow. Thick black comic outlines, rotated sticker badges, and high-voltage snack excitement.",
  colors: {
    primary: "#FF5400",
    secondary: "#D90429",
    accent: "#FF007F",
    background: "#FFFDF5",
    surface: "#FFFFFF",
    textPrimary: "#0A0A0A",
    textSecondary: "#4A4A4A",
    border: "#0A0A0A",
    badgeBg: "#FFD60A",
    badgeText: "#0A0A0A",
    swatches: [
      { name: "Electric Orange", hex: "#FF5400" },
      { name: "Hot Pink", hex: "#FF007F" },
      { name: "Cherry Red", hex: "#D90429" },
      { name: "Punch Yellow", hex: "#FFD60A" },
      { name: "Ink Black", hex: "#0A0A0A" },
    ],
  },
  typography: {
    displayFont: "font-black tracking-tighter uppercase",
    bodyFont: "font-sans font-medium",
    headingStyleDescription: "Oversized, punchy display titles with bold black outlines and zero apologies.",
    tracking: "tracking-tight",
    taglineStyle: "font-black uppercase tracking-wider text-sm",
  },
  cardStyle: {
    borderRadius: "rounded-2xl",
    shadow: "shadow-[5px_5px_0px_#0A0A0A]",
    borderWidth: "border-3",
    borderColor: "border-[#0A0A0A]",
  },
  buttonStyle:
    "bg-[#FF5400] text-black font-black uppercase tracking-wider border-2 border-black shadow-[4px_4px_0px_#0A0A0A] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#0A0A0A] transition-all",
  vibePillars: {
    energy: "Ultra High",
    gridType: "Asymmetric Staggered",
    motionProfile: "Bouncy Spring",
  },
  sampleTaglines: [
    "LOUD SNACKS FOR LOUD LIVES",
    "DOPAMINE DELIVERED ACROSS INDIA",
    "NOT YOUR PARENTS' NAMKEEN",
  ],
};

const PURE_CO_META: BrandIdentityMeta = {
  id: "pure-co",
  name: "PURE & CO.",
  umbrellaBusiness: "Peachy Plate Foods",
  code: "DESIGN 02",
  conceptNumber: 2,
  tagline: "Nourish Mindfully. Savor Honestly.",
  routePrefix: "/concepts/pure-co",
  targetAudience: "Mindful clean-label urbanites, wellness seekers & luxury aesthetic lovers",
  aestheticPillars: [
    "Premium Luxury Minimalist",
    "Sage Green, Cream, Beige & Ivory",
    "High-Contrast Editorial Serif Typography",
    "Spacious Serene Margins & Pebble-Shaped Cards",
  ],
  visualIdentitySummary:
    "Quiet luxury and understated botanical elegance. Calming sage green, pure oat cream, soothing beige, and warm ivory paired with graceful serif headlines and zen photography.",
  colors: {
    primary: "#5F7965",
    secondary: "#A5C4A3",
    accent: "#C88D6A",
    background: "#F7F4EE",
    surface: "#FCFBF7",
    textPrimary: "#232B25",
    textSecondary: "#67756B",
    border: "#E2DDD5",
    badgeBg: "#EEF3EE",
    badgeText: "#435C4A",
    swatches: [
      { name: "Sage Green", hex: "#5F7965" },
      { name: "Oat Cream", hex: "#F7F4EE" },
      { name: "Calm Beige", hex: "#E7DEC8" },
      { name: "Soft Ivory", hex: "#FCFBF7" },
      { name: "Deep Forest", hex: "#232B25" },
    ],
  },
  typography: {
    displayFont: "font-serif tracking-normal font-light italic",
    bodyFont: "font-sans font-light",
    headingStyleDescription: "Editorial serif headlines with generous line height and graceful italic inflections.",
    tracking: "tracking-wide",
    taglineStyle: "font-serif italic tracking-wide text-sm",
  },
  cardStyle: {
    borderRadius: "rounded-3xl",
    shadow: "shadow-[0_12px_40px_rgba(95,121,101,0.08)]",
    borderWidth: "border",
    borderColor: "border-[#E2DDD5]",
  },
  buttonStyle:
    "bg-[#5F7965] text-white font-serif tracking-wide rounded-full px-6 py-3 hover:bg-[#4d6452] shadow-sm hover:shadow-md transition-all duration-300",
  vibePillars: {
    energy: "Zen Calm",
    gridType: "Serene Minimal",
    motionProfile: "Smooth Organic Float",
  },
  sampleTaglines: [
    "SLOW-CRAFTED BOTANICAL PROVISIONS",
    "MINDFUL BITES FOR MODERN MINDS",
    "SINGLE-ORIGIN • 100% CLEAN LABEL",
  ],
};

const CRUNCH_MODE_META: BrandIdentityMeta = {
  id: "crunch-mode",
  name: "CRUNCH MODE",
  umbrellaBusiness: "Peachy Plate Foods",
  code: "DESIGN 03",
  conceptNumber: 3,
  tagline: "Subversive Snacking. Underground Crunch.",
  routePrefix: "/concepts/crunch-mode",
  targetAudience: "Streetwear collectors, dark-mode hackers & brutalist tastemakers",
  aestheticPillars: [
    "Black, White & Neon Brutalist",
    "Jet Black, Crisp White & Blinding Neon Green",
    "Techno-Grotesque Industrial Monospace Typography",
    "Brutalist Wireframes, Technical Drop Tags & Coordinate Crosshairs",
  ],
  visualIdentitySummary:
    "Neo-brutalist tech drop aesthetic. Jet black canvas, stark white typography, and high-frequency neon green accents. Mechanical index numbers, lab specs, and streetwear drop logic.",
  colors: {
    primary: "#CCFF00",
    secondary: "#161616",
    accent: "#CCFF00",
    background: "#0A0A0A",
    surface: "#121212",
    textPrimary: "#F2F2F2",
    textSecondary: "#A1A1AA",
    border: "#27272A",
    badgeBg: "rgba(204, 255, 0, 0.12)",
    badgeText: "#CCFF00",
    swatches: [
      { name: "Jet Black", hex: "#0A0A0A" },
      { name: "Stark White", hex: "#F2F2F2" },
      { name: "Neon Green", hex: "#CCFF00" },
      { name: "Charcoal Matrix", hex: "#18181B" },
      { name: "Cyber Silver", hex: "#71717A" },
    ],
  },
  typography: {
    displayFont: "font-mono font-black uppercase tracking-widest",
    bodyFont: "font-mono text-xs",
    headingStyleDescription: "Technical, ultra-bold industrial grotesque headlines with monospace index tags.",
    tracking: "tracking-widest",
    taglineStyle: "font-mono uppercase tracking-[0.25em] text-xs text-[#CCFF00]",
  },
  cardStyle: {
    borderRadius: "rounded-none",
    shadow: "shadow-none",
    borderWidth: "border",
    borderColor: "border-zinc-800",
  },
  buttonStyle:
    "bg-[#CCFF00] text-black font-mono font-black uppercase tracking-widest px-6 py-3 hover:bg-white hover:text-black border border-[#CCFF00] transition-colors duration-150",
  vibePillars: {
    energy: "Cyber Intense",
    gridType: "Brutalist Wireframe",
    motionProfile: "Glitch Snap",
  },
  sampleTaglines: [
    "BATCH DROP #04: THE EXTREME CRUNCH MATRIX",
    "INDUSTRIAL GRADE PACKAGED NOURISHMENT",
    "AUTHENTICATED EDIBLE ARTIFACTS",
  ],
};

const HAPPY_BITES_META: BrandIdentityMeta = {
  id: "happy-bites",
  name: "HAPPY BITES",
  umbrellaBusiness: "Peachy Plate Foods",
  code: "DESIGN 04",
  conceptNumber: 4,
  tagline: "Sweet Little Bites Of Pure Joy.",
  routePrefix: "/concepts/happy-bites",
  targetAudience: "Cozy snackers, scrapbook creators & pastel aesthetic lovers",
  aestheticPillars: [
    "Cute Pastel Aesthetic",
    "Peach, Lavender, Powder Pink & Butter Yellow",
    "Cute Rounded Bubble Typography",
    "Hand-Drawn Doodles, Washi Tape Frames & Gingham Details",
  ],
  visualIdentitySummary:
    "A pastel dreamscape of soft peach, dreamy lavender, powder pink, and butter yellow. Hand-drawn doodles, washi-tape photo frames, gingham picnic prints, and joyful bouncy animations.",
  colors: {
    primary: "#FF9E7D",
    secondary: "#F8A5C2",
    accent: "#D4B8E5",
    background: "#FFF9F5",
    surface: "#FFFFFF",
    textPrimary: "#4A3E3D",
    textSecondary: "#8A7977",
    border: "#F5D5CB",
    badgeBg: "#FFE66D",
    badgeText: "#4A3E3D",
    swatches: [
      { name: "Sweet Peach", hex: "#FF9E7D" },
      { name: "Dreamy Lavender", hex: "#D4B8E5" },
      { name: "Powder Pink", hex: "#F8A5C2" },
      { name: "Butter Yellow", hex: "#FFE66D" },
      { name: "Cocoa Plum", hex: "#4A3E3D" },
    ],
  },
  typography: {
    displayFont: "font-sans font-extrabold tracking-tight",
    bodyFont: "font-sans font-medium",
    headingStyleDescription: "Soft, bubbly rounded display typography with hand-drawn scribble flourishes.",
    tracking: "tracking-tight",
    taglineStyle: "font-sans font-bold text-sm text-[#FF9E7D]",
  },
  cardStyle: {
    borderRadius: "rounded-3xl",
    shadow: "shadow-[0_10px_25px_rgba(255,158,125,0.15)]",
    borderWidth: "border-2",
    borderColor: "border-[#F5D5CB]",
  },
  buttonStyle:
    "bg-[#FF9E7D] text-white font-bold rounded-full px-6 py-3 shadow-[0_6px_18px_rgba(255,158,125,0.35)] hover:scale-105 hover:bg-[#ff8f69] active:scale-95 transition-all duration-200",
  vibePillars: {
    energy: "Sweet Playful",
    gridType: "Scrapbook Polaroid",
    motionProfile: "Playful Wiggle",
  },
  sampleTaglines: [
    "SNACK TIME IS YOUR HAPPY HOUR",
    "MADE WITH LOVE, SUNSHINE & BUTTER",
    "ADORABLE TREATS FOR YOUR WHOLE SQUAD",
  ],
};

export const BRAND_IDENTITIES: Record<BrandConceptId, BrandIdentityMeta> = {
  "pop-cult": POP_CULT_META,
  "pure-co": PURE_CO_META,
  "crunch-mode": CRUNCH_MODE_META,
  "happy-bites": HAPPY_BITES_META,

  // Aliases for seamless backward compatibility
  "pop-snacks": { ...POP_CULT_META, id: "pop-snacks", routePrefix: "/concepts/pop-snacks" },
  "goodness-co": { ...PURE_CO_META, id: "goodness-co", routePrefix: "/concepts/goodness-co" },
  "crave-cult": { ...CRUNCH_MODE_META, id: "crave-cult", routePrefix: "/concepts/crave-cult" },
  "snack-attack": { ...POP_CULT_META, id: "snack-attack", routePrefix: "/concepts/snack-attack" },
  "good-mood-foods": { ...PURE_CO_META, id: "good-mood-foods", routePrefix: "/concepts/good-mood-foods" },
  "crunch-cult": { ...CRUNCH_MODE_META, id: "crunch-cult", routePrefix: "/concepts/crunch-cult" },
  "happy-cravings": { ...HAPPY_BITES_META, id: "happy-cravings", routePrefix: "/concepts/happy-cravings" },
  flavourverse: { ...POP_CULT_META, id: "flavourverse", routePrefix: "/concepts/pop-cult" },
  purepantry: { ...PURE_CO_META, id: "purepantry", routePrefix: "/concepts/pure-co" },
  snackattack: { ...CRUNCH_MODE_META, id: "snackattack", routePrefix: "/concepts/crunch-mode" },
};

export function getBrandMeta(id: BrandConceptId): BrandIdentityMeta {
  return BRAND_IDENTITIES[id] || BRAND_IDENTITIES["pop-cult"];
}
