"use client";

import { useActionState } from "react";
import { subscribe, type FormState } from "@/lib/actions";

// Newsletter band, split like the luxury references: an editorial photograph
// on the left, the sign-up on ink on the right (stacks on phones). Sign-ups are
// saved to the Payload `subscribers` collection through a server action.
const initial: FormState = { status: "idle" };

export default function JoinList() {
  const [state, action, pending] = useActionState(subscribe, initial);
  return (
    <section className="bg-cream px-6 pb-[var(--spacing-section)] md:px-10">
      <div className="mx-auto grid max-w-[1400px] overflow-hidden bg-ink md:min-h-[560px] md:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden md:aspect-auto">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            data-parallax="0.08"
            src="/media/editorial/spiral-hat.webp"
            alt="A woman under a black sculpted hat of coiled bands, red lips, black roll-neck"
            className="absolute inset-0 h-full w-full scale-[1.1] object-cover object-[50%_40%]"
          />
        </div>

        <div className="relative flex flex-col justify-center p-8 text-cream md:p-14 lg:p-20">
          <p className="eyebrow text-cream/55">The list</p>
          <h2 className="font-display mt-4 text-[clamp(2.2rem,4.4vw,3.8rem)]">
            Be first to <em className="italic">the new pieces.</em>
          </h2>
          <p className="mt-5 max-w-[40ch] text-cream/75">
            New arrivals, restocks and the odd styling note — never more than you’d want.
          </p>

          {state.status === "ok" ? (
            <p role="status" className="mt-9 max-w-[460px] border border-cream/25 px-5 py-4 font-display text-xl italic">
              {state.message}
            </p>
          ) : (
          <form
            action={action}
            className="mt-9 flex w-full max-w-[460px] items-center gap-2 border border-cream/25 bg-cream p-1.5"
          >
            <label htmlFor="join-email" className="sr-only">
              Email address
            </label>
            <input type="hidden" name="source" value="home" />
            <input name="company" tabIndex={-1} autoComplete="off" aria-hidden className="absolute left-[-9999px] h-px w-px" />
            <input
              id="join-email"
              name="email"
              type="email"
              required
              placeholder="you@email.com"
              className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-ink outline-none placeholder:text-muted"
            />
            <button
              type="submit"
              disabled={pending}
              className="shrink-0 bg-ink px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-cream transition-colors hover:bg-ink-soft"
            >
              {pending ? "…" : "Join"}
            </button>
          </form>
          )}
          <p role={state.status === "error" ? "alert" : undefined} className="mt-3 text-xs text-cream/50">
            {state.status === "error" ? state.message : "Unsubscribe anytime."}
          </p>
        </div>
      </div>
    </section>
  );
}
