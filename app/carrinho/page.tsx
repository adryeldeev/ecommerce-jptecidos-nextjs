'use client';

import { useState } from 'react';
import { Header } from '@/features/catalog/presentation/components/header';
import { Footer } from '@/features/catalog/presentation/components/footer';
import { useCart } from '@/features/cart/application/use-cart';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2 } from 'lucide-react';

export default function CartPage() {
  const { cart, removeItem, updateQuantity, clearCart } = useCart();
  const [stockErrors, setStockErrors] = useState<Record<string, string>>({});

  if (!cart || cart.itens.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Seu Carrinho
            </h1>
            <p className="text-gray-600 mb-8">
              Seu carrinho está vazio
            </p>
            <Link
              href="/produtos"
              className="inline-block bg-[#f5a623] text-white px-6 py-3 rounded-md font-semibold hover:bg-[#e0961f] transition-colors"
            >
              Continuar Comprando
            </Link>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Seu Carrinho ({cart.quantidadeTotal} {cart.quantidadeTotal === 1 ? 'item' : 'itens'})
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Lista de itens */}
            <div className="lg:col-span-2 space-y-4">
              {cart.itens.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 border border-gray-200 rounded-lg p-4"
                >
                  {item.produtoImagem && (
                    <div className="relative h-24 w-24 flex-shrink-0">
                      <Image
                        src={item.produtoImagem}
                        alt={item.produtoTitulo}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="font-medium line-clamp-2">
                      {item.produtoTitulo}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {item.variacao?.cor}
                      {item.variacao?.largura && ` - ${item.variacao.largura}`}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      SKU: {item.variacao?.sku}
                    </p>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2">
                        <label className="text-sm text-gray-600">Qtd:</label>
                        {item.unidadeMedida === 'KG' ? (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => {
                                const currentQty = parseInt(item.quantidade) || 0;
                                const newQty = Math.max(5, currentQty - 5);
                                updateQuantity(item.id, newQty.toString());
                              }}
                              disabled={parseInt(item.quantidade) <= 5}
                              className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              −
                            </button>
                            <input
                              type="number"
                              min="5"
                              step="5"
                              value={item.quantidade}
                              onChange={(e) => {
                                const value = parseInt(e.target.value) || 0;
                                const roundedValue = Math.round(value / 5) * 5;
                                const finalValue = Math.max(5, roundedValue);
                                updateQuantity(item.id, finalValue.toString());
                              }}
                              className="w-20 rounded border px-2 py-1 text-sm text-center"
                            />
                            <button
                              onClick={() => {
                                const currentQty = parseInt(item.quantidade) || 0;
                                const newQty = currentQty + 5;
                                updateQuantity(item.id, newQty.toString());
                              }}
                              className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                            >
                              +
                            </button>
                          </div>
                        ) : item.unidadeMedida === 'METRO' ? (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => {
                                const currentQty = parseInt(item.quantidade) || 0;
                                const newQty = Math.max(1, currentQty - 1);
                                updateQuantity(item.id, newQty.toString());
                              }}
                              disabled={parseInt(item.quantidade) <= 1}
                              className="w-8 h-8 cursor-pointer rounded border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              −
                            </button>
                            <input
                              type="number"
                              min="1"
                              step="1"
                              value={item.quantidade}
                              onChange={(e) => {
                                const value = parseInt(e.target.value) || 0;
                                const finalValue = Math.max(1, value);
                                const metragemPorPeca = parseFloat(item.variacao?.metragemPorPeca || '0');
                                const totalMeters = finalValue * metragemPorPeca;
                                const stock = parseFloat(item.variacao?.estoque || '0');
                                
                                if (totalMeters > stock) {
                                  const maxPieces = Math.floor(stock / metragemPorPeca);
                                  setStockErrors({
                                    ...stockErrors,
                                    [item.id]: `Apenas ${maxPieces} peças disponíveis em estoque`
                                  });
                                  return;
                                }
                                
                                setStockErrors({ ...stockErrors, [item.id]: '' });
                                updateQuantity(item.id, finalValue.toString());
                              }}
                              className="w-20 rounded border px-2 py-1 text-sm text-center"
                            />
                            <button
                              onClick={() => {
                                const currentQty = parseInt(item.quantidade) || 0;
                                const newQty = currentQty + 1;
                                const metragemPorPeca = parseFloat(item.variacao?.metragemPorPeca || '0');
                                const totalMeters = newQty * metragemPorPeca;
                                const stock = parseFloat(item.variacao?.estoque || '0');
                                
                                if (totalMeters > stock) {
                                  const maxPieces = Math.floor(stock / metragemPorPeca);
                                  setStockErrors({
                                    ...stockErrors,
                                    [item.id]: `Apenas ${maxPieces} peças disponíveis em estoque`
                                  });
                                  return;
                                }
                                
                                setStockErrors({ ...stockErrors, [item.id]: '' });
                                updateQuantity(item.id, newQty.toString());
                              }}
                              className="w-8 h-8 rounded border cursor-pointer border-gray-300 flex items-center justify-center hover:bg-gray-100"
                            >
                              +
                            </button>
                          </div>
                        ) : (
                          <input
                            type="number"
                            min="1"
                            value={item.quantidade}
                            onChange={(e) =>
                              updateQuantity(item.id, e.target.value)
                            }
                            className="w-20 rounded border px-2 py-1 text-sm"
                          />
                        )}
                        {stockErrors[item.id] && (
                          <p className="text-red-500 text-xs mt-1">{stockErrors[item.id]}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          R$ {item.precoTotal}
                        </p>
                        <p className="text-sm text-gray-500">
                          R$ {item.precoUnitario}/{item.unidadeMedida === 'KG' ? 'kg' : item.unidadeMedida === 'METRO' ? 'm' : 'un'}
                        </p>
                        <p className="text-xs text-gray-400">
                          {item.unidadeMedida === 'KG' ? `${item.quantidade} kg` : 
                           item.unidadeMedida === 'METRO' ? `${item.quantidade} peças (${(parseInt(item.quantidade) * parseFloat(item.variacao?.metragemPorPeca || '0')).toFixed(0)}m)` :
                           `${item.quantidade} un`}
                        </p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    aria-label="Remover item"
                    className="text-red-600 hover:text-red-700 p-1 h-fit"
                  >
                    <Trash2 className="w-5 h-5 cursor-pointer" />
                  </button>
                </div>
              ))}
            </div>

            {/* Resumo do pedido */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-6 sticky top-4">
                <h2 className="text-lg font-semibold mb-4">Resumo do Pedido</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>R$ {cart.subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Frete</span>
                    <span className="text-gray-500">Calculado no checkout</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between font-semibold">
                    <span>Total</span>
                    <span>R$ {cart.subtotal}</span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="block w-full bg-[#f5a623] text-white text-center py-3 rounded-md font-semibold hover:bg-[#e0961f] transition-colors mb-3"
                >
                  Finalizar Compra
                </Link>

                <Link
                  href="/produtos"
                  className="block w-full text-center text-[#f5a623] hover:underline"
                >
                  Continuar Comprando
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
