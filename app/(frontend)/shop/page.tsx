import type { Metadata } from "next";
import CollectionView from "@/components/CollectionView";
import Footer from "@/components/Footer";
import { getProducts } from "@/lib/cms";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Shop the House — OLÒGE of Africa",
  description: "Discover jewellery, eyewear and occasion pieces curated by OLÒGE of Africa.",
};

export default async function ShopPage() {
  const products = await getProducts();
  return (
    <>
      <CollectionView
        title="The house, piece by piece."
        description="A considered edit of frames, fascinators and finishing pieces — chosen for presence, personality and effortless grace."
        products={products}
        active="all"
        editorial={{
          src: "/media/lookbook/founder-yellow-frames.jpeg",
          alt: "A woman smiling in bold yellow-lens frames and a colourful patterned jacket",
          caption: "See the house as worn — the lookbook",
          href: "/lookbook",
        }}
      />
      <Footer />
    </>
  );
}
