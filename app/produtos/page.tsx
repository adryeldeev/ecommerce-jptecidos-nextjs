import type { Metadata } from 'next';
import { ProductsCatalog } from '@/features/catalog/presentation/components/products-catalog';

export const metadata: Metadata = {
  title: 'Catálogo de Tecidos, Jeans e Têxtil em Fortaleza | JP Tecidos',
  description: 'Compre jeans, brim, algodão e outros tecidos em Fortaleza. Filtre por cor, unidade de medida e faixa de preço — atacado e varejo para confecções.',
  alternates: {
    canonical: '/produtos',
  },
};

export default function ProdutosPage() {
  return <ProductsCatalog />;
}
