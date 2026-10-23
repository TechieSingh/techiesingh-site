import Link from "next/link";
import type { Metadata } from "next";
import { requireViewer } from "@/lib/auth";
import { getStudySummary } from "@/lib/journal";
import { isISODate } from "@/lib/dates";
import { Editor } from "../Editor";
import { PickToday } from "./PickToday";

export const metadata: Metadata = { title: "New entry", robots: { index: false } };

export default async function NewEntryPage({ searchParams }: { searchParams: Promise<{ date?: string }> }) {
  const viewer = await requireViewer("/journal/new");
  const { date } = await searchParams;
  // The server doesn't know the writer's time zone, so the browser supplies today's date.
  if (!isISODate(date)) return <PickToday />;
  const initialDate = date;
  const study = await getStudySummary(viewer.id, initialDate);
  return (
    <>
      <p className="meta"><Link href="/journal">← Journal</Link></p>
      <Editor
        isOwner={viewer.isOwner}
        liveStudy={study}
        entry={{ entry_date: initialDate, title: "", body: "", mood: null, linkStudy: true, study_summary: null, is_public: false, slug: null, excerpt: null }}
      />
    </>
  );
}
