import { NextResponse, type NextRequest } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/env";
import { safeNext } from "@/lib/auth";

// Where sign-in and invite emails land. Supports both link styles Supabase can send:
//   ?token_hash=…&type=magiclink|invite|email  (recommended templates — work on any device)
//   ?code=…                                    (default templates — same browser only)
export async function GET(request: NextRequest) {
  const url = request.nextUrl;
  const next = safeNext(url.searchParams.get("next"), url.searchParams.get("type") === "invite" ? "/welcome" : "/journal");
  const fail = NextResponse.redirect(new URL(`/login?error=${isSupabaseConfigured() ? "link" : "config"}`, url));
  if (!isSupabaseConfigured()) return fail;

  const supabase = await createClient();
  const tokenHash = url.searchParams.get("token_hash");
  const type = url.searchParams.get("type") as EmailOtpType | null;
  const code = url.searchParams.get("code");

  if (tokenHash && type) {
    const { error } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash });
    if (!error) return NextResponse.redirect(new URL(next, url));
  } else if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(new URL(next, url));
  }
  // No token in the query: the session may be in the URL fragment (implicit links), which only
  // the browser can read. The fragment survives this redirect.
  if (!tokenHash && !code) return NextResponse.redirect(new URL(`/auth/finish?next=${encodeURIComponent(next)}`, url));
  return fail;
}
