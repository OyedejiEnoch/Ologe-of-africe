"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// A quiet product stage between the collection masthead and the full cabinet.
// The object and its ghost word move only a few pixels as the section passes.
export default function JewellerySpotlight() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const word = wordRef.current;
    const image = imageRef.current;
    if (!section || !word || !image) return;

    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const trigger = { trigger: section, start: "top bottom", end: "bottom top", scrub: 1 };
      gsap.fromTo(word, { x: -24 }, { x: 24, ease: "none", scrollTrigger: trigger });
      gsap.fromTo(image, { y: 32 }, { y: -32, ease: "none", scrollTrigger: trigger });
    });
    return () => media.revert();
  }, []);

  return (
    <section ref={sectionRef} aria-label="A closer look at OLÒGE jewellery" className="overflow-hidden bg-paper text-ink">
      <div className="mx-auto grid max-w-[1400px] items-center gap-9 px-6 py-14 md:grid-cols-12 md:gap-12 md:px-10 md:py-24">
        <div className="relative z-10 md:col-span-5">
          <p className="eyebrow text-gold-deep">The finishing gesture</p>
          <h2 className="font-display mt-5 max-w-[10ch] text-[clamp(2.7rem,5.4vw,5.8rem)] leading-[0.95] tracking-[-0.035em]">
            A little drama.<br /><em className="italic">Worn your way.</em>
          </h2>
          <p className="mt-7 max-w-[35ch] text-base leading-[1.6] text-ink-soft md:text-lg">
            A sculptural pair to bring a look into focus. Explore the jewellery edit, then ask us about the piece that catches your eye.
          </p>
          <Link
            href="/shop/jewellery/gold-fan-earrings"
            className="pressable mt-8 inline-flex min-h-12 items-center gap-3 rounded-full border border-ink px-6 text-xs font-medium uppercase tracking-[0.15em] text-ink hover:bg-ink hover:text-cream"
          >
            See the fan earrings <span aria-hidden>→</span>
          </Link>
        </div>

        <Link
          href="/shop/jewellery/gold-fan-earrings"
          aria-label="Explore the fan sculptural earrings"
          className="group relative isolate block aspect-square overflow-hidden bg-cream focus-visible:outline-offset-[-4px] md:col-span-7"
        >
          <span
            ref={wordRef}
            aria-hidden="true"
            className="font-display pointer-events-none absolute inset-x-0 top-[4%] z-20 block text-center text-[clamp(5.5rem,12vw,11rem)] leading-none tracking-[-0.08em] text-ink/[0.07]"
          >
            ADORN
          </span>
          <div ref={imageRef} className="absolute inset-0 z-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/products/jewellery/gold-fan-earrings.webp"
              alt="Gold-tone sculptural earrings in sweeping pleated fan shapes"
              loading="lazy"
              className="h-full w-full object-contain mix-blend-multiply transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transform-none md:group-hover:scale-[1.025]"
            />
          </div>
          <span className="eyebrow absolute bottom-5 left-5 z-20 text-ink-soft md:bottom-7 md:left-7">01 / Fan sculptural earrings</span>
          <span aria-hidden className="absolute bottom-5 right-5 z-20 text-xl text-ink transition-transform duration-300 group-hover:translate-x-1 md:bottom-7 md:right-7">↗</span>
        </Link>
      </div>
    </section>
  );
}
