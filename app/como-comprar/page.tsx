import { Header } from '@/features/catalog/presentation/components/header';
import { Footer } from '@/features/catalog/presentation/components/footer';
import { CTASection } from '@/features/catalog/presentation/components/cta-section';

export const metadata = {
  title: 'Como Comprar - Guia Completo JP Tecidos',
  description: 'Aprenda como comprar tecidos e retalhos na JP Tecidos: unidades de venda, quantidade mínima, formas de pagamento e prazos de entrega.',
};

export default function HowToBuyPage() {
  const steps = [
    {
      number: 1,
      title: 'Entenda as unidades de venda',
      description: 'Retalhos e brim são vendidos por kg. Rolos são vendidos por metro. Cada produto no catálogo indica claramente a unidade de venda.',
    },
    {
      number: 2,
      title: 'Escolha a quantidade',
      description: 'O pedido mínimo é 5kg, com incrementos de 5 em 5. Esse valor foi pensado para ser acessível tanto para quem está começando quanto para quem compra em grande volume.',
    },
    {
      number: 3,
      title: 'Confira os detalhes do produto',
      description: 'Cada produto no catálogo mostra composição, gramatura e fotos reais do tecido. Ficou com dúvida antes de fechar pedido grande? Fale com a gente pelo WhatsApp ou e-mail.',
    },
    {
      number: 4,
      title: 'Faça o pedido',
      description: 'Adicione os produtos ao carrinho, revise as quantidades e finalize o checkout. Você precisará informar dados de entrega e pagamento.',
    },
    {
      number: 5,
      title: 'Escolha a forma de pagamento',
      description: 'Aceitamos cartão de crédito, PIX e boleto. Para CNPJ, também emitimos nota fiscal e faturamento conforme necessário.',
    },
    {
      number: 6,
      title: 'Acompanhe a entrega',
      description: 'O prazo de entrega varia conforme o volume e localização. Para grandes volumes, trabalhamos com frete negociado para otimizar custos.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl md:text-5xl font-playfair font-normal text-gray-900 mb-8">
            Como Comprar
          </h1>
          
          <p className="text-gray-600 text-lg mb-12 leading-relaxed">
            Siga o passo a passo abaixo para comprar tecidos e retalhos na JP Tecidos. Se tiver dúvidas, entre em contato — nossa equipe está pronta para ajudar.
          </p>

          <div className="space-y-8">
            {steps.map((step) => (
              <div key={step.number} className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-[#f5a623] text-white flex items-center justify-center font-bold text-xl">
                    {step.number}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-gray-50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Dúvidas sobre CNPJ e faturamento?
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Vendemos tanto para pessoa física quanto para pessoa jurídica. Para CNPJ, emitimos nota fiscal e podemos faturar conforme necessário. O processo de compra é o mesmo — apenas informe seus dados de cadastro no checkout.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Se precisar de orientação específica para sua empresa, entre em contato pelo WhatsApp ou e-mail. Nossa equipe comercial está preparada para atender demandas B2B.
            </p>
          </div>
        </div>

        <CTASection
          title="Pronto para comprar?"
          subtitle="Explore nosso catálogo de tecidos e retalhos com a garantia de qualidade conferida em cada lote."
          primaryButtonText="Ver Catálogo"
          primaryButtonLink="/produtos"
          secondaryButtonText="Falar no Whatsapp"
          secondaryButtonLink="https://wa.me/5585985661823"
        />
      </main>

      <Footer />
    </div>
  );
}
