import Link from "next/link";

import { REGION_PRICE_BOARDS } from "@/data/market-data";

export default function PricesLandingPage() {
  return (
    <section className="py-10 space-y-8">
      <div className="max-w-3xl space-y-3">
        <h1 className="text-3xl font-semibold">Regional rare earth price boards</h1>
        <p className="text-muted-foreground">
          Explore dummy price boards that illustrate how you can group rare earth benchmarks by destination market. When
          live feeds are ready, simply swap these placeholders for API results—navigation and layout stay the same.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {REGION_PRICE_BOARDS.map((board) => (
          <Link
            key={board.slug}
            href={`/prices/${board.slug}`}
            className="rounded-lg border border-border p-5 hover:bg-secondary transition"
          >
            <div className="text-sm text-muted-foreground">Regional board</div>
            <h2 className="text-xl font-semibold">{board.label}</h2>
            <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{board.description}</p>
            <div className="mt-4 text-xs text-muted-foreground">Updated {board.lastUpdated}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
