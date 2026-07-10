'use client';

import { useState } from 'react';

interface FiltersProps {
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  busca: string;
  categoriaSlug: string;
  cor: string;
  unidadeMedida: string;
  precoMin: string;
  precoMax: string;
  somenteDisponiveis: boolean;
  ordenacao: string;
}

export function Filters({ onFilterChange }: FiltersProps) {
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

  const handleFilterChange = (key: keyof FilterState, value: string | boolean) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold mb-4">Filtros</h3>
      
      {/* Busca */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Busca
        </label>
        <input
          type="text"
          value={filters.busca}
          onChange={(e) => handleFilterChange('busca', e.target.value)}
          placeholder="Buscar produtos..."
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-gray-500 focus:outline-none"
        />
      </div>

      {/* Categoria */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Categoria
        </label>
        <select
          value={filters.categoriaSlug}
          onChange={(e) => handleFilterChange('categoriaSlug', e.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-gray-500 focus:outline-none"
        >
          <option value="">Todas</option>
          <option value="algodao">Algodão</option>
          <option value="seda">Seda</option>
          <option value="linho">Linho</option>
          <option value="poliester">Poliéster</option>
        </select>
      </div>

      {/* Cor */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Cor
        </label>
        <input
          type="text"
          value={filters.cor}
          onChange={(e) => handleFilterChange('cor', e.target.value)}
          placeholder="Ex: azul, vermelho..."
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-gray-500 focus:outline-none"
        />
      </div>

      {/* Unidade de Medida */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Unidade de Medida
        </label>
        <select
          value={filters.unidadeMedida}
          onChange={(e) => handleFilterChange('unidadeMedida', e.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-gray-500 focus:outline-none"
        >
          <option value="">Todas</option>
          <option value="metro">Metro</option>
          <option value="centimetro">Centímetro</option>
          <option value="peça">Peça</option>
        </select>
      </div>

      {/* Preço */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Faixa de Preço
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            value={filters.precoMin}
            onChange={(e) => handleFilterChange('precoMin', e.target.value)}
            placeholder="Mín"
            className="w-1/2 rounded-md border border-gray-300 px-3 py-2 focus:border-gray-500 focus:outline-none"
          />
          <input
            type="number"
            value={filters.precoMax}
            onChange={(e) => handleFilterChange('precoMax', e.target.value)}
            placeholder="Máx"
            className="w-1/2 rounded-md border border-gray-300 px-3 py-2 focus:border-gray-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Somente Disponíveis */}
      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={filters.somenteDisponiveis}
            onChange={(e) => handleFilterChange('somenteDisponiveis', e.target.checked)}
            className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <span className="text-sm text-gray-700">Somente disponíveis</span>
        </label>
      </div>

      {/* Ordenação */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Ordenação
        </label>
        <select
          value={filters.ordenacao}
          onChange={(e) => handleFilterChange('ordenacao', e.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-gray-500 focus:outline-none"
        >
          <option value="relevancia">Relevância</option>
          <option value="preco_asc">Preço: Menor para Maior</option>
          <option value="preco_desc">Preço: Maior para Menor</option>
          <option value="nome_asc">Nome: A-Z</option>
          <option value="nome_desc">Nome: Z-A</option>
        </select>
      </div>

      <button
        onClick={() => setFilters({
          busca: '',
          categoriaSlug: '',
          cor: '',
          unidadeMedida: '',
          precoMin: '',
          precoMax: '',
          somenteDisponiveis: false,
          ordenacao: 'relevancia',
        })}
        className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
      >
        Limpar Filtros
      </button>
    </div>
  );
}
