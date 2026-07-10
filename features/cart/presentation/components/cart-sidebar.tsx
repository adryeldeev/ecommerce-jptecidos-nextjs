'use client';

import { useCart } from '@/features/cart/application/use-cart';
import { X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { cart, removeItem, updateQuantity } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="relative ml-auto h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b p-4">
            <h2 className="text-lg font-semibold">Carrinho</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {!cart || cart.itens.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <p className="mb-4">Seu carrinho está vazio</p>
                <Link
                  href="/produtos"
                  onClick={onClose}
                  className="text-blue-600 hover:underline"
                >
                  Continuar comprando
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.itens.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 border-b pb-4"
                  >
                    {item.produtoImagem && (
                      <div className="relative h-20 w-20 flex-shrink-0">
                        <Image
                          src={item.produtoImagem}
                          alt={item.produtoTitulo}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-medium text-sm line-clamp-2">
                        {item.produtoTitulo}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {item.variacao.cor}
                        {item.variacao.largura && ` - ${item.variacao.largura}`}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min="1"
                            value={item.quantidade}
                            onChange={(e) =>
                              updateQuantity(item.id, e.target.value)
                            }
                            className="w-16 rounded border px-2 py-1 text-sm"
                          />
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-sm">
                            R$ {item.precoTotal}
                          </p>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-xs text-red-600 hover:underline"
                          >
                            Remover
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cart && cart.itens.length > 0 && (
            <div className="border-t p-4 space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">R$ {cart.subtotal}</span>
              </div>
              <Link
                href="/carrinho"
                onClick={onClose}
                className="block w-full bg-blue-600 text-white text-center py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors"
              >
                Ver Carrinho Completo
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
