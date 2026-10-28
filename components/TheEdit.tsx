"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CATEGORY_LABEL, featuredProducts, formatPrice } from "@/lib/catalog";
import { orderHref } from "@/lib/site";

// Spotlight list: one piece per row — name, cut-out, price + order. Each row is
// scrubbed against its trip through the viewport, so the row crossing the
// middle sits at full strength while the ones above and below ghost out.
export default function TheEdit() {
  const listRef = useRef<HTMLDivElement>(null);
  const pieces = featuredProducts();

  useEffect(() => {
    const list = listRef.current;
    if (!list || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-edit-row]").forEach((row) => {
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: row, start: "top bottom", end: "bottom top", scrub: true },
        });
        // enter (0 → .4) · hold at full strength (.4 → .6) · leave (.6 → 1)
        tl.fromTo(row, { opacity: 0.08 }, { opacity: 1, duration: 0.4 }, 0)
          .fromTo(row.querySelector("[data-edit-img]"), { y: 48, scale: 0.9 }, { y: 0, scale: 1, duration: 0.4 }, 0)
          .fromTo(row.querySelector("[data-edit-name]"), { x: -28 }, { x: 0, duration: 0.4 }, 0)
          .fromTo(row.querySelector("[data-edit-buy]"), { x: 28 }, { x: 0, duration: 0.4 }, 0)
          .to(row, { opacity: 0.08, duration: 0.4 }, 0.6);
      });
    }, list);
    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-cream px-6 pt-[var(--spacing-section)] md:px-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-gold-deep">The Edit</p>
            <h2 className="font-display mt-4 text-[clamp(2.2rem,4.6vw,4rem)] text-ink">
              Pieces worth a <em className="italic">second look.</em>
            </h2>
          </div>
          <a
            href="/shop"
            className="text-sm font-medium text-ink underline-offset-8 hover:underline"
          >
            Shop every piece →
          </a>
        </div>

        <div ref={listRef} className="mt-16 md:mt-24">
          {pieces.map((p) => (
            <article
              key={p.slug}
              data-edit-row
              className="grid grid-cols-1 items-center gap-6 py-14 md:min-h-[46vh] md:grid-cols-12 md:gap-8 md:py-10"
            >
              <div data-edit-name className="md:col-span-3">
                <p className="eyebrow">{CATEGORY_LABEL[p.category]}</p>
                <h3 className="font-display mt-3 text-[clamp(2rem,3.4vw,3.1rem)] text-ink">
                  {p.name}
                </h3>
                <p className="mt-2 font-display italic text-muted">{p.variant}</p>
              </div>

              <div className="flex flex-col items-center md:col-span-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  data-edit-img
                  src={p.image}
                  alt={`${p.name} — ${p.variant}`}
                  className={`w-auto max-w-full object-contain ${
                    p.category === "fascinators" ? "h-[240px] md:h-[300px]" : "h-[130px] md:h-[190px] mix-blend-multiply"
                  }`}
                />
                <p className="mt-5 max-w-[42ch] text-center text-sm leading-relaxed text-muted">
                  {p.description}
                </p>
              </div>

              <div
                data-edit-buy
                className="flex items-center justify-between gap-6 md:col-span-3 md:flex-col md:items-end md:justify-center md:text-right"
              >
                <div>
                  <p className="font-display text-[clamp(1.7rem,2.6vw,2.4rem)] text-ink">
                    {formatPrice(p.price)}
                  </p>
                  <p className="mt-1 hidden font-display text-sm italic text-muted md:block">
                    Delivery confirmed in chat
                  </p>
                </div>
                <a
                  href={orderHref(p)}
                  className="shrink-0 rounded-full bg-ink px-6 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-cream transition-transform hover:-translate-y-0.5 md:mt-5"
                >
                  Order on WhatsApp
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
