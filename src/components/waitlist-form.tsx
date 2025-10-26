"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function WaitlistForm() {
  const [busy, setBusy] = useState(false);

  return (
    <form
      className="space-y-3"
      onSubmit={(e) => {
        e.preventDefault();
        if (busy) return;
        setBusy(true);
        alert("Thanks! (wire backend later)");
        setBusy(false);
      }}
    >
      <input
        className="w-full rounded-md border border-input bg-background px-3 py-2"
        placeholder="Work email"
        type="email"
        required
      />
      <input
        className="w-full rounded-md border border-input bg-background px-3 py-2"
        placeholder="Company"
        type="text"
      />
      <Button type="submit" disabled={busy}>
        {busy ? "Submitting..." : "Join waitlist"}
      </Button>
    </form>
  );
}
