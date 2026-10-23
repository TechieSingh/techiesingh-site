import "server-only";
import { redirect } from "next/navigation";
import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/env";

export type Viewer = { id: string; email: string; displayName: string; isOwner: boolean };

// The signed-in person, verified with Supabase Auth (not just read from the cookie).
// Cached per request so several components can ask without extra round trips.
export const getViewer = cache(async (): Promise<Viewer | null> => {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data: profile } = await supabase.from("profiles").select("display_name, role").eq("id", user.id).maybeSingle();
  return {
    id: user.id,
    email: user.email ?? "",
    displayName: profile?.display_name || (user.email ?? "").split("@")[0],
    isOwner: profile?.role === "owner",
  };
});

export async function requireViewer(next = "/journal"): Promise<Viewer> {
  const viewer = await getViewer();
  if (!viewer) redirect(`/login?next=${encodeURIComponent(next)}`);
  return viewer;
}

export async function requireOwner(): Promise<Viewer> {
  const viewer = await requireViewer("/admin");
  if (!viewer.isOwner) redirect("/journal");
  return viewer;
}

// Only allow redirects to paths on this site.
export function safeNext(next: unknown, fallback = "/journal"): string {
  const s = typeof next === "string" ? next : "";
  return s.startsWith("/") && !s.startsWith("//") && !s.startsWith("/\\") ? s : fallback;
}
