import type { Metadata } from "next";
import Image from "next/image";
import Footer from "@/components/Footer";
import Faq from "@/components/Faq";
import ContactForm from "@/components/ContactForm";
import { orderHref } from "@/lib/site";
import { getSettings } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Contact — OLÒGE of Africa",
  description: "Questions about a piece or a look? Find out how to reach OLÒGE of Africa.",
};

export default async function ContactPage() {
  const site = await getSettings();
  return (
    <>
      <main className="bg-cream pt-[88px] text-ink">
        <section className="mx-auto grid max-w-[1400px] border-x border-line lg:grid-cols-[1fr_0.9fr]">
          <div className="flex min-h-[55vh] flex-col justify-end px-6 py-16 md:px-10 md:py-24 lg:min-h-[68vh] lg:px-16">
            <p className="eyebrow text-ink">Say hello / Contact</p>
            <h1 className="mt-7 max-w-[12ch] font-display text-[clamp(3.8rem,7.5vw,7rem)] leading-[0.92]">
              Let’s start a <em className="italic">conversation.</em>
            </h1>
            <p className="mt-8 max-w-[45ch] text-lg leading-8 text-ink-soft">
              Looking for a piece, a full look, or a gift? Tell us what you have in mind.
            </p>
          </div>
          <div className="relative min-h-[56vh] overflow-hidden border-t border-line lg:min-h-0 lg:border-l lg:border-t-0">
            <Image
              src="/media/founder/founder-colour.jpg"
              alt="A colourful collage featuring the founder of OLÒGE of Africa"
              fill
              priority
              sizes="(max-width: 1023px) 100vw, 48vw"
              className="object-cover object-top"
            />
          </div>
        </section>

        <section className="border-t border-line px-6 py-20 md:px-10 md:py-28">
          <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="eyebrow text-ink">Your enquiry</p>
              <h2 className="mt-6 max-w-[12ch] font-display text-[clamp(3rem,5.5vw,5rem)] leading-[0.95]">
                A note to the house.
              </h2>
              <p className="mt-7 max-w-[42ch] leading-7 text-ink-soft">
                Tell us what you have in mind and how to reach you. Every note is read by the house, and answered personally.
              </p>
              {site.whatsapp ? (
                <a href={orderHref(undefined, site.whatsapp)} className="pressable mt-9 inline-flex min-h-12 items-center rounded-full bg-ink px-7 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-cream">
                  Message on WhatsApp <span className="ml-5" aria-hidden>↗</span>
                </a>
              ) : (
                <p className="mt-9 border-l border-ink pl-5 text-sm leading-6 text-ink-soft">
                  Prefer WhatsApp? The house number will appear here once it’s confirmed.
                </p>
              )}
            </div>

            <ContactForm />
          </div>
        </section>

        <div className="border-t border-line bg-paper">
          <Faq />
        </div>
      </main>
      <Footer />
    </>
  );
}
