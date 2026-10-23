import type { Metadata } from "next";
import { LoginForm } from "./LoginForm";
import { safeNext } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/env";

export const metadata: Metadata = { title: "Sign in", robots: { index: false } };

const ERRORS: Record<string, string> = {
  link: "That sign-in link is invalid or has expired. Request a new one below.",
  config: "Sign-in isn’t set up yet on this site.",
};

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string; error?: string }> }) {
  const { next, error } = await searchParams;
  return (
    <div style={{ maxWidth: 440, margin: "0 auto" }}>
      <p className="eyebrow">Members</p>
      <h1>Sign in</h1>
      <p className="muted">Learning tracker and journal. Membership is by invitation — no password needed, we’ll email you a link.</p>
      {!isSupabaseConfigured() && <p className="notice warn">Sign-in isn’t connected yet (Supabase keys are missing).</p>}
      {error && ERRORS[error] && <p className="notice error" role="alert">{ERRORS[error]}</p>}
      <div style={{ marginTop: 24 }}>
        <LoginForm next={safeNext(next)} />
      </div>
    </div>
  );
}
