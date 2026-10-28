import Link from "next/link";
import { CATEGORY_KEYS, CATEGORY_LABEL, type CategoryKey } from "@/lib/catalog";

export default function CategoryNav({ active }: { active?: CategoryKey | "all" }) {
  const links = [
    { key: "all" as const, label: "All pieces", href: "/shop" },
    ...CATEGORY_KEYS.map((key) => ({
      key,
      label: CATEGORY_LABEL[key],
      href: `/shop/${key}`,
    })),
  ];

  return (
    <nav aria-label="Shop categories" className="overflow-x-auto border-y border-line">
      <div className="mx-auto flex min-w-max max-w-[1400px] items-center px-6 md:px-10">
        {links.map((link) => {
          const selected = active === link.key;
          return (
            <Link
              key={link.key}
              href={link.href}
              aria-current={selected ? "page" : undefined}
              className={`relative px-5 py-5 text-xs font-semibold uppercase tracking-[0.16em] transition-colors duration-200 first:pl-0 ${
                selected ? "text-ink" : "text-muted hover:text-ink"
              }`}
            >
              {link.label}
              {selected && (
                <span className="absolute inset-x-5 bottom-0 h-px bg-ink first:left-0" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
