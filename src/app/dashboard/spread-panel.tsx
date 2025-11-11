"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceLine } from "recharts";
import { useMemo } from "react";

import { DUMMY_PRICE_SERIES } from "@/data/market-data";

function computeBasis(rows: typeof DUMMY_PRICE_SERIES) {
  // map date -> { cn?: number, eu?: number }
  const map = new Map<string, { cn?: number; eu?: number }>();
  for (const r of rows.filter(r => r.product === "NdPr Oxide")) {
    const e = map.get(r.ts) ?? {};
    if (r.region.toLowerCase().includes("china")) e.cn = r.price;
    if (r.region.toLowerCase().includes("eu")) e.eu = r.price;
    map.set(r.ts, e);
  }
  // build chart rows where both exist
  const out: { ts: string; basis: number }[] = [];
  for (const [ts, v] of Array.from(map.entries()).sort((a,b)=>a[0].localeCompare(b[0]))) {
    if (typeof v.cn === "number" && typeof v.eu === "number") {
      out.push({ ts, basis: Number((v.eu - v.cn).toFixed(2)) });
    }
  }
  return out;
}

export default function SpreadPanel() {
  const rows = useMemo(() => DUMMY_PRICE_SERIES, []);
  const chart = useMemo(() => computeBasis(rows), [rows]);

  return (
    <Card>
      <CardHeader><CardTitle>NdPr Oxide — Basis (EU CIF − China FOB)</CardTitle></CardHeader>
      <CardContent className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chart} margin={{ top: 5, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="ts" />
            <YAxis />
            <Tooltip />
            <ReferenceLine y={0} strokeWidth={1} />
            <Bar dataKey="basis" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
