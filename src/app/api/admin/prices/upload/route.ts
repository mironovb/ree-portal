import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";
import { parse } from "csv-parse/sync";

export const dynamic = "force-dynamic";

type PriceRow = {
  ts: string;
  product: string;
  region: string;
  price: number;
  basis_vs_china: number | null;
  source: string;
};

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get("file");
    if (!(file instanceof Blob)) {
      return NextResponse.json({ error: "Missing file" }, { status: 400 });
    }

    const text = await file.text();
    const recs: Record<string, unknown>[] = parse(text, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    });

    // validate + map
    const rows: PriceRow[] = [];
    for (const r of recs) {
      const ts = String(r.ts ?? "").trim();
      const product = String(r.product ?? "").trim();
      const region = String(r.region ?? "").trim();
      const price = Number(r.price);
      const basis = r.basis_vs_china === "" || r.basis_vs_china == null ? null : Number(r.basis_vs_china);
      const source = (r.source ?? "upload").toString();

      if (!ts || !product || !region || !Number.isFinite(price)) continue;

      rows.push({ ts, product, region, price, basis_vs_china: basis, source });
    }

    if (rows.length === 0) {
      return NextResponse.json({ error: "No valid rows" }, { status: 400 });
    }

    // Upsert requires a unique index on (ts, product, region)
    const { error, status } = await supabaseServer
      .from("prices")
      .upsert(rows, { onConflict: "ts,product,region" }); // requires unique index

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, upserted: rows.length, status });
  } catch (e: unknown) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Upload error" }, { status: 500 });
  }
}
