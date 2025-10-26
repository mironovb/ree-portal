import { supabaseServer } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

export default async function AdminWaitlistPage() {
  const { data, error } = await supabaseServer
    .from("waitlist")
    .select("email, company, notes, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return <pre className="p-6 text-red-400">Error: {error.message}</pre>;
  }

  return (
    <section className="py-10">
      <h1 className="text-2xl font-semibold mb-4">Waitlist (latest first)</h1>
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead className="bg-secondary">
            <tr>
              <th className="text-left p-3">Created</th>
              <th className="text-left p-3">Email</th>
              <th className="text-left p-3">Company</th>
              <th className="text-left p-3">Notes</th>
            </tr>
          </thead>
          <tbody>
            {(data ?? []).map((r, i) => (
              <tr key={i} className="border-t border-border">
                <td className="p-3">{new Date(r.created_at).toLocaleString()}</td>
                <td className="p-3">{r.email}</td>
                <td className="p-3">{r.company ?? ""}</td>
                <td className="p-3">{r.notes ?? ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
