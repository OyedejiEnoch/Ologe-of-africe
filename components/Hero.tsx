"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CATEGORY_LABEL, type CategoryKey } from "@/lib/catalog";

// Cover hero: the montage opens through a narrow portrait aperture on cream
// (a door swinging open) and widens to full bleed while the footage settles
// from a slight push-in. The OLÒGE wordmark then rises letter by letter along
// the bottom edge, edge to edge, like a magazine masthead set at the foot.
// On scroll the frame still recedes into a rounded card while the next
// section rides over it (this hero is sticky at z-0; the page below is z-10).
// Scroll is scrubbed over numeric bounds (0 → one viewport): a sticky trigger
// mis-measures, and Lenis already drives ScrollTrigger via SmoothScroll.

// Ranges with real pieces lead; the rest are still valid category pages.
const INDEX: CategoryKey[] = ["eyewear", "fascinators", "bags", "shoes", "accessories"];
const WORD = ["O", "L", "Ò", "G", "E"];
const EXPO = "expo.out";

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduced(reduce);
    const root = rootRef.current;
    const frame = frameRef.current;
    if (reduce || !root || !frame) {
      root?.classList.add("hero-settled");
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const narrow = window.innerWidth < 768;
    const ctx = gsap.context(() => {
      const intro = gsap.timeline({
        defaults: { ease: EXPO },
        onComplete: () => root.classList.add("hero-settled"),
      });
      intro
        .fromTo(
          ".hero-aperture",
          { clipPath: narrow ? "inset(18% 20% 30% 20%)" : "inset(14% 37% 24% 37%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6 },
          0.2
        )
        .fromTo(".hero-video", { scale: 1.22 }, { scale: 1, duration: 2.2 }, 0.2)
        .fromTo(".hero-scrim", { opacity: 0 }, { opacity: 1, duration: 1.2 }, 0.9)
        .fromTo(
          ".hero-letter",
          // y: 0 clears the CSS start offset, which GSAP would otherwise
          // parse as a px translate and keep alongside yPercent.
          { y: 0, yPercent: 108 },
          { y: 0, yPercent: 0, duration: 1.2, stagger: 0.07 },
          1.0
        )
        .fromTo(
          ".hero-rise",
          { opacity: 0, y: 18, filter: "blur(8px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, stagger: 0.08, ease: "power3.out" },
          1.45
        );

      gsap.fromTo(
        frame,
        { scale: 1, borderRadius: 0 },
        {
          scale: 0.9,
          borderRadius: 34,
          ease: "none",
          immediateRender: false,
          scrollTrigger: { start: 0, end: () => window.innerHeight, scrub: true, invalidateOnRefresh: true },
        }
      );
      // The masthead drifts up a touch faster than the frame recedes.
      gsap.to(".hero-mast", {
        yPercent: -18,
        ease: "none",
        scrollTrigger: { start: 0, end: () => window.innerHeight, scrub: true, invalidateOnRefresh: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      aria-label="OLÒGE of Africa"
      className="hero sticky top-0 z-0 h-[100svh] w-full overflow-hidden bg-cream"
    >
      <div
        ref={frameRef}
        className="relative h-full w-full overflow-hidden will-change-transform"
        style={{ transformOrigin: "center 42%" }}
      >
        <div className="hero-aperture absolute inset-0 overflow-hidden bg-ink">
          {reduced ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src="/media/hero.png"
              alt="OLÒGE of Africa — four women in richly patterned African dress and headwraps"
              className="absolute inset-0 h-full w-full object-cover object-[50%_30%]"
            />
          ) : (
            <video
              className="hero-video absolute inset-0 h-full w-full object-cover object-[50%_30%]"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster="/media/hero-poster.jpg"
              aria-hidden
            >
              <source src="/media/hero.mp4" type="video/mp4" />
            </video>
          )}

          {/* Light touch: the footage carries the mood. Protection only where
              type sits — the nav band and the masthead at the foot. */}
          <div className="hero-scrim pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-ink/15" />
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/55 to-transparent" />
            <div
              className="absolute inset-x-0 bottom-0 h-[72%]"
              style={{
                background:
                  "linear-gradient(to top, rgb(26 18 16 / 0.88) 0%, rgb(26 18 16 / 0.55) 34%, rgb(26 18 16 / 0.12) 64%, transparent 100%)",
              }}
            />
          </div>
        </div>

        <div className="hero-mast absolute inset-x-0 bottom-0 px-[2.4vw] pb-5 text-cream md:pb-[1.6vw]">
          <div className="mb-6 grid grid-cols-1 items-end gap-8 px-[1.2vw] md:mb-[1.4vw] md:grid-cols-12">
            <div className="md:col-span-6 lg:col-span-5">
              <p className="hero-rise eyebrow mb-4 text-cream/75">Fashion house · Africa</p>
              <p className="hero-rise max-w-[22ch] font-display text-[clamp(1.5rem,2.4vw,2.25rem)] italic leading-[1.08] text-cream">
                Fashion meets grace, with little to no effort.
              </p>
              <div className="hero-rise mt-7 flex flex-wrap items-center gap-x-7 gap-y-4">
                <a
                  data-magnetic
                  href="/shop"
                  className="pressable group inline-flex min-h-12 items-center gap-3 rounded-full bg-cream px-7 text-xs font-medium uppercase tracking-[0.18em] text-ink hover:bg-gold hover:text-ink"
                >
                  Shop the house
                  <svg aria-hidden width="14" height="14" viewBox="0 0 14 14" className="transition-transform duration-300 group-hover:translate-x-0.5">
                    <path d="M1 7h11M8 3l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                </a>
                <a
                  href="/contact"
                  className="inline-flex min-h-11 items-center text-xs font-medium uppercase tracking-[0.18em] text-cream/85 underline decoration-cream/40 underline-offset-[0.5em] transition-colors hover:text-cream hover:decoration-gold"
                >
                  Enquire about a piece
                </a>
              </div>
            </div>

            <nav aria-label="Shop by range" className="hidden md:col-span-4 md:col-start-9 md:block lg:col-span-3 lg:col-start-10">
              <p className="hero-rise eyebrow mb-3 text-cream/60">The ranges</p>
              <ul className="divide-y divide-cream/15 border-y border-cream/15">
                {INDEX.map((key, i) => (
                  <li key={key} className="hero-rise">
                    <a
                      href={`/shop/${key}`}
                      className="group flex min-h-10 items-center justify-between py-2 text-sm text-cream/80 transition-colors hover:text-cream"
                    >
                      <span className="flex items-baseline gap-4">
                        <span className="font-body text-[0.65rem] tabular-nums tracking-[0.2em] text-gold">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {CATEGORY_LABEL[key]}
                      </span>
                      <span aria-hidden className="translate-x-[-4px] opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                        →
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <h1 className="relative flex items-end justify-between font-display text-[clamp(5.25rem,23.6vw,26rem)] font-[300] leading-[0.74] tracking-[-0.045em]">
            <span className="sr-only">OLÒGE of Africa</span>
            <span
              aria-hidden
              className="hero-rise eyebrow absolute -top-[0.5rem] right-[0.6vw] text-[0.62rem] tracking-[0.45em] text-gold md:top-[4.3vw] md:text-[0.72rem]"
            >
              of africa
            </span>
            {WORD.map((letter, i) => (
              <span key={i} aria-hidden className="inline-block overflow-hidden pt-[0.16em]">
                <span className="hero-letter inline-block">{letter}</span>
              </span>
            ))}
          </h1>
        </div>
      </div>
    </section>
  );
}
