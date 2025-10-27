"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import type { QuotePayload } from "./quote-form";

const fetcher = (u:string)=>fetch(u).then(r=>r.json());

export default function QuoteResults({ data, input }: { data: any; input?: QuotePayload | null }) {
  const [quoteId, setQuoteId] = useState<string | null>(null);
  const [committing, setCommitting] = useState(false);
  
  useEffect(()=>{ 
    if (data?.quoteId) setQuoteId(data.quoteId); 
  }, [data]);

  // domestic price section
  const product = data?.product as string | undefined;
  const { data: domestic } = useSWR(
    product ? `/api/domestic?product=${encodeURIComponent(product)}` : null,
    fetcher
  );

  async function handleCommit() {
    if (!input) return;
    setCommitting(true);
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...input, commit: true }),
      });
      const json = await res.json();
      if (res.ok && json?.quoteId) {
        setQuoteId(json.quoteId);
      }
    } catch (e) {
      console.error("Failed to commit quote:", e);
    } finally {
      setCommitting(false);
    }
  }

  return (
    <div className="grid gap-6 mt-6">
      {data?.best && (
        <div className="rounded-lg border border-border p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold">Best route</h2>
              <div className="mt-1 text-sm">
                {data.best.origin} → {data.best.destination} · Basis: {data.best.basis_label}
              </div>
              <div className="mt-1 text-sm">
                Unit ${data.best.unit_price_usd_per_kg.toFixed(2)}/kg · Qty {data.best.quantity_kg} kg
              </div>
              <div className="mt-2 text-lg font-medium">Estimated landed: ${data.best.landed_total_usd.toLocaleString()}</div>
            </div>
            <div className="flex flex-col gap-2">
              {!quoteId && input && (
                <button 
                  onClick={handleCommit} 
                  disabled={committing}
                  className="rounded-md border border-border px-4 py-2 hover:bg-secondary text-sm whitespace-nowrap"
                >
                  {committing ? "Saving..." : "Get full route + quote"}
                </button>
              )}
              {quoteId && (
                <a href={`/quote/${quoteId}`} className="rounded-md border border-border px-4 py-2 hover:bg-secondary text-sm whitespace-nowrap">Open full route</a>
              )}
            </div>
          </div>
          <div className="mt-3 grid md:grid-cols-5 gap-3 text-sm">
            {["cargo_value","freight","tariff_value","insurance","brokerage"].map((k) => (
              <div key={k} className="rounded-md border border-border p-3">
                <div className="text-muted-foreground capitalize">{k.replace("_"," ")}</div>
                <div>
                  {k==="tariff_value"
                    ? `${data.best.breakdown.tariff_pct}% ($${data.best.breakdown.tariff_value.toLocaleString()})`
                    : `$${data.best.breakdown[k].toLocaleString()}`
                  }
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {data?.routes?.length ? (
        <details open className="rounded-lg border border-border">
          <summary className="cursor-pointer select-none p-4 font-semibold">All candidate routes</summary>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-secondary">
                <tr>
                  <th className="p-2 text-left">Origin</th>
                  <th className="p-2 text-left">Basis</th>
                  <th className="p-2 text-left">Unit $/kg</th>
                  <th className="p-2 text-left">Freight</th>
                  <th className="p-2 text-left">Tariff</th>
                  <th className="p-2 text-left">Insurance</th>
                  <th className="p-2 text-left">Brokerage</th>
                  <th className="p-2 text-left">Landed total</th>
                </tr>
              </thead>
              <tbody>
                {data.routes.map((r: any, i: number) => (
                  <tr key={i} className="border-t border-border">
                    <td className="p-2">{r.origin} → {r.destination}</td>
                    <td className="p-2">{r.basis_label}</td>
                    <td className="p-2">${r.unit_price_usd_per_kg.toFixed(2)}</td>
                    <td className="p-2">${r.breakdown.freight.toLocaleString()}</td>
                    <td className="p-2">{r.breakdown.tariff_pct}% (${r.breakdown.tariff_value.toLocaleString()})</td>
                    <td className="p-2">${r.breakdown.insurance.toLocaleString()}</td>
                    <td className="p-2">${r.breakdown.brokerage.toLocaleString()}</td>
                    <td className="p-2 font-medium">${r.landed_total_usd.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
      ) : null}

      <details open className="rounded-lg border border-border p-4">
        <summary className="cursor-pointer select-none font-semibold">Price history (chosen origin)</summary>
        <div className="h-64 mt-3">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.series ?? []} margin={{ top: 5, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="ts" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="price" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        {data.stats && (
          <div className="mt-3 text-sm text-muted-foreground">
            {data.stats.sample_points} points · min ${data.stats.min ?? "—"} · median ${data.stats.median ?? "—"} · max ${data.stats.max ?? "—"}
          </div>
        )}
      </details>

      <details className="rounded-lg border border-border p-4">
        <summary className="cursor-pointer select-none font-semibold">Domestic price (if available)</summary>
        <div className="mt-3 text-sm">
          {domestic?.rows?.length
            ? domestic.rows.map((r:any,i:number)=>(<div key={i}>{r.ts} · {r.region} · ${Number(r.price).toFixed(2)}/kg {r.purity?`· ${r.purity}`:""}</div>))
            : <div className="text-muted-foreground">No domestic prints</div>}
        </div>
      </details>

      <details className="rounded-lg border border-border p-4">
        <summary className="cursor-pointer select-none font-semibold">Potential restrictions</summary>
        <div className="mt-3 text-sm">
          {(data?.policies ?? []).filter((p:any)=>p.type==="export_control").length
            ? (data.policies.filter((p:any)=>p.type==="export_control").map((p:any,i:number)=>(
                <div key={i}>{p.origin} → {p.destination} · {p.description ?? "Export control"}</div>
              )))
            : <div className="text-muted-foreground">No export-control flags matched</div>}
        </div>
      </details>
    </div>
  );
}
