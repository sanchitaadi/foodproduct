import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderWidth: {
        "3": "3px",
      },
      colors: {
        // BRAND A: SNACK ATTACK (Loud, Electric, Maximalist Pop)
        snackattack: {
          orange: "#FF5400",
          cherry: "#D90429",
          pink: "#FF007F",
          yellow: "#FFD60A",
          ink: "#0A0A0A",
          warmWhite: "#FFFDF5",
        },
        // BRAND B: GOOD MOOD FOODS (Sage, Pistachio, Oat Cream, Minimal Zen)
        goodmood: {
          sage: "#5F7965",
          pistachio: "#A5C4A3",
          terracotta: "#C88D6A",
          cream: "#F7F4EE",
          beige: "#E7DEC8",
          forest: "#232B25",
        },
        // BRAND C: CRUNCH CULT (Jet Black, Off-White, Blinding Acid Green)
        crunchcult: {
          jet: "#0A0A0A",
          offwhite: "#F2F2F2",
          acid: "#CCFF00",
          cyber: "#71717A",
          surface: "#121212",
          zincDark: "#18181B",
        },
        // BRAND D: HAPPY CRAVINGS (Peach, Powder Pink, Butter Yellow, Dreamy Lavender)
        happycravings: {
          peach: "#FF9E7D",
          pink: "#F8A5C2",
          butter: "#FFE66D",
          lavender: "#D4B8E5",
          plum: "#4A3E3D",
          cream: "#FFF9F5",
        },
        // Retain legacy concept colors for backward compatibility
        flavourverse: {
          plum: "#1F0E1C",
          truffle: "#110D09",
          saffron: "#FF9F1C",
          curry: "#E76F51",
          cream: "#FAF6F0",
          card: "#2A1827",
          border: "#3D2439",
          muted: "#9D889A",
        },
        purepantry: {
          sage: "#4A5844",
          sageLight: "#F0F3EE",
          terracotta: "#C86D51",
          linen: "#F7F4EE",
          oat: "#E8E2D5",
          charcoal: "#2B2D2F",
          card: "#FFFFFF",
          border: "#E2DDD3",
          muted: "#7E827A",
        },
      },
      boxShadow: {
        // Neo-brutalist solid offsets for Snack Attack
        "snack-sm": "3px 3px 0px #0A0A0A",
        "snack-md": "5px 5px 0px #0A0A0A",
        "snack-lg": "8px 8px 0px #0A0A0A",
        "snack-pink": "5px 5px 0px #FF007F",
        "snack-yellow": "5px 5px 0px #FFD60A",
        // Soft organic diffusion for Good Mood Foods
        "organic-soft": "0 10px 35px rgba(95, 121, 101, 0.08)",
        "organic-elevated": "0 18px 45px rgba(95, 121, 101, 0.12)",
        // Sweet dreamy glow for Happy Cravings
        "craving-soft": "0 8px 24px rgba(255, 158, 125, 0.18)",
        "craving-button": "0 6px 18px rgba(255, 158, 125, 0.35)",
        // Acid green neon glow for Crunch Cult
        "acid-glow": "0 0 25px rgba(204, 255, 0, 0.3)",
      },
      borderRadius: {
        snack: "18px",
        organic: "28px",
        craving: "24px",
      },
    },
  },
  plugins: [],
};

export default config;
