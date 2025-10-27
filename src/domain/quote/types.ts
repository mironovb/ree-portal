export type Destination = "US" | "EU";

export type PriceRow = {
  ts: string; product: string; region: string; price: number; basis_vs_china?: number|null;
};

export type DomesticPriceRow = {
  ts: string; product: string; region: string; purity?: string|null; price: number;
};

export type Lane = {
  origin: string; destination: Destination; mode: "ocean"|"air"|"rail"|"truck"; usd_per_kg: number; typical_days: number; notes?: string|null;
};

export type Policy = {
  type: "tariff" | "export_control";
  origin: string; destination: Destination;
  product?: string|null;
  rate_percent?: number|null;
  description?: string|null;
  effective_from?: string|null; expires_at?: string|null;
};

export type QuoteInput = {
  itemName: string;
  product: string;
  purity?: string|null;
  quantityKg: number;
  destination: Destination;
};

export type RouteBreakdown = {
  cargo_value: number;
  freight: number;
  insurance: number;
  brokerage: number;
  tariff_pct: number;
  tariff_value: number;
};

export type RouteOption = {
  origin: string;
  destination: Destination;
  product: string;
  purity: string|null;
  basis_label: string;
  unit_price_usd_per_kg: number;
  quantity_kg: number;
  breakdown: RouteBreakdown;
  landed_total_usd: number;
};

export type QuoteStats = {
  sample_points: number;
  min: number|null;
  median: number|null;
  max: number|null;
};

export type QuoteResult = {
  product: string;
  purity: string|null;
  destination: Destination;
  routes: RouteOption[];
  best: RouteOption | null;
  stats: QuoteStats | null;
  series: { ts: string; price: number }[];
  warnings?: string[];
};
