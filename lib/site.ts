// Business contact details. Left empty until the client confirms them — every
// "Order on WhatsApp" / "Message us" link falls back to the contact page
// rather than pointing at a number that isn't hers.
export const SITE = {
  whatsapp: "", // international format, no + or spaces, e.g. 234XXXXXXXXXX
  instagram: "",
  email: "",
};

export function orderHref(piece?: { name: string; variant?: string }): string {
  if (!SITE.whatsapp) return "/contact";
  const text = piece
    ? `Hi OLÒGE! I'd love to order the ${piece.name}${piece.variant ? ` (${piece.variant})` : ""}.`
    : "Hi OLÒGE!";
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
}
