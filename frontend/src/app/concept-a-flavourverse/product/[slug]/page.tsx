import ConceptProductPage from "@/components/concepts/templates/ConceptProductPage";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ConceptProductPage concept="flavourverse" slug={slug} />;
}
