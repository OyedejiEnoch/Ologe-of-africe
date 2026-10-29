"use client";

import { useEffect, useState } from "react";

// Phone-only request bar for the product page. It appears once the main
// "Request this piece" button has scrolled away and hides again when the
// footer arrives, so it never covers the page's own calls to action.
export default function StickyRequest({ name, href }: { name: string; href: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const cta = document.getElementById("request-cta");
    const footer = document.querySelector("footer");
    if (!cta) return;
    const update = () => {
      const ctaGone = cta.getBoundingClientRect().bottom < 0;
      const footerIn = footer ? footer.getBoundingClientRect().top < window.innerHeight : false;
      setShow(ctaGone && !footerIn);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      aria-hidden={!show}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-cream/95 px-5 py-3 backdrop-blur-md transition-transform duration-300 lg:hidden ${
        show ? "translate-y-0" : "pointer-events-none translate-y-full"
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <p className="min-w-0 truncate font-display text-lg text-ink">{name}</p>
        <a
          href={href}
          tabIndex={show ? 0 : -1}
          className="pressable inline-flex min-h-11 shrink-0 items-center rounded-full bg-ink px-5 text-[0.68rem] font-medium uppercase tracking-[0.16em] text-cream"
        >
          Request
        </a>
      </div>
    </div>
  );
}
