#!/usr/bin/env node
/**
 * Word count and reading time for each article, derived from source.
 *
 * Run it after editing an article and paste the numbers into
 * app/blogs/blogs.tsx. Kept as a script rather than computed at runtime
 * because the prose lives in JSX, so counting it means parsing, and parsing
 * on every request to save a manual step is a bad trade.
 *
 *   node scripts/reading-time.mjs
 */
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

const WPM = 225; // average adult reading speed for non-fiction

// props whose string values are read by a human, not the machine
const PROSE_PROPS =
  /\b(?:caption|label|summary|kicker|title|body|what|lesson|fate|note|line|def|sub|tab|eg|verdict|placeholder)\s*=\s*(?:"([^"]*)"|\{`([^`]*)`\})/g;

function prose(src) {
  let s = src
    .replace(/^import[\s\S]*?from\s+["'][^"']+["'];?$/gm, "")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/^\s*\/\/.*$/gm, "")
    .replace(/className\s*=\s*(?:"[^"]*"|\{`[^`]*`\}|\{[^{}]*\})/g, "")
    .replace(/style\s*=\s*\{\{[\s\S]*?\}\}/g, "");

  const parts = [];
  for (const m of s.matchAll(PROSE_PROPS)) parts.push(m[1] ?? m[2] ?? "");

  // JSX text nodes: what sits between a closing > and the next opening <
  for (const m of s.matchAll(/>([^<>{}]+)</g)) parts.push(m[1]);
  // {" "}-joined prose and {`…`} blocks
  for (const m of s.matchAll(/\{`([^`]*)`\}/g)) parts.push(m[1]);

  return parts
    .join(" ")
    .replace(/&[a-z]+;/g, "'")
    .replace(/[{}]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const words = (t) => t.split(/\s+/).filter((w) => /[a-zA-Z0-9]/.test(w)).length;

const DIR = "app/blogs/_articles";
const articles = {
  "mechanic-is-a-man": ["stereotype.tsx", "stereotype/figures.tsx", "stereotype/illustrations.tsx"],
  "systems-of-record-reimagined": ["contextgraphs.tsx"],
  "a-reliable-knowledge-graph": ["knowledgegraph.tsx"],
  "principles-of-building-ai-agents": ["aiagent.tsx"],
};

console.log("slug".padEnd(34), "words".padStart(7), "min".padStart(5));
for (const [slug, files] of Object.entries(articles)) {
  let n = 0;
  for (const f of files) {
    const p = join(DIR, f);
    if (existsSync(p)) n += words(prose(readFileSync(p, "utf8")));
  }
  console.log(slug.padEnd(34), String(n).padStart(7), String(Math.max(1, Math.round(n / WPM))).padStart(5));
}
