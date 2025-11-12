import { BROKERAGE_FLAT, INSURANCE_PCT, SERIES_POINTS } from "./config/constants";
import { latestByRegion, isCIFIncluded, median } from "./helpers";
import type { Lane, Policy, PriceRow, QuoteInput, QuoteResult, RouteOption } from "./types";

export function computeQuote(params: {
  input: QuoteInput;
  prices: PriceRow[];
  lanes: Lane[];
  policies: Policy[]|null|undefined;
}): QuoteResult {
  const { input, prices, lanes, policies } = params;

  const byRegion = latestByRegion(prices.filter(p => p.product === input.product));
  const origins = Array.from(byRegion.keys());
  const routes: RouteOption[] = [];

  function tariffPctFor(origin: string): number {
    let pct = 0;
    for (const p of (policies ?? [])) {
      if (p.type !== "tariff") continue;
      if (p.origin !== origin) continue;
      if (p.destination !== input.destination) continue;
      if (p.product && p.product !== input.product) continue;
      if (typeof p.rate_percent === "number") pct += p.rate_percent;
    }
    return pct;
  }

  for (const origin of origins) {
    const latest = byRegion.get(origin)!;
    const unit = Number(latest.price);
    const qty = input.quantityKg;
    const cargoValue = unit * qty;

    const lane = lanes.find(l => l.origin === origin && l.destination === input.destination);
    const freightPerKg = isCIFIncluded(input.destination, latest.region) ? 0 : (lane?.usd_per_kg ?? 0.9);
    const freight = freightPerKg * qty;

    const insurance = INSURANCE_PCT * cargoValue;
    const tariffPct = tariffPctFor(origin);
    const tariffValue = (tariffPct / 100) * cargoValue;

    const landed = cargoValue + freight + insurance + BROKERAGE_FLAT + tariffValue;

    routes.push({
      origin,
      destination: input.destination,
      product: input.product,
      purity: input.purity ?? null,
      basis_label: latest.region,
      unit_price_usd_per_kg: unit,
      quantity_kg: qty,
      breakdown: {
        cargo_value: round2(cargoValue),
        freight: round2(freight),
        insurance: round2(insurance),
        brokerage: BROKERAGE_FLAT,
        tariff_pct: tariffPct,
        tariff_value: round2(tariffValue),
      },
      landed_total_usd: round2(landed),
    });
  }

  routes.sort((a,b)=>a.landed_total_usd - b.landed_total_usd);
  const best = routes[0] ?? null;

  // series + stats for chosen origin
  const chosenOrigin = best?.origin;
  const seriesAll = prices.filter(p => p.product === input.product && p.region === chosenOrigin)
                          .map(p => ({ ts: p.ts, price: Number(p.price) }));
  const series = seriesAll.slice(-SERIES_POINTS);
  const vals = series.map(s => s.price);
  const stats = series.length ? {
    sample_points: series.length,
    min: Math.min(...vals),
    median: median(vals),
    max: Math.max(...vals)
  } : null;

  return {
    product: input.product,
    purity: input.purity ?? null,
    destination: input.destination,
    routes,
    best,
    stats,
    series,
    warnings: origins.length ? [] : ["No origin regions with prices."]
  };
}

function round2(n: number) { return Math.round(n*100)/100; }
