import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CollectionView from "@/components/CollectionView";
import Footer from "@/components/Footer";
import {
  CATEGORY_COPY,
  CATEGORY_KEYS,
  CATEGORY_LABEL,
  isCategoryKey,
  productsByCategory,
} from "@/lib/catalog";

type CategoryPageProps = {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ for?: string }>;
};

export function generateStaticParams() {
  return CATEGORY_KEYS.map((category) => ({ category }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  if (!isCategoryKey(category)) return {};
  return {
    title: `${CATEGORY_LABEL[category]} — OLÒGE of Africa`,
    description: CATEGORY_COPY[category].description,
  };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { category } = await params;
  if (!isCategoryKey(category)) notFound();

  const copy = CATEGORY_COPY[category];
  const requestedView = (await searchParams).for;
  const eyewearView = category === "eyewear" && (requestedView === "her" || requestedView === "him")
    ? requestedView
    : "all";
  const products = productsByCategory(category).filter((product) =>
    category !== "eyewear" || eyewearView === "all" || product.wearer === eyewearView || product.wearer === "both"
  );
  return (
    <>
      <CollectionView
        title={eyewearView === "all" ? CATEGORY_LABEL[category] : `Frames for ${eyewearView}.`}
        description={eyewearView === "all" ? copy.description : "Explore the frames in this edit. Each of the current styles is available to browse in both views."}
        products={products}
        active={category}
        image={copy.image}
        eyewearView={category === "eyewear" ? eyewearView : undefined}
      />
      <Footer />
    </>
  );
}
