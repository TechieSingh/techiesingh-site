import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects } from "@/content/profile";

export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find(x => x.slug === slug);
  return p ? { title: p.name, description: p.summary } : {};
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = projects.find(x => x.slug === slug);
  if (!p) notFound();
  return (
    <article className="narrow">
      <p className="eyebrow"><Link href="/projects">Projects</Link> · {p.year}</p>
      <h1>{p.name}</h1>
      <p className="lede">{p.summary}</p>
      <div className="prose">{p.description.map((d, i) => <p key={i}>{d}</p>)}</div>
      <ul className="tags">{p.tech.map(t => <li key={t}>{t}</li>)}</ul>
      {p.links.length > 0 && <p className="row" style={{ marginTop: 24 }}>{p.links.map(l => <a key={l.href} className="btn" href={l.href} rel="noopener">{l.label} ↗</a>)}</p>}
    </article>
  );
}
