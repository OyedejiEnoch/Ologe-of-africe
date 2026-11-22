"use client";

import { useActionState } from "react";
import { submitEnquiry, type FormState } from "@/lib/actions";

// Contact form → `enquiries` in Payload (via a server action). The owner reads
// and answers them in /admin → Customers → Enquiries.
const initial: FormState = { status: "idle" };

const label = "text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft";
const input =
  "min-h-12 border border-line bg-cream px-4 py-3 text-ink outline-none transition-colors placeholder:text-muted focus:border-ink";

export default function ContactForm() {
  const [state, action, pending] = useActionState(submitEnquiry, initial);

  if (state.status === "ok") {
    return (
      <div role="status" className="flex min-h-[420px] flex-col justify-center border border-line bg-paper p-6 md:p-10">
        <p className="eyebrow text-ink">Received</p>
        <h3 className="mt-5 max-w-[16ch] font-display text-[clamp(2.2rem,4vw,3.2rem)] leading-[0.95]">
          Your note is with the house.
        </h3>
        <p className="mt-6 max-w-[42ch] leading-7 text-ink-soft">
          {state.message ?? "Thank you. We’ll reply personally."}
        </p>
      </div>
    );
  }

  return (
    <form action={action} aria-describedby="contact-form-status" className="border border-line bg-paper p-6 md:p-10">
      <h3 className="border-b border-line pb-6 font-display text-3xl">Enquiry form</h3>
      <p id="contact-form-status" role="status" aria-live="polite" className={`mt-6 min-h-6 text-sm leading-6 ${state.status === "error" ? "text-ink" : "text-ink-soft"}`}>
        {state.status === "error" ? state.message : "We reply personally, on WhatsApp or by email."}
      </p>
      <div className="mt-6 space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className={label}>Your name</span>
            <input name="name" required autoComplete="name" placeholder="Your name" className={input} />
          </label>
          <label className="flex flex-col gap-2">
            <span className={label}>WhatsApp</span>
            <input name="whatsapp" type="tel" autoComplete="tel" placeholder="080 0000 0000" className={input} />
          </label>
        </div>
        <label className="flex flex-col gap-2">
          <span className={label}>Email</span>
          <input name="email" type="email" autoComplete="email" placeholder="you@email.com" className={input} />
        </label>
        <label className="flex flex-col gap-2">
          <span className={label}>What are you looking for?</span>
          <textarea name="message" required rows={5} placeholder="Tell us about the piece or look…" className={`${input} resize-none`} />
        </label>
        {/* Honeypot for bots: hidden from people and screen readers. */}
        <div aria-hidden className="absolute left-[-9999px] h-px w-px overflow-hidden">
          <label>
            Company <input name="company" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
        <button
          type="submit"
          disabled={pending}
          className="min-h-12 rounded-full bg-ink px-8 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-cream transition-opacity disabled:cursor-wait disabled:opacity-60"
        >
          {pending ? "Sending…" : "Send enquiry"}
        </button>
      </div>
    </form>
  );
}
