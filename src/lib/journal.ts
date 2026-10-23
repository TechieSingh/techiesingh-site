import "server-only";
import { createClient } from "@/lib/supabase/server";
import { studyForDate, type LearnData, type StudySummary } from "@/lib/study";

export type Entry = {
  id: string;
  entry_date: string;
  title: string;
  body: string;
  mood: number | null;
  goal_id: string | null;
  study_day_id: string | null;
  study_summary: StudySummary | null;
  is_public: boolean;
  slug: string | null;
  excerpt: string | null;
  published_at: string | null;
  updated_at: string;
};

const COLUMNS = "id, entry_date, title, body, mood, goal_id, study_day_id, study_summary, is_public, slug, excerpt, published_at, updated_at";

// All queries also filter by user_id: RLS lets members *read* the owner's published posts,
// but the journal should only ever show your own entries.
export async function listEntries(userId: string): Promise<Entry[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("journal_entries").select(COLUMNS).eq("user_id", userId)
    .order("entry_date", { ascending: false }).order("created_at", { ascending: false }).limit(1000);
  if (error) throw new Error(error.message);
  return (data ?? []) as Entry[];
}

export async function getEntry(userId: string, id: string): Promise<Entry | null> {
  if (!/^[0-9a-f-]{36}$/i.test(id)) return null;
  const supabase = await createClient();
  const { data } = await supabase.from("journal_entries").select(COLUMNS).eq("user_id", userId).eq("id", id).maybeSingle();
  return (data as Entry) ?? null;
}

export async function getLearnData(userId: string): Promise<LearnData | null> {
  const supabase = await createClient();
  const { data } = await supabase.from("learn_state").select("data").eq("user_id", userId).maybeSingle();
  return (data?.data as LearnData) ?? null;
}

export async function getStudySummary(userId: string, date: string): Promise<StudySummary> {
  return studyForDate(await getLearnData(userId), date);
}
