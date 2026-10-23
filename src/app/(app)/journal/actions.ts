"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireViewer } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { getEntry, getStudySummary } from "@/lib/journal";
import { isISODate } from "@/lib/dates";
import { isValidSlug, slugify } from "@/lib/slug";
import { renderMarkdown } from "@/lib/markdown";
import { hasStudy, type StudySummary } from "@/lib/study";

export type SaveState = { status: "idle" | "saved" | "error"; message?: string; savedAt?: string; slug?: string | null };

export async function saveEntry(_prev: SaveState, formData: FormData): Promise<SaveState> {
  const viewer = await requireViewer();
  const id = String(formData.get("id") ?? "");
  const entryDate = String(formData.get("entry_date") ?? "");
  const title = String(formData.get("title") ?? "").trim().slice(0, 200);
  const body = String(formData.get("body") ?? "").slice(0, 100000);
  const moodRaw = Number(formData.get("mood"));
  const mood = Number.isInteger(moodRaw) && moodRaw >= 1 && moodRaw <= 5 ? moodRaw : null;
  const linkStudy = formData.get("link_study") === "on";
  const wantsPublic = formData.get("is_public") === "on";

  if (!isISODate(entryDate)) return { status: "error", message: "Pick a valid date." };
  if (!title && !body.trim()) return { status: "error", message: "Write a title or something in the entry first." };

  const existing = id ? await getEntry(viewer.id, id) : null;
  if (id && !existing) return { status: "error", message: "This entry no longer exists." };

  const row: Record<string, unknown> = { entry_date: entryDate, title, body, mood };

  if (linkStudy) {
    const summary: StudySummary = await getStudySummary(viewer.id, entryDate);
    const first = summary.goals[0];
    row.study_summary = hasStudy(summary) ? summary : null;
    row.goal_id = first?.goalId ?? null;
    row.study_day_id = first?.day?.id ?? null;
  } else {
    Object.assign(row, { study_summary: null, goal_id: null, study_day_id: null });
  }

  let slug: string | null = existing?.slug ?? null;
  if (wantsPublic) {
    if (!viewer.isOwner) return { status: "error", message: "Only the site owner can publish to the blog." };
    if (!title) return { status: "error", message: "A published post needs a title." };
    slug = String(formData.get("slug") ?? "").trim() || slugify(title);
    if (!isValidSlug(slug)) return { status: "error", message: "The address may only use lowercase letters, numbers and dashes." };
    const excerpt = String(formData.get("excerpt") ?? "").trim().slice(0, 400);
    Object.assign(row, { is_public: true, slug, excerpt: excerpt || null, published_at: existing?.published_at ?? new Date().toISOString() });
  } else {
    Object.assign(row, { is_public: false, published_at: null });
  }

  const supabase = await createClient();
  const query = existing
    ? supabase.from("journal_entries").update(row).eq("id", existing.id).eq("user_id", viewer.id).select("id").single()
    : supabase.from("journal_entries").insert({ ...row, user_id: viewer.id }).select("id").single();
  const { data, error } = await query;
  if (error) {
    if (error.code === "23505") return { status: "error", message: `Another post already uses the address “${slug}”. Choose a different one.` };
    return { status: "error", message: `Couldn’t save: ${error.message}` };
  }

  if (wantsPublic || existing?.is_public) {
    revalidatePath("/blog");
    revalidatePath("/");
    if (existing?.slug) revalidatePath(`/blog/${existing.slug}`);
    if (slug) revalidatePath(`/blog/${slug}`);
  }
  revalidatePath("/journal");
  if (!existing) redirect(`/journal/${data.id}?saved=1`);
  return { status: "saved", savedAt: new Date().toISOString(), slug: wantsPublic ? slug : null };
}

export async function deleteEntry(formData: FormData) {
  const viewer = await requireViewer();
  const id = String(formData.get("id") ?? "");
  const existing = await getEntry(viewer.id, id);
  if (existing) {
    const supabase = await createClient();
    await supabase.from("journal_entries").delete().eq("id", id).eq("user_id", viewer.id);
    if (existing.is_public) {
      revalidatePath("/blog");
      revalidatePath("/");
      if (existing.slug) revalidatePath(`/blog/${existing.slug}`);
    }
  }
  revalidatePath("/journal");
  redirect("/journal");
}

export async function previewMarkdown(md: string): Promise<string> {
  await requireViewer();
  return renderMarkdown(String(md ?? "").slice(0, 100000));
}

export async function studyFor(date: string): Promise<StudySummary | null> {
  const viewer = await requireViewer();
  if (!isISODate(date)) return null;
  return getStudySummary(viewer.id, date);
}
