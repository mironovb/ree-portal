"use client";

import { useState } from "react";

import { DUMMY_DOMESTIC_PRICES, DUMMY_LANES, DUMMY_POLICIES, DUMMY_PRICE_SERIES } from "@/data/market-data";
import { computeQuote } from "@/domain/quote/engine";
import { normalizeProduct, normalizePurity } from "@/domain/quote/helpers";
import type { DomesticPriceRow, Policy, QuoteResult } from "@/domain/quote/types";

import REECombobox from "./ree-combobox";

export type QuotePayload = {
  itemName: string;
  purity?: string;
  quantityKg: number;
  destination: "US" | "EU";
};

export type QuoteComputation = QuoteResult & {
  policies: Policy[];
  domestic: DomesticPriceRow[];
};

export default function QuoteForm({ onResult }: { onResult: (data: { input: QuotePayload; result: QuoteComputation }) => void }) {
  const [itemName, setItemName] = useState("NdPr Oxide");
  const [purity, setPurity] = useState("99.5%");
  const [quantityKg, setQuantityKg] = useState<number | "">(1000);
  const [destination, setDestination] = useState<"US" | "EU">("US");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function submit() {
    const qty = typeof quantityKg === "number" ? quantityKg : Number(quantityKg);
    if (!qty || Number.isNaN(qty)) {
      setErr("Enter a shipment quantity in kilograms.");
      return;
    }

    setBusy(true);
    setErr(null);

    try {
      const product = normalizeProduct(itemName);
      const normalizedPurity = normalizePurity(purity ?? null) ?? undefined;
      const input: QuotePayload = {
        itemName,
        purity: normalizedPurity,
        quantityKg: qty,
        destination,
      };

      const relevantPolicies = DUMMY_POLICIES.filter(
        (p) =>
          p.destination === destination &&
          (!p.product || p.product === product)
      );

      const result = computeQuote({
        input: {
          itemName,
          product,
          purity: normalizedPurity ?? null,
          quantityKg: qty,
          destination,
        },
        prices: DUMMY_PRICE_SERIES,
        lanes: DUMMY_LANES,
        policies: DUMMY_POLICIES,
      });

      const domestic = DUMMY_DOMESTIC_PRICES.filter((row) => row.product === product);

      onResult({
        input,
        result: {
          ...result,
          policies: relevantPolicies,
          domestic,
        },
      });
    } catch (error) {
      console.error(error);
      setErr("Unable to compute the dummy route. Double-check your entry.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="rounded-lg border border-border p-4 space-y-3">
      <div className="grid gap-3 md:grid-cols-5">
        <REECombobox value={itemName} onChange={setItemName} placeholder="Select product..." />
        <input
          className="rounded-md border border-input bg-background px-3 py-2"
          placeholder="Purity (optional)"
          value={purity}
          onChange={(e) => setPurity(e.target.value)}
        />
        <input
          className="rounded-md border border-input bg-background px-3 py-2"
          placeholder="Quantity (kg)"
          inputMode="numeric"
          value={quantityKg}
          onChange={(e) => setQuantityKg(e.target.value === "" ? "" : Number(e.target.value))}
          required
        />
        <select
          className="rounded-md border border-input bg-background px-3 py-2"
          value={destination}
          onChange={(e) => setDestination(e.target.value as "US" | "EU")}
        >
          <option value="US">Destination: US</option>
          <option value="EU">Destination: EU</option>
        </select>
        <button
          onClick={submit}
          disabled={busy}
          className="rounded-md border border-border px-4 py-2 hover:bg-secondary w-full"
        >
          {busy ? "Calculating…" : "Estimate"}
        </button>
      </div>
      {err && <div className="text-sm text-red-400">{err}</div>}
      {!err && !busy && (
        <div className="text-xs text-muted-foreground">
          Dummy data shown for illustration. Swap in live feeds by replacing the market data import.
        </div>
      )}
    </div>
  );
}
