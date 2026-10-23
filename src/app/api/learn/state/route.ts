import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/env";
import { mergeData, validateBackup } from "../../../../../public/learn/js/core/sync.js";

// GoalForge sync. The browser keeps a local copy for speed and offline use; this endpoint
// stores the authoritative copy per account. PUT merges instead of overwriting, so two
// devices editing at the same time both keep their changes (newest copy of each item wins).

const MAX_BYTES = 4_000_000;
const noStore = { "Cache-Control": "private, no-store" };

async function signedIn() {
  if (!isSupabaseConfigured()) return { error: NextResponse.json({ error: "not_configured" }, { status: 503, headers: noStore }) };
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: NextResponse.json({ error: "signed_out" }, { status: 401, headers: noStore }) };
  return { supabase, user };
}

export async function GET() {
  const auth = await signedIn();
  if ("error" in auth) return auth.error;
  const { data, error } = await auth.supabase.from("learn_state").select("data, updated_at").eq("user_id", auth.user.id).maybeSingle();
  if (error) return NextResponse.json({ error: error.message }, { status: 500, headers: noStore });
  return NextResponse.json({ userId: auth.user.id, data: data?.data ?? null, updatedAt: data?.updated_at ?? null }, { headers: noStore });
}

export async function PUT(request: NextRequest) {
  const auth = await signedIn();
  if ("error" in auth) return auth.error;
  const text = await request.text();
  if (text.length > MAX_BYTES) return NextResponse.json({ error: "too_large" }, { status: 413, headers: noStore });
  let incoming: unknown;
  try { incoming = JSON.parse(text); } catch { return NextResponse.json({ error: "invalid_json" }, { status: 400, headers: noStore }); }
  const problems = validateBackup(incoming);
  if (problems.length) return NextResponse.json({ error: "invalid_data", problems }, { status: 400, headers: noStore });

  const { data: row } = await auth.supabase.from("learn_state").select("data").eq("user_id", auth.user.id).maybeSingle();
  // The device sending this is "current" (its settings win); records merge by recency.
  const merged = (row?.data ? mergeData(incoming, row.data) : incoming) as Record<string, unknown>;
  const { version, app } = incoming as { version: number; app?: string };
  const toStore = { version, app: app ?? "GoalForge", exportedAt: new Date().toISOString(), ...merged };
  const { data: saved, error } = await auth.supabase
    .from("learn_state")
    .upsert({ user_id: auth.user.id, data: toStore }, { onConflict: "user_id" })
    .select("updated_at")
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500, headers: noStore });
  return NextResponse.json({ userId: auth.user.id, data: toStore, updatedAt: saved.updated_at }, { headers: noStore });
}
