// Business contact details. The live values are edited by the owner in
// /admin → Settings → Business details (read through lib/cms.ts). These
// defaults apply until then: empty, so every "Order on WhatsApp" / "Message us"
// link falls back to the contact page rather than a number that isn't hers.
export type SiteSettings = {
  whatsapp: string; // international format, no + or spaces, e.g. 234XXXXXXXXXX
  instagram: string;
  email: string;
};

export const SITE: SiteSettings = {
  whatsapp: "",
  instagram: "",
  email: "",
};

export function orderHref(piece?: { name: string; variant?: string }, whatsapp: string = SITE.whatsapp): string {
  if (!whatsapp) return "/contact";
  const text = piece
    ? `Hi OLÒGE! I'd love to order the ${piece.name}${piece.variant ? ` (${piece.variant})` : ""}.`
    : "Hi OLÒGE!";
  return `https://wa.me/${whatsapp}?text=${encodeURIComponent(text)}`;
}
