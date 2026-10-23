import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/SiteHeader";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main><div className="container narrow">
        <p className="eyebrow">404</p>
        <h1>Page not found</h1>
        <p className="lede">That page doesn’t exist, or it moved.</p>
        <p><Link className="btn" href="/">Go home</Link></p>
      </div></main>
      <SiteFooter />
    </>
  );
}
