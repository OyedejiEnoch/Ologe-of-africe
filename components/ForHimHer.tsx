"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Eyewear split into two equal tiles. "For him" shows a product plate until the
// client sends menswear photography — the tile and link stay the same.
export default function ForHimHer() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from("[data-tile]", {
        y: 90,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: { trigger: el, start: "top 80%" },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-cream px-6 py-[var(--spacing-section)] md:px-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="mx-auto max-w-[640px] text-center">
          <p className="eyebrow text-gold-deep">Eyewear</p>
          <h2 className="font-display mt-4 text-[clamp(2.2rem,4.6vw,4rem)] text-ink">
            Frames for <em className="italic">her.</em> Frames for <em className="italic">him.</em>
          </h2>
          <p className="mx-auto mt-5 max-w-[44ch] text-ink-soft">
            Cat-eyes, squares and rounds — chosen to frame a face, not hide it.
          </p>
        </div>

        <div ref={ref} className="mt-16 grid gap-6 md:grid-cols-2">
          <a
            data-tile
            href="/shop/eyewear?for=her"
            className="group relative block overflow-hidden bg-paper"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/media/eyewear/women-blue-look.jpeg"
              alt="A woman smiling in oversized frames and a blue patterned outfit"
              className="aspect-[4/5] w-full object-cover object-top transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-7 text-cream md:p-10">
              <p className="eyebrow text-cream/70">For her</p>
              <p className="font-display mt-2 text-[clamp(1.6rem,2.6vw,2.2rem)]">
                Shop women’s frames <span aria-hidden>→</span>
              </p>
            </div>
          </a>

          <a
            data-tile
            href="/shop/eyewear?for=him"
            className="group relative flex aspect-[4/5] flex-col items-center justify-center overflow-hidden bg-paper"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/products/oval-gunmetal.jpg"
              alt="Gunmetal oval sunglasses with green lenses"
              className="w-[72%] mix-blend-multiply transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]"
            />
            <div className="absolute bottom-0 left-0 p-7 text-ink md:p-10">
              <p className="eyebrow">For him</p>
              <p className="font-display mt-2 text-[clamp(1.6rem,2.6vw,2.2rem)]">
                Shop men’s frames <span aria-hidden>→</span>
              </p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
