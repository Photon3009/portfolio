import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogs, getBlog } from "../blogs";
import Comments from "../../components/Comments";
import CopyLinkButton from "./copy-link-button";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return blogs.map((blog) => ({ slug: blog.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = getBlog(slug);

  if (!blog) return { title: "not found" };

  const url = `/blogs/${blog.slug}`;

  return {
    title: blog.title,
    description: blog.summary,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: blog.title,
      description: blog.summary,
      url,
      images: [blog.thumbnail],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.summary,
      images: [blog.thumbnail],
    },
  };
}

export default async function BlogPage({ params }: PageProps) {
  const { slug } = await params;
  const blog = getBlog(slug);

  if (!blog) notFound();

  const { Content } = blog;

  return (
    <main className="min-h-screen bg-white text-[#191919] font-lw">
      <div
        className={`lw-post ${blog.wide ? "max-w-5xl" : "max-w-3xl"} mx-auto px-6 py-12`}
      >
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/blogs"
            className="lw-meta text-sm text-[#191919]/60 hover:text-[#191919] transition-colors"
          >
            ← back to museum
          </Link>
          <CopyLinkButton />
        </div>
        <header className={blog.wide ? "mx-auto max-w-[40rem]" : ""}>
          <h1 className="mt-10 mb-3">{blog.title}</h1>
          {blog.kicker && (
            <p className="lw-meta text-[15px] text-[#191919]/50 mb-10">
              {blog.kicker}
            </p>
          )}
        </header>
        <div>
          <Content />
        </div>
        <Comments slug={blog.slug} />
      </div>
    </main>
  );
}
