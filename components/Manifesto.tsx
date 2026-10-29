"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// The first thing that rises over the receding hero: one editorial statement.
// As it scrolls through, each word inks in from a pale grey; the brand words
// (*marked*) land in gold italic instead.
const STATEMENT =
  "OLÒGE of Africa is for every lover of fashion — a place to be *bold,* *unapologetic,* and entirely yourself. Fashion meets *grace,* with little to no effort.";

type Word = { text: string; tail: string; hl: boolean };

const WORDS: Word[] = STATEMENT.split(" ").map((raw) => {
  const m = raw.match(/^\*(.+?)([,.]?)\*$/);
  return m ? { text: m[1], tail: m[2], hl: true } : { text: raw, tail: "", hl: false };
});

const INK = "#1a1210";
const GOLD = "#8f6527";
const PALE = "#dcd8d3";

export default function Manifesto() {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll<HTMLElement>("[data-w]"),
        { color: PALE },
        {
          color: (_i: number, w: HTMLElement) => (w.dataset.hl ? GOLD : INK),
          stagger: 0.05,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: true },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-cream px-6 py-[var(--spacing-section)] md:px-10">
      <div className="mx-auto grid max-w-[1400px] gap-10 md:grid-cols-[180px_1fr]">
        <p className="eyebrow pt-3 text-gold-deep">The house</p>
        <div>
          <p
            ref={ref}
            className="font-display text-[clamp(1.9rem,4.4vw,3.8rem)] leading-[1.14] text-ink"
          >
            {WORDS.map((w, i) => (
              <span key={i}>
                <span
                  data-w
                  data-hl={w.hl ? "1" : undefined}
                  className={w.hl ? "italic text-gold-deep" : undefined}
                >
                  {w.text}
                </span>
                {w.tail}{" "}
              </span>
            ))}
          </p>
          <a
            href="/story"
            className="mt-12 inline-flex items-center gap-3 text-sm font-medium text-ink underline-offset-8 hover:underline"
          >
            Read our story <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
