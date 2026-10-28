"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CATEGORIES } from "@/lib/placeholders";

// SCROLL-THROUGH #1 — the section pins and the category reel pans sideways
// as you scroll down: "browse the house" as one continuous editorial move.
export default function CategoryFilmstrip() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    if (window.matchMedia("(max-width: 767px)").matches) return; // phones use the swipe rail

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const distance = track.scrollWidth - window.innerWidth;
      gsap.to(track, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="shop" className="relative overflow-hidden bg-cream py-20 md:py-0">
      <div className="px-6 md:pointer-events-none md:absolute md:left-10 md:top-10 md:z-10 md:px-0">
        <p className="eyebrow text-gold-deep">The House</p>
        <h2 className="font-display mt-2 text-[clamp(1.6rem,3vw,2.6rem)] text-ink">
          Browse every range
        </h2>
      </div>

      {/* Phones: a native swipe rail with snap. Desktop: overflow is released
          and the pinned scroll pans the track instead. */}
      <div className="mt-10 snap-x snap-mandatory scroll-pl-6 overflow-x-auto [scrollbar-width:none] md:mt-0 md:overflow-visible [&::-webkit-scrollbar]:hidden">
        <div
          ref={trackRef}
          className="flex w-max gap-4 px-6 md:h-[100svh] md:items-center md:gap-10 md:px-10"
        >
          {/* Leading spacer so the first card clears the section label */}
          <div className="hidden w-[22vw] shrink-0 md:block" aria-hidden />

          {CATEGORIES.map((c, i) => (
            <a
              key={c.key}
              href={`/shop/${c.key}`}
              className="group block w-[78vw] shrink-0 snap-start md:w-[34vw]"
            >
              <div className="overflow-hidden bg-paper">
                <img
                  src={c.image}
                  alt={c.label}
                  className="aspect-[4/5] w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105 md:aspect-auto md:h-[58vh]"
                />
              </div>
              <div className="mt-4 flex flex-col gap-1 md:flex-row md:items-end md:justify-between md:gap-4">
                <div>
                  <span className="eyebrow">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="font-display mt-1 text-[1.7rem] text-ink md:text-3xl">{c.label}</h3>
                </div>
                <p className="whitespace-nowrap text-sm text-muted transition-colors group-hover:text-ink md:pb-1">
                  {c.caption} <span aria-hidden>→</span>
                </p>
              </div>
            </a>
          ))}

          <div className="hidden w-[10vw] shrink-0 md:block" aria-hidden />
        </div>
      </div>
    </section>
  );
}
