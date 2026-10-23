"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function PickToday() {
  const router = useRouter();
  useEffect(() => {
    const d = new Date();
    const today = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    router.replace(`/journal/new?date=${today}`);
  }, [router]);
  return <p className="muted">Opening today’s entry…</p>;
}
