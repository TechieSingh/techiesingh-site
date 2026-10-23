"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLinks({ links }: { links: { href: string; label: string; cta?: boolean; external?: boolean }[] }) {
  const pathname = usePathname();
  return (
    <nav className="nav" aria-label="Main">
      {links.map(l => {
        const active = pathname === l.href || pathname.startsWith(l.href + "/");
        const cls = l.cta ? "nav-cta" : undefined;
        // /learn is a separate static app, so use a plain link (full page load).
        return l.external
          ? <a key={l.href} href={l.href} className={cls}>{l.label}</a>
          : <Link key={l.href} href={l.href} className={cls} aria-current={active ? "page" : undefined}>{l.label}</Link>;
      })}
    </nav>
  );
}
