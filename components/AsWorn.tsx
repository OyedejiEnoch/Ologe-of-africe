"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Closes The Edit: four looks fly in from a scattered, steeply-tilted spill and
// settle into a loose fan as the band scrolls into view. Cards keep their own
// shape (portraits tall, product shots square) and are centred on one line.
const LOOKS = [
  { src: "/media/aworn/striped-glasses.jpg", alt: "Black square frames with a burgundy striped turtleneck and gold chain bracelet", rest: -5, lift: 14, shape: "aspect-[736/940]" },
  { src: "/media/aworn/classic-frames.jpg", alt: "Black and tortoise square frames on a white display", rest: 3, lift: -16, shape: "aspect-square" },
  { src: "/media/aworn/yellow-frames.jpg", alt: "Black and clear frames with gold hoop earrings and a yellow tee", rest: -3, lift: 22, shape: "aspect-[736/880]" },
  { src: "/media/aworn/red-oversized.jpg", alt: "Oversized red-to-tortoise square sunglasses", rest: 5, lift: -10, shape: "aspect-square" },
];
const SPILL = [-26, 20, -18, 24];

export default function AsWorn() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-look]");
      gsap.fromTo(
        cards,
        { y: 260, rotate: (i: number) => SPILL[i], opacity: 0 },
        {
          y: (i: number) => LOOKS[i].lift,
          rotate: (i: number) => LOOKS[i].rest,
          opacity: 1,
          ease: "power2.out",
          stagger: 0.08,
          scrollTrigger: { trigger: el, start: "top 90%", end: "center 55%", scrub: 0.8 },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section className="overflow-hidden bg-cream px-6 py-[var(--spacing-section)] md:px-10">
      <div className="mx-auto max-w-[1400px] text-center">
        <p className="eyebrow text-gold-deep">As worn</p>
        <h2 className="font-display mt-4 text-[clamp(2rem,4vw,3.4rem)] text-ink">
          Worn with a little <em className="italic">shakara.</em>
        </h2>
      </div>

      <div
        ref={ref}
        className="mx-auto mt-16 flex max-w-[1200px] items-center justify-center md:mt-20"
      >
        {LOOKS.map((l, i) => (
          <figure
            key={l.src}
            data-look
            className={`relative w-[38vw] shrink-0 border-[6px] border-cream bg-cream shadow-[0_30px_60px_-30px_rgba(46,11,14,0.42)] md:w-[19vw] md:max-w-[270px] ${
              i === 0 ? "" : "-ml-[10vw] md:-ml-[3vw]"
            } ${i > 2 ? "hidden md:block" : ""}`}
            style={{ transform: `translateY(${l.lift}px) rotate(${l.rest}deg)`, zIndex: i % 2 === 1 ? 4 : 5 - i }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={l.src} alt={l.alt} className={`w-full object-cover ${l.shape}`} />
          </figure>
        ))}
      </div>

      {/* Eyewear routes for her and him (absorbed from the old split tiles). */}
      <div className="mx-auto mt-16 flex max-w-[640px] flex-col items-center gap-6 text-center md:mt-24">
        <p className="max-w-[40ch] text-ink-soft">
          Cat-eyes, squares and rounds — chosen to frame a face, not hide it.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
          {[
            { label: "Frames for her", href: "/shop/eyewear?for=her" },
            { label: "Frames for him", href: "/shop/eyewear?for=him" },
          ].map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group inline-flex min-h-11 items-center gap-2 font-display text-[clamp(1.4rem,2.2vw,1.9rem)] italic text-ink"
            >
              <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-500 group-hover:bg-[length:100%_1px]">
                {l.label}
              </span>
              <span aria-hidden className="not-italic transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
