'use client';

import { Header } from '@/features/catalog/presentation/components/header';
import { Footer } from '@/features/catalog/presentation/components/footer';
import { Filters, FilterState } from '@/features/catalog/presentation/components/filters';
import { ProductCard } from '@/features/catalog/presentation/components/product-card';
import { Pagination } from '@/features/catalog/presentation/components/pagination';
import { useProducts } from '@/features/catalog/application/use-products';
import { useState } from 'react';

export default function ProductsPage() {
  const [filters, setFilters] = useState<FilterState>({
    busca: '',
    categoriaSlug: '',
    cor: '',
    unidadeMedida: '',
    precoMin: '',
    precoMax: '',
    somenteDisponiveis: false,
    ordenacao: 'relevancia',
  });
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, error } = useProducts({
    ...filters,
    page: currentPage,
    limit: 20,
  });

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Catálogo de Produtos
          </h1>
          
          <div className="flex gap-8">
            {/* Sidebar com filtros */}
            <aside className="w-64 flex-shrink-0">
              <Filters onFilterChange={handleFilterChange} />
            </aside>

            {/* Grid de produtos */}
            <div className="flex-1">
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                      key={i}
                      className="aspect-square bg-gray-200 rounded-lg animate-pulse"
                    />
                  ))}
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <p className="text-red-600 mb-4">
                    Erro ao carregar produtos. Tente novamente.
                  </p>
                  <button
                    onClick={() => window.location.reload()}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    Recarregar
                  </button>
                </div>
              ) : data?.data && data.data.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.data.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>

                  {data.meta && data.meta.totalPages > 1 && (
                    <Pagination
                      currentPage={currentPage}
                      totalPages={data.meta.totalPages}
                      onPageChange={setCurrentPage}
                    />
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600">
                    Nenhum produto encontrado com os filtros selecionados.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
