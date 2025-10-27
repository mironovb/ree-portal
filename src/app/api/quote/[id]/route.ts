import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

export async function GET(_: Request, ctx: { params: { id: string } }) {
  const id = ctx.params.id;
  const { data, error } = await supabaseServer
    .from("quotes")
    .select("input,result,created_at")
    .eq("id", id)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
  return NextResponse.json({ id, ...data });
}

