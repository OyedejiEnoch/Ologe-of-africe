# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Style-conscious shoppers discovering distinctive fashion accessories and eyewear, with a current emphasis on women’s styling and pieces that can be ordered through a personal WhatsApp conversation.

## Product Purpose

OLÒGE of Africa presents a curated fashion house online, helping visitors discover individual pieces, understand how they are worn, and move from interest to a personally confirmed order.

## Positioning

The site pairs editorial fashion storytelling with a direct, human ordering process rather than a conventional anonymous cart-and-checkout flow.

## Operating Context

Visitors browse the house, move through product categories and individual pieces, then enquire through WhatsApp to confirm availability, price, delivery, and reservation before payment.

The site also needs an owner-facing Payload admin inside the same Next.js application. The planned content store is MongoDB Atlas, with Cloudflare R2 for uploaded images. Hosting and the Atlas choice still need final confirmation before setup.

## Capabilities and Constraints

- The current catalog includes eyewear and fascinators; accessories, shoes, and bags remain valid categories without published products yet.
- The six current eyewear products appear in both “for her” and “for him” views until the owner assigns more specific audiences.
- Story, Lookbook and Contact have full public routes. Lookbook photos link to categories where relevant; no specific product is claimed as worn without a confirmed photo match.
- The Contact form is a disabled preview until Payload can save enquiries. It must never report a successful submission before that integration exists.
- Prices are not confirmed and must remain “Price on request.”
- Product ordering is an enquiry flow, not an online checkout.
- The existing application is a Next.js App Router site and must remain responsive across desktop and mobile web.
- The WhatsApp destination is not yet configured; calls to action must keep the existing safe fallback until a number is supplied.

## Brand Commitments

- Preserve the name “OLÒGE of Africa,” including its diacritics.
- Preserve the established editorial voice: warm, composed, culturally grounded, and fashion-led.
- Preserve the existing African-luxury visual identity and the client’s supplied imagery.
- Avoid invented prices, stock levels, testimonials, provenance claims, or delivery promises.

## Evidence on Hand

- Eight real product records and product photographs in `lib/catalog.ts` and `public/products/`.
- Category imagery in `public/media/categories/`.
- Client-supplied editorial portraits already used throughout the home page.
- No confirmed prices, reviews, detailed material specifications, or live inventory feed are available.

## Product Principles

1. Let the piece lead; interface chrome should support discovery rather than compete with the imagery.
2. Keep the path from browsing to personal enquiry obvious at every decision point.
3. Treat unknown commercial facts honestly instead of filling gaps with generic ecommerce claims.
4. Extend the house’s editorial character consistently across browsing and product detail surfaces.
5. Make category navigation useful even while the catalog is still growing.

## Open Decisions

- Confirm the public WhatsApp number before launch.
- Supply prices, availability, material details, dimensions, and care instructions when ready.
- Confirm MongoDB Atlas and the hosting provider before the backend phase.
- Supply founder-approved long-form Story copy and confirmed photo-to-product associations when available.
