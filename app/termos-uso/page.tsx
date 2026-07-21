import { Header } from '@/features/catalog/presentation/components/header';
import { Footer } from '@/features/catalog/presentation/components/footer';

export const metadata = {
  title: 'Termos de Uso - JP Tecidos',
  description: 'Termos de uso do site JP Tecidos: aceitação, cadastro, produtos, preços, frete, propriedade intelectual e limitação de responsabilidade.',
};

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            Termos de Uso
          </h1>
          
          <p className="text-gray-600 text-lg mb-12 leading-relaxed">
            Estes termos de uso regem o acesso e utilização do site JP Tecidos. Ao acessar este site, você concorda com estes termos.
          </p>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
              1. Aceitação dos termos
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Ao acessar e utilizar este site, você declara ter lido, entendido e concordado com estes termos de uso. Se você não concordar com qualquer parte destes termos, não deve utilizar este site.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
              2. Cadastro e responsabilidade do usuário
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Para realizar compras, você deve se cadastrar fornecendo informações verdadeiras, completas e atualizadas. Você é responsável por manter a confidencialidade de sua senha e por todas as atividades que ocorrem em sua conta. Você concorda em notificar imediatamente a JP Tecidos sobre qualquer uso não autorizado de sua conta.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
              3. Descrição dos produtos e variações naturais
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Nosso catálogo descreve os produtos da forma mais precisa possível. No entanto, pequenas variações de tom, textura ou gramatura podem ocorrer entre lotes de produção, especialmente em retalhos e tecidos naturais. Essas variações são inerentes à matéria-prima têxtil e não constituem defeito. Recomendamos solicitar amostra antes de compras em grande volume.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
              4. Preços e formas de pagamento
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Os preços dos produtos estão em Reais (BRL) e podem ser alterados a qualquer momento sem aviso prévio. Aceitamos cartão de crédito, PIX e boleto. Para CNPJ, emitimos nota fiscal e faturamento conforme necessário. O pagamento é processado no momento do checkout.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
              5. Política de frete e prazos
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              O frete é calculado com base no peso, volume e localização de entrega. Para grandes volumes, trabalhamos com frete negociado para otimizar custos. O prazo de entrega varia conforme o volume e localização, geralmente até 10 dias úteis para capitais e até 15 dias úteis para outras localidades. A JP Tecidos não se responsabiliza por atrasos causados por transportadoras.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
              6. Propriedade intelectual
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Todo o conteúdo deste site (imagens, textos, logos, design) é propriedade da JP Tecidos ou de seus licenciadores e está protegido por leis de propriedade intelectual. É proibido copiar, reproduzir, modificar, distribuir ou utilizar qualquer parte deste conteúdo sem autorização prévia por escrito.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
              7. Limitação de responsabilidade
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              A JP Tecidos não se responsabiliza por danos diretos, indiretos, incidentais ou consequenciais resultantes do uso ou incapacidade de uso deste site ou dos produtos aqui vendidos. Nossa responsabilidade limita-se ao valor do produto adquirido.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
              8. Foro e legislação aplicável
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Estes termos de uso são regidos pelas leis da República Federativa do Brasil. Quaisquer disputas serão resolvidas no foro da comarca de São Paulo/SP, independentemente de outras jurisdições.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
              9. Alterações nos termos
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              A JP Tecidos reserva-se o direito de alterar estes termos de uso a qualquer momento. As alterações entrarão em vigor imediatamente após sua publicação no site. Recomendamos revisar estes termos periodicamente.
            </p>

            <div className="bg-gray-50 p-6 rounded-lg my-8">
              <p className="text-gray-600 text-sm leading-relaxed">
                Última atualização: Julho de 2026
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
