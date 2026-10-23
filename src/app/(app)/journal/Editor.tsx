"use client";
import { useActionState, useEffect, useRef, useState, useTransition } from "react";
import { deleteEntry, previewMarkdown, saveEntry, studyFor, type SaveState } from "./actions";
import type { StudySummary } from "@/lib/study";
import { StudyPanel } from "./StudyPanel";

export type EditorEntry = {
  id?: string;
  entry_date: string;
  title: string;
  body: string;
  mood: number | null;
  linkStudy: boolean;
  study_summary: StudySummary | null;
  is_public: boolean;
  slug: string | null;
  excerpt: string | null;
};

const MOODS = [
  [1, "😞", "Rough"],
  [2, "😕", "Meh"],
  [3, "😐", "Okay"],
  [4, "🙂", "Good"],
  [5, "😄", "Great"],
] as const;

const slugify = (s: string) => s.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80).replace(/-+$/g, "");

export function Editor({ entry, isOwner, justSaved, liveStudy }: { entry: EditorEntry; isOwner: boolean; justSaved?: boolean; liveStudy: StudySummary | null }) {
  const [state, action, saving] = useActionState<SaveState, FormData>(saveEntry, justSaved ? { status: "saved", savedAt: new Date().toISOString() } : { status: "idle" });
  const [date, setDate] = useState(entry.entry_date);
  const [title, setTitle] = useState(entry.title);
  const [body, setBody] = useState(entry.body);
  const [tab, setTab] = useState<"write" | "preview">("write");
  const [preview, setPreview] = useState("");
  const [isPublic, setIsPublic] = useState(entry.is_public);
  const [slug, setSlug] = useState(entry.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(entry.slug));
  const [study, setStudy] = useState<StudySummary | null>(liveStudy);
  const [dirty, setDirty] = useState(false);
  const [, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  // Keep the study panel in step with the chosen date.
  useEffect(() => {
    if (!date) return;
    if (study?.date === date) return;
    startTransition(async () => setStudy(await studyFor(date)));
  }, [date, study?.date]);

  useEffect(() => {
    const warn = (e: BeforeUnloadEvent) => { if (dirty) e.preventDefault(); };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  // Ctrl/Cmd+S saves.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s") { e.preventDefault(); formRef.current?.requestSubmit(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const showPreview = () => {
    setTab("preview");
    startTransition(async () => setPreview(await previewMarkdown(body)));
  };

  const effectiveSlug = slugTouched ? slug : slugify(title);

  return (
    <form ref={formRef} action={fd => { setDirty(false); action(fd); }} onChange={() => setDirty(true)} className="editor">
      <div>
        {entry.id && <input type="hidden" name="id" value={entry.id} />}
        <div className="field">
          <label htmlFor="title" className="sr-only">Title</label>
          <input id="title" name="title" type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" maxLength={200}
            style={{ fontFamily: "var(--font-serif)", fontSize: "1.6rem", fontWeight: 600, border: 0, padding: "4px 0", background: "transparent" }} />
        </div>
        <div className="tabs" role="tablist" aria-label="Editor mode">
          <button type="button" role="tab" aria-selected={tab === "write"} onClick={() => setTab("write")}>Write</button>
          <button type="button" role="tab" aria-selected={tab === "preview"} onClick={showPreview}>Preview</button>
          <span className="spacer" />
          <span className="meta" style={{ alignSelf: "center" }}>Markdown supported</span>
        </div>
        <label htmlFor="body" className="sr-only">Entry</label>
        <textarea id="body" name="body" value={body} onChange={e => setBody(e.target.value)} hidden={tab !== "write"}
          placeholder={"What did you work on? What clicked, what didn’t?\n\n## What I learned\n\n## What tripped me up\n\n## Tomorrow"} />
        {tab === "preview" && (
          <div className="preview prose" aria-live="polite" dangerouslySetInnerHTML={{ __html: preview || "<p class='muted'>Nothing to preview yet.</p>" }} />
        )}
      </div>

      <aside>
        <div className="card">
          <div className="field">
            <label htmlFor="entry_date">Date</label>
            <input id="entry_date" name="entry_date" type="date" value={date} onChange={e => setDate(e.target.value)} required />
          </div>
          <fieldset className="field" style={{ border: 0, padding: 0, margin: "0 0 18px" }}>
            <legend style={{ fontWeight: 600, fontSize: "0.9rem", marginBottom: 6 }}>Mood</legend>
            <div className="mood">
              {MOODS.map(([v, emoji, label]) => (
                <label key={v} title={label}>
                  <input type="radio" name="mood" value={v} defaultChecked={entry.mood === v} />
                  <span aria-hidden>{emoji}</span><span className="sr-only">{label}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <label className="checkbox"><input type="checkbox" name="link_study" defaultChecked={entry.linkStudy} /> <span>Attach this day’s study from Learn</span></label>
          {isOwner && (
            <div style={{ borderTop: "1px solid var(--line)", marginTop: 16, paddingTop: 16 }}>
              <label className="checkbox"><input type="checkbox" name="is_public" checked={isPublic} onChange={e => setIsPublic(e.target.checked)} /> <span>Publish on the blog</span></label>
              {isPublic && (
                <>
                  <div className="field" style={{ marginTop: 12 }}>
                    <label htmlFor="slug">Address</label>
                    <input id="slug" name="slug" type="text" value={effectiveSlug} onChange={e => { setSlug(e.target.value); setSlugTouched(true); }} pattern="[a-z0-9]+(-[a-z0-9]+)*" />
                    <p className="hint">techiesingh.com/blog/{effectiveSlug || "…"}</p>
                  </div>
                  <div className="field">
                    <label htmlFor="excerpt">Summary <span className="hint">(optional)</span></label>
                    <input id="excerpt" name="excerpt" type="text" defaultValue={entry.excerpt ?? ""} maxLength={400} />
                  </div>
                  <p className="hint">Only the text is published. Your mood and study details stay private.</p>
                </>
              )}
            </div>
          )}
          <div className="row" style={{ marginTop: 18 }}>
            <button className="btn primary" type="submit" disabled={saving}>{saving ? "Saving…" : entry.id ? "Save" : "Save entry"}</button>
            <span className="meta" role="status">
              {state.status === "saved" && !dirty ? "Saved" : dirty ? "Unsaved changes" : ""}
            </span>
          </div>
          {state.status === "error" && <p className="notice error" role="alert" style={{ marginTop: 12 }}>{state.message}</p>}
          {state.status === "saved" && state.slug && !dirty && <p className="small" style={{ marginTop: 10 }}>Live at <a href={`/blog/${state.slug}`}>/blog/{state.slug}</a></p>}
        </div>

        {(() => {
          const snapshot = entry.linkStudy && entry.study_summary?.date === date ? entry.study_summary : null;
          return <StudyPanel study={snapshot ?? study} saved={Boolean(snapshot)} date={date} />;
        })()}

        {entry.id && (
          <button className="btn small danger" type="submit" formAction={deleteEntry} formNoValidate
            onClick={e => { if (!confirm("Delete this entry? This can’t be undone.")) e.preventDefault(); }}>
            Delete entry
          </button>
        )}
      </aside>
    </form>
  );
}
