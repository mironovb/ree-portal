"use client";

import { useState, useMemo } from "react";
import { COMMON_PRODUCTS, OXIDE_PRODUCTS, METAL_PRODUCTS, type ProductOption } from "@/data/ree-products";

type Props = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
};

export default function REECombobox({ value, onChange, placeholder = "Select product..." }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // Filter products based on search
  const filteredProducts = useMemo(() => {
    if (!searchTerm) return null;
    
    const term = searchTerm.toLowerCase();
    const allProducts = [...COMMON_PRODUCTS, ...OXIDE_PRODUCTS, ...METAL_PRODUCTS];
    
    return allProducts.filter(p => 
      p.label.toLowerCase().includes(term) ||
      p.value.toLowerCase().includes(term) ||
      p.synonyms?.some(s => s.toLowerCase().includes(term))
    );
  }, [searchTerm]);

  const handleSelect = (product: ProductOption) => {
    onChange(product.value);
    setSearchTerm("");
    setIsOpen(false);
  };

  const selectedProduct = useMemo(() => {
    const allProducts = [...COMMON_PRODUCTS, ...OXIDE_PRODUCTS, ...METAL_PRODUCTS];
    return allProducts.find(p => p.value === value);
  }, [value]);

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          className="rounded-md border border-input bg-background px-3 py-2 w-full"
          placeholder={selectedProduct?.label || placeholder}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        />
        {selectedProduct && !searchTerm && (
          <div className="absolute inset-0 px-3 py-2 pointer-events-none text-foreground">
            {selectedProduct.label}
          </div>
        )}
      </div>

      {isOpen && (searchTerm || !selectedProduct) && (
        <div className="absolute z-50 w-full mt-1 rounded-md border border-border bg-background shadow-lg max-h-80 overflow-auto">
          {!searchTerm && (
            <>
              <div className="px-3 py-2 text-sm font-semibold text-muted-foreground bg-secondary">Common</div>
              {COMMON_PRODUCTS.map((p) => (
                <button
                  key={p.value}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-secondary cursor-pointer"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleSelect(p);
                  }}
                >
                  {p.label}
                </button>
              ))}

              <div className="px-3 py-2 text-sm font-semibold text-muted-foreground bg-secondary border-t border-border">Oxides</div>
              {OXIDE_PRODUCTS.map((p) => (
                <button
                  key={p.value}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-secondary cursor-pointer"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleSelect(p);
                  }}
                >
                  {p.label}
                </button>
              ))}

              <div className="px-3 py-2 text-sm font-semibold text-muted-foreground bg-secondary border-t border-border">Metals</div>
              {METAL_PRODUCTS.map((p) => (
                <button
                  key={p.value}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-secondary cursor-pointer"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleSelect(p);
                  }}
                >
                  {p.label}
                </button>
              ))}
            </>
          )}

          {searchTerm && filteredProducts && filteredProducts.length > 0 && (
            <>
              {filteredProducts.map((p) => (
                <button
                  key={p.value}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-secondary cursor-pointer"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleSelect(p);
                  }}
                >
                  {p.label}
                </button>
              ))}
            </>
          )}

          {searchTerm && filteredProducts && filteredProducts.length === 0 && (
            <div className="px-3 py-2 text-sm text-muted-foreground">No products found</div>
          )}
        </div>
      )}
    </div>
  );
}
