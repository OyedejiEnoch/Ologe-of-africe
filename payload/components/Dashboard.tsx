// The admin home (/admin): a morning briefing for the owner. Everything shown
// is read live from the database; when there's nothing yet (no orders before
// checkout opens) the card says so plainly instead of showing invented numbers.
// Styles live in app/(payload)/custom.css under `.od-*`.
import type { Payload } from "payload";
import {
  ArrowUpRight,
  Boxes,
  CircleAlert,
  Image as ImageIcon,
  Inbox,
  Mail,
  MessageCircle,
  Package,
  Plus,
  Settings,
  ShoppingBag,
  Tag,
  Truck,
  Users,
} from "lucide-react";
import { CATEGORY_KEYS, CATEGORY_LABEL, formatPrice } from "../../lib/catalog";

type Props = { payload: Payload; user?: { name?: string | null; email?: string | null } | null };

const ADMIN = "/admin";
const DAY = 86_400_000;
const PAID = ["paid", "dispatched", "delivered"];
const TZ = "Africa/Lagos";

const ORDER_STATUS: Record<string, { label: string; tone: string }> = {
  pending: { label: "Awaiting payment", tone: "wait" },
  paid: { label: "Paid · to dispatch", tone: "act" },
  failed: { label: "Payment failed", tone: "bad" },
  dispatched: { label: "Dispatched", tone: "ok" },
  delivered: { label: "Delivered", tone: "done" },
  cancelled: { label: "Cancelled", tone: "muted" },
  refunded: { label: "Refunded", tone: "muted" },
};

const naira = (n: number) => formatPrice(Math.round(n));

function greeting(now: Date) {
  const hour = Number(new Intl.DateTimeFormat("en-GB", { hour: "numeric", hour12: false, timeZone: TZ }).format(now));
  return hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
}

function ago(iso: string, now: number) {
  const mins = Math.max(1, Math.round((now - new Date(iso).getTime()) / 60_000));
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", timeZone: TZ }).format(new Date(iso));
}

// Daily buckets for the last `days` days (oldest first).
function series(docs: { createdAt: string; value?: number }[], days: number, now: number) {
  const out = new Array(days).fill(0);
  for (const d of docs) {
    const index = days - 1 - Math.floor((now - new Date(d.createdAt).getTime()) / DAY);
    if (index >= 0 && index < days) out[index] += d.value ?? 1;
  }
  return out;
}

function Spark({ values }: { values: number[] }) {
  const max = Math.max(...values);
  if (max === 0) return <div className="od-spark od-spark--flat" aria-hidden />;
  const w = 120;
  const h = 32;
  const step = w / (values.length - 1);
  const pts = values.map((v, i) => `${(i * step).toFixed(1)},${(h - 2 - (v / max) * (h - 6)).toFixed(1)}`);
  return (
    <svg className="od-spark" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" aria-hidden>
      <polyline points={`0,${h} ${pts.join(" ")} ${w},${h}`} className="od-spark__fill" />
      <polyline points={pts.join(" ")} className="od-spark__line" />
    </svg>
  );
}

type Media = { url?: string | null; sizes?: { thumbnail?: { url?: string | null } | null } | null };
const thumb = (m: unknown) => {
  const media = m && typeof m === "object" ? (m as Media) : null;
  return media?.sizes?.thumbnail?.url || media?.url || null;
};

