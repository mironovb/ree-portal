import type { RegionPriceBoard } from "./market-data";
import { REGION_PRICE_BOARDS, latestPriceFor } from "./market-data";

export type RareEarthElementDetail = {
  symbol: string;
  name: string;
  number: number;
  slug: string;
  headline: string;
  summary: string;
  keyUses: string[];
  supplyNotes: string;
  priceHighlights: {
    product: string;
    basis: string;
    regionLabel: string;
    latestPrice?: number;
  }[];
};

export const RARE_EARTH_ELEMENTS: RareEarthElementDetail[] = [
  {
    symbol: "La",
    name: "Lanthanum",
    number: 57,
    slug: "lanthanum",
    headline: "Battery precursor workhorse",
    summary:
      "Lanthanum is the backbone of nickel-metal hydride battery cathodes and cracking catalysts. Stable supply keeps the auto industry moving while EV chemistry evolves.",
    keyUses: ["NiMH battery cathodes", "Petroleum refining catalysts", "Optical glass polishing"],
    supplyNotes: "Chinese refineries dominate oxide production, while new Australian projects target polishing powders.",
    priceHighlights: [
      {
        product: "Lanthanum Oxide",
        basis: "China FOB",
        regionLabel: "China FOB",
        latestPrice: 2.4,
      },
      {
        product: "Lanthanum Oxide",
        basis: "US Gulf CFR",
        regionLabel: "United States",
        latestPrice: 3.8,
      },
    ],
  },
  {
    symbol: "Ce",
    name: "Cerium",
    number: 58,
    slug: "cerium",
    headline: "Glass and catalyst staple",
    summary:
      "Cerium is the most abundant rare earth and underpins glass polishing and auto catalyst markets. Prices track bulk supply-demand balances.",
    keyUses: ["Automotive catalysts", "Glass polishing", "UV filtering additives"],
    supplyNotes: "Oxide exports from Inner Mongolia set global tone; Indian refiners increasingly secure spot cargoes for polishing firms.",
    priceHighlights: [
      {
        product: "Cerium Oxide",
        basis: "China FOB",
        regionLabel: "China FOB",
        latestPrice: 1.8,
      },
      {
        product: "Cerium Oxide",
        basis: "Europe CIF",
        regionLabel: "European Union",
        latestPrice: 2.6,
      },
    ],
  },
  {
    symbol: "Pr",
    name: "Praseodymium",
    number: 59,
    slug: "praseodymium",
    headline: "Magnet alloy driver",
    summary:
      "Praseodymium blends with neodymium to maximize magnet temperature stability, keeping EV drive units efficient.",
    keyUses: ["NdPr magnet alloy", "High-strength aluminum alloys", "Ceramics"],
    supplyNotes: "Northern China separation plants continue to dictate NdPr availability; Australian oxide offers diversification.",
    priceHighlights: [
      {
        product: "NdPr Oxide",
        basis: "China FOB",
        regionLabel: "China FOB",
        latestPrice: latestPriceFor("NdPr Oxide", "China FOB")?.price,
      },
      {
        product: "NdPr Oxide",
        basis: "Europe CIF",
        regionLabel: "European Union",
        latestPrice: latestPriceFor("NdPr Oxide", "Europe CIF")?.price,
      },
    ],
  },
  {
    symbol: "Nd",
    name: "Neodymium",
    number: 60,
    slug: "neodymium",
    headline: "Permanent magnet backbone",
    summary:
      "Neodymium is the cornerstone of high-performance permanent magnets used in EVs, wind turbines, and robotics.",
    keyUses: ["EV traction motors", "Wind turbine generators", "Consumer electronics"],
    supplyNotes: "Spot prices react quickly to Chinese production quotas. Western OEMs are sourcing oxide from Vietnam and Australia to diversify.",
    priceHighlights: [
      {
        product: "NdPr Metal",
        basis: "US Midwest DDP",
        regionLabel: "United States",
        latestPrice: latestPriceFor("NdPr Metal", "US Midwest DDP")?.price,
      },
      {
        product: "NdPr Metal",
        basis: "Japan CIF",
        regionLabel: "Asia ex-China",
        latestPrice: latestPriceFor("NdPr Metal", "Japan CIF")?.price,
      },
    ],
  },
  {
    symbol: "Sm",
    name: "Samarium",
    number: 62,
    slug: "samarium",
    headline: "Cobalt magnet stabilizer",
    summary:
      "Samarium contributes to SmCo magnets that operate in extreme temperatures for aerospace and defense.",
    keyUses: ["SmCo magnets", "Cancer therapy (Sm-153)", "Infrared optics"],
    supplyNotes: "Recycling from end-of-life missiles supplements limited mining output.",
    priceHighlights: [
      {
        product: "Samarium Oxide",
        basis: "China FOB",
        regionLabel: "China FOB",
        latestPrice: 7.4,
      },
    ],
  },
  {
    symbol: "Eu",
    name: "Europium",
    number: 63,
    slug: "europium",
    headline: "Phosphor specialty",
    summary:
      "Europium lights the world through red phosphors in displays and specialty lighting.",
    keyUses: ["LED/fluorescent phosphors", "Security inks", "Neutron capture"],
    supplyNotes: "Niche demand keeps the market illiquid; pricing is often negotiated quarterly.",
    priceHighlights: [
      {
        product: "Europium Oxide",
        basis: "China FOB",
        regionLabel: "China FOB",
        latestPrice: 29.5,
      },
    ],
  },
  {
    symbol: "Gd",
    name: "Gadolinium",
    number: 64,
    slug: "gadolinium",
    headline: "Medical imaging helper",
    summary:
      "Gadolinium compounds improve MRI contrast and feed specialty alloys for nuclear cooling systems.",
    keyUses: ["MRI contrast agents", "Neutron shielding", "High-temperature alloys"],
    supplyNotes: "Healthcare demand keeps the oxide market steady even when magnet metals soften.",
    priceHighlights: [
      {
        product: "Gadolinium Oxide",
        basis: "China FOB",
        regionLabel: "China FOB",
        latestPrice: 31.1,
      },
    ],
  },
  {
    symbol: "Tb",
    name: "Terbium",
    number: 65,
    slug: "terbium",
    headline: "High-coercivity enhancer",
    summary:
      "Terbium boosts magnet coercivity for wind turbines and EVs, and anchors green phosphor supply.",
    keyUses: ["High-temp NdFeB magnets", "Green phosphors", "Fuel cell membranes"],
    supplyNotes: "Tight Chinese export policies keep terbium among the highest-value rare earths.",
    priceHighlights: [
      {
        product: "Terbium Metal",
        basis: "US Midwest DDP",
        regionLabel: "United States",
        latestPrice: latestPriceFor("Terbium Metal", "US Midwest DDP")?.price,
      },
      {
        product: "Terbium Metal",
        basis: "Europe CIF",
        regionLabel: "European Union",
        latestPrice: latestPriceFor("Terbium Metal", "Europe CIF")?.price,
      },
    ],
  },
  {
    symbol: "Dy",
    name: "Dysprosium",
    number: 66,
    slug: "dysprosium",
    headline: "Temperature-resistant magnet metal",
    summary:
      "Dysprosium lets magnets maintain strength at elevated temperatures, critical for aerospace and EV motors.",
    keyUses: ["High-temperature NdFeB magnets", "Control rods", "High-performance alloys"],
    supplyNotes: "Export licenses from China create periodic squeezes; buyers diversify via Myanmar concentrates.",
    priceHighlights: [
      {
        product: "Dysprosium Oxide",
        basis: "China FOB",
        regionLabel: "China FOB",
        latestPrice: latestPriceFor("Dysprosium Oxide", "China FOB")?.price,
      },
      {
        product: "Dysprosium Oxide",
        basis: "US Gulf CFR",
        regionLabel: "United States",
        latestPrice: latestPriceFor("Dysprosium Oxide", "US Gulf CFR")?.price,
      },
    ],
  },
  {
    symbol: "Ho",
    name: "Holmium",
    number: 67,
    slug: "holmium",
    headline: "Specialty laser ingredient",
    summary:
      "Holmium powers dental and medical lasers and is a key dopant for optical fibers.",
    keyUses: ["Medical lasers", "Solid-state lasers", "Optical amplifiers"],
    supplyNotes: "Low-volume applications keep pricing bespoke; oxide trades on long-term contracts.",
    priceHighlights: [
      {
        product: "Holmium Oxide",
        basis: "China FOB",
        regionLabel: "China FOB",
        latestPrice: 64.0,
      },
    ],
  },
  {
    symbol: "Er",
    name: "Erbium",
    number: 68,
    slug: "erbium",
    headline: "Telecom amplifier dopant",
    summary:
      "Erbium keeps fiber networks amplified and colors specialized glass pink.",
    keyUses: ["Fiber amplifier dopant", "Specialty glass", "Nuclear control rods"],
    supplyNotes: "Optical demand remains strong despite cyclical electronics markets.",
    priceHighlights: [
      {
        product: "Erbium Oxide",
        basis: "China FOB",
        regionLabel: "China FOB",
        latestPrice: 44.3,
      },
    ],
  },
  {
    symbol: "Tm",
    name: "Thulium",
    number: 69,
    slug: "thulium",
    headline: "Portable X-ray enabler",
    summary:
      "Thulium powers compact X-ray devices and specialty lasers for medical applications.",
    keyUses: ["Portable X-ray sources", "Fiber lasers", "Research isotopes"],
    supplyNotes: "Production is tiny; pricing references negotiated tonnages with Chinese refiners.",
    priceHighlights: [
      {
        product: "Thulium Oxide",
        basis: "China FOB",
        regionLabel: "China FOB",
        latestPrice: 142.0,
      },
    ],
  },
  {
    symbol: "Yb",
    name: "Ytterbium",
    number: 70,
    slug: "ytterbium",
    headline: "Precision instrumentation dopant",
    summary:
      "Ytterbium-doped fibers enable high-power industrial lasers used in cutting and welding.",
    keyUses: ["Fiber lasers", "Atomic clocks", "Stainless steel strengthening"],
    supplyNotes: "Pricing is thinly reported; laser OEM contracts anchor reference points.",
    priceHighlights: [
      {
        product: "Ytterbium Oxide",
        basis: "China FOB",
        regionLabel: "China FOB",
        latestPrice: 36.0,
      },
    ],
  },
  {
    symbol: "Lu",
    name: "Lutetium",
    number: 71,
    slug: "lutetium",
    headline: "Scintillator specialist",
    summary:
      "Lutetium forms scintillation crystals for medical scanners and security equipment.",
    keyUses: ["PET scintillators", "Specialty glass", "Catalysts"],
    supplyNotes: "Extremely limited supply keeps prices the highest among rare earths.",
    priceHighlights: [
      {
        product: "Lutetium Oxide",
        basis: "China FOB",
        regionLabel: "China FOB",
        latestPrice: 1020.0,
      },
    ],
  },
  {
    symbol: "Sc",
    name: "Scandium",
    number: 21,
    slug: "scandium",
    headline: "Lightweight alloy booster",
    summary:
      "Scandium transforms aluminum alloys for aerospace and solid oxide fuel cells.",
    keyUses: ["Al-Sc aerospace alloys", "Solid oxide fuel cells", "3D printing powders"],
    supplyNotes: "Projects in Australia and Quebec plan to broaden supply beyond Russian by-product output.",
    priceHighlights: [
      {
        product: "Scandium Oxide",
        basis: "China FOB",
        regionLabel: "China FOB",
        latestPrice: 1450.0,
      },
    ],
  },
  {
    symbol: "Y",
    name: "Yttrium",
    number: 39,
    slug: "yttrium",
    headline: "Ceramic and phosphor staple",
    summary:
      "Yttrium supports laser crystals, phosphors, and advanced ceramics for industrial and medical gear.",
    keyUses: ["YAG lasers", "Phosphors", "Advanced ceramics"],
    supplyNotes: "Oxide supply is tied to ion-adsorption clays in Southern China; recycling offsets demand.",
    priceHighlights: [
      {
        product: "Yttrium Oxide",
        basis: "China FOB",
        regionLabel: "China FOB",
        latestPrice: 7.9,
      },
    ],
  },
];

export function getElementBySlug(slug: string): RareEarthElementDetail | undefined {
  return RARE_EARTH_ELEMENTS.find((el) => el.slug === slug);
}

export function getRegionForBasis(basis: string): RegionPriceBoard | undefined {
  return REGION_PRICE_BOARDS.find((board) => board.entries.some((entry) => entry.basis === basis));
}
