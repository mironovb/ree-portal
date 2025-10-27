import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const product = searchParams.get("product");
  if (!product) return NextResponse.json({ rows: [] });
  const { data, error } = await supabaseServer
    .from("domestic_prices")
    .select("ts,product,region,purity,price,source")
    .eq("product", product)
    .order("ts",{ ascending: true });
  if (error) return NextResponse.json({ rows: [], error: error.message }, { status: 500 });
  return NextResponse.json({ rows: data ?? [] });
}
