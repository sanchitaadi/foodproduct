import ConceptCartPage from "@/components/concepts/templates/ConceptCartPage";

export const metadata = {
  title: "Basket — Concept C: SNACK ATTACK",
  description: "Review and checkout provisions.",
};

export default function CartRoute() {
  return <ConceptCartPage concept="snackattack" />;
}
