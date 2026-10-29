"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// An editorial spread: six looks hung on a 12-column grid at uneven heights,
// each captioned like a magazine plate. Columns drift at slightly different
// speeds as the spread passes (a quiet parallax), and every photo wipes open
// from the bottom as it arrives. Captions describe what is visible only — no
// piece is claimed as worn without a confirmed match.
type Look = { src: string; alt: string; caption: string; cell: string; shape: string; drift: number };

const LOOKS: Look[] = [
  {
    src: "/media/lookbook/founder-yellow-frames.jpeg",
    alt: "A woman smiling in bold yellow-lens frames and a colourful patterned jacket",
    caption: "Yellow lens, loud print",
    cell: "col-span-2 md:col-span-4 md:col-start-5",
    shape: "aspect-[4/5]",
    drift: -40,
  },
  {
    src: "/media/lookbook/founder-patterned-look.jpeg",
    alt: "A woman smiling in a colourful African print dress with black lace sleeves",
    caption: "Lace sleeve, bright ground",
    cell: "md:col-span-3 md:col-start-10 md:mt-40",
    shape: "aspect-[3/4]",
    drift: 30,
  },
  {
    src: "/media/stills/hat-still.jpg",
    alt: "A woman in a wide woven hat and a patterned jacket against a dark backdrop",
    caption: "The wide brim",
    cell: "md:col-span-3 md:col-start-1 md:-mt-24",
    shape: "aspect-[4/5]",
    drift: 50,
  },
  {
    src: "/media/stills/green-bag.jpg",
    alt: "A woman in a green headwrap and red sunglasses holding a green bag",
    caption: "Green on green",
    cell: "col-span-2 md:col-span-4 md:col-start-5 md:mt-16",
    shape: "aspect-[4/5]",
    drift: -20,
  },
  {
    src: "/media/lookbook/founder-yellow-frames-close.jpeg",
    alt: "A close portrait of a woman smiling in oversized yellow-lens frames",
    caption: "Up close",
    cell: "md:col-span-3 md:col-start-10 md:mt-28",
    shape: "aspect-[4/5]",
    drift: 40,
  },
  {
    src: "/media/stills/gele-gold.jpg",
    alt: "A woman in a woven gele and layered gold chains",
    caption: "Gold hour",
    cell: "md:col-span-3 md:col-start-2 md:-mt-48",
    shape: "aspect-[3/4]",
    drift: -30,
  },
];

export default function Lookbook() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const desktop = window.matchMedia("(min-width: 768px)").matches;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-look]").forEach((fig, i) => {
        const frame = fig.querySelector("[data-look-frame]");
        const tl = gsap.timeline({ scrollTrigger: { trigger: fig, start: "top 88%" } });
        tl.fromTo(
          frame,
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "power3.inOut" }
        ).from(fig.querySelector("img"), { scale: 1.18, duration: 1.6, ease: "power3.out" }, 0);

        if (desktop) {
          gsap.fromTo(
            fig,
            { y: LOOKS[i].drift },
            { y: -LOOKS[i].drift, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } }
          );
        }
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="lookbook" className="overflow-x-clip bg-cream px-6 py-[var(--spacing-section)] md:px-10">
      <div ref={ref} className="mx-auto grid max-w-[1400px] grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-12 md:gap-x-8 md:gap-y-0">
        <div className="col-span-2 self-start md:col-span-4 md:pt-10">
          <p className="eyebrow text-gold-deep">Lookbook</p>
          <h2 className="font-display mt-4 text-[clamp(2.4rem,4.6vw,4.2rem)] text-ink">
            Styled with <em className="italic">intention.</em>
          </h2>
          <p className="mt-5 max-w-[34ch] text-ink-soft">
            Fashion as a language — a few ways to wear the house, put together the OLÒGE way.
          </p>
          <a
            data-magnetic
            href="/lookbook"
            className="pressable mt-8 inline-flex min-h-12 items-center gap-3 rounded-full border border-ink px-6 text-xs font-medium uppercase tracking-[0.16em] text-ink hover:bg-ink hover:text-cream"
          >
            View the lookbook <span aria-hidden>→</span>
          </a>
        </div>

        {LOOKS.map((l, i) => (
          <figure key={l.src} data-look className={l.cell}>
            <div data-look-frame className="overflow-hidden bg-paper">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={l.src} alt={l.alt} loading="lazy" className={`w-full object-cover ${l.shape}`} />
            </div>
            <figcaption className="mt-3 flex items-baseline gap-3">
              <span className="font-body text-[0.62rem] tabular-nums tracking-[0.2em] text-gold-deep">
                LOOK {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-sm italic text-muted">{l.caption}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
