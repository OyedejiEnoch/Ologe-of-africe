// Quiet enquiry band. Presentational for the art-direction phase; this becomes
// a server action writing to the Payload `Enquiries` collection (with honeypot),
// exactly as Luxmint's Booking form does.
export default function Enquiry() {
  return (
    <section id="contact" className="bg-cream px-6 py-[var(--spacing-section)] md:px-10">
      <div className="mx-auto grid max-w-[1400px] gap-16 md:grid-cols-2 md:items-center">
        <div>
          <p className="eyebrow text-gold-deep">Say hello</p>
          <h2 className="font-display mt-4 text-[clamp(2.2rem,5vw,4rem)] text-ink">
            Looking for
            <br />
            something particular?
          </h2>
          <p className="mt-6 max-w-[46ch] text-ink-soft">
            Tell us what you have in mind — a piece, a full look, or a gift. We
            reply personally, over WhatsApp or email.
          </p>
        </div>

        <form className="flex flex-col gap-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Your name" placeholder="Adé Ọlọ́ládé" />
            <Field label="WhatsApp" placeholder="080 0000 0000" />
          </div>
          <Field label="Email" placeholder="you@email.com" />
          <label className="flex flex-col gap-2">
            <span className="text-xs font-medium uppercase tracking-[0.15em] text-muted">
              What are you looking for?
            </span>
            <textarea
              rows={4}
              placeholder="A fascinator for a wedding in December…"
              className="resize-none border border-line bg-transparent px-4 py-3 text-ink outline-none transition-colors focus:border-gold"
            />
          </label>
          <button
            type="button"
            className="mt-2 self-start rounded-full bg-ink px-9 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-cream transition-transform hover:-translate-y-0.5"
          >
            Send enquiry
          </button>
        </form>
      </div>
    </section>
  );
}

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-xs font-medium uppercase tracking-[0.15em] text-muted">
        {label}
      </span>
      <input
        type="text"
        placeholder={placeholder}
        className="border border-line bg-transparent px-4 py-3 text-ink outline-none transition-colors focus:border-gold"
      />
    </label>
  );
}
