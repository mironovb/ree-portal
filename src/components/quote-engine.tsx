"use client";

import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

type SeriesPoint = { ts: string; price: number };
type Breakdown = {
  cargo_value: number;
  freight: number;
  insurance: number;
  brokerage: number;
  tariff_pct: number;
  tariff_value: number;
};
type Route = {
  origin: string;
  destination: string;
  product: string;
  purity: string | null;
  basis_label: string;
  unit_price_usd_per_kg: number;
  quantity_kg: number;
  breakdown: Breakdown;
  landed_total_usd: number;
};
type QuoteResponse = {
  product: string;
  purity: string | null;
  destination: string;
  routes: Route[];
  best: Route | null;
  stats: { sample_points: number; min: number|null; median: number|null; max: number|null } | null;
  series: SeriesPoint[];
  error?: string;
  warning?: string;
};

export default function QuoteEngine() {
  const [itemName, setItemName] = useState("NdPr Oxide");
  const [purity, setPurity] = useState("99.5%");
  const [quantityKg, setQuantityKg] = useState<number | "">("");
  const [destination, setDestination] = useState<"US"|"EU">("US");
  const [busy, setBusy] = useState(false);
  const [resp, setResp] = useState<QuoteResponse | null>(null);
  const [err, setErr] = useState<string | null>(null);

  return (
    <section className="py-10">
      <h1 className="text-3xl md:text-4xl font-semibold">Tariff Navigator & Price Search</h1>
      <p className="mt-2 text-muted-foreground max-w-2xl">
        Enter product, quantity, and purity to see regional prices, applied tariffs, and candidate import routes with estimated landed costs.
      </p>

      <form
        className="mt-6 grid gap-3 md:grid-cols-5"
        onSubmit={async (e) => {
          e.preventDefault();
          setBusy(true); setErr(null); setResp(null);

          const res = await fetch("/api/quote", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              itemName,
              quantityKg: typeof quantityKg === "number" ? quantityKg : Number(quantityKg),
              purity,
              destination
            }),
          });
          const json = await res.json();
          if (!res.ok || json?.error) { setErr(json?.error ?? "Quote failed"); setBusy(false); return; }
          setResp(json);
          setBusy(false);
        }}
      >
        <input
          className="rounded-md border border-input bg-background px-3 py-2"
          placeholder="Item (e.g., NdPr Oxide)"
          value={itemName}
          onChange={(e)=>setItemName(e.target.value)}
        />
        <input
          className="rounded-md border border-input bg-background px-3 py-2"
          placeholder="Purity (e.g., 99.5%)"
          value={purity}
          onChange={(e)=>setPurity(e.target.value)}
        />
        <input
          className="rounded-md border border-input bg-background px-3 py-2"
          placeholder="Quantity (kg)"
          inputMode="numeric"
          value={quantityKg}
          onChange={(e)=>setQuantityKg(e.target.value===""? "": Number(e.target.value))}
          required
        />
        <select
          className="rounded-md border border-input bg-background px-3 py-2"
          value={destination}
          onChange={(e)=>setDestination(e.target.value as "US"|"EU")}
        >
          <option value="US">Destination: US</option>
          <option value="EU">Destination: EU</option>
        </select>
        <button
          type="submit"
          disabled={busy}
          className="rounded-md border border-border px-4 py-2 hover:bg-secondary"
        >
          {busy ? "Computing…" : "Get routes"}
        </button>
      </form>

      {err && <div className="mt-4 text-red-400 text-sm">{err}</div>}
      {resp?.warning && <div className="mt-4 text-yellow-400 text-sm">{resp.warning}</div>}

      {resp && (
        <div className="mt-8 grid gap-6">
          {resp.best && (
            <div className="rounded-lg border border-border p-4">
              <h2 className="text-xl font-semibold">Best route</h2>
              <div className="mt-2 text-sm">
                <div><span className="text-muted-foreground">Lane:</span> {resp.best.origin} → {resp.best.destination} &nbsp; <span className="text-muted-foreground">Basis:</span> {resp.best.basis_label}</div>
                <div className="mt-1"><span className="text-muted-foreground">Unit price:</span> ${resp.best.unit_price_usd_per_kg.toFixed(2)}/kg &nbsp;·&nbsp; <span className="text-muted-foreground">Qty:</span> {resp.best.quantity_kg} kg</div>
                <div className="mt-1 font-medium">Estimated landed: ${resp.best.landed_total_usd.toLocaleString()}</div>
              </div>
              <div className="mt-3 grid md:grid-cols-5 gap-3 text-sm">
                <div className="rounded-md border border-border p-3">
                  <div className="text-muted-foreground">Cargo value</div>
                  <div>${resp.best.breakdown.cargo_value.toLocaleString()}</div>
                </div>
                <div className="rounded-md border border-border p-3">
                  <div className="text-muted-foreground">Freight</div>
                  <div>${resp.best.breakdown.freight.toLocaleString()}</div>
                </div>
                <div className="rounded-md border border-border p-3">
                  <div className="text-muted-foreground">Tariff</div>
                  <div>{resp.best.breakdown.tariff_pct}% (${resp.best.breakdown.tariff_value.toLocaleString()})</div>
                </div>
                <div className="rounded-md border border-border p-3">
                  <div className="text-muted-foreground">Insurance</div>
                  <div>${resp.best.breakdown.insurance.toLocaleString()}</div>
                </div>
                <div className="rounded-md border border-border p-3">
                  <div className="text-muted-foreground">Brokerage</div>
                  <div>${resp.best.breakdown.brokerage.toLocaleString()}</div>
                </div>
              </div>
            </div>
          )}

          {resp.routes?.length ? (
            <div className="rounded-lg border border-border">
              <div className="p-4">
                <h3 className="text-lg font-semibold">All candidate routes</h3>
              </div>
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
                    {resp.routes.map((r, i) => (
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
            </div>
          ) : null}

          <div className="rounded-lg border border-border p-4">
            <h3 className="text-lg font-semibold">Price history (chosen origin)</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={resp.series} margin={{ top: 5, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="ts" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="price" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            {resp.stats && (
              <div className="mt-3 text-sm text-muted-foreground">
                {resp.stats.sample_points} points · min ${resp.stats.min ?? "—"} · median ${resp.stats.median ?? "—"} · max ${resp.stats.max ?? "—"}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
