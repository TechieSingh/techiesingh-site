import type { Metadata } from "next";
import { profile, resume, type ResumeItem } from "@/content/profile";

export const metadata: Metadata = { title: "Resume" };

const range = (i: ResumeItem) => [i.start, i.end].filter(Boolean).join(" – ");

function Section({ title, items }: { title: string; items: ResumeItem[] }) {
  if (!items.length) return null;
  return (
    <section>
      <h2>{title}</h2>
      {items.map((i, n) => (
        <div key={n} className="resume-item">
          <div className="meta">{range(i)}</div>
          <div>
            <h3>{i.title}</h3>
            <div className="muted">{[i.org, i.place].filter(Boolean).join(" · ")}</div>
            {i.points.length > 0 && <ul>{i.points.map((p, k) => <li key={k}>{p}</li>)}</ul>}
          </div>
        </div>
      ))}
    </section>
  );
}

export default function ResumePage() {
  const linkedin = profile.links.find(l => l.label === "LinkedIn");
  const hasDetail = resume.experience.length > 0 || resume.skills.length > 0;
  return (
    <div className="narrow">
      <div className="page-title">
        <div><p className="eyebrow">Experience</p><h1>Resume</h1></div>
        {resume.pdfUrl && <a className="btn primary" href={resume.pdfUrl}>Download PDF</a>}
      </div>
      {!hasDetail && (
        <p className="notice">A full resume is coming soon.{linkedin && <> In the meantime, see my <a href={linkedin.href} rel="noopener">LinkedIn profile</a>.</>}</p>
      )}
      <Section title="Education" items={resume.education} />
      <Section title="Experience" items={resume.experience} />
      {resume.skills.length > 0 && (
        <section>
          <h2>Skills</h2>
          {resume.skills.map(s => (
            <div key={s.group} className="resume-item"><div className="meta">{s.group}</div><ul className="tags" style={{ margin: 0 }}>{s.items.map(i => <li key={i}>{i}</li>)}</ul></div>
          ))}
        </section>
      )}
    </div>
  );
}
