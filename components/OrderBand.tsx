import { orderHref } from "@/lib/site";

// The ink "order desk" close used at the foot of the shop pages: how a
// piece goes from seen to yours, in three honest steps, with one way in.
const STEPS = [
  { n: "01", title: "Send the piece", line: "Share the piece you love — or describe the one you're after." },
  { n: "02", title: "We confirm it with you", line: "Availability, price and delivery agreed personally, before you pay." },
  { n: "03", title: "Delivered with grace", line: "Prepared with care and sent to your door." },
];

export default function OrderBand({ title = "Seen something? Ask about it." }: { title?: string }) {
  return (
    <section className="bg-ink px-6 py-24 text-cream md:px-10 md:py-32">
      <div className="mx-auto grid max-w-[1400px] gap-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="eyebrow text-gold">The order desk</p>
          <h2 className="font-display mt-4 max-w-[14ch] text-[clamp(2.4rem,4.6vw,4.2rem)]">{title}</h2>
          <a
            data-magnetic
            href={orderHref()}
            className="pressable mt-10 inline-flex min-h-12 items-center gap-3 rounded-full bg-cream px-7 text-xs font-medium uppercase tracking-[0.18em] text-ink hover:bg-gold hover:text-ink-deep"
          >
            Start an enquiry <span aria-hidden>→</span>
          </a>
        </div>
        <ol className="grid self-end border-y border-cream/15 md:col-span-6 md:col-start-7">
          {STEPS.map((s) => (
            <li key={s.n} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-cream/15 py-6 last:border-b-0">
              <span className="font-body text-[0.68rem] tabular-nums tracking-[0.2em] text-gold">{s.n}</span>
              <div>
                <p className="font-display text-[clamp(1.3rem,1.9vw,1.7rem)]">{s.title}</p>
                <p className="mt-1 text-cream/70">{s.line}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
