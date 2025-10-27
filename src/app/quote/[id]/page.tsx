export const dynamic = "force-dynamic";

async function fetchQuote(id: string) {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const res = await fetch(`${base}/api/quote/${id}`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

export default async function QuoteDetailPage({ params }: { params: { id: string }}) {
  const data = await fetchQuote(params.id);
  if (!data) return <div className="py-10">Quote not found.</div>;
  const r = data.result;
  return (
    <section className="py-10">
      <h1 className="text-2xl font-semibold">Saved quote</h1>
      <div className="mt-2 text-sm text-muted-foreground">
        Created: {new Date(data.created_at).toLocaleString()}
      </div>
      <pre className="mt-4 text-xs overflow-auto rounded-md border border-border p-4">
        {JSON.stringify(r, null, 2)}
      </pre>
    </section>
  );
}

