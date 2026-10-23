"use server";
import { redirect } from "next/navigation";
import { requireViewer } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export async function saveDisplayName(formData: FormData) {
  const viewer = await requireViewer("/welcome");
  const name = String(formData.get("display_name") ?? "").trim().slice(0, 60);
  if (name) {
    const supabase = await createClient();
    await supabase.from("profiles").update({ display_name: name }).eq("id", viewer.id);
  }
  redirect("/journal");
}
