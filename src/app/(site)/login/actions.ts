"use server";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured, siteUrl } from "@/lib/env";
import { safeNext } from "@/lib/auth";

export type LoginState = { status: "idle" | "sent" | "error"; message?: string; email?: string };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendLoginLink(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const next = safeNext(formData.get("next"));
  if (!EMAIL.test(email)) return { status: "error", message: "Enter a valid email address.", email };
  if (!isSupabaseConfigured()) return { status: "error", message: "Sign-in isn’t set up yet on this site.", email };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    // Invite-only: never create an account from the login form.
    options: { shouldCreateUser: false, emailRedirectTo: `${siteUrl()}/auth/confirm?next=${encodeURIComponent(next)}` },
  });

  if (error) {
    // Unknown emails get the same answer as known ones, so the form can't be used to
    // discover who has an account. Rate limits are worth telling the person about.
    if (/rate limit|too many|security purposes/i.test(error.message)) {
      return { status: "error", message: "Too many sign-in emails were requested. Wait a minute and try again.", email };
    }
    if (!/signups? not allowed|not found|otp_disabled/i.test(error.message + (error.code ?? ""))) {
      console.error("signInWithOtp", error.code, error.message);
    }
  }
  return { status: "sent", email };
}
