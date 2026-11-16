import type { Metadata } from "next";
import "@/styles/globals.css";
import "@/styles/themes.css";
import { ConceptSwitcherBar } from "@/components/common/ConceptSwitcherBar";
import { CartDrawer } from "@/components/common/CartDrawer";
import { ComingSoonModal } from "@/components/common/ComingSoonModal";
import ToastContainer from "@/components/common/ToastContainer";
import QuickViewModal from "@/components/common/QuickViewModal";
import ProductComparisonModal from "@/components/common/ProductComparisonModal";

export const metadata: Metadata = {
  title: "Peachy Plate — Gourmet & Artisanal Packaged Food E-Commerce",
  description: "Artisanal snacks, craft sodas, confectionery, wellness pantry staples, and gourmet provisions. Experience three distinct visual concepts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col bg-neutral-950 text-neutral-100">
        <ConceptSwitcherBar />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <CartDrawer />
        <ComingSoonModal />
        <QuickViewModal />
        <ProductComparisonModal />
        <ToastContainer />
      </body>
    </html>
  );
}
