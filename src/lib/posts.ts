import "server-only";
import { createPublicClient } from "@/lib/supabase/server";

export type PublishedPost = { slug: string; title: string; excerpt: string | null; body: string; published_at: string; entry_date: string };

// Published journal entries (RLS only returns the site owner's public entries).
export async function listPublishedPosts(limit = 100): Promise<PublishedPost[]> {
  const supabase = createPublicClient();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("journal_entries")
    .select("slug, title, excerpt, body, published_at, entry_date")
    .eq("is_public", true)
    .order("published_at", { ascending: false })
    .limit(limit);
  if (error) {
    console.error("listPublishedPosts", error.message);
    return [];
  }
  return (data ?? []) as PublishedPost[];
}

export async function getPublishedPost(slug: string): Promise<PublishedPost | null> {
  const supabase = createPublicClient();
  if (!supabase) return null;
  const { data } = await supabase
    .from("journal_entries")
    .select("slug, title, excerpt, body, published_at, entry_date")
    .eq("is_public", true)
    .eq("slug", slug)
    .maybeSingle();
  return (data as PublishedPost) ?? null;
}
