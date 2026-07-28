'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCategories } from '@/features/catalog/application/use-products';

const FALLBACK_IMAGES = [
  '/imgCategoriaJP.svg',
  '/imgCategoriaJP02.svg',
  '/imgCategoriaJP03.svg',
  '/imgCategoriaJP04.svg',
];

export function CategoriesSection() {
  const { data: categories = [], isLoading, error } = useCategories();

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-playfair font-normal text-gray-900 mb-8">Categorias</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-[300px] rounded-lg bg-gray-200 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || categories.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-playfair font-normal text-gray-900 mb-8">
          Categorias
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              href={`/produtos?categoriaSlug=${category.slug}`}
              className="group relative h-[300px] rounded-lg overflow-hidden"
            >
              <Image
                src={category.imagemUrl || FALLBACK_IMAGES[index % FALLBACK_IMAGES.length]}
                alt={category.nome}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <h3 className="text-xl font-semibold text-white">
                  {category.nome}
                </h3>
                <p className="text-sm text-white/80">
                  {category.totalProdutos} {category.totalProdutos === 1 ? 'produto' : 'produtos'}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
