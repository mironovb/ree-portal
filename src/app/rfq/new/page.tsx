"use client";

import { useState } from "react";
import { supabaseClient } from "@/lib/supabase-client";

export default function NewRFQ() {
  const [email, setEmail] = useState("");
  const [product, setProduct] = useState("NdPr Oxide");
  const [form, setForm] = useState("oxide");
  const [purity, setPurity] = useState("");
  const [incoterm, setIncoterm] = useState("CIF");
  const [region, setRegion] = useState("EU");
  const [lot, setLot] = useState<number | "">("");
  const [notes, setNotes] = useState("");
  const [busy, setBusy] = useState(false);
  const [ok, setOk] = useState<null | string>(null);
  const [err, setErr] = useState<null | string>(null);

  return (
    <section className="py-10">
      <h1 className="text-2xl font-semibold mb-4">New RFQ</h1>
      <form
        className="grid gap-3 max-w-xl"
        onSubmit={async (e) => {
          e.preventDefault();
          setBusy(true); setOk(null); setErr(null);

          const { error } = await supabaseClient.from("rfqs").insert({
            email, product, form, purity,
            incoterm, region,
            lot_size_kg: typeof lot === "number" ? lot : null,
            notes,
          });

          if (error) setErr(error.message);
          else {
            setOk("RFQ submitted. We’ll follow up.");
            setEmail(""); setPurity(""); setNotes(""); setLot("");
          }
          setBusy(false);
        }}
      >
        <input className="rounded-md border border-input bg-background px-3 py-2" type="email" required placeholder="Your email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <div className="grid grid-cols-2 gap-3">
          <select className="rounded-md border border-input bg-background px-3 py-2" value={product} onChange={(e)=>setProduct(e.target.value)}>
            <option>NdPr Oxide</option>
            <option>NdPr Metal</option>
            <option>Dysprosium Iron Alloy</option>
          </select>
          <select className="rounded-md border border-input bg-background px-3 py-2" value={form} onChange={(e)=>setForm(e.target.value)}>
            <option value="oxide">Oxide</option>
            <option value="metal">Metal</option>
            <option value="alloy">Alloy</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <input className="rounded-md border border-input bg-background px-3 py-2" placeholder="Purity (e.g., 99.5%)" value={purity} onChange={(e)=>setPurity(e.target.value)} />
          <input className="rounded-md border border-input bg-background px-3 py-2" placeholder="Lot size (kg)" inputMode="numeric" value={lot} onChange={(e)=>setLot(e.target.value===""? "": Number(e.target.value))} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <select className="rounded-md border border-input bg-background px-3 py-2" value={incoterm} onChange={(e)=>setIncoterm(e.target.value)}>
            <option>CIF</option><option>FOB</option><option>DDP</option><option>EXW</option>
          </select>
          <select className="rounded-md border border-input bg-background px-3 py-2" value={region} onChange={(e)=>setRegion(e.target.value)}>
            <option>EU</option><option>US</option><option>CN</option><option>SEA</option>
          </select>
        </div>
        <textarea className="rounded-md border border-input bg-background px-3 py-2" placeholder="Notes / requirements" rows={4} value={notes} onChange={(e)=>setNotes(e.target.value)} />
        <div className="flex items-center gap-3">
          <button type="submit" disabled={busy} className="rounded-md border border-border px-4 py-2 hover:bg-secondary">{busy ? "Submitting..." : "Submit RFQ"}</button>
          {ok && <span className="text-sm text-green-400">{ok}</span>}
          {err && <span className="text-sm text-red-400">{err}</span>}
        </div>
      </form>
    </section>
  );
}
