import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const service = process.env.SUPABASE_SERVICE_ROLE!; // server-only secret

export const supabaseServer = createClient(url, service, {
  auth: { persistSession: false, autoRefreshToken: false },
});
