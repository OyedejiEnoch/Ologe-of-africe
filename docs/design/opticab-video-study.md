# OLÒGE · product as editorial object

## What the recording shows

The 28-second phone recording shows one Opticab website inside a social reel. A pale, illustrated opening uses an oversized phrase behind a pair of glasses. The next section isolates frames on a white ground with a short, bold heading. Later sections alternate a three-panel product story, an editorial image with short notes, and a four-point brand statement. The reel cuts between some views, so its cuts are not evidence of page transitions on the site.

The useful principle for OLÒGE is clear: give one object room to hold attention, then let the rest of the range appear as a quieter catalog. The existing OLÒGE homepage already has a strong cinematic hero and a horizontal category sequence. This adaptation belongs on the Jewellery collection page, where the new pieces need a distinct introduction. It does not replace the homepage hero or imitate Opticab's copy and layouts.

## Build specification

- **Audience:** style-conscious visitors browsing women's jewellery. **Mood:** sculptural, warm, poised. **Signature:** one oversized word behind a single featured pair of earrings, revealed as the product moves gently through the viewport.
- **Stack:** existing Next.js 15, Tailwind 4 and GSAP installation. Add one client component to the Jewellery category only. Use the owner's `/products/jewellery/gold-fan-earrings.webp` image. Do not add remote media or packages.
- **Palette and type:** retain the existing cream, paper, ink and gold tokens, Fraunces display and Hanken Grotesk body. The stage uses `bg-paper`; the object photograph uses `mix-blend-multiply` so its white ground integrates with the paper.
- **Desktop layout:** full-width paper section below the category tabs, with a centered 1400px container. A 12-column grid gives the text five columns and the stage seven. Vertical padding is 96px. The heading uses `clamp(3.2rem, 5.4vw, 5.8rem)`, line-height `0.95` and tracking `-0.035em`; body is 18px at 1.6 line-height. The stage is square. The ghost word is low-contrast and stays behind the image. The product remains the focal point.
- **Mobile layout:** a single column, 24px side padding and 56px vertical padding. Text comes before a square product stage. The heading scales to 2.7rem, and the CTA remains at least 44px high. The product is never clipped by the word.
- **Copy:** eyebrow `THE FINISHING GESTURE`; heading `A little drama. Worn your way.`; body `A sculptural pair to bring a look into focus. Explore the jewellery edit, then ask us about the piece that catches your eye.`; CTA `See the fan earrings` linking to the actual product route. Avoid material and availability claims.
- **Motion:** on desktop with motion permitted, the large background word drifts horizontally by 24px and the product image rises by 32px across the section's viewport passage, with linear scroll progress. The text uses the site's existing reveal layer. On mobile and with reduced motion, everything rests in its final position. No autoplay loop or additional cursor effect.
- **Acceptance:** the image loads, the link reaches the correct product, the catalog remains below, no horizontal overflow appears at 390px, the object stays readable against the background, and no motion hides content.
