'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useProducts } from '@/features/catalog/application/use-products';
import { ProductCardFeatured } from './product-card-featured';

export function FeaturedProducts() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data: productsData, isLoading, error } = useProducts({ limit: 6, maisProcurado: true });
  const products = productsData?.items || [];

  const visibleProducts = 4;
  const maxIndex = Math.max(0, products.length - visibleProducts);

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-[16px] text-[#DD8A05] font-medium mb-2">
                Alta Saída e Pronta Entrega
              </p>
              <h2 className="text-[32px] font-playfair font-normal text-gray-900">
                Tecidos Mais Procurados
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-square bg-gray-200 rounded-lg mb-3" />
                <div className="h-5 bg-gray-200 rounded mb-2" />
                <div className="h-3 bg-gray-200 rounded w-3/4" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || products.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-[16px] text-[#DD8A05] font-medium mb-2">
              Alta Saída e Pronta Entrega
            </p>
            <h2 className="text-[32px] font-playfair font-normal text-gray-900">
              Tecidos Mais Procurados
            </h2>
          </div>
          <div className="flex flex-col items-center gap-4">
            <Link
              href="/produtos"
              className="text-[#DD8A05] hover:text-[#c47a04] font-medium flex items-center gap-1"
            >
              Mais produtos
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <svg
                  className="w-5 h-5 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={handleNext}
                disabled={currentIndex === maxIndex}
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <svg
                  className="w-5 h-5 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-hidden w-full">
          <div
            className="flex gap-4 transition-transform duration-300"
            style={{ 
              transform: `translateX(-${currentIndex * 100}%)` 
            }}
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4"
              >
                <ProductCardFeatured product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
