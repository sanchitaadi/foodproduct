import React from "react";
import { SnackAttackNav } from "@/components/brands/snack-attack/SnackAttackNav";
import { SnackAttackFooter } from "@/components/brands/snack-attack/SnackAttackFooter";
import { BrandIntroCurtain } from "@/components/animation/BrandIntroCurtain";

export const metadata = {
  title: "SNACK ATTACK — Zero Chill. Maximum Crunch. (Concept C)",
  description: "Loud, unapologetic, maximalist Gen-Z Indian packaged snacks. Electric orange, cherry red, punch yellow, and heavy crunch.",
};

export default function SnackAttackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      data-brand="snack-attack"
      className="min-h-screen bg-[#FFFDF5] text-black flex flex-col font-sans selection:bg-[#FFD60A] selection:text-black"
    >
      <BrandIntroCurtain
        brandId="snack-attack"
        brandName="SNACK ATTACK"
        tagline="ZERO CHILL • MAXIMUM CRUNCH"
        durationMs={750}
      />
      <SnackAttackNav />
      <main className="flex-1 flex flex-col">{children}</main>
      <SnackAttackFooter />
    </div>
  );
}
