import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

export async function GET() {
  const { data, error } = await supabaseServer
    .from("prices")
    .select("ts, product, region, price, basis_vs_china")
    .order("ts", { ascending: true });

  if (error) {
    return NextResponse.json({ rows: [], error: error.message }, { status: 500 });
  }
  return NextResponse.json({ rows: data ?? [] });
}
