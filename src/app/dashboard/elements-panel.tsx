"use client";

import { ElementGrid } from "@/components/element-grid";

// Rare earth elements data
const ELEMENTS = [
  { symbol: "Ce", name: "Cerium", number: 58, href: "/elements/cerium" },
  { symbol: "Dy", name: "Dysprosium", number: 66, href: "/elements/dysprosium" },
  { symbol: "Er", name: "Erbium", number: 68, href: "/elements/erbium" },
  { symbol: "Eu", name: "Europium", number: 63, href: "/elements/europium" },
  { symbol: "Gd", name: "Gadolinium", number: 64, href: "/elements/gadolinium" },
  { symbol: "Ho", name: "Holmium", number: 67, href: "/elements/holmium" },
  { symbol: "La", name: "Lanthanum", number: 57, href: "/elements/lanthanum" },
  { symbol: "Lu", name: "Lutetium", number: 71, href: "/elements/lutetium" },
  { symbol: "Nd", name: "Neodymium", number: 60, href: "/elements/neodymium" },
  { symbol: "Pr", name: "Praseodymium", number: 59, href: "/elements/praseodymium" },
  { symbol: "Sm", name: "Samarium", number: 62, href: "/elements/samarium" },
  { symbol: "Sc", name: "Scandium", number: 21, href: "/elements/scandium" },
  { symbol: "Tb", name: "Terbium", number: 65, href: "/elements/terbium" },
  { symbol: "Yb", name: "Ytterbium", number: 70, href: "/elements/ytterbium" },
  { symbol: "Y", name: "Yttrium", number: 39, href: "/elements/yttrium" },
];

export default function ElementsPanel() {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold">Rare Earths</h2>
      <ElementGrid items={ELEMENTS} />
    </section>
  );
}
