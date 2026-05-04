"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AiAgentArticle from "./aiagent";
import ContextGraphsArticle from "./contextgraphs";
import KnowledgeGraphArticle from "./knowledgegraph";

interface Blog {
  title: string;
  thumbnail: string;
  summary: string;
  content: React.ReactNode;
}

interface ExternalArticle {
  title: string;
  url: string;
  platform: string;
}

const blogs: Blog[] = [
  {
    title: "Systems of Record, Reimagined",
    thumbnail: "/article/context.avif",
    summary:
      "Why intelligence doesn't live where the data lives — and how context graphs sit above systems of record to capture decisions, not just outcomes.",
    content: <ContextGraphsArticle />,
  },
  {
    title: "A Reliable Knowledge Graph Is What We Need",
    thumbnail: "/article/kg-biomedical.svg",
    summary:
      "LLMs hallucinate and vector retrieval drops the facts that matter. The fix may be a bottom-up one — domain-expert models grounded in structured knowledge graphs.",
    content: <KnowledgeGraphArticle />,
  },
  {
    title: "Principles of Building AI Agents",
    thumbnail: "/article/aiagentarc.png",
    summary:
      "How LLMs, tools, memory, and orchestration come together to build autonomous AI agents.",
    content: <AiAgentArticle />,
  },
];

// Add links to articles you've written on Medium, Substack, etc. here.
const externalArticles: ExternalArticle[] = [];

export default function MuseumPage() {
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  if (selectedBlog) {
    return (
      <main className="min-h-screen bg-white text-[#191919]">
        <div className="max-w-3xl mx-auto px-6 py-12">
          <button
            onClick={() => setSelectedBlog(null)}
            className="text-sm text-[#191919]/60 hover:text-[#191919] transition-colors"
          >
            ← back to museum
          </button>
          <h1 className="text-3xl font-bold mt-8 mb-6">{selectedBlog.title}</h1>
          <div>{selectedBlog.content}</div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-[#191919]">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <Link
          href="/"
          className="text-sm text-[#191919]/60 hover:text-[#191919] transition-colors"
        >
          ← back
        </Link>

        <h1 className="text-3xl font-semibold mt-8 mb-3">museum</h1>
        <p className="text-[#191919]/70 mb-12 leading-relaxed">
          a collection of my blogs, learnings, and experiments
        </p>

        <section className="mb-16">
          <h2 className="text-xl font-semibold mb-6">my articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <button
                key={blog.title}
                onClick={() => setSelectedBlog(blog)}
                className="text-left group"
              >
                <div className="relative w-full aspect-video overflow-hidden rounded-md border border-[#191919]/10 bg-[#191919]/5">
                  <Image
                    src={blog.thumbnail}
                    alt={blog.title}
                    fill
                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-3 font-medium leading-tight">{blog.title}</h3>
                <p className="text-sm text-[#191919]/60 mt-1 leading-snug">
                  {blog.summary}
                </p>
              </button>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">elsewhere</h2>
          <p className="text-[#191919]/60 text-sm mb-6">
            articles I&apos;ve written on other platforms
          </p>
          {externalArticles.length === 0 ? (
            <p className="text-[#191919]/50 italic text-sm">
              coming soon
            </p>
          ) : (
            <ul className="space-y-3">
              {externalArticles.map((article) => (
                <li key={article.url}>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <span className="underline group-hover:text-[#191919]/70">
                      {article.title}
                    </span>{" "}
                    <span className="text-[#191919]/50 text-sm">
                      — {article.platform}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
