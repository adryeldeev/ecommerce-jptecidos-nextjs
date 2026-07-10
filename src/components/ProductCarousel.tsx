"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard } from "@/features/catalog/presentation/components/product-card";
import type { Product } from "@/features/catalog/infrastructure/catalog-api";

interface ProductCarouselProps {
  products: Product[];
  renderControls?: (props: { onPrevious: () => void; onNext: () => void; canGoPrevious: boolean; canGoNext: boolean }) => React.ReactNode;
  currentIndex?: number;
}

export function ProductCarousel({ products, renderControls, currentIndex: externalIndex }: ProductCarouselProps) {
  const [internalIndex, setInternalIndex] = useState(0);
  const currentIndex = externalIndex ?? internalIndex;
  const itemsPerView = 4;

  const handlePrevious = () => {
    if (externalIndex === undefined) {
      setInternalIndex((prev) => Math.max(0, prev - 1));
    }
  };

  const handleNext = () => {
    if (externalIndex === undefined) {
      setInternalIndex((prev) => Math.min(products.length - itemsPerView, prev + 1));
    }
  };

  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex < products.length - itemsPerView;

  const defaultControls = (
    <div className="flex gap-2 mt-2">
      <button
        onClick={handlePrevious}
        disabled={!canGoPrevious}
        className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors active:scale-95 cursor-pointer"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={handleNext}
        disabled={!canGoNext}
        className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors active:scale-95 cursor-pointer"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div 
          className="flex gap-4 transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * (428.05 + 16)}px)` }}
        >
          {products.map((product) => (
            <div key={product.id} style={{ width: '428.05px', flexShrink: 0 }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      {renderControls ? renderControls({ onPrevious: handlePrevious, onNext: handleNext, canGoPrevious, canGoNext }) : defaultControls}
    </div>
  );
}
