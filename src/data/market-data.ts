import type { DomesticPriceRow, Lane, Policy, PriceRow } from "@/domain/quote/types";

export const DUMMY_PRICE_SERIES: PriceRow[] = [
  // NdPr Oxide
  { ts: "2024-01-05", product: "NdPr Oxide", region: "China FOB", price: 54.8 },
  { ts: "2024-02-05", product: "NdPr Oxide", region: "China FOB", price: 53.6 },
  { ts: "2024-03-05", product: "NdPr Oxide", region: "China FOB", price: 52.9 },
  { ts: "2024-04-05", product: "NdPr Oxide", region: "China FOB", price: 51.7 },
  { ts: "2024-05-05", product: "NdPr Oxide", region: "China FOB", price: 52.4 },
  { ts: "2024-06-05", product: "NdPr Oxide", region: "China FOB", price: 53.1 },

  { ts: "2024-01-05", product: "NdPr Oxide", region: "Australia FOB", price: 58.2 },
  { ts: "2024-02-05", product: "NdPr Oxide", region: "Australia FOB", price: 57.4 },
  { ts: "2024-03-05", product: "NdPr Oxide", region: "Australia FOB", price: 56.9 },
  { ts: "2024-04-05", product: "NdPr Oxide", region: "Australia FOB", price: 56.3 },
  { ts: "2024-05-05", product: "NdPr Oxide", region: "Australia FOB", price: 56.8 },
  { ts: "2024-06-05", product: "NdPr Oxide", region: "Australia FOB", price: 57.1 },

  { ts: "2024-01-05", product: "NdPr Oxide", region: "Europe CIF", price: 61.3 },
  { ts: "2024-02-05", product: "NdPr Oxide", region: "Europe CIF", price: 60.4 },
  { ts: "2024-03-05", product: "NdPr Oxide", region: "Europe CIF", price: 59.7 },
  { ts: "2024-04-05", product: "NdPr Oxide", region: "Europe CIF", price: 58.9 },
  { ts: "2024-05-05", product: "NdPr Oxide", region: "Europe CIF", price: 59.1 },
  { ts: "2024-06-05", product: "NdPr Oxide", region: "Europe CIF", price: 59.8 },

  { ts: "2024-01-05", product: "NdPr Oxide", region: "Japan CIF", price: 58.2 },
  { ts: "2024-02-05", product: "NdPr Oxide", region: "Japan CIF", price: 57.9 },
  { ts: "2024-03-05", product: "NdPr Oxide", region: "Japan CIF", price: 57.2 },
  { ts: "2024-04-05", product: "NdPr Oxide", region: "Japan CIF", price: 56.8 },
  { ts: "2024-05-05", product: "NdPr Oxide", region: "Japan CIF", price: 57.1 },
  { ts: "2024-06-05", product: "NdPr Oxide", region: "Japan CIF", price: 57.4 },

  { ts: "2024-01-05", product: "NdPr Metal", region: "China FOB", price: 84.2 },
  { ts: "2024-02-05", product: "NdPr Metal", region: "China FOB", price: 83.5 },
  { ts: "2024-03-05", product: "NdPr Metal", region: "China FOB", price: 82.1 },
  { ts: "2024-04-05", product: "NdPr Metal", region: "China FOB", price: 81.6 },
  { ts: "2024-05-05", product: "NdPr Metal", region: "China FOB", price: 82.8 },
  { ts: "2024-06-05", product: "NdPr Metal", region: "China FOB", price: 83.4 },

  { ts: "2024-01-05", product: "NdPr Metal", region: "US Midwest DDP", price: 96.5 },
  { ts: "2024-02-05", product: "NdPr Metal", region: "US Midwest DDP", price: 95.2 },
  { ts: "2024-03-05", product: "NdPr Metal", region: "US Midwest DDP", price: 94.1 },
  { ts: "2024-04-05", product: "NdPr Metal", region: "US Midwest DDP", price: 93.7 },
  { ts: "2024-05-05", product: "NdPr Metal", region: "US Midwest DDP", price: 94.4 },
  { ts: "2024-06-05", product: "NdPr Metal", region: "US Midwest DDP", price: 94.9 },

  { ts: "2024-01-05", product: "NdPr Metal", region: "Japan CIF", price: 90.4 },
  { ts: "2024-02-05", product: "NdPr Metal", region: "Japan CIF", price: 89.8 },
  { ts: "2024-03-05", product: "NdPr Metal", region: "Japan CIF", price: 89.1 },
  { ts: "2024-04-05", product: "NdPr Metal", region: "Japan CIF", price: 88.8 },
  { ts: "2024-05-05", product: "NdPr Metal", region: "Japan CIF", price: 88.1 },
  { ts: "2024-06-05", product: "NdPr Metal", region: "Japan CIF", price: 88.6 },

  { ts: "2024-01-05", product: "Dysprosium Oxide", region: "China FOB", price: 310.0 },
  { ts: "2024-02-05", product: "Dysprosium Oxide", region: "China FOB", price: 305.0 },
  { ts: "2024-03-05", product: "Dysprosium Oxide", region: "China FOB", price: 298.0 },
  { ts: "2024-04-05", product: "Dysprosium Oxide", region: "China FOB", price: 292.0 },
  { ts: "2024-05-05", product: "Dysprosium Oxide", region: "China FOB", price: 296.0 },
  { ts: "2024-06-05", product: "Dysprosium Oxide", region: "China FOB", price: 301.0 },

  { ts: "2024-01-05", product: "Dysprosium Oxide", region: "Europe CIF", price: 335.0 },
  { ts: "2024-02-05", product: "Dysprosium Oxide", region: "Europe CIF", price: 329.0 },
  { ts: "2024-03-05", product: "Dysprosium Oxide", region: "Europe CIF", price: 321.0 },
  { ts: "2024-04-05", product: "Dysprosium Oxide", region: "Europe CIF", price: 316.0 },
  { ts: "2024-05-05", product: "Dysprosium Oxide", region: "Europe CIF", price: 318.0 },
  { ts: "2024-06-05", product: "Dysprosium Oxide", region: "Europe CIF", price: 322.0 },

  { ts: "2024-01-05", product: "Dysprosium Oxide", region: "US Gulf CFR", price: 332.0 },
  { ts: "2024-02-05", product: "Dysprosium Oxide", region: "US Gulf CFR", price: 328.0 },
  { ts: "2024-03-05", product: "Dysprosium Oxide", region: "US Gulf CFR", price: 323.0 },
  { ts: "2024-04-05", product: "Dysprosium Oxide", region: "US Gulf CFR", price: 318.0 },
  { ts: "2024-05-05", product: "Dysprosium Oxide", region: "US Gulf CFR", price: 320.0 },
  { ts: "2024-06-05", product: "Dysprosium Oxide", region: "US Gulf CFR", price: 326.0 },

  { ts: "2024-01-05", product: "Dysprosium Oxide", region: "Japan CIF", price: 314.0 },
  { ts: "2024-02-05", product: "Dysprosium Oxide", region: "Japan CIF", price: 311.0 },
  { ts: "2024-03-05", product: "Dysprosium Oxide", region: "Japan CIF", price: 308.0 },
  { ts: "2024-04-05", product: "Dysprosium Oxide", region: "Japan CIF", price: 306.0 },
  { ts: "2024-05-05", product: "Dysprosium Oxide", region: "Japan CIF", price: 307.0 },
  { ts: "2024-06-05", product: "Dysprosium Oxide", region: "Japan CIF", price: 309.0 },

  { ts: "2024-01-05", product: "Terbium Metal", region: "China FOB", price: 1440.0 },
  { ts: "2024-02-05", product: "Terbium Metal", region: "China FOB", price: 1425.0 },
  { ts: "2024-03-05", product: "Terbium Metal", region: "China FOB", price: 1418.0 },
  { ts: "2024-04-05", product: "Terbium Metal", region: "China FOB", price: 1406.0 },
  { ts: "2024-05-05", product: "Terbium Metal", region: "China FOB", price: 1412.0 },
  { ts: "2024-06-05", product: "Terbium Metal", region: "China FOB", price: 1419.0 },

  { ts: "2024-01-05", product: "Terbium Metal", region: "US Midwest DDP", price: 1575.0 },
  { ts: "2024-02-05", product: "Terbium Metal", region: "US Midwest DDP", price: 1562.0 },
  { ts: "2024-03-05", product: "Terbium Metal", region: "US Midwest DDP", price: 1554.0 },
  { ts: "2024-04-05", product: "Terbium Metal", region: "US Midwest DDP", price: 1540.0 },
  { ts: "2024-05-05", product: "Terbium Metal", region: "US Midwest DDP", price: 1546.0 },
  { ts: "2024-06-05", product: "Terbium Metal", region: "US Midwest DDP", price: 1551.0 },

  { ts: "2024-01-05", product: "Terbium Metal", region: "Europe CIF", price: 1523.0 },
  { ts: "2024-02-05", product: "Terbium Metal", region: "Europe CIF", price: 1515.0 },
  { ts: "2024-03-05", product: "Terbium Metal", region: "Europe CIF", price: 1506.0 },
  { ts: "2024-04-05", product: "Terbium Metal", region: "Europe CIF", price: 1499.0 },
  { ts: "2024-05-05", product: "Terbium Metal", region: "Europe CIF", price: 1498.0 },
  { ts: "2024-06-05", product: "Terbium Metal", region: "Europe CIF", price: 1498.0 },
];

