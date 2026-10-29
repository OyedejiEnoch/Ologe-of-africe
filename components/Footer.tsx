"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Ink footer: wordmark + bracketed links + sign-off, then a giant OLÒGE whose
// letters rise out of a clipped baseline as the footer comes into view.
const LINKS = [
  { label: "Shop", href: "/shop" },
  { label: "Eyewear", href: "/shop/eyewear" },
  { label: "Bags", href: "/shop/bags" },
  { label: "Shoes", href: "/shop/shoes" },
  { label: "Fascinators", href: "/shop/fascinators" },
  { label: "Accessories", href: "/shop/accessories" },
  { label: "Story", href: "/story" },
  { label: "Lookbook", href: "/lookbook" },
  { label: "Contact", href: "/contact" },
];

const WORDMARK = "OLÒGE".split("");

export default function Footer() {
  const markRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = markRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from("[data-letter]", {
        yPercent: 100,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.07,
        scrollTrigger: { trigger: el, start: "top 95%" },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <footer className="overflow-hidden bg-ink-deep text-cream">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-6 pt-24 md:grid-cols-[1fr_1.4fr_1fr] md:px-10">
        <div>
          <p className="font-display text-3xl">OLÒGE</p>
          <p className="eyebrow mt-1 text-gold">of africa</p>
          <p className="mt-6 max-w-[30ch] text-sm text-cream/55">
            Fashion meets grace, with little to no effort.
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-3 md:justify-center">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="group text-xs font-medium uppercase tracking-[0.22em] text-cream/70 transition-colors hover:text-cream"
            >
              <span className="text-cream/25 transition-colors group-hover:text-gold">[</span>
              &nbsp;{l.label}&nbsp;
              <span className="text-cream/25 transition-colors group-hover:text-gold">]</span>
            </a>
          ))}
        </nav>

        <p className="font-display text-[clamp(1.6rem,2.6vw,2.2rem)] italic md:text-right">
          Dress with <span className="text-gold">grace.</span>
        </p>
      </div>

      <div
        ref={markRef}
        aria-hidden
        className="mt-16 flex select-none justify-center overflow-hidden px-4 leading-[0.78]"
      >
        {WORDMARK.map((ch, i) => (
          <span
            key={i}
            data-letter
            className="font-display inline-block text-[25vw] text-cream/[0.08]"
          >
            {ch}
          </span>
        ))}
      </div>

      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-[1400px] flex-col justify-between gap-3 px-6 py-6 text-xs text-cream/40 md:flex-row md:px-10">
          <p>© {new Date().getFullYear()} OLÒGE of Africa. All rights reserved.</p>
          <p className="italic">Ẹ ṣeun — dress well, and go with grace.</p>
        </div>
      </div>
    </footer>
  );
}
