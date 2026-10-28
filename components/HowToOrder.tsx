"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { orderHref } from "@/lib/site";
import Corners from "@/components/Corners";

// Three ordering chapters. Step one is a quiet product plate; steps two and
// three open into campaign-scale editorial moments so the practical ordering
// journey still feels like part of the house world.
const CHAT = [
  { from: "you", text: "Hi! Are the gold round sunglasses still available?" },
  { from: "house", text: "Hello! Yes — and it’s lovely on. Shall we reserve it for you?" },
  { from: "you", text: "Yes please 😍" },
  { from: "house", text: "Done. Send your address and we’ll confirm delivery." },
] as const;

export default function HowToOrder() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-step]").forEach((card) => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: card, start: "top 78%" } });
        tl.from(card, { y: 70, opacity: 0, duration: 1.1, ease: "power3.out" })
          .from(card.querySelector("[data-step-visual]"), { x: 60, opacity: 0, duration: 1.1, ease: "power3.out" }, 0.15);
        const bubbles = card.querySelectorAll("[data-bubble]");
        if (bubbles.length) {
          tl.from(bubbles, { y: 16, opacity: 0, duration: 0.5, ease: "power2.out", stagger: 0.45 }, 0.7);
        }
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-cream px-6 py-[var(--spacing-section)] md:px-10">
      <div ref={ref} className="mx-auto max-w-[1200px]">
        <div className="max-w-[720px]">
          <p className="eyebrow text-gold-deep">How to order</p>
          <h2 className="font-display mt-4 text-[clamp(2.2rem,4.6vw,4rem)] text-ink">
            As easy as <em className="italic">sending a message.</em>
          </h2>
        </div>

        {/* Step 01 */}
        <Step n="01" title="Choose your piece" copy="Browse the house and find the one that feels like you — frames, bags, shoes, fascinators and the finishing touches." cta={{ label: "Browse the house", href: "/shop" }}>
          <div className="relative mx-auto flex aspect-square w-full max-w-[380px] flex-col items-center justify-center bg-cream">
            <Corners />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/products/round-browbar-gold.jpg" alt="" className="w-[78%] mix-blend-multiply" />
            <div className="mt-2 flex w-[78%] justify-between text-xs font-medium uppercase tracking-[0.12em] text-ink-soft">
              <span>Round Brow-Bar</span>
              <span>Price on request</span>
            </div>
          </div>
        </Step>

        {/* Step 02 — a private order desk, not a generic phone mock-up. */}
        <article
          data-step
          className="mt-24 overflow-hidden border border-ink bg-ink text-cream md:mt-40"
        >
          <div className="grid md:min-h-[700px] md:grid-cols-[0.82fr_1.18fr]">
            <div className="flex flex-col justify-between p-8 md:p-16">
              <div>
                <p className="eyebrow text-gold">Step 02 · Private order desk</p>
                <h3 className="font-display mt-6 max-w-[9ch] text-[clamp(2.5rem,5vw,4.8rem)] leading-[0.94] text-cream">
                  A conversation, not a checkout.
                </h3>
                <p className="mt-7 max-w-[39ch] text-cream/65">
                  Send the piece you love. We personally confirm availability,
                  answer every question and agree delivery with you before you pay.
                </p>
              </div>

              <div className="mt-12 border-t border-cream/15 pt-7 md:mt-16">
                <a
                  href={orderHref()}
                  className="inline-flex items-center gap-5 bg-cream px-7 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-ink transition-colors hover:bg-gold"
                >
                  Start a chat <span aria-hidden>↗</span>
                </a>
                <p className="mt-5 max-w-[30ch] text-xs leading-relaxed text-cream/45">
                  Personal replies · No payment until your order is confirmed
                </p>
              </div>
            </div>

            <div
              data-step-visual
              className="relative flex min-h-[640px] flex-col overflow-hidden bg-paper text-ink md:min-h-full"
            >
              <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5 md:px-9">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-ink font-display text-sm text-gold">
                    O
                  </span>
                  <div className="leading-tight">
                    <p className="text-sm font-semibold">OLÒGE of Africa</p>
                    <p className="mt-1 text-[0.68rem] uppercase tracking-[0.16em] text-muted">
                      Private styling &amp; orders
                    </p>
                  </div>
                </div>
                <span className="h-2 w-2 rounded-full bg-gold" title="Available" />
              </div>

              <div className="relative flex flex-1 flex-col px-5 py-7 md:px-9 md:py-9">
                <div className="border-b border-ink/10 pb-7">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="eyebrow">Selected piece</p>
                      <p className="font-display mt-2 text-2xl">Round Brow-Bar</p>
                    </div>
                    <p className="text-right text-xs uppercase tracking-[0.12em] text-muted">
                      Gold · 01
                    </p>
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/products/round-browbar-gold.jpg"
                    alt="Gold Round Brow-Bar sunglasses"
                    className="mx-auto mt-4 h-[130px] w-[88%] object-contain mix-blend-multiply md:h-[160px]"
                  />
                </div>

                <div className="mt-7 flex flex-1 flex-col justify-end gap-3">
                  {CHAT.map((m, i) => (
                    <p
                      key={i}
                      data-bubble
                      className={`max-w-[84%] px-4 py-3 text-sm leading-snug md:max-w-[72%] ${
                        m.from === "you"
                          ? "self-end bg-ink text-cream"
                          : "self-start border border-line bg-cream text-ink"
                      }`}
                    >
                      {m.text}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Step 03 — the practical promise resolves as a full campaign frame. */}
        <article
          data-step
          className="relative left-1/2 mt-24 grid min-h-[700px] w-screen -translate-x-1/2 overflow-hidden bg-ink text-cream md:mt-40 md:min-h-[780px] md:grid-cols-[0.92fr_1.08fr]"
        >
          <div
            data-step-visual
            className="absolute inset-0 md:relative md:inset-auto md:col-start-2 md:row-start-1"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/media/lookbook/founder-patterned-look.jpeg"
              alt="A woman smiling in a colourful African print dress with black lace sleeves"
              className="h-full w-full object-cover object-[48%_center] md:object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/60 to-ink/15 md:from-ink/45 md:via-transparent md:to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/10 md:from-ink/20" />
            <p
              className="absolute right-6 top-28 font-display text-[clamp(5rem,11vw,10rem)] leading-none text-cream/15 md:right-12"
              aria-hidden
            >
              03
            </p>
          </div>

          <div className="relative z-10 flex min-h-[700px] flex-col justify-between px-8 pb-10 pt-28 md:col-start-1 md:row-start-1 md:min-h-[780px] md:px-[max(4rem,8vw)] md:pb-16">
            <p className="eyebrow text-gold">Step 03 · The arrival</p>

            <div className="max-w-[620px]">
              <h3 className="font-display max-w-[11ch] text-[clamp(3rem,6vw,5.5rem)] leading-[0.92]">
                Delivered with grace.
              </h3>
              <p className="mt-7 max-w-[42ch] text-cream/75">
                Personally confirmed, carefully prepared and sent to your door —
                ready for the moment you chose it for.
              </p>

              <div className="mt-10 grid max-w-[620px] border-y border-cream/25 sm:grid-cols-3">
                <DeliveryNote n="01">Personally confirmed</DeliveryNote>
                <DeliveryNote n="02">Prepared with care</DeliveryNote>
                <DeliveryNote n="03">Delivery agreed in chat</DeliveryNote>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

function Step({
  n,
  title,
  copy,
  cta,
  children,
}: {
  n: string;
  title: string;
  copy: string;
  cta?: { label: string; href: string };
  children: React.ReactNode;
}) {
  return (
    <article
      data-step
      className="mt-24 grid items-center gap-12 border border-line bg-paper/50 p-8 md:mt-40 md:grid-cols-2 md:gap-16 md:p-16"
    >
      <div>
        <p className="eyebrow text-gold-deep">Step {n}</p>
        <h3 className="font-display mt-4 text-[clamp(1.9rem,3.4vw,3rem)] text-ink">{title}</h3>
        <p className="mt-5 max-w-[42ch] text-ink-soft">{copy}</p>
        {cta && (
          <a
            href={cta.href}
            className="mt-9 inline-flex rounded-full bg-ink px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-cream transition-transform hover:-translate-y-0.5"
          >
            {cta.label}
          </a>
        )}
      </div>
      <div data-step-visual>{children}</div>
    </article>
  );
}

function DeliveryNote({ children, n }: { children: React.ReactNode; n: string }) {
  return (
    <div className="border-b border-cream/25 py-4 last:border-b-0 sm:border-b-0 sm:border-r sm:px-5 sm:first:pl-0 sm:last:border-r-0">
      <p className="text-[0.62rem] font-medium uppercase tracking-[0.18em] text-gold">{n}</p>
      <p className="mt-2 text-sm text-cream/85">{children}</p>
    </div>
  );
}
