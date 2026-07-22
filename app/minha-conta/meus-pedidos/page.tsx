'use client';

import { Header } from '@/features/catalog/presentation/components/header';
import { Footer } from '@/features/catalog/presentation/components/footer';
import { orderApi } from '@/features/checkout/infrastructure/order-api';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

export default function MyOrdersPage() {
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: () => orderApi.list(),
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Meus Pedidos
          </h1>
          
          {isLoading ? (
            <p className="text-center text-gray-600">Carregando pedidos...</p>
          ) : orders.length === 0 ? (
            <p className="text-center text-gray-600">
              Nenhum pedido encontrado
            </p>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-lg border border-gray-200 p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-semibold text-lg">Pedido #{order.id}</p>
                      <p className="text-sm text-gray-600">
                        Data: {new Date(order.createdAt).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-lg">R$ {order.total}</p>
                      <p className="text-sm text-gray-600">{order.itens.length} itens</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        order.status === 'entregue'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {order.status}
                    </span>
                    <Link
                      href={`/minha-conta/pedidos/${order.id}`}
                      className="text-[#f5a623] hover:underline text-sm"
                    >
                      Ver detalhes
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
