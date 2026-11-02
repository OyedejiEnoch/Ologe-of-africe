// The catalog, shaped like the Payload `Products` collection it will become.
// Images are supplied by the owner. Names describe what is visible; materials,
// availability and prices remain unconfirmed until the owner supplies details.

export type CategoryKey = "jewellery" | "accessories" | "eyewear" | "shoes" | "bags" | "fascinators";

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
  jewellery: "Jewellery",
  accessories: "Accessories",
  eyewear: "Eyewear",
  shoes: "Shoes",
  bags: "Bags",
  fascinators: "Fascinators",
};

export const CATEGORY_KEYS: CategoryKey[] = [
  "jewellery",
  "eyewear",
  "accessories",
  "shoes",
  "bags",
  "fascinators",
];

export const CATEGORY_COPY: Record<
  CategoryKey,
  { description: string; image: string }
> = {
  jewellery: {
    description: "Expressive earrings, cuffs and bangles chosen to bring a look into focus.",
    image: "/products/jewellery/gold-fan-earrings.webp",
  },
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
  {
    slug: "gold-fan-earrings",
    name: "Fan Sculptural Earrings",
    variant: "Gold tone · pleated form",
    category: "jewellery",
    wearer: "her",
    price: null,
    description: "A mirrored pair of sweeping, pleated fan shapes in a warm gold tone.",
    image: "/products/jewellery/gold-fan-earrings.webp",
    featured: true,
  },
  {
    slug: "pearl-white-cuff",
    name: "Sculptural White Cuff",
    variant: "Pearl white · marbled finish",
    category: "jewellery",
    wearer: "her",
    price: null,
    description: "A broad open cuff with a softly marbled white finish and rounded profile.",
    image: "/products/jewellery/pearl-white-cuff.webp",
    featured: true,
  },
  {
    slug: "polka-dot-drop-earrings",
    name: "Polka Dot Drop Earrings",
    variant: "Black and white · geometric drop",
    category: "jewellery",
    wearer: "her",
    price: null,
    description: "Square white tops meet rounded diamond-shaped drops with bold black dots.",
    image: "/products/jewellery/polka-dot-drop-earrings.webp",
    featured: true,
  },
  {
    slug: "amber-ivory-bangles",
    name: "Amber & Ivory Bangles",
    variant: "Two colours shown",
    category: "jewellery",
    wearer: "her",
    price: null,
    description: "Rounded bangles pictured in translucent amber and softly marbled ivory. Ask about your preferred colour.",
    image: "/products/jewellery/amber-ivory-bangles.webp",
  },
  {
    slug: "patterned-button-earrings",
    name: "Patterned Button Earrings",
    variant: "Red and monochrome styles shown",
    category: "jewellery",
    wearer: "her",
    price: null,
    description: "Fabric-look round earrings pictured in red and black, and black and white patterns. Ask about your preferred style.",
    image: "/products/jewellery/patterned-button-earrings.webp",
  },
  {
    slug: "gold-sculptural-earrings",
    name: "Sculptural Gold Earrings",
    variant: "Two designs shown",
    category: "jewellery",
    wearer: "her",
    price: null,
    description: "Two distinct gold-tone designs are pictured: folded hoop shapes and petal-like studs. Ask about the design you prefer.",
    image: "/products/jewellery/gold-sculptural-earrings.webp",
  },
  {
    slug: "silver-sphere-earrings",
    name: "Silver Sphere Earrings",
    variant: "Smooth and ribbed styles shown",
    category: "jewellery",
    wearer: "her",
    price: null,
    description: "Polished silver-tone spheres pictured in smooth and ribbed finishes. Ask about your preferred finish.",
    image: "/products/jewellery/silver-sphere-earrings.webp",
  },
  {
    slug: "colourful-hoop-earrings",
    name: "Colourful Sculptural Hoops",
    variant: "Cobalt and green styles shown",
    category: "jewellery",
    wearer: "her",
    price: null,
    description: "Rounded statement hoops pictured in vivid cobalt blue and translucent green. Ask about your preferred colour.",
    image: "/products/jewellery/colourful-hoop-earrings.webp",
    featured: true,
  },
];

export const featuredProducts = (): Product[] => PRODUCTS.filter((p) => p.featured);

export const isCategoryKey = (value: string): value is CategoryKey =>
  CATEGORY_KEYS.includes(value as CategoryKey);

export const productsByCategory = (category: CategoryKey): Product[] =>
  PRODUCTS.filter((product) => product.category === category);

export const productBySlug = (category: CategoryKey, slug: string): Product | undefined =>
  PRODUCTS.find((product) => product.category === category && product.slug === slug);
