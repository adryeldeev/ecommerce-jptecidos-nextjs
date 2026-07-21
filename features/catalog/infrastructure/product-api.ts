import { api } from '@/lib/api/client';
import { Product, ProductListResponse, Category } from '@/lib/types';

export const productApi = {
  getProducts: async (params: {
    page?: number;
    limit?: number;
    busca?: string;
    categoriaSlug?: string;
    cor?: string;
    unidadeMedida?: string;
    precoMin?: string;
    precoMax?: string;
    somenteDisponiveis?: boolean;
    ordenacao?: string;
    maisProcurado?: boolean;
    lancamento?: boolean;
  }) => {
    const queryParams = new URLSearchParams();
    
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.busca) queryParams.append('busca', params.busca);
    if (params.categoriaSlug) queryParams.append('categoriaSlug', params.categoriaSlug);
    if (params.cor) queryParams.append('cor', params.cor);
    if (params.unidadeMedida) queryParams.append('unidadeMedida', params.unidadeMedida);
    if (params.precoMin) queryParams.append('precoMin', params.precoMin);
    if (params.precoMax) queryParams.append('precoMax', params.precoMax);
    if (params.somenteDisponiveis !== undefined) queryParams.append('somenteDisponiveis', params.somenteDisponiveis.toString());
    if (params.ordenacao) queryParams.append('ordenacao', params.ordenacao);
    if (params.maisProcurado !== undefined) queryParams.append('maisProcurado', params.maisProcurado.toString());
    if (params.lancamento !== undefined) queryParams.append('lancamento', params.lancamento.toString());

    const queryString = queryParams.toString();
    const endpoint = `/catalogo/produtos${queryString ? `?${queryString}` : ''}`;
    
    return api.get(endpoint) as Promise<ProductListResponse>;
  },

  getProductBySlug: async (slug: string) => {
    return api.get(`/catalogo/produtos/${slug}`) as Promise<Product>;
  },

  getCategories: async () => {
    return api.get('/catalogo/categorias') as Promise<Category[]>;
  },
};
