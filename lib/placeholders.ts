// Homepage content that will move into Payload: the category reel and the
// GRACE values.

export type Category = {
  key: string;
  label: string;
  caption: string;
  image: string;
};

// Her ranges, in the order she named them. Categories will become
// owner-managed records in Payload; this is the seed order.
export const CATEGORIES: Category[] = [
  { key: "accessories", label: "Accessories", caption: "The finishing note", image: "/media/categories/accessories.jpg" },
  { key: "eyewear", label: "Eyewear", caption: "For him & her", image: "/media/categories/eyewear.jpg" },
  { key: "shoes", label: "Shoes", caption: "Every step, considered", image: "/media/categories/shoes.jpg" },
  { key: "bags", label: "Bags", caption: "Carried with grace", image: "/media/categories/bags.jpg" },
  { key: "fascinators", label: "Fascinators", caption: "The crown of an outfit", image: "/media/categories/fascinators.jpg" },
];

export const GRACE: { letter: string; word: string; line: string }[] = [
  { letter: "G", word: "Gratitude", line: "For the eyes that see you, and the days that let you dress for them." },
  { letter: "R", word: "Rare", line: "Pieces chosen to be uncommon — the way you already are." },
  { letter: "A", word: "Authentic", line: "Style as a language, spoken only in your own voice." },
  { letter: "C", word: "Confident", line: "To be bold, unapologetic, and entirely at ease." },
  { letter: "E", word: "Elegant", line: "Where restraint becomes its own kind of luxury." },
];
