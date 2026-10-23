import Link from "next/link";
import { requireViewer } from "@/lib/auth";
import { NavLinks } from "@/components/NavLinks";

// Always per-request: these pages depend on who is signed in.
export const dynamic = "force-dynamic";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const viewer = await requireViewer();
  return (
    <>
      <header className="app-header">
        <div className="container">
          <Link href="/" className="brand">techiesingh</Link>
          <NavLinks links={[
            { href: "/journal", label: "Journal" },
            { href: "/learn", label: "Learn", external: true },
            ...(viewer.isOwner ? [{ href: "/admin", label: "Members" }] : []),
          ]} />
          <span className="who" title={viewer.email}>{viewer.displayName}</span>
          <form action="/auth/signout" method="post"><button className="btn small" type="submit">Sign out</button></form>
        </div>
      </header>
      <main><div className="container">{children}</div></main>
    </>
  );
}
