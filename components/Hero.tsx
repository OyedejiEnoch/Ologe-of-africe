"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Vero-style hero: the montage plays full-bleed with a small centered wordmark.
// On scroll the whole frame recedes — scaling down into a rounded card — while
// the next section rises up over it (the section below is z-10 on cream; this
// hero is sticky at z-0, so the page scrolls over the shrinking video).
// Scale is scrubbed over numeric scroll bounds (0 → one viewport) rather than a
// trigger element: a position:sticky trigger mis-measures and snaps instantly,
// and Lenis already drives ScrollTrigger.update via the ticker in SmoothScroll.
export default function Hero() {
  const frameRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduced(reduce);
    const frame = frameRef.current;
    if (reduce || !frame) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        frame,
        { scale: 1, borderRadius: 0 },
        {
          scale: 0.9,
          borderRadius: 34,
          ease: "none",
          scrollTrigger: {
            start: 0,
            end: () => window.innerHeight,
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="sticky top-0 z-0 h-[100svh] w-full overflow-hidden bg-cream">
      <div
        ref={frameRef}
        className="relative h-full w-full overflow-hidden will-change-transform"
        style={{ transformOrigin: "center 42%" }}
      >
        {reduced ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/media/hero.png"
            alt="OLÒGE of Africa — four women in richly patterned African dress and headwraps"
            className="absolute inset-0 h-full w-full object-cover object-[65%_center]"
          />
        ) : (
          <video
            className="absolute inset-0 h-full w-full object-cover object-[65%_center]"
            autoPlay
            muted
            loop
            playsInline
            poster="/media/hero-poster.jpg"
          >
            <source src="/media/hero.mp4" type="video/mp4" />
          </video>
        )}

        {/* Even scrim so the white wordmark reads clearly, deepened top and
            bottom for the nav and scroll cue. Still lets the footage show. */}
        <div className="absolute inset-0 bg-ink/60" />
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-ink/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-ink/65 to-transparent" />

        {/* Centered wordmark + tagline */}
        <div className="relative flex h-full flex-col items-center justify-center px-6 text-center text-cream">
          <p className="eyebrow mb-8 text-cream/70">Fashion House · Africa</p>
          <h1 className="font-display text-[clamp(3.5rem,11vw,9rem)] leading-none tracking-tight">
            OLÒGE
          </h1>
          <p className="eyebrow mt-4 text-[0.7rem] tracking-[0.5em] text-gold">
            of africa
          </p>
          <p className="mt-8 font-display text-[clamp(1rem,2.2vw,1.5rem)] italic text-cream/90">
            Fashion meets grace, with little to no effort.
          </p>
        </div>

        <a
          href="#story"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-cream/60 transition-colors hover:text-cream"
          aria-label="Scroll to explore"
        >
          ↓
        </a>
      </div>
    </section>
  );
}
