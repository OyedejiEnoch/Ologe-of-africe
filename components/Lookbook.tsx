"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// An airy 4×4 hairline grid on cream with looks placed in uneven cells and
// plenty left empty — rhythm by imbalance. On entry the grid lines draw
// themselves in, then each photo wipes open from the bottom.
type Cell = { src: string; alt: string; place: string; mobile: string };

const LOOKS: Cell[] = [
  { src: "/media/lookbook/founder-yellow-frames.jpeg", alt: "A woman smiling in bold yellow-lens frames and a colourful patterned jacket", place: "md:col-start-4 md:row-start-1 md:row-span-2", mobile: "aspect-[4/5]" },
  { src: "/media/lookbook/founder-patterned-look.jpeg", alt: "A woman smiling in a colourful African print dress with black lace sleeves", place: "md:col-start-2 md:row-start-2", mobile: "aspect-[4/5]" },
  { src: "/media/lookbook/founder-yellow-frames-close.jpeg", alt: "A close portrait of a woman smiling in oversized yellow-lens frames", place: "md:col-start-1 md:row-start-3 md:row-span-2", mobile: "aspect-[4/5]" },
  { src: "/media/hero.png", alt: "Four women in patterned dress and headwraps", place: "col-span-2 md:col-start-3 md:col-span-2 md:row-start-3", mobile: "aspect-[16/9]" },
  { src: "/media/stills/hat-wide.jpg", alt: "A wide woven hat against a dark backdrop", place: "md:col-start-4 md:row-start-4", mobile: "aspect-[3/2]" },
];

const GRID_STEPS = [0, 25, 50, 75, 100];

export default function Lookbook() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const lines = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 75%" } });
      lines
        .from("[data-line-v]", { scaleY: 0, transformOrigin: "top", duration: 1.2, ease: "power2.inOut", stagger: 0.08 }, 0)
        .from("[data-line-h]", { scaleX: 0, transformOrigin: "left", duration: 1.2, ease: "power2.inOut", stagger: 0.08 }, 0.1);

      // Each photo opens as it arrives, so on a tall phone layout the lower
      // looks aren't spent before they're on screen.
      gsap.utils.toArray<HTMLElement>("[data-look-cell]").forEach((cell) => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: cell, start: "top 88%" } });
        tl.fromTo(
          cell,
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "power3.inOut" },
          0.35
        ).from(cell.querySelector("img"), { scale: 1.18, duration: 1.6, ease: "power3.out" }, 0.35);
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="lookbook" className="bg-cream px-6 py-[var(--spacing-section)] md:px-10">
      <div
        ref={ref}
        className="relative mx-auto grid max-w-[1400px] grid-flow-dense grid-cols-2 gap-3 md:grid-cols-4 md:gap-0 md:[grid-template-rows:repeat(4,clamp(11rem,17vw,16rem))]"
      >
        {/* Hairline grid (desktop) */}
        <div aria-hidden className="pointer-events-none absolute inset-0 z-10 hidden md:block">
          {GRID_STEPS.map((x) => (
            <span
              key={`v${x}`}
              data-line-v
              className="absolute top-0 h-full w-px bg-line"
              style={{ left: `calc(${x}% - ${x === 100 ? 1 : 0}px)` }}
            />
          ))}
          {GRID_STEPS.map((y) => (
            <span
              key={`h${y}`}
              data-line-h
              className="absolute left-0 h-px w-full bg-line"
              style={{ top: `calc(${y}% - ${y === 100 ? 1 : 0}px)` }}
            />
          ))}
        </div>

        <div className="col-span-2 pb-8 md:col-start-1 md:row-start-1 md:p-8 md:pb-0">
          <p className="eyebrow text-gold-deep">Lookbook</p>
          <h2 className="font-display mt-4 text-[clamp(2.2rem,4vw,3.6rem)] text-ink">
            Styled with <em className="italic">intention.</em>
          </h2>
          <p className="mt-4 max-w-[38ch] text-ink-soft">
            Fashion as a language — a few ways to wear the house, put together the OLÒGE way.
          </p>
          <a
            href="/lookbook"
            className="mt-6 inline-block text-sm font-medium text-ink underline-offset-8 hover:underline"
          >
            View the lookbook →
          </a>
        </div>

        {LOOKS.map((l) => (
          <figure key={l.src} data-look-cell className={`relative overflow-hidden ${l.place}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={l.src}
              alt={l.alt}
              className={`w-full object-cover md:absolute md:inset-0 md:h-full ${l.mobile} md:aspect-auto`}
            />
          </figure>
        ))}

        <p className="hidden self-end p-8 font-display text-sm italic text-muted md:col-start-2 md:row-start-4 md:block">
          Look 03 — the gold hour.
        </p>
      </div>
    </section>
  );
}
