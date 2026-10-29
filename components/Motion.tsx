"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

// The site-wide motion layer, mounted once in the layout and re-run on every
// route change. It finds content by convention so pages stay free of motion
// code; anything inside [data-motion-off] (or the hero) keeps its own bespoke
// choreography and is skipped here.
//
//   main h1, h2               lines rise out of a mask (SplitText)
//   .eyebrow                  tracking settles in as it fades up
//   p right after a heading   blur-rise, just behind the heading
//   [data-reveal]             blur-rise
//   [data-reveal-img]         wipes open from the bottom, image settles from 1.15
//   [data-parallax="0.12"]    drifts against the scroll by that fraction
//   [data-plate]              product plates rise in batches
//   [data-magnetic]           leans toward the pointer (fine pointers only)
//
// Plus a hairline gold scroll-progress bar across the top of the window.
const EASE = "expo.out";
const OFF = "[data-motion-off], .hero";

export default function Motion() {
  const pathname = usePathname();
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.classList.add("motion-ready");
      return;
    }
    gsap.registerPlugin(ScrollTrigger, SplitText);
    const free = (el: Element) => !el.closest(OFF);
    const all = <T extends Element>(sel: string) => gsap.utils.toArray<T>(sel).filter(free);
    const splits: SplitText[] = [];
    const cleanups: (() => void)[] = [];

    const ctx = gsap.context(() => {
      // Headings: masked line rise. autoSplit re-splits when fonts load or the
      // width changes; returning the tween lets SplitText rebuild it cleanly.
      all<HTMLElement>("main h1, main h2").forEach((h) => {
        splits.push(
          SplitText.create(h, {
            type: "lines",
            mask: "lines",
            linesClass: "split-line",
            autoSplit: true,
            onSplit: (self) =>
              gsap.from(self.lines, {
                yPercent: 110,
                duration: 1.15,
                ease: EASE,
                stagger: 0.09,
                scrollTrigger: { trigger: h, start: "top 90%", once: true },
              }),
          })
        );
        const next = h.nextElementSibling;
        if (next?.tagName === "P" && !next.hasAttribute("data-reveal")) next.setAttribute("data-reveal", "after");
      });

      all<HTMLElement>("main .eyebrow").forEach((el) => {
        if (el.closest("[data-plate]")) return;
        gsap.from(el, {
          opacity: 0,
          letterSpacing: "0.62em",
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        });
      });

      all<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 22,
          filter: "blur(6px)",
          duration: 1,
          delay: el.dataset.reveal === "after" ? 0.25 : 0,
          ease: "power3.out",
          clearProps: "filter",
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        });
      });

      all<HTMLElement>("[data-reveal-img]").forEach((el) => {
        const img = el.querySelector("img") ?? el;
        gsap
          .timeline({ scrollTrigger: { trigger: el, start: "top 88%", once: true } })
          .fromTo(el, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "power3.inOut" })
          .from(img, { scale: 1.15, duration: 1.7, ease: "power3.out" }, 0);
      });

      all<HTMLElement>("[data-parallax]").forEach((el) => {
        const amount = parseFloat(el.dataset.parallax || "0.1") * 100;
        gsap.fromTo(
          el,
          { yPercent: amount / 2 },
          {
            yPercent: -amount / 2,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
      });

      const plates = all<HTMLElement>("[data-plate]");
      if (plates.length) {
        gsap.set(plates, { opacity: 0, y: 40 });
        ScrollTrigger.batch(plates, {
          start: "top 92%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, { opacity: 1, y: 0, duration: 1, ease: EASE, stagger: 0.08, overwrite: true }),
        });
      }

      gsap.to(barRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
      });
    });

    // Magnetic buttons: quickTo keeps the follow cheap and interruptible.
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      gsap.utils.toArray<HTMLElement>("[data-magnetic]").forEach((el) => {
        const x = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
        const y = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          x((e.clientX - (r.left + r.width / 2)) * 0.25);
          y((e.clientY - (r.top + r.height / 2)) * 0.35);
        };
        const leave = () => {
          x(0);
          y(0);
        };
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", leave);
        });
      });
    }

    root.classList.add("motion-ready");
    // Pinned sections above may have changed the page height since mount.
    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 400);

    return () => {
      window.clearTimeout(refresh);
      cleanups.forEach((fn) => fn());
      splits.forEach((s) => s.revert());
      ctx.revert();
    };
  }, [pathname]);

  return (
    <div
      ref={barRef}
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] origin-left scale-x-0 bg-gold motion-reduce:hidden"
    />
  );
}
