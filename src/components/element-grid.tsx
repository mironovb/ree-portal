import { ElementCard } from "./element-card";

interface ElementItem {
  symbol: string;
  name: string;
  number: number;
  href: string;
  headline?: string;
  priceSummary?: string;
}

interface ElementGridProps {
  items: ElementItem[];
}

export function ElementGrid({ items }: ElementGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {items.map((item) => (
        <ElementCard
          key={item.symbol}
          symbol={item.symbol}
          name={item.name}
          number={item.number}
          href={item.href}
          headline={item.headline}
          priceSummary={item.priceSummary}
        />
      ))}
    </div>
  );
}
