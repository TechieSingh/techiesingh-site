"use client";
import { removeMember } from "./actions";

export function RemoveButton({ id, email }: { id: string; email: string }) {
  return (
    <form action={removeMember} onSubmit={e => { if (!confirm(`Remove ${email}? Their learning data and journal are deleted permanently.`)) e.preventDefault(); }}>
      <input type="hidden" name="id" value={id} />
      <button className="btn small danger" type="submit">Remove</button>
    </form>
  );
}
