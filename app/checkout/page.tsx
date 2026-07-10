'use client';

import { Header } from '@/features/catalog/presentation/components/header';
import { Footer } from '@/features/catalog/presentation/components/footer';
import { useCart } from '@/features/cart/application/use-cart';
import { AddressForm } from '@/features/checkout/presentation/components/address-form';
import { freightApi } from '@/features/checkout/infrastructure/freight-api';
import { orderApi } from '@/features/checkout/infrastructure/order-api';
import { addressApi } from '@/features/account/infrastructure/address-api';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { type AddressFormData } from '@/lib/validations/address';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart } = useCart();
  const [selectedFreight, setSelectedFreight] = useState<any>(null);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);

  const { data: addresses = [] } = useQuery({
    queryKey: ['addresses'],
    queryFn: () => addressApi.list(),
  });

  const freightMutation = useMutation({
    mutationFn: freightApi.getQuote,
  });

  const orderMutation = useMutation({
    mutationFn: orderApi.create,
    onSuccess: (order) => {
      router.push(`/pedido-sucesso?orderId=${order.id}`);
    },
  });

  if (!cart || cart.itens.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Checkout
            </h1>
            <p className="text-gray-600 mb-8">
              Seu carrinho está vazio
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAddressSubmit = async (data: AddressFormData) => {
    freightMutation.mutate({
      cep: data.cep,
      subtotal: cart.subtotal,
    });
  };

  const handleCompleteOrder = () => {
    if (!selectedAddress || !selectedPayment || !selectedFreight) {
      alert('Preencha todos os campos obrigatórios');
      return;
    }

    orderMutation.mutate({
      enderecoId: selectedAddress,
      freteMetodo: selectedFreight.metodo,
      metodoPagamento: selectedPayment,
      itens: cart.itens.map((item) => ({
        produtoVariacaoId: item.produtoVariacaoId,
        quantidade: item.quantidade,
      })),
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Finalizar Compra
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Formulário de endereço */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-xl font-semibold mb-4">Endereço de Entrega</h2>
                
                {addresses.length > 0 && (
                  <div className="mb-4 space-y-2">
                    <p className="text-sm font-medium text-gray-700">Selecione um endereço:</p>
                    {addresses.map((address) => (
                      <label
                        key={address.id}
                        className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer ${
                          selectedAddress === address.id
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-200'
                        }`}
                      >
                        <input
                          type="radio"
                          name="address"
                          value={address.id}
                          checked={selectedAddress === address.id}
                          onChange={(e) => setSelectedAddress(e.target.value)}
                          className="h-4 w-4 text-blue-600"
                        />
                        <div>
                          <p className="font-medium">{address.rua}, {address.numero}</p>
                          <p className="text-sm text-gray-600">{address.bairro} - {address.cidade}/{address.estado}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                )}

                <AddressForm onSubmit={handleAddressSubmit} />
              </div>

              {/* Opções de frete */}
              {freightMutation.data && freightMutation.data.length > 0 && (
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold mb-4">Opções de Frete</h2>
                  <div className="space-y-3">
                    {freightMutation.data.map((option: any, index: number) => (
                      <label
                        key={index}
                        className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedFreight?.metodo === option.metodo
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="freight"
                            value={option.metodo}
                            checked={selectedFreight?.metodo === option.metodo}
                            onChange={(e) => setSelectedFreight(option)}
                            className="h-4 w-4 text-blue-600"
                          />
                          <div>
                            <p className="font-medium">{option.metodo}</p>
                            <p className="text-sm text-gray-500">
                              Prazo: {option.prazo} dias úteis
                            </p>
                          </div>
                        </div>
                        <p className="font-semibold">R$ {option.valor}</p>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Forma de pagamento */}
              {selectedFreight && (
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold mb-4">Forma de Pagamento</h2>
                  <div className="space-y-3">
                    {[
                      { id: 'pix', name: 'PIX' },
                      { id: 'credit_card', name: 'Cartão de Crédito' },
                      { id: 'boleto', name: 'Boleto' },
                    ].map((method) => (
                      <label
                        key={method.id}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-gray-300"
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="payment"
                            value={method.id}
                            checked={selectedPayment === method.id}
                            onChange={(e) => setSelectedPayment(e.target.value)}
                            className="h-4 w-4 text-blue-600"
                          />
                          <span className="font-medium">{method.name}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Resumo do pedido */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-6 sticky top-4">
                <h2 className="text-lg font-semibold mb-4">Resumo do Pedido</h2>
                
                <div className="space-y-3 mb-4">
                  {cart.itens.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="flex-1">
                        <p className="text-sm font-medium line-clamp-1">
                          {item.produtoTitulo}
                        </p>
                        <p className="text-xs text-gray-500">
                          {item.variacao.cor} - Qtd: {item.quantidade}
                        </p>
                      </div>
                      <p className="text-sm font-semibold">
                        R$ {item.precoTotal}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-3 space-y-2 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>R$ {cart.subtotal}</span>
                  </div>
                  {selectedFreight && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Frete</span>
                      <span>
                        R$ {selectedFreight.valor}
                      </span>
                    </div>
                  )}
                  <div className="border-t pt-2 flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>
                      R$ {selectedFreight
                        ? String(
                            parseFloat(cart.subtotal) +
                            parseFloat(selectedFreight.valor || '0')
                          )
                        : cart.subtotal}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCompleteOrder}
                  disabled={!selectedFreight || !selectedPayment || !selectedAddress || orderMutation.isPending}
                  className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {orderMutation.isPending ? 'Processando...' : 'Finalizar Pedido'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
