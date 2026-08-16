/**
 * Views, reactions and comments.
 *
 * The site is statically exported with no database, so anything that has to
 * *persist* lives in a third-party service. Everything here degrades quietly
 * when a service is not configured — nothing throws, nothing renders broken.
 *
 * ---------------------------------------------------------------------------
 * VIEW_BASELINE is a number added to the real counter. It is not measured
 * traffic. Nobody visiting the site can tell the difference between a baseline
 * and a real count, so treat it as a display choice you are making on purpose,
 * and set it to 0 if you would rather the number be true.
 * ---------------------------------------------------------------------------
 */
export const VIEW_BASELINE = 2152;

/**
 * Namespace for the hit counter. Change it and the count restarts from the
 * baseline, so keep it stable once the site is live.
 */
export const VIEW_KEY = "photon3009-portfolio-museum";

/**
 * Counter endpoint. Configure with NEXT_PUBLIC_VIEWS_ENDPOINT.
 *
 * The URL should return JSON and accept one hit per call. Two that work with
 * no account and no server of your own:
 *   https://api.counterapi.dev/v1/<workspace>/<key>/up
 *   https://abacus.jasoncameron.dev/hit/<namespace>/<key>
 *
 * Left unset, the UI shows the baseline alone and never makes a request.
 */
const ENDPOINT = process.env.NEXT_PUBLIC_VIEWS_ENDPOINT;

export const viewsConfigured = Boolean(ENDPOINT);

/** Pull the shared count and add the baseline. Resolves to null on any failure. */
export async function fetchViews(): Promise<number | null> {
  if (!ENDPOINT) return null;
  try {
    const res = await fetch(ENDPOINT, { cache: "no-store" });
    if (!res.ok) return null;
    const data: unknown = await res.json();
    // counterapi returns {count}, abacus returns {value} — accept either
    const raw =
      typeof data === "object" && data !== null
        ? ((data as Record<string, unknown>).count ??
          (data as Record<string, unknown>).value)
        : null;
    return typeof raw === "number" ? raw + VIEW_BASELINE : null;
  } catch {
    return null;
  }
}

export function formatCount(n: number): string {
  return n.toLocaleString("en-US");
}
