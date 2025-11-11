import Link from "next/link";

interface ElementCardProps {
  symbol: string;
  name: string;
  number: number;
  href: string;
  headline?: string;
  priceSummary?: string;
}

export function ElementCard({ symbol, name, number, href, headline, priceSummary }: ElementCardProps) {
  return (
    <Link
      href={href}
      className="group relative block rounded-2xl border bg-muted p-5 transition-all duration-200 hover:scale-[1.05] hover:bg-card hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      aria-label={`${name} (${symbol}), atomic number ${number}`}
      prefetch={true}
    >
      <div className="flex flex-col h-full gap-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-sm text-muted-foreground">{number}</div>
            <h5 className="text-3xl font-semibold text-foreground transition-colors">{symbol}</h5>
          </div>
          <span className="rounded-full border border-border px-3 py-1 text-xs uppercase tracking-wide text-muted-foreground group-hover:text-foreground">
            {name}
          </span>
        </div>

        {headline && (
          <p className="text-base font-medium leading-snug text-foreground">{headline}</p>
        )}

        {priceSummary && (
          <p className="text-sm text-muted-foreground">{priceSummary}</p>
        )}

        <div className="mt-auto text-sm font-medium text-primary group-hover:underline">View snapshot →</div>
      </div>
    </Link>
  );
}
