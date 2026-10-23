import "server-only";
import { createServerClient } from "@supabase/ssr";
import { createClient as createPlainClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { isSupabaseConfigured, supabaseAnonKey, supabaseUrl } from "@/lib/env";

// Per-request client that acts as the signed-in user (RLS applies).
export async function createClient() {
  if (!isSupabaseConfigured()) throw new Error("Supabase is not configured.");
  const cookieStore = await cookies();
  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Called from a Server Component, where cookies are read-only. The proxy refreshes
          // the session on every request, so this is safe to ignore.
        }
      },
    },
  });
}

// Anonymous client for public data (published blog posts). No cookies, so pages can be cached.
export function createPublicClient() {
  if (!isSupabaseConfigured()) return null;
  return createPlainClient(supabaseUrl, supabaseAnonKey, { auth: { persistSession: false, autoRefreshToken: false } });
}

// Admin client (bypasses RLS). Only for owner-only actions after an explicit owner check.
export function createAdminClient() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!isSupabaseConfigured() || !key) return null;
  return createPlainClient(supabaseUrl, key, { auth: { persistSession: false, autoRefreshToken: false } });
}
