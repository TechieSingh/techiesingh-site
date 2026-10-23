import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPublishedPost } from "@/lib/posts";
import { formatDate } from "@/lib/dates";
import { plainExcerpt, readingMinutes, renderMarkdown } from "@/lib/markdown";
import { profile } from "@/content/profile";

export const revalidate = 300;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = await getPublishedPost((await params).slug);
  if (!post) return { title: "Not found" };
  const description = post.excerpt || plainExcerpt(post.body, 160);
  return { title: post.title, description, openGraph: { type: "article", title: post.title, description, publishedTime: post.published_at } };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = await getPublishedPost((await params).slug);
  if (!post) notFound();
  return (
    <article className="narrow">
      <p className="eyebrow"><Link href="/blog">Blog</Link></p>
      <h1>{post.title}</h1>
      <p className="meta">{profile.name} · {formatDate(post.published_at)} · {readingMinutes(post.body)} min read</p>
      <div className="prose" dangerouslySetInnerHTML={{ __html: renderMarkdown(post.body) }} />
    </article>
  );
}
