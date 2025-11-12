import { createClient, SupabaseClient } from "@supabase/supabase-js";

let _supabaseClient: SupabaseClient | null = null;

function getSupabaseClient(): SupabaseClient {
  if (!_supabaseClient) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    // During build time without env vars, return a stub client
    if (!url || !anon) {
      return {} as SupabaseClient;
    }
    
    // This client is safe in the browser when RLS is configured correctly.
    _supabaseClient = createClient(url, anon);
  }
  return _supabaseClient;
}

export const supabaseClient = new Proxy({} as SupabaseClient, {
  get: (_, prop) => {
    const client = getSupabaseClient();
    return client[prop as keyof SupabaseClient];
  }
});
