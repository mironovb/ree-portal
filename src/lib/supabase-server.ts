import { createClient, SupabaseClient } from "@supabase/supabase-js";

let _supabaseServer: SupabaseClient | null = null;

function getSupabaseServer(): SupabaseClient {
  if (!_supabaseServer) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const service = process.env.SUPABASE_SERVICE_ROLE;
    
    // During build time without env vars, return a stub client
    if (!url || !service) {
      return {} as SupabaseClient;
    }
    
    _supabaseServer = createClient(url, service, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return _supabaseServer;
}

export const supabaseServer = new Proxy({} as SupabaseClient, {
  get: (_, prop) => {
    const client = getSupabaseServer();
    return client[prop as keyof SupabaseClient];
  }
});
