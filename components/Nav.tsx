"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const LINKS = [
  { label: "Shop", href: "/shop" },
  { label: "Lookbook", href: "/lookbook" },
  { label: "Story", href: "/story" },
  { label: "Contact", href: "/contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  // Over the hero video the bar is transparent with light type; once past the
  // hero it becomes a cream bar with dark type and the wordmark appears
  // (the hero itself carries the big centered wordmark, so we omit it up top).
  const onHome = pathname === "/";
  const light = onHome && !scrolled && !menuOpen;
  const solid = !onHome || scrolled || menuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-200 ${
        solid
          ? "border-b border-line bg-cream/85 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-10">
        <a
          href="/"
          className={`flex flex-col leading-none transition-opacity duration-300 ${
            light ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        >
          <span className="font-display text-2xl tracking-tight text-ink">
            OLÒGE
          </span>
          <span className="eyebrow mt-1 text-[0.55rem] tracking-[0.4em] text-gold-deep">
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
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-site-menu"
          onClick={() => setMenuOpen((open) => !open)}
          className={`flex min-h-11 min-w-11 items-center justify-center md:hidden ${light ? "text-cream" : "text-ink"}`}
        >
          {menuOpen ? <X aria-hidden size={23} strokeWidth={1.5} /> : <Menu aria-hidden size={23} strokeWidth={1.5} />}
        </button>
      </nav>
      {menuOpen && (
        <nav id="mobile-site-menu" aria-label="Mobile navigation" className="border-t border-line bg-cream px-6 pb-8 md:hidden">
          <ul className="divide-y divide-line">
            {LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href} onClick={() => setMenuOpen(false)} className="flex min-h-14 items-center font-display text-2xl text-ink">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
