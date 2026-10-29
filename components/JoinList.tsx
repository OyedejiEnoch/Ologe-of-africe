"use client";

// Newsletter banner over the woven-hat look; copy sits in the dark backdrop to
// the right of the subject. Submitting is a no-op until the Payload
// `Subscribers` collection exists — it must not pretend to have signed anyone up.
export default function JoinList() {
  return (
    <section className="bg-cream px-6 pb-[var(--spacing-section)] md:px-10">
      <div className="relative mx-auto min-h-[520px] max-w-[1400px] overflow-hidden bg-ink">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          data-parallax="0.12"
          src="/media/stills/hat-wide.jpg"
          alt="A woman in a wide woven hat and patterned blazer"
          className="absolute inset-0 h-full w-full scale-[1.16] object-cover object-[30%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-ink/85 via-ink/45 to-transparent" />

        <div className="relative ml-auto flex min-h-[520px] max-w-[560px] flex-col justify-center p-8 text-cream md:p-14">
          <p className="eyebrow text-gold">The list</p>
          <h2 className="font-display mt-4 text-[clamp(2.2rem,4.4vw,3.8rem)]">
            Be first to <em className="italic text-gold">the new pieces.</em>
          </h2>
          <p className="mt-5 max-w-[40ch] text-cream/75">
            New arrivals, restocks and the odd styling note — never more than you’d want.
          </p>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-9 flex w-full max-w-[460px] items-center gap-2 border border-cream/25 bg-cream p-1.5"
          >
            <label htmlFor="join-email" className="sr-only">
              Email address
            </label>
            <input
              id="join-email"
              type="email"
              required
              placeholder="you@email.com"
              className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-ink outline-none placeholder:text-muted"
            />
            <button
              type="submit"
              className="shrink-0 bg-ink px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-cream transition-colors hover:bg-gold-deep"
            >
              Join
            </button>
          </form>
          <p className="mt-3 text-xs text-cream/50">Unsubscribe anytime.</p>
        </div>
      </div>
    </section>
  );
}
