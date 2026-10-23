import type { StudySummary } from "@/lib/study";

const KIND = { day: "Day", problem: "Problem", lesson: "Lesson" } as const;

export function StudyPanel({ study, saved, date }: { study: StudySummary | null; saved: boolean; date: string }) {
  const goals = study?.date === date ? study.goals : [];
  return (
    <section className="card study" aria-label="Study on this day">
      <div className="row" style={{ marginBottom: 8 }}>
        <h3 style={{ margin: 0 }}>Study on this day</h3>
        <span className="spacer" />
        {saved && <span className="pill neutral" title="Saved with this entry">attached</span>}
      </div>
      {!study || study.date !== date ? (
        <p className="muted" style={{ margin: 0 }}>Loading…</p>
      ) : !goals.length ? (
        <p className="muted" style={{ margin: 0 }}>Nothing recorded in <a href="/learn">Learn</a> for this date.</p>
      ) : (
        goals.map(g => (
          <div key={g.goalId} className="goal">
            <div className="meta">{g.goalName}</div>
            {g.day && (
              <p style={{ margin: "4px 0 0" }}>
                <b>{g.day.topic || g.day.blockTitle}</b>{" "}
                {g.day.type !== "study" && <span className="pill neutral">{g.day.type}</span>}{" "}
                {g.dayCompleted ? <span className="pill">done</span> : <span className="pill warn">not done</span>}
              </p>
            )}
            {g.completed.length > 0 && <ul>{g.completed.map((c, i) => <li key={i}><span className="meta">{KIND[c.kind]}:</span> {c.title}</li>)}</ul>}
            {g.focusMinutes > 0 && <p className="meta" style={{ margin: "6px 0 0" }}>⏱ {g.focusMinutes} min focused</p>}
          </div>
        ))
      )}
    </section>
  );
}
