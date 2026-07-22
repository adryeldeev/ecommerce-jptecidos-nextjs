import { Header } from '@/features/catalog/presentation/components/header';
import { Footer } from '@/features/catalog/presentation/components/footer';
import { CTASection } from '@/features/catalog/presentation/components/cta-section';
import Link from 'next/link';

export const metadata = {
  title: 'Sobre a JP Tecidos - +20 Anos de Tradição em Matéria-Prima Têxtil',
  description: 'Conheça a trajetória da JP Tecidos: fornecimento de matéria-prima têxtil para confecções de todos os portes, com controle de qualidade por lote e entrega rápida.',
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            Sobre a JP Tecidos
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Com mais de 20 anos de tradição no mercado têxtil, a JP Tecidos é especializada no fornecimento de matéria-prima para confecções. Atuamos como parceiro estratégico de pequenos empreendedores, ateliês que estão começando, grandes fábricas e marcas de moda consolidadas.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
              Para quem atendemos
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Nosso modelo de negócio foi pensado para ser acessível a todos os públicos. O pedido mínimo de 5kg — com incrementos de 5 em 5 — permite tanto que quem está começando teste materiais sem comprometer o capital, quanto que grandes confecções comprem em volume com a mesma eficiência.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Não fazemos distinção por porte de cliente: o mesmo controle de qualidade, o mesmo estoque estratégico e o mesmo atendimento técnico são aplicados independentemente do volume de compra.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
              O que fazemos
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Vendemos tecidos e retalhos no atacado, com unidades adaptadas ao uso industrial: retalhos e brim são vendidos por kg, rolos por metro. Trabalhamos com jeans, algodão, brim e outras fibras, sempre com foco em resistência, consistência entre lotes e rendimento na mesa de corte.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
              Nossos diferenciais
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Controle de qualidade por lote</h3>
                <p className="text-gray-600 text-sm">
                  Cada lote de produção é testado para composição, gramatura e tingimento. O tecido que você vê no catálogo é o mesmo que chega no seu pedido.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Estoque estratégico</h3>
                <p className="text-gray-600 text-sm">
                  Mantemos estoque para entrega rápida, reduzindo o tempo de espera entre pedido e recebimento.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Pagamento facilitado</h3>
                <p className="text-gray-600 text-sm">
                  Aceitamos cartão, PIX e boleto, com emissão de nota fiscal para CNPJ — sem burocracia para fechar pedido.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Atendimento técnico</h3>
                <p className="text-gray-600 text-sm">
                  Nossa equipe entende o processo produtivo de confecções e pode orientar na escolha do material mais adequado.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
              Trajetória
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Começamos como fornecedor local e, ao longo de duas décadas, consolidamos parcerias com confecções em todo o Brasil. Nossa credibilidade foi construída sobre constância de produto e pontualidade — dois pilares que a indústria exige e que nós entregamos consistentemente.
            </p>
          </div>
        </div>

        <CTASection
          title="Conheça nossos produtos"
          subtitle="Explore nosso catálogo de tecidos e retalhos, com a garantia de qualidade conferida em cada lote."
          primaryButtonText="Falar no Whatsapp"
          primaryButtonLink="https://wa.me/5585985661823"
          secondaryButtonText="Ver Catálogo"
          secondaryButtonLink="/produtos"
        />
      </main>

      <Footer />
    </div>
  );
}
