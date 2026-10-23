"use client";
import { useActionState } from "react";
import { inviteMember, type AdminState } from "./actions";

export function InviteForm() {
  const [state, action, pending] = useActionState<AdminState, FormData>(inviteMember, { status: "idle" });
  return (
    <form action={action} className="card" style={{ maxWidth: 520 }}>
      <div className="field">
        <label htmlFor="invite-email">Invite someone</label>
        <input id="invite-email" name="email" type="email" placeholder="friend@example.com" required />
        <p className="hint">They get an email with a link that signs them in. No password needed.</p>
      </div>
      {state.status !== "idle" && <p className={`notice ${state.status === "ok" ? "success" : "error"}`} role="status">{state.message}</p>}
      <button className="btn primary" type="submit" disabled={pending} style={{ marginTop: 8 }}>{pending ? "Sending…" : "Send invite"}</button>
    </form>
  );
}
