'use client';

import { Header } from '@/features/catalog/presentation/components/header';
import { Footer } from '@/features/catalog/presentation/components/footer';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function OrderSuccessPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h1 className="text-3xl font-playfair font-normal text-gray-900 mb-2">
              Pedido Realizado com Sucesso!
            </h1>
            <p className="text-gray-600 mb-6">
              Seu pedido foi confirmado e você receberá um e-mail com os detalhes.
            </p>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <p className="text-sm text-gray-600 mb-2">Número do Pedido</p>
              <p className="text-2xl font-bold text-gray-900">#JP-12345</p>
            </div>

            <div className="space-y-4">
              <Link
                href="/minha-conta/meus-pedidos"
                className="block w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors"
              >
                Acompanhar Pedido
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
      </main>

      <Footer />
    </div>
  );
}
