import type { Metadata } from "next";
import { requireOwner } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/dates";
import { InviteForm } from "./InviteForm";
import { RemoveButton } from "./RemoveButton";

export const metadata: Metadata = { title: "Members", robots: { index: false } };

export default async function AdminPage() {
  const owner = await requireOwner();
  const supabase = await createClient();
  const { data: members } = await supabase.from("profiles").select("id, email, display_name, role, created_at").order("created_at");
  return (
    <>
      <div className="page-title"><div><p className="eyebrow">Owner</p><h1>Members</h1></div></div>
      <p className="muted">Each member has their own private learning tracker and journal. Only you can publish to the blog.</p>
      <InviteForm />
      <h2>Current members</h2>
      <table className="table">
        <thead><tr><th>Name</th><th>Email</th><th>Joined</th><th></th></tr></thead>
        <tbody>
          {(members ?? []).map(m => (
            <tr key={m.id}>
              <td>{m.display_name} {m.role === "owner" && <span className="pill">owner</span>}</td>
              <td>{m.email}</td>
              <td className="meta">{formatDate(m.created_at)}</td>
              <td>{m.id !== owner.id && <RemoveButton id={m.id} email={m.email ?? ""} />}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
