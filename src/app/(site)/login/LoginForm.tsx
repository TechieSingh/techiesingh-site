"use client";
import { useActionState } from "react";
import { sendLoginLink, type LoginState } from "./actions";

export function LoginForm({ next }: { next: string }) {
  const [state, action, pending] = useActionState<LoginState, FormData>(sendLoginLink, { status: "idle" });
  if (state.status === "sent") {
    return (
      <div className="notice success" role="status">
        <p><b>Check your inbox.</b> If <b>{state.email}</b> has an account here, a sign-in link is on its way.</p>
        <p className="small">The link works once and expires after an hour. Nothing arrived? Check spam, or ask for an invite.</p>
      </div>
    );
  }
  return (
    <form action={action} noValidate>
      <input type="hidden" name="next" value={next} />
      <div className="field">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" autoComplete="email" required defaultValue={state.email} aria-describedby={state.status === "error" ? "login-error" : undefined} />
      </div>
      {state.status === "error" && <p id="login-error" className="notice error" role="alert">{state.message}</p>}
      <button className="btn primary" type="submit" disabled={pending} style={{ marginTop: 12 }}>{pending ? "Sending…" : "Email me a sign-in link"}</button>
    </form>
  );
}
