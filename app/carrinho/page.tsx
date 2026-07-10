'use client';

import { Header } from '@/features/catalog/presentation/components/header';
import { Footer } from '@/features/catalog/presentation/components/footer';
import { useCart } from '@/features/cart/application/use-cart';
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
  const { cart, removeItem, updateQuantity, clearCart } = useCart();

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
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors"
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
                      {item.variacao.cor}
                      {item.variacao.largura && ` - ${item.variacao.largura}`}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      SKU: {item.variacao.sku}
                    </p>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2">
                        <label className="text-sm text-gray-600">Qtd:</label>
                        <input
                          type="number"
                          min="1"
                          value={item.quantidade}
                          onChange={(e) =>
                            updateQuantity(item.id, e.target.value)
                          }
                          className="w-20 rounded border px-2 py-1 text-sm"
                        />
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          R$ {item.precoTotal}
                        </p>
                        <p className="text-sm text-gray-500">
                          R$ {item.precoUnitario} un.
                        </p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-600 hover:text-red-700 text-sm"
                  >
                    Remover
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
                  className="block w-full bg-blue-600 text-white text-center py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors mb-3"
                >
                  Finalizar Compra
                </Link>

                <Link
                  href="/produtos"
                  className="block w-full text-center text-blue-600 hover:underline"
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
