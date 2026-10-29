"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GRACE } from "@/lib/placeholders";

// The dark beat of the page: G·R·A·C·E set as one giant acrostic across the
// width, echoing the hero masthead. The section pins over a ghosted portrait of
// the founder; as you scroll, each letter in turn lights white while its word
// and line rise in beneath it, and spent letters settle to a half-tone. The
// section is strictly black and white (founder, 28 Oct): no gold here.
// Motion-reduce gets every letter lit and the five words as a plain list.
const GHOST = "rgba(255, 255, 255, 0.12)";
const SPENT = "rgba(255, 255, 255, 0.4)";
const LIT = "#ffffff";

export default function GraceReveal() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const letters = gsap.utils.toArray<HTMLElement>("[data-grace-letter]");
      const words = gsap.utils.toArray<HTMLElement>("[data-grace-word]");
      gsap.set(letters, { color: GHOST });
      gsap.set(words, { autoAlpha: 0, y: 28 });
      gsap.set(letters[0], { color: LIT });
      gsap.set(words[0], { autoAlpha: 1, y: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut", duration: 1 },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${window.innerHeight * (GRACE.length - 1) * 0.7}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });

      tl.fromTo("[data-grace-ghost]", { scale: 1.12 }, { scale: 1, ease: "none", duration: GRACE.length - 1 }, 0);
      for (let i = 1; i < GRACE.length; i++) {
        const at = i - 1;
        tl.to(letters[i - 1], { color: SPENT }, at)
          .to(letters[i], { color: LIT }, at)
          .to(words[i - 1], { autoAlpha: 0, y: -28, duration: 0.5 }, at)
          .to(words[i], { autoAlpha: 1, y: 0, duration: 0.5 }, at + 0.5)
          .to("[data-grace-bar]", { scaleX: (i + 1) / GRACE.length }, at);
      }
      tl.to({}, { duration: 0.4 }); // let Elegant rest before releasing the pin
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="GRACE — what we want you to feel"
      className="relative overflow-hidden bg-black text-white motion-safe:h-[100svh] motion-reduce:py-[var(--spacing-section)]"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        data-grace-ghost
        src="/media/founder/founder-gate.jpg"
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover object-[30%_18%] opacity-[0.2] grayscale"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/55 to-black/95" />

      <div className="relative flex h-full flex-col px-6 py-24 md:px-10 md:py-28">
        <div className="mx-auto flex w-full max-w-[1400px] flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-white/60">What we want you to feel</p>
            <h2 className="font-display mt-4 text-[clamp(2rem,4.2vw,3.6rem)]">
              Five letters. <em className="italic">One feeling.</em>
            </h2>
          </div>
          <div aria-hidden className="hidden w-[min(22rem,30vw)] motion-safe:md:block">
            <div className="h-px w-full bg-white/15">
              <div data-grace-bar className="h-px w-full origin-left scale-x-[0.2] bg-white" />
            </div>
          </div>
        </div>

        <div className="mx-auto mt-12 w-full max-w-[1400px] motion-safe:flex motion-safe:flex-1 motion-safe:flex-col motion-safe:justify-center">
          {/* The acrostic. All lit in motion-reduce; scrubbed in motion-safe. */}
          <p
            aria-hidden
            className="flex justify-between font-display text-[clamp(5.5rem,19vw,20rem)] font-[300] leading-[0.82] tracking-[-0.04em] text-white"
          >
            {GRACE.map((g) => (
              <span key={g.letter} data-grace-letter>
                {g.letter}
              </span>
            ))}
          </p>

          <div className="mt-10 grid gap-8 motion-safe:relative motion-safe:mt-[clamp(2rem,5vh,3.5rem)] motion-safe:block motion-safe:h-[9.5rem] md:motion-reduce:grid-cols-5">
            {GRACE.map((g, i) => (
              <div
                key={g.word}
                data-grace-word
                className="motion-safe:not-first:invisible motion-safe:absolute motion-safe:inset-x-0 motion-safe:top-0 md:motion-safe:grid md:motion-safe:grid-cols-12 md:motion-safe:items-baseline md:motion-safe:gap-8"
              >
                <p className="eyebrow text-white/55 md:col-span-2">
                  {String(i + 1).padStart(2, "0")} / {String(GRACE.length).padStart(2, "0")}
                </p>
                <h3 className="font-display mt-2 text-[clamp(2.2rem,4.4vw,4rem)] italic text-white md:col-span-4 md:mt-0">
                  {g.word}
                </h3>
                <p className="mt-3 max-w-[40ch] text-white/75 md:col-span-5 md:col-start-8 md:mt-0 md:text-lg">
                  {g.line}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
