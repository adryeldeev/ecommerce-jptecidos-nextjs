'use client';

import { Product, ProductVariation } from '@/lib/types';
import { useState } from 'react';

interface ProductVariantSelectorProps {
  product: Product;
  onVariationSelect: (variation: ProductVariation) => void;
  selectedVariation: ProductVariation | null;
}

export function ProductVariantSelector({
  product,
  onVariationSelect,
  selectedVariation,
}: ProductVariantSelectorProps) {
  const colors = Array.from(new Set(product.variacoes.map((v) => v.cor)));

  const handleColorSelect = (color: string) => {
    const variation = product.variacoes.find((v) => v.cor === color);
    if (variation) {
      onVariationSelect(variation);
    }
  };

  return (
    <div>
      <h3 className="text-sm font-medium text-gray-700 mb-3">Cor</h3>
      <div className="flex flex-wrap gap-2">
        {colors.map((color) => {
          const variation = product.variacoes.find((v) => v.cor === color);
          const isOutOfStock = (variation?.estoque ?? '0') === '0';
          
          return (
            <button
              key={color}
              onClick={() => !isOutOfStock && handleColorSelect(color)}
              disabled={isOutOfStock}
              className={`px-4 py-2 rounded-md border-2 transition-colors ${
                selectedVariation?.cor === color
                  ? 'border-[#DD8A05] bg-[#FFF8ED] text-[#DD8A05]'
                  : 'border-gray-300 hover:border-gray-400'
              } ${isOutOfStock ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              title={isOutOfStock ? 'Fora de estoque' : color}
            >
              <div className="flex items-center gap-2">
                {variation?.corCodigo && (
                  <div
                    className="w-4 h-4 rounded-full border border-gray-300"
                    style={{ backgroundColor: variation.corCodigo }}
                  />
                )}
                <span>{color}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
