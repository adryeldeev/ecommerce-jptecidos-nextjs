'use client';

interface FiltersProps {
  filters: FilterState;
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

const inputClasses =
  'w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#f5a623] focus:outline-none focus:ring-1 focus:ring-[#f5a623]';

export function Filters({ filters, onFilterChange }: FiltersProps) {
  const handleFilterChange = (key: keyof FilterState, value: string | boolean) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const handleClearFilters = () => {
    onFilterChange({
      busca: '',
      categoriaSlug: '',
      cor: '',
      unidadeMedida: '',
      precoMin: '',
      precoMax: '',
      somenteDisponiveis: false,
      ordenacao: filters.ordenacao,
    });
  };

  return (
    <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold mb-5">Filtros</h3>

      {/* Categoria — filtro mais usado, com leve destaque */}
      <div className="mb-6 pb-5 border-b border-gray-200">
        <label className="block text-sm font-semibold text-gray-800 mb-2">
          Categoria
        </label>
        <select
          value={filters.categoriaSlug}
          onChange={(e) => handleFilterChange('categoriaSlug', e.target.value)}
          className={`${inputClasses} py-2.5 bg-white`}
        >
          <option value="">Todas</option>
          <option value="algodao">Algodão</option>
          <option value="seda">Seda</option>
          <option value="linho">Linho</option>
          <option value="poliester">Poliéster</option>
        </select>
      </div>

      {/* Busca */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Busca
        </label>
        <input
          type="text"
          value={filters.busca}
          onChange={(e) => handleFilterChange('busca', e.target.value)}
          placeholder="Buscar produtos..."
          className={inputClasses}
        />
      </div>

      {/* Cor */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Cor
        </label>
        <input
          type="text"
          value={filters.cor}
          onChange={(e) => handleFilterChange('cor', e.target.value)}
          placeholder="Ex: azul, vermelho..."
          className={inputClasses}
        />
      </div>

      {/* Unidade de Medida */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Unidade de Medida
        </label>
        <select
          value={filters.unidadeMedida}
          onChange={(e) => handleFilterChange('unidadeMedida', e.target.value)}
          className={inputClasses}
        >
          <option value="">Todas</option>
          <option value="metro">Metro</option>
          <option value="centimetro">Centímetro</option>
          <option value="peça">Peça</option>
        </select>
      </div>

      {/* Preço */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Faixa de Preço
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            value={filters.precoMin}
            onChange={(e) => handleFilterChange('precoMin', e.target.value)}
            placeholder="Mín"
            className={`w-1/2 ${inputClasses}`}
          />
          <input
            type="number"
            value={filters.precoMax}
            onChange={(e) => handleFilterChange('precoMax', e.target.value)}
            placeholder="Máx"
            className={`w-1/2 ${inputClasses}`}
          />
        </div>
      </div>

      {/* Somente Disponíveis */}
      <div className="mb-6">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={filters.somenteDisponiveis}
            onChange={(e) => handleFilterChange('somenteDisponiveis', e.target.checked)}
            className="mr-2 h-4 w-4 accent-[#f5a623] border-gray-300 rounded"
          />
          <span className="text-sm text-gray-700">Somente disponíveis</span>
        </label>
      </div>

      <button
        onClick={handleClearFilters}
        className="w-full border border-gray-300 text-gray-600 px-4 py-2 rounded-md hover:bg-gray-100 hover:text-gray-900 transition-colors"
      >
        Limpar Filtros
      </button>
    </div>
  );
}
