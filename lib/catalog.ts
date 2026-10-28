// The catalog, shaped like the Payload `Products` collection it will become.
// Photos are the client's own product shots. Names are plain descriptions and
// prices are null ("Price on request") until she supplies her real ones.

export type CategoryKey = "accessories" | "eyewear" | "shoes" | "bags" | "fascinators";

export type Product = {
  slug: string;
  name: string;
  variant: string;
  category: CategoryKey;
  wearer?: "him" | "her" | "both";
  price: number | null; // null → "Price on request"
  description: string;
  image: string; // cut-out on a transparent/white ground
  featured?: boolean;
};

export const CATEGORY_LABEL: Record<CategoryKey, string> = {
  accessories: "Accessories",
  eyewear: "Eyewear",
  shoes: "Shoes",
  bags: "Bags",
  fascinators: "Fascinators",
};

export const CATEGORY_KEYS: CategoryKey[] = [
  "accessories",
  "eyewear",
  "shoes",
  "bags",
  "fascinators",
];

export const CATEGORY_COPY: Record<
  CategoryKey,
  { description: string; image: string }
> = {
  accessories: {
    description: "Finishing pieces chosen for presence, ease and the small detail that completes a look.",
    image: "/media/categories/accessories.jpg",
  },
  eyewear: {
    description: "Frames with character — expressive silhouettes, considered colour and an easy point of view.",
    image: "/media/categories/eyewear.jpg",
  },
  shoes: {
    description: "The pair that sets the pace: occasion-ready shapes selected to carry a look with confidence.",
    image: "/media/categories/shoes.jpg",
  },
  bags: {
    description: "Carried close and chosen well — bags that add structure, colour and polish.",
    image: "/media/categories/bags.jpg",
  },
  fascinators: {
    description: "Sculptural headpieces for entrances, celebrations and every moment that asks for a little more.",
    image: "/media/categories/fascinators.jpg",
  },
};

// Manual grouping keeps server and client output identical (no locale/ICU drift).
export const formatPrice = (price: number | null): string =>
  price == null
    ? "Price on request"
    : `₦${String(price).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

export const PRODUCTS: Product[] = [
  {
    slug: "round-browbar-gold",
    name: "Round Brow-Bar Sunglasses",
    variant: "Gold · black lens",
    category: "eyewear",
    wearer: "both",
    price: null,
    description: "Round lenses under a fine double bridge, in polished gold with black lenses.",
    image: "/products/round-browbar-gold.jpg",
    featured: true,
  },
  {
    slug: "oversized-square-red",
    name: "Oversized Square Sunglasses",
    variant: "Red · tortoise fade",
    category: "eyewear",
    wearer: "both",
    price: null,
    description: "A generous square frame in glossy red that fades into tortoise at the base.",
    image: "/products/square-red.jpg",
    featured: true,
  },
  {
    slug: "veiled-bow-fascinator",
    name: "Veiled Bow Fascinator",
    variant: "Black · crinoline & feather",
    category: "fascinators",
    price: null,
    description: "Sculpted black crinoline loops, beaded detail and a sweeping quill on a slim headband.",
    image: "/products/fascinator-veiled-bow.webp",
    featured: true,
  },
  {
    slug: "oval-metal-gunmetal",
    name: "Oval Metal Sunglasses",
    variant: "Gunmetal · green lens",
    category: "eyewear",
    wearer: "both",
    price: null,
    description: "A slim oval in gunmetal with deep green lenses and squared metal temples.",
    image: "/products/oval-gunmetal.jpg",
    featured: true,
  },
  {
    slug: "plum-saucer-fascinator",
    name: "Saucer Fascinator",
    variant: "Plum · sinamay & feathers",
    category: "fascinators",
    price: null,
    description: "A tilted sinamay saucer crowned with plum feathers and a soft bow.",
    image: "/products/fascinator-plum-saucer.webp",
    featured: true,
  },
  {
    slug: "rectangle-optical-black",
    name: "Rectangle Optical Frames",
    variant: "Gloss black · clear lens",
    category: "eyewear",
    wearer: "both",
    price: null,
    description: "A clean, everyday rectangle in gloss black acetate, ready for your prescription.",
    image: "/products/rect-optical-black.jpg",
    featured: true,
  },
  {
    slug: "oval-metal-black",
    name: "Oval Metal Sunglasses",
    variant: "Black · black lens",
    category: "eyewear",
    wearer: "both",
    price: null,
    description: "The slim oval in tonal black — quiet, sharp, easy to wear.",
    image: "/products/oval-black.jpg",
  },
  {
    slug: "round-browbar-cobalt",
    name: "Round Brow-Bar Sunglasses",
    variant: "Cobalt blue",
    category: "eyewear",
    wearer: "both",
    price: null,
    description: "The double-bridge round in vivid cobalt with smoked blue lenses.",
    image: "/products/round-browbar-cobalt.jpg",
  },
];

export const featuredProducts = (): Product[] => PRODUCTS.filter((p) => p.featured);

export const isCategoryKey = (value: string): value is CategoryKey =>
  CATEGORY_KEYS.includes(value as CategoryKey);

export const productsByCategory = (category: CategoryKey): Product[] =>
  PRODUCTS.filter((product) => product.category === category);

export const productBySlug = (category: CategoryKey, slug: string): Product | undefined =>
  PRODUCTS.find((product) => product.category === category && product.slug === slug);
