"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { usePathname } from "next/navigation";
import { CATEGORY_KEYS, CATEGORY_LABEL } from "@/lib/catalog";
import { SITE, orderHref } from "@/lib/site";

const LINKS = [
  { label: "Shop", href: "/shop" },
  { label: "Lookbook", href: "/lookbook" },
  { label: "Story", href: "/story" },
  { label: "Contact", href: "/contact" },
];

const SMOOTH = "cubic-bezier(0.16, 1, 0.3, 1)";
// The menu opens as a circle growing from the menu button (top right).
const ORIGIN = "calc(100% - 2.1rem) 2.6rem";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Solid bar once scrolled; on phones it also slides away while reading down
  // and returns the moment you scroll back up.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - last;
      setScrolled(y > 40);
      if (y < 80) setHidden(false);
      else if (dy > 8) setHidden(true);
      else if (dy < -8) setHidden(false);
      if (Math.abs(dy) > 8 || y < 80) last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  // While the menu is open: freeze the page behind it, close on Escape and keep
  // Tab inside the menu (the button stays in the loop so it can close it).
  useEffect(() => {
    if (!menuOpen) return;
    const html = document.documentElement;
    html.style.overflow = "hidden";
    window.__lenis?.stop();
    const first = overlayRef.current?.querySelector<HTMLElement>("a[href]");
    const raf = requestAnimationFrame(() => first?.focus());

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      const stops = [
        toggleRef.current,
        ...Array.from(overlayRef.current?.querySelectorAll<HTMLElement>("a[href]") ?? []),
      ].filter((n): n is HTMLElement => !!n);
      const i = stops.indexOf(document.activeElement as HTMLElement);
      const next = e.shiftKey ? (i <= 0 ? stops.length - 1 : i - 1) : i === stops.length - 1 ? 0 : i + 1;
      e.preventDefault();
      stops[next]?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKey);
      html.style.overflow = "";
      window.__lenis?.start();
    };
  }, [menuOpen]);

  // Over the hero the bar is transparent with light type; once past it, a white
  // bar with dark type. With the menu open it is transparent over black.
  const onHome = pathname === "/";
  const light = menuOpen || (onHome && !scrolled);
  const solid = !menuOpen && (!onHome || scrolled);
  const hideLogo = onHome && !scrolled && !menuOpen;

  const rise = (n: number): CSSProperties => ({
    transform: menuOpen ? "translateY(0)" : "translateY(112%)",
    transition: `transform 900ms ${SMOOTH} ${menuOpen ? 260 + n * 70 : 0}ms`,
  });
  const fade = (n: number): CSSProperties => ({
    opacity: menuOpen ? 1 : 0,
    transform: menuOpen ? "none" : "translateY(14px)",
    transition: `opacity 700ms ease ${menuOpen ? 260 + n * 70 : 0}ms, transform 800ms ${SMOOTH} ${menuOpen ? 260 + n * 70 : 0}ms`,
  });

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-[80] transition-[background-color,border-color,transform] duration-300 ${
        solid ? "border-b border-line bg-cream/95 backdrop-blur-md" : "border-b border-transparent bg-transparent"} ${
        hidden && !menuOpen ? "max-md:-translate-y-full" : ""
      }`}
    >
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-10">
        <a
          href="/"
          className={`flex flex-col leading-none transition-opacity duration-300 ${
            hideLogo ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        >
          <span className={`font-display text-2xl tracking-tight transition-colors duration-300 ${menuOpen ? "text-cream" : "text-ink"}`}>
            OLÒGE
          </span>
          <span
            className={`eyebrow mt-1 text-[0.55rem] tracking-[0.4em] transition-colors duration-300 ${
              menuOpen ? "!text-gold" : "!text-gold-deep"
            }`}
          >
            of africa
          </span>
        </a>

        <ul className="hidden items-center gap-10 md:flex">
          {LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  light
                    ? "text-cream/90 hover:text-cream"
                    : "text-ink-soft hover:text-ink"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="/contact"
          className={`hidden min-h-11 items-center rounded-full border px-5 py-2 text-xs font-medium uppercase tracking-[0.15em] transition-[color,background-color,transform] duration-200 active:scale-[0.97] md:inline-flex ${
            light
              ? "border-cream/70 text-cream hover:bg-cream hover:text-ink"
              : "border-ink text-ink hover:bg-ink hover:text-cream"
          }`}
        >
          Enquire
        </a>

        <button
          ref={toggleRef}
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-site-menu"
          onClick={() => setMenuOpen((open) => !open)}
          className={`-mr-2 flex min-h-11 items-center gap-3 px-2 transition-colors duration-300 md:hidden ${
            light ? "text-cream" : "text-ink"
          }`}
        >
          <span aria-hidden className="text-[0.66rem] font-medium uppercase leading-none tracking-[0.24em]">
            {menuOpen ? "Close" : "Menu"}
          </span>
          <span aria-hidden className="relative block h-3 w-6">
            <span
              className={`absolute left-0 top-1/2 h-px w-full bg-current transition-[translate,rotate] duration-500 ${
                menuOpen ? "translate-y-0 rotate-45" : "-translate-y-[4px]"
              }`}
              style={{ transitionTimingFunction: SMOOTH }}
            />
            <span
              className={`absolute left-0 top-1/2 h-px w-full bg-current transition-[translate,rotate] duration-500 ${
                menuOpen ? "translate-y-0 -rotate-45" : "translate-y-[3px]"
              }`}
              style={{ transitionTimingFunction: SMOOTH }}
            />
          </span>
        </button>
      </nav>

    </header>

    {/* Full-screen phone menu. Always mounted so it can animate shut; inert
        and hidden while closed so it never takes focus or reads aloud. */}
    <div
      id="mobile-site-menu"
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      inert={!menuOpen}
      data-lenis-prevent
      className="fixed inset-0 z-[70] overflow-y-auto overscroll-contain bg-black text-cream md:hidden"
      style={{
        clipPath: `circle(${menuOpen ? "150%" : "0%"} at ${ORIGIN})`,
        visibility: menuOpen ? "visible" : "hidden",
        transition: menuOpen
          ? `clip-path 850ms ${SMOOTH}`
          : "clip-path 520ms cubic-bezier(0.7, 0, 0.84, 0), visibility 0s linear 520ms",
      }}
    >
      {/* A faint portrait rising from the foot keeps the black from feeling empty. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/media/hero/hero-2.webp"
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[58%] w-full object-cover object-[62%_18%] opacity-[0.24]"
        style={{ maskImage: "linear-gradient(to top, black 35%, transparent)", WebkitMaskImage: "linear-gradient(to top, black 35%, transparent)" }}
      />

      <div className="relative flex min-h-full flex-col px-6 pb-[max(2rem,env(safe-area-inset-bottom))] pt-28">
        <nav aria-label="Mobile navigation">
          <ul className="border-t border-white/10">
            {LINKS.map((link, i) => (
              <li key={link.label} className="overflow-hidden border-b border-white/10">
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="group flex min-h-[4.5rem] items-center gap-4 py-3 transition-colors duration-200 active:text-gold"
                >
                  <span className="w-7 shrink-0 font-body text-[0.65rem] tabular-nums tracking-[0.2em] text-gold" style={fade(i)}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="block font-display text-[clamp(2.6rem,12.5vw,3.7rem)] font-[300] leading-[1.04] tracking-[-0.02em]"
                    style={rise(i)}
                  >
                    {link.label}
                  </span>
                  <span aria-hidden className="ml-auto text-xl text-white/35 transition-transform duration-300 group-active:translate-x-1" style={fade(i)}>
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-10" style={fade(LINKS.length)}>
          <p className="eyebrow !text-white/55">Shop by range</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {CATEGORY_KEYS.map((key) => (
              <li key={key}>
                <a
                  href={`/shop/${key}`}
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex min-h-11 items-center rounded-full border border-white/20 px-4 text-[0.7rem] font-medium uppercase tracking-[0.16em] text-white/85 transition-colors duration-200 active:border-gold active:text-gold"
                >
                  {CATEGORY_LABEL[key]}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto pt-12" style={fade(LINKS.length + 1)}>
          <p className="max-w-[22ch] font-display text-[1.4rem] italic leading-[1.15] text-white/90">
            Fashion meets grace, with little to no effort.
          </p>
          <a
            href={orderHref()}
            onClick={() => setMenuOpen(false)}
            className="mt-6 flex min-h-14 items-center justify-between gap-4 rounded-full bg-cream px-7 text-xs font-medium uppercase tracking-[0.18em] text-ink transition-colors duration-200 active:bg-gold"
          >
            {SITE.whatsapp ? "Chat on WhatsApp" : "Enquire about a piece"}
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </div>
    </>
  );
}
