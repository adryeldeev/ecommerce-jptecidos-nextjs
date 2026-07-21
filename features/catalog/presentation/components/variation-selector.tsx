'use client';

import { ProductVariation } from '@/lib/types';
import { useState } from 'react';

interface VariationSelectorProps {
  variations: ProductVariation[];
  onVariationSelect: (variation: ProductVariation) => void;
}

export function VariationSelector({ variations, onVariationSelect }: VariationSelectorProps) {
  const [selectedVariation, setSelectedVariation] = useState<ProductVariation | null>(null);

  // Agrupar variações por cor
  const colors = Array.from(new Set(variations.map((v) => v.cor)));
  // Agrupar variações por largura
  const widths = Array.from(new Set(variations.map((v) => v.largura).filter((w): w is string => w !== undefined)));

  const handleColorSelect = (color: string) => {
    const variation = variations.find((v) => v.cor === color);
    if (variation) {
      setSelectedVariation(variation);
      onVariationSelect(variation);
    }
  };

  const handleWidthSelect = (width: string) => {
    const variation = variations.find((v) => v.largura === width);
    if (variation) {
      setSelectedVariation(variation);
      onVariationSelect(variation);
    }
  };

  return (
    <div className="space-y-6">
      {/* Seletor de cor */}
      {colors.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Cor</h3>
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => handleColorSelect(color)}
                className={`px-4 py-2 rounded-md border-2 transition-colors ${
                  selectedVariation?.cor === color
                    ? 'border-blue-600 bg-blue-50 text-blue-600'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Seletor de largura */}
      {widths.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Largura</h3>
          <div className="flex flex-wrap gap-2">
            {widths.map((width) => (
              <button
                key={width}
                onClick={() => handleWidthSelect(width)}
                className={`px-4 py-2 rounded-md border-2 transition-colors ${
                  selectedVariation?.largura === width
                    ? 'border-blue-600 bg-blue-50 text-blue-600'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                {width}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Estoque disponível */}
      {selectedVariation && (
        <div className="text-sm text-gray-600">
          Estoque disponível: {selectedVariation.estoque} unidades
        </div>
      )}
    </div>
  );
}
