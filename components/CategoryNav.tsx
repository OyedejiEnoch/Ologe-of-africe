import Link from "next/link";
import { CATEGORY_KEYS, CATEGORY_LABEL, PRODUCTS, productsByCategory, type CategoryKey } from "@/lib/catalog";

// Range tabs for the shop: large serif labels with a true piece count beside
// each, sticky under the site nav so the visitor can hop ranges mid-scroll.
// Ranges still being chosen show their count as "soon" rather than a bare 0.
export default function CategoryNav({ active }: { active?: CategoryKey | "all" }) {
  const links = [
    { key: "all" as const, label: "All pieces", href: "/shop", count: PRODUCTS.length },
    ...CATEGORY_KEYS.map((key) => ({
      key,
      label: CATEGORY_LABEL[key],
      href: `/shop/${key}`,
      count: productsByCategory(key).length,
    })),
  ];

  return (
    <nav
      aria-label="Shop by range"
      className="sticky top-[84px] z-30 overflow-x-auto border-y border-line bg-cream/90 backdrop-blur-md [scrollbar-width:none]"
    >
      <div className="mx-auto flex min-w-max max-w-[1400px] items-center gap-8 px-6 md:gap-11 md:px-10">
        {links.map((link) => {
          const selected = active === link.key;
          return (
            <Link
              key={link.key}
              href={link.href}
              aria-current={selected ? "page" : undefined}
              className={`relative flex min-h-14 items-center gap-1.5 font-display text-[1.15rem] transition-colors duration-200 md:min-h-16 md:text-[1.3rem] ${
                selected ? "text-ink" : "text-muted hover:text-ink"
              }`}
            >
              {link.label}
              <sup className="font-body text-[0.6rem] tabular-nums tracking-[0.12em] text-gold-deep">
                {link.count > 0 ? String(link.count).padStart(2, "0") : "soon"}
              </sup>
              {selected && <span className="absolute inset-x-0 bottom-0 h-[2px] bg-ink" />}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
