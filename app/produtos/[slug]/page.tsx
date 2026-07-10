'use client';

import { Header } from '@/features/catalog/presentation/components/header';
import { Footer } from '@/features/catalog/presentation/components/footer';
import { ImageGallery } from '@/features/catalog/presentation/components/image-gallery';
import { VariationSelector } from '@/features/catalog/presentation/components/variation-selector';
import { useProducts } from '@/features/catalog/application/use-products';
import { ProductVariation } from '@/lib/types';
import { useState } from 'react';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const { data: product, isLoading, error } = useProducts({});
  const [selectedVariation, setSelectedVariation] = useState<ProductVariation | null>(null);

  // Mock - na prática usaria getProductBySlug
  const mockProduct = {
    id: '1',
    titulo: 'Tecido de Algodão Premium',
    descricao: 'Tecido de algodão de alta qualidade, ideal para costura e artesanato. 100% algodão, macio e durável.',
    precoBase: '39.90',
    unidadeMedida: 'metro',
    imagem: '/placeholder.jpg',
    variacoes: [
      { id: '1', produtoId: '1', cor: 'Branco', largura: '150cm', estoque: '100', sku: 'ALG-BRA-150' },
      { id: '2', produtoId: '1', cor: 'Azul', largura: '150cm', estoque: '50', sku: 'ALG-AZU-150' },
      { id: '3', produtoId: '1', cor: 'Vermelho', largura: '150cm', estoque: '30', sku: 'ALG-VER-150' },
    ],
  };

  const productData = mockProduct;
  const [quantity, setQuantity] = useState(productData.unidadeMedida === 'kg' ? '5' : '1');

  const handleAddToCart = () => {
    if (!selectedVariation) {
      alert('Selecione uma variação antes de adicionar ao carrinho');
      return;
    }
    // TODO: Implementar lógica de carrinho
    console.log('Adicionar ao carrinho:', { variation: selectedVariation, quantity });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="aspect-square bg-gray-200 rounded-lg animate-pulse" />
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-red-600 mb-4">Erro ao carregar produto.</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Recarregar
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Galeria de imagens */}
            <div>
              <ImageGallery
                images={productData.imagem ? [productData.imagem] : []}
                alt={productData.titulo}
              />
            </div>

            {/* Informações do produto */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {productData.titulo}
                </h1>
                <p className="text-2xl font-semibold text-gray-900">
                  R$ {productData.precoBase}
                </p>
                {productData.unidadeMedida && (
                  <p className="text-sm text-gray-600">
                    por {productData.unidadeMedida}
                  </p>
                )}
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-lg font-semibold mb-2">Descrição</h2>
                <p className="text-gray-600">{productData.descricao}</p>
              </div>

              {/* Seletor de variações */}
              {productData.variacoes && productData.variacoes.length > 0 && (
                <div className="border-t border-gray-200 pt-6">
                  <VariationSelector
                    variations={productData.variacoes}
                    onVariationSelect={setSelectedVariation}
                  />
                </div>
              )}

              {/* Quantidade e adicionar ao carrinho */}
              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quantidade
                    </label>
                    <input
                      type="number"
                      min={productData.unidadeMedida === 'kg' ? '5' : '1'}
                      step={productData.unidadeMedida === 'kg' ? '0.1' : '1'}
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="w-24 rounded-md border border-gray-300 px-3 py-2 focus:border-gray-500 focus:outline-none"
                    />
                    {productData.unidadeMedida === 'kg' && (
                      <p className="text-xs text-gray-500 mt-1">Mínimo: 5kg</p>
                    )}
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors"
                >
                  Adicionar ao Carrinho
                </button>
              </div>

              {/* Informações adicionais */}
              <div className="border-t border-gray-200 pt-6 space-y-2 text-sm text-gray-600">
                <p>✓ Envio em até 3 dias úteis</p>
                <p>✓ Frete calculado no checkout</p>
                <p>✓ 7 dias para devolução</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
