import Link from "next/link";
import type { Metadata } from "next";
import { requireViewer } from "@/lib/auth";
import { listEntries } from "@/lib/journal";
import { formatDate } from "@/lib/dates";
import { plainExcerpt } from "@/lib/markdown";

export const metadata: Metadata = { title: "Journal", robots: { index: false } };
const MOOD = ["", "😞", "😕", "😐", "🙂", "😄"];

export default async function JournalPage() {
  const viewer = await requireViewer();
  const entries = await listEntries(viewer.id);
  const byMonth = new Map<string, typeof entries>();
  for (const e of entries) {
    const key = e.entry_date.slice(0, 7);
    byMonth.set(key, [...(byMonth.get(key) ?? []), e]);
  }
  return (
    <>
      <div className="page-title">
        <div><p className="eyebrow">Private</p><h1>Journal</h1></div>
        <Link className="btn primary" href="/journal/new">New entry</Link>
      </div>
      {!entries.length && (
        <div className="card">
          <h3>Start your first entry</h3>
          <p className="muted">Write a few lines after each study session. Entries can attach what you did in Learn that day{viewer.isOwner ? ", and you can publish any entry as a blog post" : ""}.</p>
          <Link className="btn primary" href="/journal/new">Write today’s entry</Link>
        </div>
      )}
      {[...byMonth.entries()].map(([month, items]) => (
        <section key={month}>
          <h2 className="month">{formatDate(month + "-01", { year: "numeric", month: "long" })}</h2>
          <ul className="entry-list">
            {items.map(e => (
              <li key={e.id}>
                <Link href={`/journal/${e.id}`}>
                  <span className="date">{formatDate(e.entry_date, { weekday: "short", month: "short", day: "numeric" })}</span>
                  <span>
                    <span className="title">{e.title || "Untitled"}</span>
                    <span className="snippet">{plainExcerpt(e.body, 140) || (e.study_summary?.goals[0]?.day?.topic ?? "")}</span>
                  </span>
                  <span className="row" style={{ gap: 6 }}>
                    {e.mood ? <span aria-label={`mood ${e.mood} of 5`}>{MOOD[e.mood]}</span> : null}
                    {e.study_summary && <span className="pill neutral">study</span>}
                    {e.is_public && <span className="pill">published</span>}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </>
  );
}
