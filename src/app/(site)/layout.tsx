import { SiteFooter, SiteHeader } from "@/components/SiteHeader";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main><div className="container">{children}</div></main>
      <SiteFooter />
    </>
  );
}
