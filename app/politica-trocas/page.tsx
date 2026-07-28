import { Header } from '@/features/catalog/presentation/components/header';
import { Footer } from '@/features/catalog/presentation/components/footer';
import { CTASection } from '@/features/catalog/presentation/components/cta-section';

export const metadata = {
  title: 'Política de Trocas e Devoluções - JP Tecidos',
  description: 'Conheça nossa política de trocas e devoluções: prazos, condições aceitas, processo de solicitação e responsabilidade por frete.',
};

export default function ExchangePolicyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl md:text-5xl font-playfair font-normal text-gray-900 mb-8">
            Política de Trocas e Devoluções
          </h1>
          
          <p className="text-gray-600 text-lg mb-12 leading-relaxed">
            Esta política define as condições para trocas e devoluções de produtos adquiridos na JP Tecidos. Leia atentamente antes de realizar sua compra.
          </p>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
              Prazo para solicitação
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Você tem até 7 dias após o recebimento do produto para solicitar troca ou devolução. Após esse prazo, não aceitamos solicitações.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
              Condições em que a troca é aceita
            </h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>Defeito de fabricação identificado no produto recebido</li>
              <li>Divergência entre o produto recebido e o que foi pedido (cor, tipo, quantidade)</li>
              <li>Produto danificado durante o transporte</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
              Condições em que a troca NÃO é aceita
            </h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>Tecido cortado, usado ou alterado de qualquer forma</li>
              <li>Variações naturais de tom ou textura inerentes à matéria-prima têxtil (especialmente retalhos)</li>
              <li>Insatisfação com o produto sem defeito técnico</li>
              <li>Solicitação realizada após o prazo de 7 dias</li>
            </ul>

            <div className="bg-gray-50 p-6 rounded-lg my-8">
              <h3 className="font-semibold text-gray-900 mb-2">
                Importante sobre variações naturais
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Por serem produtos têxteis, pequenas variações de tom, textura ou gramatura entre lotes são naturais e não constituem defeito de fabricação — especialmente em retalhos e tecidos naturais. Recomendamos conferir a descrição completa do produto no catálogo (composição, gramatura, fotos) antes de fechar pedidos grandes.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
              Como solicitar a troca
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Para solicitar troca ou devolução, entre em contato pelo WhatsApp ou e-mail informando:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>Número do pedido</li>
              <li>Produto que deseja trocar/devolver</li>
              <li>Motivo da solicitação</li>
              <li>Fotos do produto (se aplicável)</li>
            </ul>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Nossa equipe responderá em até 2 dias úteis com instruções para o processo.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
              Custo do frete de devolução
            </h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>Se a troca for por defeito de fabricação ou erro nosso: arcaremos com o frete de devolução</li>
              <li>Se a troca for por arrependimento do comprador (sem defeito): o comprador arca com o frete de devolução</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
              Reembolso
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Após recebermos e conferir o produto devolvido, o reembolso será processado em até 5 dias úteis. O valor será devolvido pela mesma forma de pagamento utilizada na compra.
            </p>
          </div>
        </div>

        <CTASection 
          title="Precisa de ajuda?"
          subtitle="Entre em contato com nossa equipe se tiver dúvidas sobre nossa política de trocas ou precisar orientação."
          primaryButtonText="Falar pelo WhatsApp"
          primaryButtonLink="/contato"
          secondaryButtonText="Ver Catálogo"
          secondaryButtonLink="/produtos"
        />
      </main>

      <Footer />
    </div>
  );
}
