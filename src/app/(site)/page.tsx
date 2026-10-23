import Link from "next/link";
import { profile, projects } from "@/content/profile";
import { listPublishedPosts } from "@/lib/posts";
import { formatDate } from "@/lib/dates";
import { plainExcerpt } from "@/lib/markdown";

export const revalidate = 300;

export default async function Home() {
  const posts = (await listPublishedPosts(3));
  const featured = projects.filter(p => p.featured);
  return (
    <>
      <section className="hero">
        <p className="eyebrow">Hi, I’m</p>
        <h1>{profile.name}</h1>
        <p className="headline">{profile.headline}{profile.location ? ` · ${profile.location}` : ""}</p>
        {profile.bio.length
          ? profile.bio.map((p, i) => <p key={i} className="lede">{p}</p>)
          : <p className="lede">Projects, writing, and what I’m learning right now.</p>}
        <ul className="social">
          {profile.links.map(l => <li key={l.href}><a href={l.href} rel="me noopener">{l.label}</a></li>)}
        </ul>
        {profile.currentlyLearning && (
          <p className="now"><span className="pill">Now</span> Learning {profile.currentlyLearning.charAt(0).toLowerCase() + profile.currentlyLearning.slice(1)}</p>
        )}
      </section>

      <h2>Selected projects</h2>
      <div className="grid">
        {featured.map(p => (
          <article key={p.slug} className="card">
            <h3><Link href={`/projects/${p.slug}`}>{p.name}</Link></h3>
            <p className="muted">{p.summary}</p>
            <ul className="tags">{p.tech.map(t => <li key={t}>{t}</li>)}</ul>
          </article>
        ))}
      </div>
      <p><Link href="/projects">All projects →</Link></p>

      <h2>Writing</h2>
      {posts.length ? (
        <ul className="post-list">
          {posts.map(p => (
            <li key={p.slug}>
              <Link className="title" href={`/blog/${p.slug}`}>{p.title}</Link>
              <div className="meta">{formatDate(p.published_at)}</div>
              <p>{p.excerpt || plainExcerpt(p.body, 180)}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="muted">Posts are on their way — they start as entries in my learning journal.</p>
      )}
    </>
  );
}
