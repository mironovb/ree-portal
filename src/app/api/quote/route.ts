import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";
import { computeQuote } from "@/domain/quote/engine";
import { normalizeProduct, normalizePurity } from "@/domain/quote/helpers";
import type { Destination, PriceRow, Lane, Policy } from "@/domain/quote/types";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const itemName: string = body?.itemName;
    const quantityKg: number = Number(body?.quantityKg);
    const purity = normalizePurity(body?.purity);
    const destination: Destination = body?.destination;

    if (!itemName || !quantityKg || !destination) {
      return NextResponse.json({ error: "itemName, quantityKg, destination are required" }, { status: 400 });
    }

    const product = normalizeProduct(itemName);

    // fetch data
    const [{ data: prices, error: e1 }, { data: lanes, error: e2 }, { data: policies, error: e3 }] = await Promise.all([
      supabaseServer.from("prices").select("ts,product,region,price,basis_vs_china").eq("product", product).order("ts", { ascending: true }),
      supabaseServer.from("lanes").select("origin,destination,mode,usd_per_kg,typical_days,notes").eq("destination", destination),
      supabaseServer.from("policies").select("type,origin,destination,product,rate_percent,description,effective_from,expires_at").eq("destination", destination).in("type", ["tariff","export_control"])
    ]);

    if (e1) return NextResponse.json({ error: e1.message }, { status: 500 });
    if (e2) return NextResponse.json({ error: e2.message }, { status: 500 });
    // policies may not exist yet; tolerate cache errors
    const policiesSafe = e3 ? [] : (policies ?? []);

    const result = computeQuote({
      input: { itemName, product, purity, quantityKg, destination },
      prices: (prices ?? []) as PriceRow[],
      lanes: (lanes ?? []) as Lane[],
      policies: policiesSafe as Policy[],
    });

    // commit/save if requested
    const commit = String(body?.commit ?? "").toLowerCase() === "true";
    if (commit) {
      const { data: saved, error } = await supabaseServer.from("quotes").insert({
        input: { itemName, product, purity, quantityKg, destination },
        result
      }).select("id").single();

      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json({ quoteId: saved.id, ...result });
    }

    return NextResponse.json(result);
  } catch (e: unknown) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Quote error" }, { status: 500 });
  }
}
