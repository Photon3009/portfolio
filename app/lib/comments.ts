import { createHash } from "crypto";

/**
 * Server-side data access for comments.
 *
 * Talks to Supabase over its PostgREST endpoint with plain fetch, so the app
 * needs no client library. The service-role key bypasses row-level security and
 * must never reach the browser — everything here is imported only by the API
 * route, which runs on the server.
 */

const URL = process.env.SUPABASE_URL;
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const SALT = process.env.COMMENT_IP_SALT ?? "museum";

export const commentsConfigured = Boolean(URL && KEY);

export type Comment = {
  id: string;
  slug: string;
  parent_id: string | null;
  author: string;
  body: string;
  created_at: string;
};

/** Public shape — ip_hash is never serialised to a client. */
export type PublicComment = Omit<Comment, "slug">;

const rest = (path: string) => `${URL}/rest/v1/${path}`;
const headers = {
  apikey: KEY ?? "",
  Authorization: `Bearer ${KEY ?? ""}`,
  "Content-Type": "application/json",
};

/** IPs are hashed with a salt so the table holds no raw addresses. */
export function hashIp(ip: string): string {
  return createHash("sha256").update(`${SALT}:${ip}`).digest("hex").slice(0, 32);
}

export function clientIp(h: Headers): string {
  const fwd = h.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return h.get("x-real-ip") ?? "unknown";
}

export async function listComments(slug: string): Promise<PublicComment[]> {
  if (!commentsConfigured) return [];
  const qs = new URLSearchParams({
    slug: `eq.${slug}`,
    select: "id,parent_id,author,body,created_at",
    order: "created_at.asc",
    limit: "500",
  });
  const res = await fetch(rest(`comments?${qs}`), {
    headers,
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`supabase list ${res.status}: ${await res.text()}`);
  return (await res.json()) as PublicComment[];
}

/** How many comments this IP posted in the last `seconds`. */
export async function recentCountForIp(
  ipHash: string,
  seconds: number
): Promise<number> {
  if (!commentsConfigured) return 0;
  const since = new Date(Date.now() - seconds * 1000).toISOString();
  const qs = new URLSearchParams({
    ip_hash: `eq.${ipHash}`,
    created_at: `gte.${since}`,
    select: "id",
  });
  const res = await fetch(rest(`comments?${qs}`), {
    headers: { ...headers, Prefer: "count=exact" },
    cache: "no-store",
  });
  if (!res.ok) return 0;
  const rows = (await res.json()) as unknown[];
  return rows.length;
}

export async function insertComment(row: {
  slug: string;
  parent_id: string | null;
  author: string;
  body: string;
  ip_hash: string;
}): Promise<PublicComment> {
  const res = await fetch(rest("comments"), {
    method: "POST",
    headers: { ...headers, Prefer: "return=representation" },
    body: JSON.stringify(row),
  });
  if (!res.ok) {
    throw new Error(`supabase insert ${res.status}: ${await res.text()}`);
  }
  const [created] = (await res.json()) as Comment[];
  const { slug: _slug, ...pub } = created;
  void _slug;
  return pub;
}

/** Returns a trimmed value, or null when it fails validation. */
export function clean(
  value: unknown,
  min: number,
  max: number
): string | null {
  if (typeof value !== "string") return null;
  const v = value.trim().replace(/\s+/g, (m) => (m.includes("\n") ? m : " "));
  if (v.length < min || v.length > max) return null;
  return v;
}
