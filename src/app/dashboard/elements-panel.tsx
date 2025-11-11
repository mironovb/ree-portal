"use client";

import { ElementGrid } from "@/components/element-grid";
import { RARE_EARTH_ELEMENTS } from "@/data/rare-earth-elements";

const ELEMENTS = RARE_EARTH_ELEMENTS.map((el) => {
  const highlight = el.priceHighlights[0];
  const priceSummary = highlight?.latestPrice
    ? `${highlight.regionLabel}: $${highlight.latestPrice.toLocaleString(undefined, { maximumFractionDigits: 1 })}/kg`
    : highlight?.regionLabel;

  return {
    symbol: el.symbol,
    name: el.name,
    number: el.number,
    href: `/elements/${el.slug}`,
    headline: el.headline,
    priceSummary,
  };
});

export default function ElementsPanel() {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold">Rare earth snapshot</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Jump into element dashboards with indicative dummy pricing, applications, and trade notes.
        </p>
      </div>
      <ElementGrid items={ELEMENTS} />
    </section>
  );
}
