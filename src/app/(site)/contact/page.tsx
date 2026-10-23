import type { Metadata } from "next";
import { profile } from "@/content/profile";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="narrow">
      <p className="eyebrow">Say hello</p>
      <h1>Contact</h1>
      <p className="lede">The best way to reach me is through one of these.</p>
      <div className="grid" style={{ marginTop: 28 }}>
        {profile.email && (
          <a className="card" href={`mailto:${profile.email}`} style={{ textDecoration: "none" }}>
            <h3>Email</h3><p className="muted" style={{ margin: 0 }}>{profile.email}</p>
          </a>
        )}
        {profile.links.map(l => (
          <a key={l.href} className="card" href={l.href} rel="me noopener" style={{ textDecoration: "none" }}>
            <h3>{l.label}</h3><p className="muted" style={{ margin: 0 }}>{l.href.replace(/^https:\/\/(www\.)?/, "")}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
