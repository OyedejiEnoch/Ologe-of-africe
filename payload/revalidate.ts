import { revalidateTag } from "next/cache";

// Tell the storefront its cached copy is stale. Outside a Next.js request
// (the seed script, `payload run`) there is no cache to clear, so revalidateTag
// throws; that is expected and safe to ignore.
export function refresh(tag: string) {
  try {
    revalidateTag(tag);
  } catch {
    /* not running inside Next.js */
  }
}
