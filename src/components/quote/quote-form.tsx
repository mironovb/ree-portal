"use client";

import { useState } from "react";
import REECombobox from "./ree-combobox";

export type QuotePayload = {
  itemName: string;
  purity?: string;
  quantityKg: number;
  destination: "US" | "EU";
  commit?: boolean;
};

export default function QuoteForm({ onResult }: { onResult: (data: { input: QuotePayload; result: any })=>void }) {
  const [itemName, setItemName] = useState("NdPr Oxide");
  const [purity, setPurity] = useState("99.5%");
  const [quantityKg, setQuantityKg] = useState<number | "">("");
  const [destination, setDestination] = useState<"US"|"EU">("US");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function submit() {
    setBusy(true); setErr(null);
    const input: QuotePayload = {
      itemName,
      purity,
      quantityKg: typeof quantityKg === "number" ? quantityKg : Number(quantityKg),
      destination,
    };
    const res = await fetch("/api/quote", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(input)
    });
    const json = await res.json();
    if (!res.ok || json?.error) { setErr(json?.error ?? "Quote failed"); setBusy(false); return; }
    onResult({ input, result: json });
    setBusy(false);
  }

  return (
    <div className="rounded-lg border border-border p-4">
      <div className="grid gap-3 md:grid-cols-5">
        <REECombobox value={itemName} onChange={setItemName} placeholder="Select product..." />
        <input className="rounded-md border border-input bg-background px-3 py-2" placeholder="Purity (e.g., 99.5%)" value={purity} onChange={(e)=>setPurity(e.target.value)} />
        <input className="rounded-md border border-input bg-background px-3 py-2" placeholder="Quantity (kg)" inputMode="numeric" value={quantityKg} onChange={(e)=>setQuantityKg(e.target.value===""? "": Number(e.target.value))} required />
        <select className="rounded-md border border-input bg-background px-3 py-2" value={destination} onChange={(e)=>setDestination(e.target.value as "US"|"EU")}>
          <option value="US">Destination: US</option>
          <option value="EU">Destination: EU</option>
        </select>
        <button onClick={submit} disabled={busy} className="rounded-md border border-border px-4 py-2 hover:bg-secondary w-full">{busy ? "Computing…" : "Get routes"}</button>
      </div>
      {err && <div className="mt-3 text-sm text-red-400">{err}</div>}
    </div>
  );
}
