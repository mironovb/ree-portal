import Link from "next/link";
import { notFound } from "next/navigation";

import { REGION_PRICE_BOARDS } from "@/data/market-data";

export function generateStaticParams() {
  return REGION_PRICE_BOARDS.map((board) => ({ region: board.slug }));
}

export default function RegionPricePage({ params }: { params: { region: string } }) {
  const board = REGION_PRICE_BOARDS.find((item) => item.slug === params.region);
  if (!board) {
    notFound();
  }

  return (
    <section className="py-10 space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Static illustration</p>
          <h1 className="text-3xl font-semibold">{board.label} rare earth prices</h1>
          <p className="text-muted-foreground max-w-2xl">{board.description}</p>
          <div className="text-xs text-muted-foreground">Last updated {board.lastUpdated}</div>
        </div>
        <Link href="/prices" className="text-sm text-primary hover:underline">
          ← All regions
        </Link>
      </div>

      <div className="rounded-lg border border-border overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-secondary">
            <tr>
              <th className="p-2 text-left">Product</th>
              <th className="p-2 text-left">Specification</th>
              <th className="p-2 text-left">Basis</th>
              <th className="p-2 text-left">Latest</th>
              <th className="p-2 text-left">Move</th>
              <th className="p-2 text-left">Notes</th>
            </tr>
          </thead>
          <tbody>
            {board.entries.map((entry) => (
              <tr key={`${entry.product}-${entry.basis}`} className="border-t border-border">
                <td className="p-2 font-medium">{entry.product}</td>
                <td className="p-2 text-muted-foreground">{entry.specification}</td>
                <td className="p-2">{entry.basis}</td>
                <td className="p-2">${entry.latestPrice.toLocaleString(undefined, { maximumFractionDigits: 1 })}/kg</td>
                <td className="p-2 text-muted-foreground">{entry.move}</td>
                <td className="p-2 text-muted-foreground">{entry.note ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-lg border border-dashed border-border p-4 text-sm text-muted-foreground">
        Use this table as a template for real market data. Hook the board into your preferred database or API and replace
        the dummy array in <code>src/data/market-data.ts</code>.
      </div>
    </section>
  );
}
