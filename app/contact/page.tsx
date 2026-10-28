import type { Metadata } from "next";
import Image from "next/image";
import Footer from "@/components/Footer";
import Faq from "@/components/Faq";
import { SITE, orderHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact — OLÒGE of Africa",
  description: "Questions about a piece or a look? Find out how to reach OLÒGE of Africa.",
};

function PreviewField({ label, name, type = "text", placeholder }: { label: string; name: string; type?: string; placeholder: string }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft">{label}</span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        disabled
        className="min-h-12 border border-line bg-cream px-4 py-3 text-ink placeholder:text-muted disabled:opacity-80"
      />
    </label>
  );
}

export default function ContactPage() {
  return (
    <>
      <main className="bg-cream pt-[88px] text-ink">
        <section className="mx-auto grid max-w-[1400px] border-x border-line lg:grid-cols-[1fr_0.9fr]">
          <div className="flex min-h-[55vh] flex-col justify-end px-6 py-16 md:px-10 md:py-24 lg:min-h-[68vh] lg:px-16">
            <p className="eyebrow text-gold-deep">Say hello / Contact</p>
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
              <p className="eyebrow text-gold-deep">Your enquiry</p>
              <h2 className="mt-6 max-w-[12ch] font-display text-[clamp(3rem,5.5vw,5rem)] leading-[0.95]">
                A note to the house.
              </h2>
              <p className="mt-7 max-w-[42ch] leading-7 text-ink-soft">
                The enquiry form is being prepared. It will open when messages can be saved securely and delivered to the OLÒGE team.
              </p>
              {SITE.whatsapp ? (
                <a href={orderHref()} className="pressable mt-9 inline-flex min-h-12 items-center rounded-full bg-ink px-7 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-cream">
                  Message on WhatsApp <span className="ml-5" aria-hidden>↗</span>
                </a>
              ) : (
                <p className="mt-9 border-l border-gold pl-5 text-sm leading-6 text-ink-soft">
                  WhatsApp contact details will appear here when confirmed.
                </p>
              )}
            </div>

            <form aria-describedby="contact-form-status" className="border border-line bg-paper p-6 md:p-10">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6">
                <h3 className="font-display text-3xl">Enquiry form</h3>
                <span className="border border-gold px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-ink-soft">Preview</span>
              </div>
              <p id="contact-form-status" role="status" className="mt-6 max-w-[48ch] text-sm leading-6 text-ink-soft">
                This form is a preview and does not accept or send messages yet.
              </p>
              <fieldset disabled className="mt-8 space-y-6">
                <legend className="sr-only">Enquiry details — unavailable while the form is in preview</legend>
                <div className="grid gap-6 sm:grid-cols-2">
                  <PreviewField label="Your name" name="name" placeholder="Your name" />
                  <PreviewField label="WhatsApp" name="whatsapp" type="tel" placeholder="Your WhatsApp number" />
                </div>
                <PreviewField label="Email" name="email" type="email" placeholder="you@email.com" />
                <label className="flex flex-col gap-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft">What are you looking for?</span>
                  <textarea name="message" rows={5} placeholder="Tell us about the piece or look…" className="resize-none border border-line bg-cream px-4 py-3 text-ink placeholder:text-muted disabled:opacity-80" />
                </label>
                <button type="submit" className="min-h-12 rounded-full bg-ink px-8 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-cream disabled:cursor-not-allowed disabled:opacity-45">
                  Send enquiry
                </button>
              </fieldset>
            </form>
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
