// Server-side reads from Payload, cached and tagged so an edit in /admin
// refreshes the site immediately (the collections call revalidateTag on save).
// If the database isn't configured or can't be reached, the site keeps
// working on the starter catalog and the defaults in lib/site.ts.
import { unstable_cache } from "next/cache";
import { getPayload } from "payload";
import config from "@payload-config";
import { PRODUCTS, isCategoryKey, type Product } from "./catalog";
import { SITE, type SiteSettings } from "./site";

export const cmsConfigured = () => Boolean(process.env.DATABASE_URL && process.env.PAYLOAD_SECRET);

type MediaDoc = {
  url?: string | null;
  alt?: string | null;
  mimeType?: string | null;
  sizes?: { card?: { url?: string | null } | null } | null;
};

const asMedia = (value: unknown): MediaDoc | null =>
  value && typeof value === "object" ? (value as MediaDoc) : null;

type ProductDoc = {
  slug?: string | null;
  name: string;
  variant?: string | null;
  category: string;
  wearer?: "her" | "him" | "both" | null;
  price?: number | null;
  description: string;
  image: unknown;
  gallery?: unknown[] | null;
  video?: unknown;
  status: "available" | "sold-out" | "hidden";
  featured?: boolean | null;
};

function toProduct(doc: ProductDoc): Product | null {
  const image = asMedia(doc.image);
  if (!doc.slug || !isCategoryKey(doc.category) || !image?.url) return null;
  return {
    slug: doc.slug,
    name: doc.name,
    variant: doc.variant ?? "",
    category: doc.category,
    wearer: doc.wearer ?? "both",
    price: typeof doc.price === "number" ? doc.price : null,
    description: doc.description,
    image: image.sizes?.card?.url || image.url,
    imageLarge: image.url,
    imageAlt: image.alt ?? undefined,
    gallery: (doc.gallery ?? [])
      .map(asMedia)
      .filter((m): m is MediaDoc => Boolean(m?.url))
      .map((m) => ({ src: m.url as string, alt: m.alt ?? "" })),
    video: asMedia(doc.video)?.url ?? undefined,
    status: doc.status === "sold-out" ? "sold-out" : "available",
    featured: Boolean(doc.featured),
  };
}

const loadProducts = unstable_cache(
  async (): Promise<Product[]> => {
    const payload = await getPayload({ config });
    const res = await payload.find({
      collection: "products",
      where: { status: { not_equals: "hidden" } },
      sort: ["order", "createdAt"],
      depth: 1,
      limit: 500,
      pagination: false,
    });
    return (res.docs as unknown as ProductDoc[]).map(toProduct).filter((p): p is Product => p !== null);
  },
  ["cms-products"],
  { tags: ["products"], revalidate: 300 },
);

const loadSettings = unstable_cache(
  async (): Promise<SiteSettings> => {
    const payload = await getPayload({ config });
    const doc = (await payload.findGlobal({ slug: "site-settings" })) as Partial<Record<keyof SiteSettings, string | null>>;
    return {
      whatsapp: doc.whatsapp || SITE.whatsapp,
      instagram: doc.instagram || SITE.instagram,
      email: doc.email || SITE.email,
    };
  },
  ["cms-settings"],
  { tags: ["settings"], revalidate: 300 },
);

export async function getProducts(): Promise<Product[]> {
  if (!cmsConfigured()) return PRODUCTS;
  try {
    return await loadProducts();
  } catch (error) {
    console.error("[cms] products unavailable, showing the starter catalog:", error);
    return PRODUCTS;
  }
}

export async function getSettings(): Promise<SiteSettings> {
  if (!cmsConfigured()) return SITE;
  try {
    return await loadSettings();
  } catch (error) {
    console.error("[cms] settings unavailable, using defaults:", error);
    return SITE;
  }
}
