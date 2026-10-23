import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { requireViewer } from "@/lib/auth";
import { getEntry, getStudySummary } from "@/lib/journal";
import { Editor } from "../Editor";

export const metadata: Metadata = { title: "Journal entry", robots: { index: false } };

export default async function EntryPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ saved?: string }> }) {
  const viewer = await requireViewer();
  const { id } = await params;
  const entry = await getEntry(viewer.id, id);
  if (!entry) notFound();
  const { saved } = await searchParams;
  const study = await getStudySummary(viewer.id, entry.entry_date);
  return (
    <>
      <p className="meta"><Link href="/journal">← Journal</Link>{entry.is_public && entry.slug && <> · <a href={`/blog/${entry.slug}`}>View on blog</a></>}</p>
      <Editor
        isOwner={viewer.isOwner}
        justSaved={saved === "1"}
        liveStudy={study}
        entry={{ ...entry, linkStudy: Boolean(entry.study_summary) || !entry.id }}
      />
    </>
  );
}
