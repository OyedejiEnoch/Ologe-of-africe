"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GRACE } from "@/lib/placeholders";

// The dark beat of the page. The section pins over a ghosted portrait of the founder and
// the five GRACE cards slide up one at a time, each new card stacking on the
// last so the earlier ones peek out above it, smaller and further back.
// Layout is decided in CSS (motion-safe = stacked/pinned, motion-reduce = a
// plain column), so the pin is created on mount in page order.
const PEEK = 22; // px each earlier card rises above the next
const SHRINK = 0.05; // scale lost per card of depth

export default function GraceReveal() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-grace-card]");
      gsap.set(cards.slice(1), { y: () => window.innerHeight });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${window.innerHeight * (cards.length - 1) * 0.85}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });

      tl.fromTo("[data-grace-ghost]", { scale: 1.12 }, { scale: 1, duration: cards.length - 1 }, 0);
      cards.forEach((card, i) => {
        if (i === 0) return;
        const at = i - 1;
        tl.to(card, { y: 0, duration: 1 }, at);
        for (let j = 0; j < i; j++) {
          const depth = i - j;
          tl.to(cards[j], { y: -PEEK * depth, scale: 1 - SHRINK * depth, duration: 1 }, at);
        }
      });
      tl.to({}, { duration: 0.35 }); // let the last card rest before releasing
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-ink text-cream motion-safe:h-[100svh] motion-reduce:py-[var(--spacing-section)]"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        data-grace-ghost
        src="/media/founder/founder-gate.jpg"
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover object-[30%_18%] opacity-[0.32]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/30 to-ink/80" />

      <div className="relative flex h-full flex-col px-6 pt-24 md:px-10 md:pt-28">
        <div className="mx-auto w-full max-w-[1400px]">
          <p className="eyebrow text-gold">What we want you to feel</p>
          <h2 className="font-display mt-4 text-[clamp(2rem,4.2vw,3.6rem)]">
            Five letters. <em className="italic text-gold">One feeling.</em>
          </h2>
        </div>

        <div className="relative mx-auto mt-14 w-full max-w-[720px] motion-safe:flex-1 motion-safe:mt-[clamp(5.5rem,15vh,9rem)]">
          {GRACE.map((g, i) => (
            <article
              key={g.letter}
              data-grace-card
              className="grid origin-top grid-cols-[auto_1fr] items-center gap-6 border border-line bg-cream p-8 text-ink md:gap-12 md:p-14 motion-safe:absolute motion-safe:inset-x-0 motion-safe:top-0 motion-reduce:mb-6"
            >
              <span className="font-display text-[clamp(5rem,12vw,9rem)] leading-none text-gold">
                {g.letter}
              </span>
              <div>
                <p className="eyebrow">
                  {String(i + 1).padStart(2, "0")} / {String(GRACE.length).padStart(2, "0")}
                </p>
                <h3 className="font-display mt-3 text-[clamp(1.8rem,3.4vw,2.8rem)]">{g.word}</h3>
                <p className="mt-3 max-w-[36ch] text-ink-soft">{g.line}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
