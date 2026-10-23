import Link from "next/link";
import type { Metadata } from "next";
import { projects } from "@/content/profile";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  const sorted = [...projects].sort((a, b) => b.year - a.year);
  return (
    <>
      <p className="eyebrow">Work</p>
      <h1>Projects</h1>
      <p className="lede">Things I’ve built, and what I learned building them.</p>
      <div className="grid" style={{ marginTop: 32 }}>
        {sorted.map(p => (
          <article key={p.slug} className="card">
            <div className="meta">{p.year}</div>
            <h3><Link href={`/projects/${p.slug}`}>{p.name}</Link></h3>
            <p className="muted">{p.summary}</p>
            <ul className="tags">{p.tech.map(t => <li key={t}>{t}</li>)}</ul>
          </article>
        ))}
      </div>
    </>
  );
}
