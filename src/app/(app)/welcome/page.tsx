import Link from "next/link";
import type { Metadata } from "next";
import { requireViewer } from "@/lib/auth";
import { saveDisplayName } from "./actions";

export const metadata: Metadata = { title: "Welcome", robots: { index: false } };

export default async function Welcome() {
  const viewer = await requireViewer("/welcome");
  return (
    <div className="narrow">
      <p className="eyebrow">You’re in</p>
      <h1>Welcome, {viewer.displayName}</h1>
      <p className="lede">This is a private space for learning and journaling. Everything you add here is visible only to you.</p>
      <form action={saveDisplayName} className="card" style={{ marginTop: 24, maxWidth: 480 }}>
        <div className="field">
          <label htmlFor="display_name">What should we call you?</label>
          <input id="display_name" name="display_name" type="text" defaultValue={viewer.displayName} maxLength={60} required />
        </div>
        <button className="btn primary" type="submit">Save and continue</button>
      </form>
      <div className="grid" style={{ marginTop: 32 }}>
        <a className="card" href="/learn" style={{ textDecoration: "none" }}><h3>Learn →</h3><p className="muted" style={{ margin: 0 }}>Daily study plan, review queue and progress — synced to your account.</p></a>
        <Link className="card" href="/journal" style={{ textDecoration: "none" }}><h3>Journal →</h3><p className="muted" style={{ margin: 0 }}>Write about what you studied. Entries link to that day’s work.</p></Link>
      </div>
    </div>
  );
}
