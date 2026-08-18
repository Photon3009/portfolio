import { NextResponse } from "next/server";
import {
  clean,
  clientIp,
  commentsConfigured,
  hashIp,
  insertComment,
  listComments,
  recentCountForIp,
} from "../../lib/comments";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** No login, so: a honeypot for bots and a per-IP window for floods. */
const RATE_WINDOW_SECONDS = 120;
const RATE_MAX_IN_WINDOW = 3;

/**
 * Never swallow the upstream reason. It always reaches the server log, and in
 * development it also reaches the response, so a misconfiguration is visible
 * instead of showing up as a bare 502.
 */
function fail(message: string, err: unknown) {
  const detail = err instanceof Error ? err.message : String(err);
  console.error(`[comments] ${message}:`, detail);
  return NextResponse.json(
    {
      error: message,
      ...(process.env.NODE_ENV === "production" ? {} : { detail }),
    },
    { status: 502 }
  );
}

export async function GET(request: Request) {
  const slug = new URL(request.url).searchParams.get("slug");
  if (!slug) {
    return NextResponse.json({ error: "slug required" }, { status: 400 });
  }
  if (!commentsConfigured) {
    return NextResponse.json({ comments: [], configured: false });
  }
  try {
    return NextResponse.json({
      comments: await listComments(slug),
      configured: true,
    });
  } catch (err) {
    return fail("could not load", err);
  }
}

export async function POST(request: Request) {
  if (!commentsConfigured) {
    return NextResponse.json({ error: "not configured" }, { status: 503 });
  }

  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }

  // Honeypot: a field hidden from humans. Anything filling it is a bot, so
  // accept the request and drop it, rather than teaching the bot to retry.
  if (typeof payload.website === "string" && payload.website.length > 0) {
    return NextResponse.json({ ok: true, comment: null });
  }

  const slug = clean(payload.slug, 1, 120);
  const author = clean(payload.author, 1, 40);
  const body = clean(payload.body, 1, 2000);
  const parentId =
    typeof payload.parentId === "string" && payload.parentId.length
      ? payload.parentId
      : null;

  if (!slug || !author || !body) {
    return NextResponse.json(
      { error: "name and comment are both required" },
      { status: 422 }
    );
  }

  const ipHash = hashIp(clientIp(request.headers));
  try {
    if ((await recentCountForIp(ipHash, RATE_WINDOW_SECONDS)) >= RATE_MAX_IN_WINDOW) {
      return NextResponse.json(
        { error: "you are posting quite fast — give it a minute" },
        { status: 429 }
      );
    }
    const comment = await insertComment({
      slug,
      parent_id: parentId,
      author,
      body,
      ip_hash: ipHash,
    });
    return NextResponse.json({ ok: true, comment });
  } catch (err) {
    return fail("could not save", err);
  }
}
