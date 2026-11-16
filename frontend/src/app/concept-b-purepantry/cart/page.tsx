import ConceptCartPage from "@/components/concepts/templates/ConceptCartPage";

export const metadata = {
  title: "Basket — Concept B: PURE & PANTRY",
  description: "Review and checkout provisions.",
};

export default function CartRoute() {
  return <ConceptCartPage concept="purepantry" />;
}
