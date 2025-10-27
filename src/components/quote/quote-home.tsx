"use client";
import { useState } from "react";
import QuoteForm, { type QuotePayload } from "./quote-form";
import QuoteResults from "./quote-results";

export default function QuoteHome(){
  const [data, setData] = useState<any|null>(null);
  const [lastInput, setLastInput] = useState<QuotePayload | null>(null);
  
  function handleResult({ input, result }: { input: QuotePayload; result: any }) {
    setLastInput(input);
    setData(result);
  }
  
  return (
    <section>
      <h1 className="text-3xl md:text-4xl font-semibold">Tariff Navigator & Price Search</h1>
      <p className="mt-2 text-muted-foreground max-w-2xl">
        Enter product, quantity, purity, and destination. We'll compute regional prices, apply tariffs,
        and estimate landed cost and routes. Save a full route to revisit or share.
      </p>
      <div className="mt-6">
        <QuoteForm onResult={handleResult} />
      </div>
      {data && <QuoteResults data={data} input={lastInput} />}
    </section>
  );
}
