import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// This client is safe in the browser when RLS is configured correctly.
export const supabaseClient = createClient(url, anon);
