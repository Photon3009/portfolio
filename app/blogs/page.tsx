"use client";

import { useState } from "react";
import AiAgentArticle from "./aiagent";

interface Blog {
  title: string;
  content: React.ReactNode;
}


const blogs: Blog[] = [
  {
    title: "Principles of Building AI Agents",
    content: <AiAgentArticle />,
  },
  // {
  //   title: "Flutter vs React Native in 2025",
  //   content: (
  //     <div className="space-y-3 text-white/80">
  //       <p>Both Flutter and React Native have matured, but Flutter still leads in performance and cross-platform UI consistency.</p>
  //       <p>Why I prefer Flutter:</p>
  //       <ul className="list-disc pl-5">
  //         <li>Single codebase for web, mobile, desktop</li>
  //         <li>Better performance with native compilation</li>
  //         <li>Rich animation and layout capabilities</li>
  //       </ul>
  //     </div>
  //   ),
  // },
  // {
  //   title: "From Scripts to Systems: My FastAPI Journey",
  //   content: (
  //     <div className="space-y-3 text-white/80">
  //       <p>I started with Python scripts, then discovered FastAPI and built entire APIs with ease.</p>
  //       <p>What I love about FastAPI:</p>
  //       <ul className="list-disc pl-5">
  //         <li>Type-safe and Pydantic-powered</li>
  //         <li>Automatic Swagger and docs</li>
  //         <li>Great async support</li>
  //       </ul>
  //     </div>
  //   ),
  // },
];

export default function MuseumPage() {
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  return (
    <main className="min-h-screen bg-[#101010] text-white">
      <div className="flex h-screen">
        {/* Sidebar: Blog titles */}
        <aside className="w-1/3 md:w-1/4 bg-[#1a1a1a] p-6 overflow-y-auto border-r border-white/10">
          <h2 className="text-xl font-semibold mb-4">Museum</h2>
          <ul className="space-y-2">
            {blogs.map((blog, idx) => (
              <li
                key={idx}
                className={`cursor-pointer px-2 py-1 rounded hover:bg-white/10 ${
                  selectedBlog?.title === blog.title ? "bg-white/10" : ""
                }`}
                onClick={() => setSelectedBlog(blog)}
              >
                {blog.title}
              </li>
            ))}
          </ul>
        </aside>

        {/* Content Area */}
        <section className="w-2/3 md:w-3/4 p-8 overflow-y-auto">
          {selectedBlog ? (
            <>
              <h1 className="text-2xl font-bold mb-4">{selectedBlog.title}</h1>
              <div>{selectedBlog.content}</div>
            </>
          ) : (
            <p className="text-white/60 text-lg">Select a blog to read</p>
          )}
        </section>
      </div>
    </main>
  );
}
