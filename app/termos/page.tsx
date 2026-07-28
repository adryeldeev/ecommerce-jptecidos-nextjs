import { Header } from '@/features/catalog/presentation/components/header';
import { Footer } from '@/features/catalog/presentation/components/footer';

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-playfair font-normal text-gray-900 mb-8 text-center">
            Termos de Uso
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              Última atualização: Julho de 2026
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              1. Aceitação dos Termos
            </h2>
            <p className="text-gray-600 mb-6">
              Ao acessar e usar o site da JP Tecidos, você concorda com estes termos 
              de uso e nossa política de privacidade.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              2. Uso do Site
            </h2>
            <p className="text-gray-600 mb-6">
              Você concorda em usar o site apenas para fins legais e de acordo com 
              estes termos. É proibido o uso do site para qualquer propósito ilegal 
              ou não autorizado.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              3. Contas e Senhas
            </h2>
            <p className="text-gray-600 mb-6">
              Você é responsável por manter a confidencialidade de sua conta e senha. 
              Notifique-nos imediatamente sobre qualquer uso não autorizado.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              4. Produtos e Preços
            </h2>
            <p className="text-gray-600 mb-6">
              Nos esforçamos para exibir preços e informações precisas dos produtos. 
              Reservamo-nos o direito de corrigir erros e atualizar informações a 
              qualquer momento.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              5. Pedidos e Pagamentos
            </h2>
            <p className="text-gray-600 mb-6">
              Todos os pedidos estão sujeitos à disponibilidade e confirmação de preço. 
              Aceitamos diversas formas de pagamento conforme indicado no checkout.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              6. Envio e Entrega
            </h2>
            <p className="text-gray-600 mb-6">
              Os prazos de entrega são estimados e podem variar. Não somos responsáveis 
              por atrasos causados por transportadoras ou fatores de força maior.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              7. Devoluções e Reembolsos
            </h2>
            <p className="text-gray-600 mb-6">
              Aceitamos devoluções dentro de 7 dias após o recebimento, desde que o 
              produto esteja em condições originais. Consulte nossa política de 
              devoluções para mais detalhes.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              8. Propriedade Intelectual
            </h2>
            <p className="text-gray-600 mb-6">
              Todo o conteúdo deste site, incluindo textos, imagens e logotipos, é 
              propriedade da JP Tecidos e está protegido por leis de direitos autorais.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              9. Limitação de Responsabilidade
            </h2>
            <p className="text-gray-600 mb-6">
              Não somos responsáveis por danos diretos, indiretos ou incidentais 
              resultantes do uso deste site.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              10. Alterações nos Termos
            </h2>
            <p className="text-gray-600 mb-6">
              Reservamo-nos o direito de modificar estes termos a qualquer momento. 
              O uso contínuo do site após alterações constitui aceitação dos novos termos.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              11. Contato
            </h2>
            <p className="text-gray-600 mb-6">
              Para questões sobre estes termos, entre em contato através do email: 
              contato@jptecidos.com.br
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
