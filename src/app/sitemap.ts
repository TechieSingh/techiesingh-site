import type { MetadataRoute } from "next";
import { projects } from "@/content/profile";
import { listPublishedPosts } from "@/lib/posts";
import { siteUrl } from "@/lib/env";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteUrl();
  const posts = await listPublishedPosts();
  return [
    ...["", "/projects", "/blog", "/resume", "/contact"].map(p => ({ url: `${base}${p}`, changeFrequency: "weekly" as const })),
    ...projects.map(p => ({ url: `${base}/projects/${p.slug}` })),
    ...posts.map(p => ({ url: `${base}/blog/${p.slug}`, lastModified: p.published_at })),
  ];
}
