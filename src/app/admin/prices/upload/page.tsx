"use client";

import { useState } from "react";

export default function UploadPricesPage() {
  const [busy, setBusy] = useState(false);
  const [ok, setOk] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  return (
    <section className="py-10">
      <h1 className="text-2xl font-semibold mb-4">Upload Prices (CSV)</h1>
      <form
        className="space-y-4"
        onSubmit={async (e) => {
          e.preventDefault();
          const input = (e.currentTarget.elements.namedItem("file") as HTMLInputElement);
          const file = input.files?.[0];
          if (!file) return;

          setBusy(true); setOk(null); setErr(null);
          const body = new FormData();
          body.append("file", file);

          const res = await fetch("/api/admin/prices/upload", {
            method: "POST",
            body,
          });

          const json = await res.json().catch(() => null);
          if (!res.ok) setErr(json?.error ?? "Upload failed");
          else setOk(`Upserted ${json?.upserted ?? 0} rows`);

          setBusy(false);
          input.value = "";
        }}
      >
        <input
          type="file"
          name="file"
          accept=".csv,text/csv"
          className="block w-full text-sm"
          required
        />
        <button
          type="submit"
          disabled={busy}
          className="rounded-md border border-border px-4 py-2 hover:bg-secondary"
        >
          {busy ? "Uploading…" : "Upload CSV"}
        </button>
        {ok && <div className="text-green-400 text-sm">{ok}</div>}
        {err && <div className="text-red-400 text-sm">{err}</div>}
      </form>

      <div className="mt-6 text-sm text-muted-foreground">
        Expected headers: <code>ts,product,region,price,basis_vs_china,source</code>
      </div>
    </section>
  );
}
