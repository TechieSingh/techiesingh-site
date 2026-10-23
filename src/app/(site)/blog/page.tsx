import Link from "next/link";
import type { Metadata } from "next";
import { listPublishedPosts } from "@/lib/posts";
import { formatDate } from "@/lib/dates";
import { plainExcerpt, readingMinutes } from "@/lib/markdown";

export const metadata: Metadata = { title: "Blog" };
export const revalidate = 300;

export default async function BlogPage() {
  const posts = await listPublishedPosts();
  return (
    <div className="narrow">
      <p className="eyebrow">Writing</p>
      <h1>Blog</h1>
      <p className="lede">Notes from my learning journal that I decided to share.</p>
      {posts.length ? (
        <ul className="post-list" style={{ marginTop: 32 }}>
          {posts.map(p => (
            <li key={p.slug}>
              <Link className="title" href={`/blog/${p.slug}`}>{p.title}</Link>
              <div className="meta">{formatDate(p.published_at)} · {readingMinutes(p.body)} min read</div>
              <p>{p.excerpt || plainExcerpt(p.body)}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="muted" style={{ marginTop: 32 }}>No posts yet.</p>
      )}
    </div>
  );
}
