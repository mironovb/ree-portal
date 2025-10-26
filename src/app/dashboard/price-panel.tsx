"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import useSWR from "swr";

type Row = {
  ts: string;
  product: string;
  region: string;
  price: number;
  basis_vs_china?: number;
};
const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function PricePanel() {
  const { data } = useSWR<{ rows: Row[] }>("/api/prices", fetcher);
  const rows = data?.rows ?? [];
  const ndprChina = rows.filter(
    (r) => r.product === "NdPr Oxide" && r.region === "China FOB",
  );

  return (
    <div className="grid md:grid-cols-5 gap-6">
      <Card className="md:col-span-3">
        <CardHeader>
          <CardTitle>NdPr Oxide — China FOB</CardTitle>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={ndprChina}
              margin={{ top: 5, right: 20, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="ts" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="price" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Latest prints</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-border text-sm">
            {rows
              .slice(-6)
              .reverse()
              .map((r, i) => (
                <div key={i} className="py-2 flex justify-between">
                  <span>
                    {r.ts} • {r.product} ({r.region})
                  </span>
                  <span className="font-medium">${r.price.toFixed(2)}/kg</span>
                </div>
              ))}
            {rows.length === 0 && (
              <div className="py-2 text-muted-foreground">Loading…</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
