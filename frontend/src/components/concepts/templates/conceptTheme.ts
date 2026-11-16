export type ConceptKey = "flavourverse" | "purepantry" | "snackattack";

export interface ConceptThemeConfig {
  name: string;
  tagline: string;
  code: string;
  basePath: string;
  bgClass: string;
  textClass: string;
  bannerClass: string;
  accentHex: string;
  secondaryHex: string;
  btnPrimaryClass: string;
  btnSecondaryClass: string;
  badgeClass: string;
  cardBorderClass: string;
  fontClass: string;
}

export function getConceptTheme(concept: ConceptKey): ConceptThemeConfig {
  if (concept === "purepantry") {
    return {
      name: "PURE & PANTRY",
      tagline: "Modern Organic & Wellness",
      code: "CONCEPT B",
      basePath: "/concept-b-purepantry",
      bgClass: "bg-[#F7F4EE] text-[#2C2926]",
      textClass: "text-[#2C2926]",
      bannerClass: "bg-[#EDE8DE] border-b border-[#E0D9CC]",
      accentHex: "#4A5844",
      secondaryHex: "#C86D51",
      btnPrimaryClass: "bg-[#4A5844] hover:bg-[#3D4938] text-[#F7F4EE] font-serif font-bold shadow-md",
      btnSecondaryClass: "bg-white/80 hover:bg-white text-[#2C2926] border border-[#D5CDBD]",
      badgeClass: "bg-[#4A5844]/15 border border-[#4A5844]/40 text-[#4A5844]",
      cardBorderClass: "border-[#D5CDBD] hover:border-[#4A5844]",
      fontClass: "font-serif",
    };
  }

  if (concept === "snackattack") {
    return {
      name: "SNACK ATTACK",
      tagline: "India's Boldest Snack Protocol • Zero Chill. Maximum Crunch.",
      code: "CONCEPT C",
      basePath: "/concept-c-snackattack",
      bgClass: "bg-[#FFFDF5] text-black",
      textClass: "text-black",
      bannerClass: "bg-[#FF5400] text-black border-b-4 border-black",
      accentHex: "#FF5400",
      secondaryHex: "#FFD60A",
      btnPrimaryClass: "bg-[#FFD60A] hover:bg-[#ffe033] text-black font-black border-3 border-black shadow-[4px_4px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5",
      btnSecondaryClass: "bg-white text-black font-black border-3 border-black shadow-[4px_4px_0px_#000] hover:bg-[#FF007F] hover:text-white",
      badgeClass: "bg-[#FFD60A] border-2 border-black text-black font-black shadow-[2px_2px_0px_#000]",
      cardBorderClass: "border-black shadow-[4px_4px_0px_#000] hover:border-[#FF5400]",
      fontClass: "font-sans",
    };
  }

  // Default: flavourverse
  return {
    name: "FLAVOURVERSE",
    tagline: "Bold Editorial Culinary Universe",
    code: "CONCEPT A",
    basePath: "/concept-a-flavourverse",
    bgClass: "bg-[#120F16] text-[#FAF5EE]",
    textClass: "text-[#FAF5EE]",
    bannerClass: "bg-gradient-to-r from-[#1F0E1C] via-[#2A1428] to-[#160E18] border-b border-white/10",
    accentHex: "#FF9F1C",
    secondaryHex: "#1F0E1C",
    btnPrimaryClass: "bg-[#FF9F1C] hover:bg-[#ffb042] text-black font-black shadow-lg",
    btnSecondaryClass: "bg-white/10 hover:bg-white/20 text-white border border-white/20",
    badgeClass: "bg-[#FF9F1C]/15 border border-[#FF9F1C]/40 text-[#FF9F1C]",
    cardBorderClass: "border-white/10 hover:border-[#FF9F1C]/60",
    fontClass: "font-serif",
  };
}
