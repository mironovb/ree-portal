import { CIF_HINTS } from "./config/constants";
import type { Destination, PriceRow } from "./types";

export function normalizeProduct(name: string): string {
  const n = name.trim().toLowerCase();
  const aliases: Record<string, string> = {
    "ndpr": "NdPr Oxide",
    "ndpr oxide": "NdPr Oxide",
    "neodymium praseodymium oxide": "NdPr Oxide",
    "nd2o3": "NdPr Oxide",
    "ndpr metal": "NdPr Metal",
  };
  if (aliases[n]) return aliases[n];
  return name.split(" ").map(s => s ? s[0].toUpperCase() + s.slice(1).toLowerCase() : s).join(" ");
}

export function normalizePurity(p: string | null | undefined): string | null {
  if (!p) return null;
  const s = p.toString().trim();
  return s || null;
}

export function latestByRegion(rows: PriceRow[]) {
  const map = new Map<string, PriceRow>();
  for (const r of rows) {
    const prev = map.get(r.region);
    if (!prev || r.ts > prev.ts) map.set(r.region, r);
  }
  return map;
}

export function isCIFIncluded(dest: Destination, basisLabel: string) {
  const l = basisLabel.toLowerCase();
  return CIF_HINTS.some(h => h.dest === dest && h.includes.every(s => l.includes(s)));
}

export function median(values: number[]): number|null {
  if (!values.length) return null;
  const v = [...values].sort((a,b)=>a-b);
  return v.length % 2 ? v[(v.length-1)/2] : (v[v.length/2-1] + v[v.length/2]) / 2;
}
