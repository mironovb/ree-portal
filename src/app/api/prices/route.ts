import { NextResponse } from "next/server";

const rows = [
  { ts: "2025-07-01", product: "NdPr Oxide", region: "China FOB", price: 57.2 },
  { ts: "2025-08-01", product: "NdPr Oxide", region: "China FOB", price: 58.8 },
  { ts: "2025-09-01", product: "NdPr Oxide", region: "China FOB", price: 56.3 },
  { ts: "2025-10-01", product: "NdPr Oxide", region: "China FOB", price: 59.1 },
  {
    ts: "2025-10-01",
    product: "NdPr Oxide",
    region: "EU CIF",
    price: 62.4,
    basis_vs_china: 3.3,
  },
];

export async function GET() {
  return NextResponse.json({ rows });
}
