import { Header } from '@/features/catalog/presentation/components/header';
import { Footer } from '@/features/catalog/presentation/components/footer';
import { CTASection } from '@/features/catalog/presentation/components/cta-section';
import { FAQAccordion } from '@/features/catalog/presentation/components/faq-accordion';

export const metadata = {
  title: 'Perguntas Frequentes - FAQ JP Tecidos',
  description: 'Encontre respostas para as dúvidas mais comuns sobre compra de tecidos, retalhos, quantidade mínima, frete e formas de pagamento.',
};

export default function FAQPage() {
  const faqs = [
    {
      question: 'Qual a quantidade mínima de compra?',
      answer: 'O pedido mínimo é 5kg, com incrementos de 5 em 5. Esse valor foi pensado para ser acessível tanto para quem está começando quanto para quem compra em grande volume.',
    },
    {
      question: 'Vocês vendem para quem está começando ou só para grandes confecções?',
      answer: 'Atendemos todos os públicos: desde pequenos empreendedores e ateliês que estão começando, até grandes fábricas e marcas de moda consolidadas. Não fazemos distinção por porte de cliente.',
    },
    {
      question: 'Como sei se o tecido serve para o meu tipo de peça?',
      answer: 'Cada produto no catálogo mostra composição, gramatura e fotos reais do tecido. Nossa equipe técnica também pode orientar na escolha do material mais adequado para o tipo de peça que você produz — fale com a gente pelo WhatsApp ou e-mail.',
    },
    {
      question: 'Como posso ter certeza da qualidade antes de comprar em grande volume?',
      answer: 'Nosso controle de qualidade por lote garante que o tecido do catálogo é o mesmo que chega no seu pedido. Além disso, nossa equipe técnica está sempre disponível pelo WhatsApp para tirar dúvidas sobre composição, gramatura e uso antes de você fechar pedido grande.',
    },
    {
      question: 'Qual a diferença entre retalho, brim e algodão vendidos aqui?',
      answer: 'Retalho é tecido cortado, vendido por kg. Brim é um tipo de tecido resistente, geralmente usado em jeans e peças de trabalho. Algodão é a fibra natural, vendida em diferentes gramaturas e acabamentos. Cada produto no catálogo especifica as características.',
    },
    {
      question: 'O tecido varia de cor/textura entre lotes diferentes?',
      answer: 'Controlamos composição, gramatura e tingimento em cada lote de produção. O jeans, brim ou algodão que você vê no catálogo é o mesmo que chega no seu pedido — sem variação que comprometa sua confecção.',
    },
    {
      question: 'Como funciona o frete para grandes volumes / fora do estado?',
      answer: 'Para grandes volumes, trabalhamos com frete negociado para otimizar custos. O prazo de entrega varia conforme o volume e localização. Entre em contato para cotação específica.',
    },
    {
      question: 'Quais formas de pagamento vocês aceitam?',
      answer: 'Aceitamos cartão de crédito, PIX e boleto. Para CNPJ, também emitimos nota fiscal e faturamento conforme necessário.',
    },
    {
      question: 'Emitem nota fiscal / vendem para CNPJ e pessoa física?',
      answer: 'Sim, vendemos tanto para pessoa física quanto para pessoa jurídica. Para CNPJ, emitimos nota fiscal e podemos faturar conforme necessário. O processo de compra é o mesmo.',
    },
    {
      question: 'Qual o prazo de entrega?',
      answer: 'O prazo varia conforme o volume e localização. Geralmente, entregamos em até 10 dias úteis para capitais e até 15 dias úteis para outras localidades. Para volumes muito grandes, o prazo pode ser ajustado.',
    },
    {
      question: 'Posso trocar ou devolver se o tecido não for o esperado?',
      answer: 'Como o produto é vendido por lote/kg, pequenas variações naturais de tom ou textura são inerentes à matéria-prima têxtil e não configuram defeito. Trocas são aceitas em caso de defeito de fabricação ou divergência do que foi pedido. Consulte nossa Política de Trocas para detalhes.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl md:text-5xl font-playfair font-normal text-gray-900 mb-8">
            Perguntas Frequentes
          </h1>
          
          <p className="text-gray-600 text-lg mb-12 leading-relaxed">
            Encontre respostas para as dúvidas mais comuns sobre compra de tecidos, retalhos, frete e formas de pagamento.
          </p>

          <FAQAccordion faqs={faqs} />
        </div>

        <CTASection 
          title="Ainda tem dúvidas?"
          subtitle="Entre em contato com nossa equipe — estamos prontos para ajudar você a encontrar o tecido ideal para sua confecção."
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
