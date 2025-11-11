import Link from "next/link";
import { notFound } from "next/navigation";

import { getElementBySlug, getRegionForBasis, RARE_EARTH_ELEMENTS } from "@/data/rare-earth-elements";

export function generateStaticParams() {
  return RARE_EARTH_ELEMENTS.map((el) => ({ slug: el.slug }));
}

export default function ElementPage({ params }: { params: { slug: string } }) {
  const element = getElementBySlug(params.slug);
  if (!element) {
    notFound();
  }

  return (
    <section className="py-10 space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Rare earth element</p>
          <h1 className="text-3xl font-semibold">
            {element.name} ({element.symbol})
          </h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">{element.summary}</p>
        </div>
        <Link href="/dashboard" className="text-sm text-primary hover:underline">
          ← Back to dashboard
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-border p-5 space-y-3">
          <h2 className="text-lg font-semibold">Where it is used</h2>
          <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
            {element.keyUses.map((use) => (
              <li key={use}>{use}</li>
            ))}
          </ul>
          <div className="text-sm text-muted-foreground">
            <strong className="font-medium text-foreground">Supply note:</strong> {element.supplyNotes}
          </div>
        </div>

        <div className="rounded-lg border border-border p-5 space-y-3">
          <h2 className="text-lg font-semibold">Indicative dummy prices</h2>
          <p className="text-sm text-muted-foreground">
            These placeholders illustrate how regional benchmarks could be displayed. Swap in live feeds when the
            database is wired up.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-muted-foreground">
                  <th className="p-2">Product</th>
                  <th className="p-2">Region</th>
                  <th className="p-2">Basis</th>
                  <th className="p-2">Latest</th>
                </tr>
              </thead>
              <tbody>
                {element.priceHighlights.map((row, idx) => {
                  const board = getRegionForBasis(row.basis);
                  const regionLabel = row.regionLabel ?? board?.label ?? row.basis;
                  return (
                    <tr key={`${row.product}-${idx}`} className="border-t border-border">
                      <td className="p-2">{row.product}</td>
                      <td className="p-2">{regionLabel}</td>
                      <td className="p-2 text-muted-foreground">{row.basis}</td>
                      <td className="p-2 font-medium">
                        {typeof row.latestPrice === "number" ? `$${row.latestPrice.toLocaleString(undefined, { maximumFractionDigits: 1 })}/kg` : "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <Link href="/prices" className="text-sm text-primary hover:underline">
            Browse regional price boards →
          </Link>
        </div>
      </div>

      <div className="rounded-lg border border-dashed border-border p-5 text-sm text-muted-foreground">
        <p>
          Looking to plug in live data? Point this page at your preferred feed and replace the dummy values. The layout is
          intentionally simple: element summary, uses, and the latest regional benchmarks.
        </p>
      </div>
    </section>
  );
}
