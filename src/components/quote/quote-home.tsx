"use client";
import { useState } from "react";

import QuoteForm, { type QuoteComputation, type QuotePayload } from "./quote-form";
import QuoteResults from "./quote-results";

export default function QuoteHome() {
  const [data, setData] = useState<QuoteComputation | null>(null);
  const [lastInput, setLastInput] = useState<QuotePayload | null>(null);

  function handleResult({ input, result }: { input: QuotePayload; result: QuoteComputation }) {
    setLastInput(input);
    setData(result);
  }

  return (
    <section>
      <h1 className="text-3xl md:text-4xl font-semibold">Tariff navigator & price sandbox</h1>
      <p className="mt-2 text-muted-foreground max-w-2xl">
        This simplified tool runs entirely on illustrative dummy data so you can see how landed cost logic will work once
        production feeds are connected. Pick a product, set a shipment size, and compare origin options with tariffs applied.
      </p>
      <div className="mt-6">
        <QuoteForm onResult={handleResult} />
      </div>
      {data && <QuoteResults data={data} input={lastInput} />}
    </section>
  );
}