export const DUMMY_LANES: Lane[] = [
  { origin: "China FOB", destination: "US", mode: "ocean", usd_per_kg: 0.85, typical_days: 22, notes: "Shanghai → LA" },
  { origin: "China FOB", destination: "EU", mode: "ocean", usd_per_kg: 0.75, typical_days: 28, notes: "Ningbo → Rotterdam" },
  { origin: "Australia FOB", destination: "US", mode: "ocean", usd_per_kg: 0.65, typical_days: 24, notes: "Fremantle → Houston" },
  { origin: "Australia FOB", destination: "EU", mode: "ocean", usd_per_kg: 0.60, typical_days: 27, notes: "Fremantle → Antwerp" },
  { origin: "Europe CIF", destination: "EU", mode: "ocean", usd_per_kg: 0.0, typical_days: 14, notes: "CIF includes freight" },
  { origin: "US Midwest DDP", destination: "US", mode: "truck", usd_per_kg: 0.0, typical_days: 5, notes: "Delivered duty paid" },
];

export const DUMMY_POLICIES: Policy[] = [
  {
    type: "tariff",
    origin: "China FOB",
    destination: "US",
    rate_percent: 25,
    description: "Section 301 duties on Chinese rare earth products",
    effective_from: "2019-09-01",
  },
  {
    type: "tariff",
    origin: "China FOB",
    destination: "EU",
    rate_percent: 10,
    description: "Common external tariff",
    effective_from: "2020-01-01",
  },
  {
    type: "tariff",
    origin: "Australia FOB",
    destination: "US",
    rate_percent: 0,
    description: "FTA eliminates duties on oxide shipments",
    effective_from: "2005-01-01",
  },
  {
    type: "export_control",
    origin: "China FOB",
    destination: "US",
    description: "MOFCOM export licensing on magnet rare earths",
    effective_from: "2023-08-01",
  },
];

