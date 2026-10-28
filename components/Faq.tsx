"use client";

import { useState } from "react";
import { SITE, orderHref } from "@/lib/site";

// Two-column FAQ: heading pinned left, accordion right. Answers are drafts that
// defer specifics (fees, timing, payment) to the chat until the client confirms
// her actual policies. Doubles as the page's #contact anchor.
const QUESTIONS = [
  {
    q: "How do I place an order?",
    a: SITE.whatsapp
      ? "Tap “Order on WhatsApp” on any piece, or message us directly. We’ll confirm it’s available, your total and delivery before anything is paid."
      : "WhatsApp ordering will open when the house contact number is confirmed. Once it opens, we’ll confirm availability, your total and delivery before anything is paid.",
  },
  {
    q: "Where do you deliver?",
    a: "Tell us where you are in the chat and we’ll confirm the delivery options and fee for your location before you pay.",
  },
  {
    q: "How do I pay?",
    a: "Payment details are shared in the chat once your order is confirmed — you’ll always know exactly what you’re paying for.",
  },
  {
    q: "Are your pieces authentic?",
    a: "Every piece is chosen personally before it reaches the house. Want a closer look first? Ask for more photos or a short video in the chat.",
  },
  {
    q: "Can I return or exchange a piece?",
    a: "If something isn’t right, message us as soon as it arrives and we’ll talk you through your options.",
  },
  {
    q: "Can you help me style a look?",
    a: "Always. Tell us the occasion — a wedding, a birthday, Monday at the office — and we’ll suggest pieces that work together.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="contact" className="bg-cream px-6 py-[var(--spacing-section)] md:px-10">
      <div className="mx-auto grid max-w-[1400px] gap-14 md:grid-cols-[5fr_7fr] md:gap-20">
        <div className="md:sticky md:top-32 md:self-start">
          <p className="eyebrow text-gold-deep">FAQ</p>
          <h2 className="font-display mt-4 text-[clamp(2.4rem,5vw,4.4rem)] text-ink">
            Good <em className="italic">questions.</em>
          </h2>
          <p className="mt-5 max-w-[34ch] text-ink-soft">
            Can’t find yours? Contact details will appear here when confirmed.
          </p>
          {SITE.whatsapp ? (
            <a
              href={orderHref()}
              className="mt-8 inline-flex min-h-12 items-center rounded-full bg-ink px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-cream"
            >
              Message us
            </a>
          ) : (
            <p className="mt-8 border-l border-gold pl-5 text-sm text-ink-soft">WhatsApp details are coming soon.</p>
          )}
        </div>

        <ul className="border-b border-line">
          {QUESTIONS.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q} className="border-t border-line">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="font-display text-[clamp(1.2rem,1.8vw,1.55rem)] text-ink">
                    {item.q}
                  </span>
                  <span
                    aria-hidden
                    className={`text-2xl leading-none text-gold-deep transition-transform duration-500 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  id={`faq-${i}`}
                  className={`grid transition-[grid-template-rows] duration-500 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-[58ch] pb-7 text-ink-soft">{item.a}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
