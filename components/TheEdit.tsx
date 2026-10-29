"use client";

import { PRODUCTS } from "@/lib/catalog";
import ProductPlate from "@/components/ProductPlate";

// A hairline cabinet of every piece: 4×2 on desktop, 2-up on phones, built from
// the shared ProductPlate (plates rise in via the site Motion layer). Price
// lives once in the header (everything is on request) instead of on every plate.
export default function TheEdit() {
  return (
    <section className="bg-cream px-6 pt-[var(--spacing-section)] md:px-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="eyebrow text-gold-deep">The Edit</p>
            <h2 className="font-display mt-4 text-[clamp(2.4rem,5vw,4.6rem)] text-ink">
              Pieces worth a <em className="italic">second look.</em>
            </h2>
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <p className="text-ink-soft">
              Every piece is priced on request and confirmed with you personally, in chat, before anything is paid.
            </p>
            <a
              href="/shop"
              className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-ink underline decoration-line underline-offset-8 transition-colors hover:decoration-ink"
            >
              Shop every piece <span aria-hidden>→</span>
            </a>
          </div>
        </div>

        <div
          className="mt-14 grid grid-cols-2 gap-px border border-line bg-line md:mt-20 md:grid-cols-4"
        >
          {PRODUCTS.map((p, i) => (
            <ProductPlate key={p.slug} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
