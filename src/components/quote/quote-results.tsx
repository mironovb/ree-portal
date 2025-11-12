"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

import type { RouteBreakdown } from "@/domain/quote/types";

import type { QuoteComputation, QuotePayload } from "./quote-form";

export default function QuoteResults({ data, input }: { data: QuoteComputation; input?: QuotePayload | null }) {
  const best = data.best;
  const tariffNotes = data.policies.filter((p) => p.type === "tariff");
  const controlNotes = data.policies.filter((p) => p.type === "export_control");

  return (
    <div className="grid gap-6 mt-6">
      {best && (
        <div className="rounded-lg border border-border p-5 space-y-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-semibold">Best landed option</h2>
            <div className="text-sm text-muted-foreground">
              {best.origin} → {best.destination} · Basis {best.basis_label}
            </div>
            <div className="text-sm text-muted-foreground">
              ${best.unit_price_usd_per_kg.toFixed(2)}/kg · {best.quantity_kg} kg shipment
            </div>
            <div className="text-lg font-medium">Estimated landed: ${best.landed_total_usd.toLocaleString()}</div>
          </div>

          <div className="grid gap-3 md:grid-cols-5 text-sm">
            {([
              "cargo_value",
              "freight",
              "tariff_value",
              "insurance",
              "brokerage",
            ] satisfies Array<keyof RouteBreakdown>).map((key) => {
              const breakdown = best.breakdown;
              const display = breakdown
                ? key === "tariff_value"
                  ? `${breakdown.tariff_pct}% ($${breakdown.tariff_value.toLocaleString()})`
                  : `$${breakdown[key].toLocaleString()}`
                : "—";

              return (
                <div key={key} className="rounded-md border border-border p-3">
                  <div className="text-muted-foreground uppercase tracking-wide text-xs">{key.replace("_", " ")}</div>
                  <div>{display}</div>
                </div>
              );
            })}
          </div>

          {input && (
            <div className="rounded-md border border-dashed border-border p-3 text-xs text-muted-foreground">
              Ready for live data? Feed this form with API results and keep the same breakdown layout. Inputs used:
              <span className="font-medium text-foreground"> {input.itemName}</span>, {input.quantityKg} kg, destination {input.destination}.
            </div>
          )}
        </div>
      )}

      {data.routes.length > 1 && (
        <div className="rounded-lg border border-border overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary">
              <tr>
                <th className="p-2 text-left">Origin</th>
                <th className="p-2 text-left">Basis</th>
                <th className="p-2 text-left">Unit $/kg</th>
                <th className="p-2 text-left">Tariff</th>
                <th className="p-2 text-left">Freight</th>
                <th className="p-2 text-left">Insurance</th>
                <th className="p-2 text-left">Landed</th>
              </tr>
            </thead>
            <tbody>
              {data.routes.map((route, idx) => (
                <tr key={`${route.origin}-${idx}`} className="border-t border-border">
                  <td className="p-2">{route.origin} → {route.destination}</td>
                  <td className="p-2 text-muted-foreground">{route.basis_label}</td>
                  <td className="p-2">${route.unit_price_usd_per_kg.toFixed(2)}</td>
                  <td className="p-2">{route.breakdown.tariff_pct}% (${route.breakdown.tariff_value.toLocaleString()})</td>
                  <td className="p-2">${route.breakdown.freight.toLocaleString()}</td>
                  <td className="p-2">${route.breakdown.insurance.toLocaleString()}</td>
                  <td className="p-2 font-medium">${route.landed_total_usd.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="rounded-lg border border-border p-5 space-y-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold">Price history</h3>
          <p className="text-sm text-muted-foreground">
            Dummy prints for the chosen origin. Replace with your time series to keep this chart intact.
          </p>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.series} margin={{ top: 5, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="ts" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="price" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        {data.stats && (
          <div className="text-sm text-muted-foreground">
            {data.stats.sample_points} points · min ${data.stats.min ?? "—"} · median ${data.stats.median ?? "—"} · max ${data.stats.max ?? "—"}
          </div>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-border p-4 space-y-2">
          <h3 className="text-lg font-semibold">Tariffs & controls</h3>
          {tariffNotes.length ? (
            <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
              {tariffNotes.map((policy) => (
                <li key={`${policy.origin}-${policy.description}`}>{policy.origin} → {policy.destination}: {policy.description} ({policy.rate_percent ?? 0}% duty)</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">No tariff entries matched this lane.</p>
          )}
          {controlNotes.length > 0 && (
            <div className="text-xs text-yellow-500">
              Export control flag: {controlNotes[0].description ?? "Licensing required"}
            </div>
          )}
        </div>

        <div className="rounded-lg border border-border p-4 space-y-2">
          <h3 className="text-lg font-semibold">Domestic reference prints</h3>
          {data.domestic.length ? (
            <ul className="text-sm text-muted-foreground space-y-1">
              {data.domestic.map((row) => (
                <li key={`${row.ts}-${row.region}`}>{row.ts} · {row.region} · ${row.price.toFixed(1)}/kg {row.purity ? `· ${row.purity}` : ""}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">No domestic placeholders for this product yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
