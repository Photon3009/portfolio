"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Comments, native to the site. No third-party iframe, no login — a name and a
 * comment. Posts go to /api/comments, which is the only thing that ever touches
 * the database.
 */

const INK = "#191919";
const RED = "#C62828";
const PAPER = "#F2EEE5";
const PAPER_HEAD = "#E7E1D4";
const RULE = "rgba(25,25,25,0.14)";

type Comment = {
  id: string;
  parent_id: string | null;
  author: string;
  body: string;
  created_at: string;
};

function ago(iso: string): string {
  const secs = Math.max(1, (Date.now() - new Date(iso).getTime()) / 1000);
  const steps: [number, string][] = [
    [60, "s"],
    [3600, "m"],
    [86400, "h"],
    [604800, "d"],
  ];
  if (secs < 60) return "just now";
  for (let i = 1; i < steps.length; i++) {
    if (secs < steps[i][0]) {
      return `${Math.floor(secs / steps[i - 1][0])}${steps[i][1]} ago`;
    }
  }
  return new Date(iso).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  });
}

export default function Comments({ slug }: { slug: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [configured, setConfigured] = useState(true);
  const [loading, setLoading] = useState(true);
  const [replyTo, setReplyTo] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const res = await fetch(
        `/api/comments?slug=${encodeURIComponent(slug)}`,
        { cache: "no-store" }
      );
      const data = await res.json();
      setComments(data.comments ?? []);
      if (data.configured === false) setConfigured(false);
    } catch {
      /* leave the thread empty; the form still explains failures */
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    load();
  }, [load]);

  const roots = comments.filter((c) => !c.parent_id);
  const repliesOf = (id: string) =>
    comments.filter((c) => c.parent_id === id);

  return (
    <section className="mx-auto max-w-[40rem] mt-24">
      <div
        className="flex items-baseline gap-2.5 pb-2 border-b"
        style={{ borderColor: RULE }}
      >
        <span
          className="font-mono text-[10px] font-bold tracking-[0.12em] tabular-nums"
          style={{ color: RED }}
        >
          {String(comments.length).padStart(2, "0")}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#191919]/45">
          {comments.length === 1 ? "comment" : "comments"}
        </span>
      </div>

      {!configured ? (
        <p className="mt-4 text-[13px] leading-relaxed text-[#191919]/55">
          Comments are not connected yet. Add <code className="font-mono">SUPABASE_URL</code>{" "}
          and <code className="font-mono">SUPABASE_SERVICE_ROLE_KEY</code> to{" "}
          <code className="font-mono">.env.local</code>, and run{" "}
          <code className="font-mono">supabase/schema.sql</code> once.
        </p>
      ) : (
        <>
          <CommentForm slug={slug} onPosted={load} />

          {loading ? (
            <p className="mt-6 font-mono text-[11px] text-[#191919]/35">
              loading…
            </p>
          ) : roots.length === 0 ? (
            <p className="mt-6 text-[13px] text-[#191919]/45 italic">
              Nothing here yet. Yours would be the first.
            </p>
          ) : (
            <ul className="mt-7 space-y-5">
              {roots.map((c) => (
                <li key={c.id}>
                  <Bubble c={c} />
                  <div className="mt-1.5 pl-0.5">
                    <button
                      onClick={() =>
                        setReplyTo(replyTo === c.id ? null : c.id)
                      }
                      className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#191919]/35 hover:text-[#191919]/70 transition-colors"
                    >
                      {replyTo === c.id ? "cancel" : "↳ reply"}
                    </button>
                  </div>

                  {replyTo === c.id && (
                    <div className="mt-2 pl-5">
                      <CommentForm
                        slug={slug}
                        parentId={c.id}
                        compact
                        onPosted={() => {
                          setReplyTo(null);
                          load();
                        }}
                      />
                    </div>
                  )}

                  {repliesOf(c.id).length > 0 && (
                    <ul
                      className="mt-3 ml-3 pl-4 space-y-3 border-l"
                      style={{ borderColor: RULE }}
                    >
                      {repliesOf(c.id).map((r) => (
                        <li key={r.id}>
                          <Bubble c={r} />
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </section>
  );
}

function Bubble({ c }: { c: Comment }) {
  return (
    <div
      className="rounded-[3px] border px-3.5 py-2.5"
      style={{ background: PAPER, borderColor: RULE }}
    >
      <div className="flex items-baseline gap-2.5">
        <span className="text-[13px] font-medium">{c.author}</span>
        <span className="font-mono text-[10px] text-[#191919]/35">
          {ago(c.created_at)}
        </span>
      </div>
      <p className="mt-1 text-[14px] leading-relaxed text-[#191919]/85 whitespace-pre-wrap">
        {c.body}
      </p>
    </div>
  );
}

function CommentForm({
  slug,
  parentId = null,
  compact = false,
  onPosted,
}: {
  slug: string;
  parentId?: string | null;
  compact?: boolean;
  onPosted: () => void;
}) {
  const [author, setAuthor] = useState("");
  const [body, setBody] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setAuthor(localStorage.getItem("museum-comment-name") ?? "");
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, parentId, author, body, website }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "could not post");
        return;
      }
      localStorage.setItem("museum-comment-name", author.trim());
      setBody("");
      onPosted();
    } catch {
      setError("network trouble — try again");
    } finally {
      setBusy(false);
    }
  };

  const field =
    "w-full rounded-[3px] border px-2.5 py-1.5 text-[14px] outline-none focus:border-[#191919]/45 transition-colors";

  return (
    <form
      onSubmit={submit}
      className={`rounded-[3px] border overflow-hidden ${compact ? "mt-0" : "mt-5"}`}
      style={{ background: PAPER, borderColor: RULE }}
    >
      <div
        className="px-3 py-1 border-b font-mono text-[9.5px] uppercase tracking-[0.16em] text-[#191919]/40"
        style={{ background: PAPER_HEAD, borderColor: RULE }}
      >
        {parentId ? "reply" : "leave a comment"}
      </div>

      <div className="p-3 space-y-2">
        <input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="your name"
          maxLength={40}
          required
          className={field}
          style={{ background: "#fff", borderColor: RULE, color: INK }}
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder={parentId ? "your reply…" : "what did you think?"}
          maxLength={2000}
          required
          rows={compact ? 2 : 3}
          className={`${field} resize-y leading-relaxed`}
          style={{ background: "#fff", borderColor: RULE, color: INK }}
        />

        {/* honeypot — off-screen and hidden from assistive tech */}
        <input
          type="text"
          name="website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute left-[-9999px] h-0 w-0 opacity-0"
        />

        <div className="flex items-center justify-between gap-3 pt-0.5">
          <span className="font-mono text-[10px] text-[#191919]/35">
            {error ? (
              <span style={{ color: RED }}>{error}</span>
            ) : (
              `${body.length}/2000`
            )}
          </span>
          <button
            type="submit"
            disabled={busy || !author.trim() || !body.trim()}
            className="font-mono text-[10px] uppercase tracking-[0.14em] px-3 py-1.5 rounded-[3px] border transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              background: INK,
              borderColor: "transparent",
              color: "#fff",
            }}
          >
            {busy ? "posting…" : parentId ? "reply" : "post"}
          </button>
        </div>
      </div>
    </form>
  );
}
