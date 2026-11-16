import ConceptCategoryPage from "@/components/concepts/templates/ConceptCategoryPage";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ConceptCategoryPage concept="flavourverse" slug={slug} />;
}