export const DUMMY_DOMESTIC_PRICES: DomesticPriceRow[] = [
  { ts: "2024-04-15", product: "NdPr Oxide", region: "US Midwest DDP", purity: "99.5%", price: 81.2 },
  { ts: "2024-05-15", product: "NdPr Oxide", region: "US Midwest DDP", purity: "99.5%", price: 82.0 },
  { ts: "2024-06-05", product: "NdPr Oxide", region: "US Midwest DDP", purity: "99.5%", price: 82.7 },
  { ts: "2024-04-15", product: "NdPr Metal", region: "US Midwest DDP", purity: "99.0%", price: 95.9 },
  { ts: "2024-05-15", product: "NdPr Metal", region: "US Midwest DDP", purity: "99.0%", price: 96.4 },
  { ts: "2024-06-05", product: "NdPr Metal", region: "US Midwest DDP", purity: "99.0%", price: 96.9 },
];

export type RegionPriceBoard = {
  slug: string;
  label: string;
  description: string;
  lastUpdated: string;
  entries: {
    product: string;
    specification: string;
    basis: string;
    latestPrice: number;
    move: string;
    note?: string;
  }[];
};

export const REGION_PRICE_BOARDS: RegionPriceBoard[] = [
  {
    slug: "us",
    label: "United States",
    description: "Indicative delivered prices into U.S. manufacturing hubs.",
    lastUpdated: "2024-06-05",
    entries: [
      {
        product: "NdPr Oxide",
        specification: "99.5% min",
        basis: "US Midwest DDP",
        latestPrice: 82.7,
        move: "+0.7% vs. May",
        note: "Domestic distributors reported steady magnet demand.",
      },
      {
        product: "NdPr Metal",
        specification: "99.0% min",
        basis: "US Midwest DDP",
        latestPrice: 96.9,
        move: "+0.5% vs. May",
      },
      {
        product: "Dysprosium Oxide",
        specification: "99.5% min",
        basis: "US Gulf CFR",
        latestPrice: 326.0,
        move: "−1.2% vs. May",
        note: "Restocking paused while buyers watch Chinese export policies.",
      },
      {
        product: "Terbium Metal",
        specification: "99.99%",
        basis: "US Midwest DDP",
        latestPrice: 1551.0,
        move: "+0.3% vs. May",
      },
    ],
  },
  {
    slug: "eu",
    label: "European Union",
    description: "Delivered pricing into Rotterdam and continental magnet alloy plants.",
    lastUpdated: "2024-06-05",
    entries: [
      {
        product: "NdPr Oxide",
        specification: "99.5% min",
        basis: "Europe CIF",
        latestPrice: 59.8,
        move: "+1.2% vs. May",
      },
      {
        product: "Dysprosium Oxide",
        specification: "99.5% min",
        basis: "Europe CIF",
        latestPrice: 322.0,
        move: "+1.3% vs. May",
        note: "Permanent magnet demand from EV makers lifted bids.",
      },
      {
        product: "Terbium Metal",
        specification: "99.99%",
        basis: "Europe CIF",
        latestPrice: 1498.0,
        move: "Unch. vs. May",
      },
    ],
  },
  {
    slug: "asia",
    label: "Asia ex-China",
    description: "Regional transfer pricing benchmarks for Japan and South Korea.",
    lastUpdated: "2024-06-05",
    entries: [
      {
        product: "NdPr Oxide",
        specification: "99.5% min",
        basis: "Japan CIF",
        latestPrice: 57.4,
        move: "+0.5% vs. May",
      },
      {
        product: "NdPr Metal",
        specification: "99.0% min",
        basis: "Japan CIF",
        latestPrice: 88.6,
        move: "−0.8% vs. May",
      },
      {
        product: "Dysprosium Oxide",
        specification: "99.5% min",
        basis: "Japan CIF",
        latestPrice: 309.0,
        move: "Unch. vs. May",
      },
    ],
  },
];

export function latestPriceFor(product: string, region: string): PriceRow | undefined {
  const matches = DUMMY_PRICE_SERIES.filter((row) => row.product === product && row.region === region);
  return matches.length ? matches[matches.length - 1] : undefined;
}
