"use server";

// Server actions for the public forms. They write with overrideAccess because
// the collections deny public creates; validation happens here instead.
import { getPayload } from "payload";
import config from "@payload-config";
import { cmsConfigured } from "./cms";

export type FormState = { status: "idle" | "ok" | "error"; message?: string };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const text = (data: FormData, key: string, max: number) =>
  String(data.get(key) ?? "").trim().slice(0, max);

const UNAVAILABLE: FormState = {
  status: "error",
  message: "Messages can’t be received just yet. Please try again shortly.",
};

export async function submitEnquiry(_prev: FormState, data: FormData): Promise<FormState> {
  // Honeypot: real visitors never see or fill this field.
  if (text(data, "company", 200)) return { status: "ok" };

  const name = text(data, "name", 120);
  const whatsapp = text(data, "whatsapp", 40);
  const email = text(data, "email", 200);
  const message = text(data, "message", 4000);
  const productId = text(data, "product", 64);

  if (!name) return { status: "error", message: "Please tell us your name." };
  if (!whatsapp && !email) return { status: "error", message: "Add a WhatsApp number or an email so we can reply." };
  if (email && !EMAIL.test(email)) return { status: "error", message: "That email address doesn’t look right." };
  if (whatsapp && !/^[+\d][\d\s-]{6,}$/.test(whatsapp)) return { status: "error", message: "That WhatsApp number doesn’t look right." };
  if (message.length < 3) return { status: "error", message: "Tell us a little about what you’re looking for." };
  if (!cmsConfigured()) return UNAVAILABLE;

  try {
    const payload = await getPayload({ config });
    await payload.create({
      collection: "enquiries",
      overrideAccess: true,
      data: {
        name,
        whatsapp: whatsapp || undefined,
        email: email || undefined,
        message,
        product: productId || undefined,
        status: "new",
      },
    });
    return { status: "ok", message: "Thank you — your note is with the house. We’ll reply personally." };
  } catch (error) {
    console.error("[enquiry] save failed:", error);
    return UNAVAILABLE;
  }
}

export async function subscribe(_prev: FormState, data: FormData): Promise<FormState> {
  if (text(data, "company", 200)) return { status: "ok", message: "You’re on the list." };

  const email = text(data, "email", 200).toLowerCase();
  if (!EMAIL.test(email)) return { status: "error", message: "Please enter a valid email address." };
  if (!cmsConfigured()) return { status: "error", message: "Sign-ups open shortly. Please try again soon." };

  try {
    const payload = await getPayload({ config });
    const existing = await payload.count({ collection: "subscribers", where: { email: { equals: email } }, overrideAccess: true });
    if (existing.totalDocs === 0) {
      await payload.create({
        collection: "subscribers",
        overrideAccess: true,
        data: { email, source: text(data, "source", 40) || "home" },
      });
    }
    return { status: "ok", message: "You’re on the list." };
  } catch (error) {
    console.error("[subscribe] save failed:", error);
    return { status: "error", message: "Something went wrong. Please try again." };
  }
}
