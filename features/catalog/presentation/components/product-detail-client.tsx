'use client';

import { Product, ProductVariation } from '@/lib/types';
import { ProductVariantSelector } from './product-variant-selector';
import { ProductQuantitySelector } from './product-quantity-selector';
import { useCart } from '@/features/cart/application/use-cart';
import { useState } from 'react';

interface ProductDetailClientProps {
  product: Product;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [selectedVariation, setSelectedVariation] = useState<ProductVariation | null>(
    product.variacoes.length > 0 ? product.variacoes[0] : null
  );
  
  // Se não tem variações, considera como selecionado automaticamente
  const hasVariations = product.variacoes.length > 0;
  const isVariationSelected = !hasVariations || selectedVariation !== null;
  const [quantity, setQuantity] = useState(
    product.unidadeMedida === 'KG' ? 5 : 1
  );
  const [activeTab, setActiveTab] = useState<'descricao' | 'informacoes'>('descricao');
  const addItem = useCart((state) => state.addItem);

  const currentImages = selectedVariation?.imagens && selectedVariation.imagens.length > 0
    ? selectedVariation.imagens
    : product.imagens;

  const currentPrice = parseFloat(selectedVariation?.preco ?? product.precoBase);

  const priceRange = (() => {
    const prices = product.variacoes
      .map((v) => v.preco ?? product.precoBase)
      .filter((p) => p !== undefined)
      .map((p) => parseFloat(p));
    if (prices.length === 0) return { min: parseFloat(product.precoBase), max: parseFloat(product.precoBase) };
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    return { min, max };
  })();

  const isOutOfStock = (selectedVariation?.estoque ?? '0') === '0';

  const handleAddToCart = () => {
    if (hasVariations && !selectedVariation) {
      alert('Selecione uma cor antes de adicionar ao carrinho');
      return;
    }
    if (isOutOfStock) {
      alert('Produto fora de estoque');
      return;
    }

    addItem({
      produtoVariacaoId: hasVariations ? selectedVariation!.id : undefined,
      produtoId: product.id,
      produtoTitulo: product.titulo,
      produtoImagem: currentImages[0]?.url,
      unidadeMedida: product.unidadeMedida,
      variacao: hasVariations ? {
        cor: selectedVariation!.cor,
        largura: selectedVariation!.largura ? `${selectedVariation!.largura}cm` : undefined,
        sku: selectedVariation!.sku,
        metragemPorPeca: selectedVariation!.metragemPorPeca,
        estoque: selectedVariation!.estoque,
      } : undefined,
      quantidade: String(quantity),
      precoUnitario: String(currentPrice),
    });
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
          {product.titulo}
        </h1>
        <div className="flex items-baseline gap-2 flex-wrap">
          {priceRange.min === priceRange.max ? (
            <p className="text-xl md:text-2xl font-semibold text-gray-900">
              R$ {priceRange.min.toFixed(2)}
            </p>
          ) : (
            <p className="text-xl md:text-2xl font-semibold text-gray-900">
              R$ {priceRange.min.toFixed(2)} - R$ {priceRange.max.toFixed(2)}
            </p>
          )}
          {selectedVariation && (
            <p className="text-base md:text-lg font-semibold text-[#DD8A05]">
              R$ {currentPrice.toFixed(2)}
            </p>
          )}
        </div>
        <p className="text-xs md:text-sm text-gray-600">
          por {product.unidadeMedida.toLowerCase()}
        </p>
      </div>

      {/* Atributos do tecido */}
      <div className="grid grid-cols-2 gap-3 md:gap-4 text-xs md:text-sm">
        {product.composicao && (
          <div>
            <span className="text-gray-500">Composição:</span>
            <span className="ml-2 text-gray-900">{product.composicao}</span>
          </div>
        )}
        {product.gramatura && (
          <div>
            <span className="text-gray-500">Gramatura:</span>
            <span className="ml-2 text-gray-900">{product.gramatura} g/m²</span>
          </div>
        )}
        {selectedVariation?.largura && (
          <div>
            <span className="text-gray-500">Largura:</span>
            <span className="ml-2 text-gray-900">{selectedVariation.largura}</span>
          </div>
        )}
        {product.fabricanteId && (
          <div>
            <span className="text-gray-500">Fabricante ID:</span>
            <span className="ml-2 text-gray-900">{product.fabricanteId}</span>
          </div>
        )}
      </div>

      {/* Seletor de cor */}
      {product.variacoes.length > 0 && (
        <ProductVariantSelector
          product={product}
          onVariationSelect={setSelectedVariation}
          selectedVariation={selectedVariation}
        />
      )}

      {/* Seletor de quantidade */}
      <ProductQuantitySelector
        quantity={quantity}
        onQuantityChange={setQuantity}
        unit={product.unidadeMedida}
        minQuantity={product.unidadeMedida === 'KG' ? 5 : 1}
      />

      {/* Botão adicionar ao carrinho */}
      <button
        onClick={handleAddToCart}
        disabled={!isVariationSelected || isOutOfStock}
        className="w-full bg-[#DD8A05] cursor-pointer text-white py-3 rounded-lg font-semibold hover:bg-[#c47a04] disabled:bg-gray-300 disabled:cursor-not-allowed active:scale-95 transition-all"
      >
        {!isVariationSelected
          ? 'Selecione uma cor'
          : isOutOfStock
          ? 'Fora de estoque'
          : 'Adicionar ao carrinho'}
      </button>

      {/* Abas */}
      <div className="border-t border-gray-200 pt-6">
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setActiveTab('descricao')}
            className={`pb-2 border-b-2 transition-colors ${
              activeTab === 'descricao'
                ? 'border-[#DD8A05] text-[#DD8A05]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Descrição
          </button>
          <button
            onClick={() => setActiveTab('informacoes')}
            className={`pb-2 border-b-2 transition-colors ${
              activeTab === 'informacoes'
                ? 'border-[#DD8A05] text-[#DD8A05]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Informação adicional
          </button>
        </div>

        {activeTab === 'descricao' && (
          <div className="text-gray-600">
            {product.descricao ? (
              <div dangerouslySetInnerHTML={{ __html: product.descricao }} />
            ) : (
              <p>Sem descrição disponível.</p>
            )}
          </div>
        )}

        {activeTab === 'informacoes' && (
          <div className="text-gray-600 space-y-2">
            {product.pesoGramas && (
              <p>Peso: {product.pesoGramas}g</p>
            )}
            {product.dimensaoAlturaCm && product.dimensaoLarguraCm && product.dimensaoComprimentoCm && (
              <p>
                Dimensões: {product.dimensaoAlturaCm}cm × {product.dimensaoLarguraCm}cm × {product.dimensaoComprimentoCm}cm
              </p>
            )}
            {product.observacoes && (
              <div>
                <p className="font-medium mb-1">Observações:</p>
                <div dangerouslySetInnerHTML={{ __html: product.observacoes }} />
              </div>
            )}
            {!product.pesoGramas && !product.dimensaoAlturaCm && !product.observacoes && (
              <p>Sem informações adicionais disponíveis.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
