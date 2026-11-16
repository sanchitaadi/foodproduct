import ConceptAccountPage from "@/components/concepts/templates/ConceptAccountPage";

export const metadata = {
  title: "Account — Concept B: PURE & PANTRY",
  description: "Customer account portal.",
};

export default function AccountRoute() {
  return <ConceptAccountPage concept="purepantry" />;
}