export async function Dashboard({ payload, user }: Props) {
  const now = Date.now();
  const since30 = new Date(now - 30 * DAY).toISOString();
  const since7 = new Date(now - 7 * DAY).toISOString();

  const [orders30, recentOrders, toDispatch, awaitingPay, newEnquiries, enquiries30, recentEnquiries, subscribers, newSubs, products, settings] =
    await Promise.all([
      payload.find({ collection: "orders", where: { and: [{ createdAt: { greater_than: since30 } }, { status: { in: PAID } }] }, limit: 1000, pagination: false, depth: 0 }),
      payload.find({ collection: "orders", sort: "-createdAt", limit: 6, depth: 0 }),
      payload.count({ collection: "orders", where: { status: { equals: "paid" } } }),
      payload.count({ collection: "orders", where: { status: { equals: "pending" } } }),
      payload.count({ collection: "enquiries", where: { status: { equals: "new" } } }),
      payload.find({ collection: "enquiries", where: { createdAt: { greater_than: since30 } }, limit: 1000, pagination: false, depth: 0 }),
      payload.find({ collection: "enquiries", sort: "-createdAt", limit: 5, depth: 1 }),
      payload.count({ collection: "subscribers" }),
      payload.count({ collection: "subscribers", where: { createdAt: { greater_than: since30 } } }),
      payload.find({ collection: "products", sort: "-updatedAt", limit: 500, pagination: false, depth: 1 }),
      payload.findGlobal({ slug: "site-settings" }),
    ]);

  type OrderDoc = { id: string; reference: string; customerName: string; total: number; status: string; createdAt: string; items?: { quantity?: number }[] };
  type EnquiryDoc = { id: string; name: string; message: string; status?: string; createdAt: string; product?: { name?: string } | string | null };
  type ProductDoc = { id: string; name: string; variant?: string; category: string; price?: number | null; status: string; image?: unknown; updatedAt: string };

  const paid = orders30.docs as unknown as OrderDoc[];
  const revenue = paid.reduce((sum, o) => sum + (o.total || 0), 0);
  const revenueSeries = series(paid.map((o) => ({ createdAt: o.createdAt, value: o.total })), 30, now);
  const enquirySeries = series((enquiries30.docs as unknown as EnquiryDoc[]).map((e) => ({ createdAt: e.createdAt })), 30, now);
  const enquiriesThisWeek = (enquiries30.docs as unknown as EnquiryDoc[]).filter((e) => e.createdAt > since7).length;

  const allProducts = products.docs as unknown as ProductDoc[];
  const live = allProducts.filter((p) => p.status !== "hidden");
  const unpriced = live.filter((p) => p.price == null).length;
  const soldOut = allProducts.filter((p) => p.status === "sold-out").length;
  const hidden = allProducts.filter((p) => p.status === "hidden").length;
  const byCategory = CATEGORY_KEYS.map((key) => ({ key, label: CATEGORY_LABEL[key], count: live.filter((p) => p.category === key).length }));
  const whatsapp = (settings as { whatsapp?: string | null }).whatsapp;

  const firstName = (user?.name || user?.email?.split("@")[0] || "").split(" ")[0];
  const today = new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "numeric", month: "long", timeZone: TZ }).format(new Date(now));

  const tasks = [
    newEnquiries.totalDocs > 0 && {
      icon: <MessageCircle size={18} />,
      title: `Reply to ${newEnquiries.totalDocs} new ${newEnquiries.totalDocs === 1 ? "enquiry" : "enquiries"}`,
      body: "People waiting to hear back about a piece or a look.",
      href: `${ADMIN}/collections/enquiries?where[status][equals]=new`,
      tone: "act",
    },
    toDispatch.totalDocs > 0 && {
      icon: <Truck size={18} />,
      title: `Dispatch ${toDispatch.totalDocs} paid ${toDispatch.totalDocs === 1 ? "order" : "orders"}`,
      body: "Paid and ready to pack. Mark them dispatched once they’re on the way.",
      href: `${ADMIN}/collections/orders?where[status][equals]=paid`,
      tone: "act",
    },
    !whatsapp && {
      icon: <CircleAlert size={18} />,
      title: "Add the house WhatsApp number",
      body: "Every “Order on WhatsApp” button sends people to the Contact page until it’s set.",
      href: `${ADMIN}/globals/site-settings`,
      tone: "warn",
    },
    unpriced > 0 && {
      icon: <Tag size={18} />,
      title: `Set prices on ${unpriced} ${unpriced === 1 ? "piece" : "pieces"}`,
      body: "They show “Price on request” on the site. Prices are needed before checkout opens.",
      href: `${ADMIN}/collections/products?where[price][exists]=false`,
      tone: "warn",
    },
    soldOut > 0 && {
      icon: <Boxes size={18} />,
      title: `${soldOut} ${soldOut === 1 ? "piece is" : "pieces are"} sold out`,
      body: "Restocked? Switch them back to Available.",
      href: `${ADMIN}/collections/products?where[status][equals]=sold-out`,
      tone: "muted",
    },
  ].filter(Boolean) as { icon: React.ReactNode; title: string; body: string; href: string; tone: string }[];

  const shortcuts = [
    { label: "Products", note: `${live.length} live${hidden ? ` · ${hidden} hidden` : ""}`, href: `${ADMIN}/collections/products`, icon: <ShoppingBag size={18} /> },
    { label: "Photos & videos", note: "Upload and reuse", href: `${ADMIN}/collections/media`, icon: <ImageIcon size={18} /> },
    { label: "Orders", note: awaitingPay.totalDocs ? `${awaitingPay.totalDocs} awaiting payment` : "Paystack orders", href: `${ADMIN}/collections/orders`, icon: <Package size={18} /> },
    { label: "Enquiries", note: newEnquiries.totalDocs ? `${newEnquiries.totalDocs} new` : "From the Contact page", href: `${ADMIN}/collections/enquiries`, icon: <Inbox size={18} /> },
    { label: "Mailing list", note: `${subscribers.totalDocs} ${subscribers.totalDocs === 1 ? "person" : "people"}`, href: `${ADMIN}/collections/subscribers`, icon: <Mail size={18} /> },
    { label: "Team", note: "Who can sign in", href: `${ADMIN}/collections/users`, icon: <Users size={18} /> },
    { label: "Business details", note: whatsapp ? "WhatsApp, email, Instagram" : "WhatsApp not set", href: `${ADMIN}/globals/site-settings`, icon: <Settings size={18} /> },
  ];

  const orders = recentOrders.docs as unknown as OrderDoc[];
  const enquiries = recentEnquiries.docs as unknown as EnquiryDoc[];

  return (
    <div className="od">
      <header className="od-head">
        <div>
          <p className="od-eyebrow">OLÒGE of Africa · {today}</p>
          <h1 className="od-title">
            {greeting(new Date(now))}
            {firstName ? `, ${firstName[0].toUpperCase()}${firstName.slice(1)}` : ""}.
          </h1>
          <p className="od-lede">
            {tasks.length
              ? `${tasks.length} ${tasks.length === 1 ? "thing needs" : "things need"} your attention today.`
              : "Everything is in order. The house is open."}
          </p>
        </div>
        <div className="od-actions">
          <a className="od-btn od-btn--ghost" href="/" target="_blank" rel="noreferrer">
            View site <ArrowUpRight size={16} />
          </a>
          <a className="od-btn" href={`${ADMIN}/collections/products/create`}>
            <Plus size={16} /> Add a product
          </a>
        </div>
      </header>

      <section className="od-kpis" aria-label="The last 30 days">
        <a className="od-kpi" href={`${ADMIN}/collections/orders`}>
          <span className="od-kpi__label">Sales · 30 days</span>
          <span className="od-kpi__value">{naira(revenue)}</span>
          <span className="od-kpi__note">{paid.length ? `${paid.length} paid ${paid.length === 1 ? "order" : "orders"}` : "No paid orders yet"}</span>
          <Spark values={revenueSeries} />
        </a>
        <a className="od-kpi" href={`${ADMIN}/collections/orders?where[status][equals]=paid`}>
          <span className="od-kpi__label">To dispatch</span>
          <span className="od-kpi__value">{toDispatch.totalDocs}</span>
          <span className="od-kpi__note">{awaitingPay.totalDocs ? `${awaitingPay.totalDocs} awaiting payment` : "Nothing waiting on payment"}</span>
        </a>
        <a className="od-kpi" href={`${ADMIN}/collections/enquiries`}>
          <span className="od-kpi__label">New enquiries</span>
          <span className="od-kpi__value">{newEnquiries.totalDocs}</span>
          <span className="od-kpi__note">{enquiriesThisWeek} this week</span>
          <Spark values={enquirySeries} />
        </a>
        <a className="od-kpi" href={`${ADMIN}/collections/subscribers`}>
          <span className="od-kpi__label">Mailing list</span>
          <span className="od-kpi__value">{subscribers.totalDocs}</span>
          <span className="od-kpi__note">+{newSubs.totalDocs} in 30 days</span>
        </a>
      </section>

      <section className="od-card" aria-labelledby="od-tasks">
        <div className="od-card__head">
          <h2 id="od-tasks" className="od-h2">Needs your attention</h2>
        </div>
        {tasks.length ? (
          <ul className="od-tasks">
            {tasks.map((t) => (
              <li key={t.title}>
                <a className={`od-task od-task--${t.tone}`} href={t.href}>
                  <span className="od-task__icon">{t.icon}</span>
                  <span className="od-task__text">
                    <strong>{t.title}</strong>
                    <span>{t.body}</span>
                  </span>
                  <ArrowUpRight size={16} className="od-task__go" />
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="od-empty">All caught up. New enquiries and paid orders will appear here.</p>
        )}
      </section>

      <div className="od-split">
        <section className="od-card" aria-labelledby="od-orders">
          <div className="od-card__head">
            <h2 id="od-orders" className="od-h2">Recent orders</h2>
            <a className="od-link" href={`${ADMIN}/collections/orders`}>All orders →</a>
          </div>
          {orders.length ? (
            <table className="od-table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Customer</th>
                  <th className="od-num">Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => {
                  const s = ORDER_STATUS[o.status] ?? { label: o.status, tone: "muted" };
                  return (
                    <tr key={o.id}>
                      <td>
                        <a href={`${ADMIN}/collections/orders/${o.id}`} className="od-strong">{o.reference}</a>
                        <span className="od-sub">{ago(o.createdAt, now)}</span>
                      </td>
                      <td>{o.customerName}</td>
                      <td className="od-num">{naira(o.total || 0)}</td>
                      <td><span className={`od-pill od-pill--${s.tone}`}>{s.label}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className="od-empty od-empty--block">
              <Package size={22} />
              <p><strong>No orders yet.</strong> Paid orders will appear here once online checkout opens on the site.</p>
            </div>
          )}
        </section>

        <section className="od-card" aria-labelledby="od-enquiries">
          <div className="od-card__head">
            <h2 id="od-enquiries" className="od-h2">Latest enquiries</h2>
            <a className="od-link" href={`${ADMIN}/collections/enquiries`}>All →</a>
          </div>
          {enquiries.length ? (
            <ul className="od-feed">
              {enquiries.map((e) => (
                <li key={e.id}>
                  <a href={`${ADMIN}/collections/enquiries/${e.id}`}>
                    <span className="od-avatar" aria-hidden>{e.name.trim()[0]?.toUpperCase() ?? "?"}</span>
                    <span className="od-feed__text">
                      <span className="od-feed__top">
                        <strong>{e.name}</strong>
                        {e.status === "new" && <span className="od-dot" aria-label="New" />}
                        <span className="od-sub">{ago(e.createdAt, now)}</span>
                      </span>
                      <span className="od-feed__msg">{e.message}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <div className="od-empty od-empty--block">
              <Inbox size={22} />
              <p><strong>No enquiries yet.</strong> Messages from the Contact page land here.</p>
            </div>
          )}
        </section>
      </div>

      <section className="od-card" aria-labelledby="od-house">
        <div className="od-card__head">
          <div>
            <h2 id="od-house" className="od-h2">The house</h2>
            <p className="od-sub od-sub--block">
              {live.length} pieces live{soldOut ? ` · ${soldOut} sold out` : ""}{hidden ? ` · ${hidden} hidden` : ""}
            </p>
          </div>
          <a className="od-link" href={`${ADMIN}/collections/products`}>All products →</a>
        </div>
        <div className="od-chips">
          {byCategory.map((c) => (
            <a key={c.key} href={`${ADMIN}/collections/products?where[category][equals]=${c.key}`} className={`od-chip${c.count ? "" : " od-chip--empty"}`}>
              {c.label} <span>{c.count || "—"}</span>
            </a>
          ))}
        </div>
        <p className="od-label">Recently edited</p>
        <div className="od-products">
          {allProducts.slice(0, 6).map((p) => {
            const src = thumb(p.image);
            return (
              <a key={p.id} className="od-product" href={`${ADMIN}/collections/products/${p.id}`}>
                <span className="od-product__img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {src ? <img src={src} alt="" /> : <ImageIcon size={20} />}
                  {p.status !== "available" && (
                    <span className={`od-pill od-pill--${p.status === "hidden" ? "muted" : "bad"} od-product__flag`}>
                      {p.status === "hidden" ? "Hidden" : "Sold out"}
                    </span>
                  )}
                </span>
                <strong>{p.name}</strong>
                <span className="od-sub">{p.variant}</span>
                <span className={p.price == null ? "od-price od-price--none" : "od-price"}>{formatPrice(p.price ?? null)}</span>
              </a>
            );
          })}
        </div>
      </section>

      <section aria-labelledby="od-everything">
        <h2 id="od-everything" className="od-h2 od-h2--spaced">Everything</h2>
        <div className="od-shortcuts">
          {shortcuts.map((s) => (
            <a key={s.label} className="od-shortcut" href={s.href}>
              <span className="od-shortcut__icon">{s.icon}</span>
              <span>
                <strong>{s.label}</strong>
                <span className="od-sub od-sub--block">{s.note}</span>
              </span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
