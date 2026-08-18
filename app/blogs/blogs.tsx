import type React from "react";
import AiAgentArticle from "./_articles/aiagent";
import ContextGraphsArticle from "./_articles/contextgraphs";
import KnowledgeGraphArticle from "./_articles/knowledgegraph";
import StereotypeArticle from "./_articles/stereotype";

export interface Blog {
  /** url segment — /blogs/<slug>. changing this breaks shared links. */
  slug: string;
  title: string;
  thumbnail: string;
  summary: string;
  Content: React.ComponentType;
  /** render the reader in a wider column — for articles with interactive figures */
  wide?: boolean;
  kicker?: string;
  /** ISO date the piece went up. Taken from the first commit that added it. */
  date: string;
  /**
   * Whole minutes at 225wpm. Regenerate with `node scripts/reading-time.mjs`
   * after editing an article — it counts the prose out of the JSX.
   */
  readingMinutes: number;
}

export const blogs: Blog[] = [
  {
    slug: "mechanic-is-a-man",
    date: "2026-08-16",
    readingMinutes: 17,
    title: "The Number That Decides a Mechanic Is a Man",
    kicker:
      "mechanistic interpretability · sparse autoencoders · feature steering",
    thumbnail: "/article/aquin/thumb.svg",
    summary:
      "One feature in layer 8 of Llama-3.2-1B does occupation→gender stereotyping. Turn it down and 15:1 becomes 1:1. Turn it up and the model argues with a pronoun it just read. Interactive — bring your hands.",
    Content: StereotypeArticle,
    wide: true,
  },
  {
    slug: "systems-of-record-reimagined",
    date: "2026-05-05",
    readingMinutes: 6,
    title: "Systems of Record, Reimagined",
    thumbnail: "/article/context.avif",
    summary:
      "Why intelligence doesn't live where the data lives — and how context graphs sit above systems of record to capture decisions, not just outcomes.",
    Content: ContextGraphsArticle,
  },
  {
    slug: "a-reliable-knowledge-graph",
    date: "2026-05-05",
    readingMinutes: 7,
    title: "A Reliable Knowledge Graph Is What We Need",
    thumbnail: "/article/kg-biomedical.svg",
    summary:
      "LLMs hallucinate and vector retrieval drops the facts that matter. The fix may be a bottom-up one — domain-expert models grounded in structured knowledge graphs.",
    Content: KnowledgeGraphArticle,
  },
  {
    slug: "principles-of-building-ai-agents",
    date: "2025-07-06",
    readingMinutes: 8,
    title: "Principles of Building AI Agents",
    thumbnail: "/article/aiagentarc.png",
    summary:
      "How LLMs, tools, memory, and orchestration come together to build autonomous AI agents.",
    Content: AiAgentArticle,
  },
];

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function getBlog(slug: string): Blog | undefined {
  return blogs.find((blog) => blog.slug === slug);
}

export interface ExternalArticle {
  title: string;
  url: string;
  platform: string;
}

// Add links to articles you've written on Medium, Substack, etc. here.
export const externalArticles: ExternalArticle[] = [];
