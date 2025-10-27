// Rare earth element products data for the combobox

export const COMMON_PRODUCTS = [
  { value: "NdPr Oxide", label: "NdPr Oxide", synonyms: ["NdPr", "Neodymium-Praseodymium Oxide"] },
  { value: "NdPr Metal", label: "NdPr Metal", synonyms: ["NdPr Metal Alloy"] },
];

export const RARE_EARTH_ELEMENTS = [
  { symbol: "Sc", name: "Scandium" },
  { symbol: "Y", name: "Yttrium" },
  { symbol: "La", name: "Lanthanum" },
  { symbol: "Ce", name: "Cerium" },
  { symbol: "Pr", name: "Praseodymium" },
  { symbol: "Nd", name: "Neodymium" },
  { symbol: "Pm", name: "Promethium" },
  { symbol: "Sm", name: "Samarium" },
  { symbol: "Eu", name: "Europium" },
  { symbol: "Gd", name: "Gadolinium" },
  { symbol: "Tb", name: "Terbium" },
  { symbol: "Dy", name: "Dysprosium" },
  { symbol: "Ho", name: "Holmium" },
  { symbol: "Er", name: "Erbium" },
  { symbol: "Tm", name: "Thulium" },
  { symbol: "Yb", name: "Ytterbium" },
  { symbol: "Lu", name: "Lutetium" },
];

// Generate oxide and metal options for each element
export const OXIDE_PRODUCTS = RARE_EARTH_ELEMENTS.map(el => ({
  value: `${el.name} Oxide`,
  label: `${el.name} Oxide`,
  synonyms: [`${el.symbol} Oxide`, `${el.symbol}2O3`],
}));

export const METAL_PRODUCTS = RARE_EARTH_ELEMENTS.map(el => ({
  value: `${el.name} Metal`,
  label: `${el.name} Metal`,
  synonyms: [`${el.symbol} Metal`, `${el.symbol}`],
}));

export type ProductOption = {
  value: string;
  label: string;
  synonyms?: string[];
};

export const ALL_PRODUCTS = [
  ...COMMON_PRODUCTS,
  ...OXIDE_PRODUCTS,
  ...METAL_PRODUCTS,
];
