'use client';

import { useQuery } from '@tanstack/react-query';
import { productApi } from '../infrastructure/product-api';
import { Finalidade } from '@/lib/types';

export function useProducts(params: {
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
  finalidade?: Finalidade;
}) {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => productApi.getProducts(params),
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => productApi.getCategories(),
  });
}
