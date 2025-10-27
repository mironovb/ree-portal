"use client";
import { useState } from "react";
import QuoteForm from "./quote-form";
import QuoteResults from "./quote-results";

export default function QuoteHome(){
  const [data, setData] = useState<any|null>(null);
  return (
    <section>
      <h1 className="text-3xl md:text-4xl font-semibold">Tariff Navigator & Price Search</h1>
      <p className="mt-2 text-muted-foreground max-w-2xl">
        Enter product, quantity, purity, and destination. We’ll compute regional prices, apply tariffs,
        and estimate landed cost and routes. Save a full route to revisit or share.
      </p>
      <div className="mt-6">
        <QuoteForm onResult={setData} />
      </div>
      {data && <QuoteResults data={data} />}
    </section>
  );
}
