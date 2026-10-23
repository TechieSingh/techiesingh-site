import Link from "next/link";
import { profile } from "@/content/profile";
import { NavLinks } from "./NavLinks";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container">
        <Link href="/" className="brand">{profile.name}</Link>
        <NavLinks
          links={[
            { href: "/projects", label: "Projects" },
            { href: "/blog", label: "Blog" },
            { href: "/resume", label: "Resume" },
            { href: "/contact", label: "Contact" },
            { href: "/journal", label: "Sign in", cta: true },
          ]}
        />
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span className="row">
          {profile.links.map(l => <a key={l.href} href={l.href} rel="me noopener">{l.label}</a>)}
        </span>
      </div>
    </footer>
  );
}
