"use client";
import { useEffect, useState } from "react";
import { createBrowserSupabase } from "@/lib/supabase/browser";

// Fallback for email links that carry the session in the URL fragment (#access_token=…),
// which the server never sees. Stores the session in cookies, then continues.
export default function FinishSignIn() {
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const hash = new URLSearchParams(window.location.hash.slice(1));
    const query = new URLSearchParams(window.location.search);
    const next = query.get("next") || "/journal";
    const safe = next.startsWith("/") && !next.startsWith("//") ? next : "/journal";
    const access_token = hash.get("access_token");
    const refresh_token = hash.get("refresh_token");
    if (!access_token || !refresh_token) { window.location.replace("/login?error=link"); return; }
    createBrowserSupabase().auth.setSession({ access_token, refresh_token }).then(({ error }) => {
      if (error) setFailed(true);
      else window.location.replace(safe);
    });
  }, []);
  return (
    <main><div className="container" style={{ maxWidth: 440 }}>
      {failed
        ? <p className="notice error">That link is invalid or has expired. <a href="/login">Request a new sign-in link</a>.</p>
        : <p className="muted">Signing you in…</p>}
    </div></main>
  );
}
