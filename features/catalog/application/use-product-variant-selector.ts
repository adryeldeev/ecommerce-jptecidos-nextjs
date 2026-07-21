'use client';

import { useState } from 'react';
import { Product, ProductVariation } from '@/lib/types';

export function useProductVariantSelector(product: Product) {
  const [selectedVariation, setSelectedVariation] = useState<ProductVariation | null>(
    product.variacoes.length > 0 ? product.variacoes[0] : null
  );
  const [quantity, setQuantity] = useState(
    product.unidadeMedida === 'KG' ? 5 : 1
  );

  const currentImages = selectedVariation?.imagens && selectedVariation.imagens.length > 0
    ? selectedVariation.imagens
    : product.imagens;

  const currentPrice = selectedVariation?.preco ?? product.precoBase;

  const priceRange = (() => {
    const prices = product.variacoes
      .map((v) => v.preco ?? product.precoBase)
      .filter((p) => p !== undefined);
    if (prices.length === 0) return { min: product.precoBase, max: product.precoBase };
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    return { min, max };
  })();

  const isOutOfStock = (selectedVariation?.estoque ?? 0) === 0;

  return {
    selectedVariation,
    setSelectedVariation,
    quantity,
    setQuantity,
    currentImages,
    currentPrice,
    priceRange,
    isOutOfStock,
  };
}
