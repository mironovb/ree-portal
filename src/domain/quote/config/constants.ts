export const INSURANCE_PCT = 0.003;   // 0.3% of cargo value
export const BROKERAGE_FLAT = 250;    // USD flat
export const SERIES_POINTS = 12;      // last N points for stats

// These strings control CIF detection heuristics. Easy to edit via AI.
export const CIF_HINTS = [
  { dest: "EU", includes: ["eu", "cif"] },
  { dest: "US", includes: ["us", "cif"] },
] as const;
