import type { Metadata } from "next";
import CollectionView from "@/components/CollectionView";
import Footer from "@/components/Footer";
import { PRODUCTS } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Shop the House — OLÒGE of Africa",
  description: "Discover eyewear and occasion pieces curated by OLÒGE of Africa.",
};

export default function ShopPage() {
  return (
    <>
      <CollectionView
        title="The house, piece by piece."
        description="A considered edit of frames, fascinators and finishing pieces — chosen for presence, personality and effortless grace."
        products={PRODUCTS}
        active="all"
      />
      <Footer />
    </>
  );
}
