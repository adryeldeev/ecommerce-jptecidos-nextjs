'use client';

import { Header } from '@/features/catalog/presentation/components/header';
import { Footer } from '@/features/catalog/presentation/components/footer';
import { Filters, FilterState } from '@/features/catalog/presentation/components/filters';
import { ProductCardFeatured } from '@/features/catalog/presentation/components/product-card-featured';
import { Pagination } from '@/features/catalog/presentation/components/pagination';
import { useProducts } from '@/features/catalog/application/use-products';
import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const SORT_OPTIONS = [
  { value: 'recentes', label: 'Mais recentes' },
  { value: 'preco_asc', label: 'Preço: Menor para Maior' },
  { value: 'preco_desc', label: 'Preço: Maior para Menor' },
  { value: 'titulo_asc', label: 'Nome: A-Z' },
];

function ProductsPageSkeleton() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Catálogo de Produtos
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="aspect-square bg-gray-200 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export function ProductsCatalog() {
  return (
    <Suspense fallback={<ProductsPageSkeleton />}>
      <ProductsCatalogContent />
    </Suspense>
  );
}

function ProductsCatalogContent() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<FilterState>({
    busca: searchParams.get('busca') ?? '',
    categoriaSlug: searchParams.get('categoriaSlug') ?? '',
    cor: '',
    unidadeMedida: '',
    precoMin: '',
    precoMax: '',
    somenteDisponiveis: false,
    ordenacao: 'recentes',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const { data, isLoading, error } = useProducts({
    ...filters,
    page: currentPage,
    limit: 20,
  });

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleSortChange = (ordenacao: string) => {
    handleFilterChange({ ...filters, ordenacao });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Catálogo de Produtos
          </h1>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Botão de filtros (mobile) */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsFiltersOpen((open) => !open)}
                className="w-full flex items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700"
              >
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h18M6 8h12M9 12h6M11 16h2" />
                  </svg>
                  Filtros
                </span>
                <svg
                  className={`w-4 h-4 transition-transform ${isFiltersOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {/* Sidebar com filtros */}
            <aside
              className={`${isFiltersOpen ? 'block' : 'hidden'} lg:block w-full lg:w-64 flex-shrink-0`}
            >
              <Filters filters={filters} onFilterChange={handleFilterChange} />
            </aside>

            {/* Grid de produtos */}
            <div className="flex-1 min-w-0">
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
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
                    className="bg-[#f5a623] text-white px-4 py-2 rounded-md hover:bg-[#e0961f] transition-colors"
                  >
                    Recarregar
                  </button>
                </div>
              ) : data?.items && data.items.length > 0 ? (
                <>
                  {/* Cabeçalho: total de produtos + ordenação */}
                  <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold text-gray-900">{data.total}</span>{' '}
                      {data.total === 1 ? 'produto encontrado' : 'produtos encontrados'}
                    </p>
                    <div className="flex items-center gap-2">
                      <label htmlFor="ordenacao" className="text-sm text-gray-600 whitespace-nowrap">
                        Ordenar por:
                      </label>
                      <select
                        id="ordenacao"
                        value={filters.ordenacao}
                        onChange={(e) => handleSortChange(e.target.value)}
                        className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#f5a623] focus:outline-none focus:ring-1 focus:ring-[#f5a623]"
                      >
                        {SORT_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {data.items.map((product) => (
                      <ProductCardFeatured key={product.id} product={product} />
                    ))}
                  </div>

                  {data.totalPages > 1 && (
                    <Pagination
                      currentPage={currentPage}
                      totalPages={data.totalPages}
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
