"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabaseClient } from "@/lib/supabase-client";

export default function WaitlistForm() {
  const [busy, setBusy] = useState(false);
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [notes, setNotes] = useState("");
  const [ok, setOk] = useState<null | string>(null);
  const [err, setErr] = useState<null | string>(null);

  return (
    <form
      className="space-y-3"
      onSubmit={async (e) => {
        e.preventDefault();
        if (busy) return;
        setBusy(true);
        setOk(null); setErr(null);

        const { error } = await supabaseClient
          .from("waitlist")
          .insert({ email, company, notes });

        if (error) {
          setErr(error.message);
        } else {
          setOk("Thanks — you’re on the list!");
          setEmail(""); setCompany(""); setNotes("");
        }

        setBusy(false);
      }}
    >
      <input
        className="w-full rounded-md border border-input bg-background px-3 py-2"
        placeholder="Work email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="w-full rounded-md border border-input bg-background px-3 py-2"
        placeholder="Company"
        type="text"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      <textarea
        className="w-full rounded-md border border-input bg-background px-3 py-2"
        placeholder="Notes (optional)"
        rows={3}
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <div className="flex items-center gap-3">
        <Button type="submit" disabled={busy}>{busy ? "Submitting..." : "Join waitlist"}</Button>
        {ok && <span className="text-sm text-green-400">{ok}</span>}
        {err && <span className="text-sm text-red-400">{err}</span>}
      </div>
    </form>
  );
}
