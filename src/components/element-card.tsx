import Link from "next/link";

interface ElementCardProps {
  symbol: string;
  name: string;
  number: number;
  href: string;
}

export function ElementCard({ symbol, name, number, href }: ElementCardProps) {
  return (
    <Link
      href={href}
      className="group relative block rounded-2xl border bg-muted p-5 transition-all duration-200 hover:scale-[1.05] hover:bg-card hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      aria-label={`${name} (${symbol}), atomic number ${number}`}
      prefetch={true}
    >
      <div className="flex flex-col h-full">
        {/* Top section: Symbol */}
        <div className="flex-none mb-2">
          <div className="inline-block">
            <h5 className="text-3xl font-semibold text-foreground transition-colors">
              {symbol}
            </h5>
          </div>
        </div>

        {/* Middle section: Name */}
        <div className="flex-grow">
          <h4 className="text-lg font-medium text-muted-foreground transition-colors group-hover:text-foreground">
            {name}
          </h4>
        </div>

        {/* Bottom section: CTA and Atomic Number */}
        <div className="flex-none mt-4 relative">
          <div className="text-sm text-muted-foreground underline underline-offset-4 transition-all group-hover:text-foreground group-hover:no-underline">
            View product →
          </div>
          
          {/* Atomic number in corner */}
          <div className="absolute -bottom-5 -right-5 text-4xl font-bold text-muted-foreground/20 transition-colors group-hover:text-foreground/10">
            {number}
          </div>
        </div>
      </div>
    </Link>
  );
}
