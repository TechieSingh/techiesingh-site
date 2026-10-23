"use server";
import { revalidatePath } from "next/cache";
import { requireOwner } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/server";
import { siteUrl } from "@/lib/env";

export type AdminState = { status: "idle" | "ok" | "error"; message?: string };
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function inviteMember(_prev: AdminState, formData: FormData): Promise<AdminState> {
  await requireOwner();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  if (!EMAIL.test(email)) return { status: "error", message: "Enter a valid email address." };
  const admin = createAdminClient();
  if (!admin) return { status: "error", message: "SUPABASE_SERVICE_ROLE_KEY is not set, so invites can’t be sent from here." };
  const { error } = await admin.auth.admin.inviteUserByEmail(email, { redirectTo: `${siteUrl()}/auth/confirm?next=/welcome` });
  if (error) {
    const exists = /already (been )?registered|already exists/i.test(error.message);
    return { status: "error", message: exists ? `${email} already has an account.` : `Invite failed: ${error.message}` };
  }
  revalidatePath("/admin");
  return { status: "ok", message: `Invitation sent to ${email}.` };
}

export async function removeMember(formData: FormData) {
  const owner = await requireOwner();
  const id = String(formData.get("id") ?? "");
  if (!id || id === owner.id) return; // never remove yourself
  const admin = createAdminClient();
  if (!admin) return;
  await admin.auth.admin.deleteUser(id); // cascades to their profile, learning data and journal
  revalidatePath("/admin");
}
