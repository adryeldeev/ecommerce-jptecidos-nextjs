import { Header } from '@/features/catalog/presentation/components/header';
import { Footer } from '@/features/catalog/presentation/components/footer';

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            Política de Privacidade
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              Última atualização: Julho de 2026
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              1. Coleta de Informações
            </h2>
            <p className="text-gray-600 mb-6">
              Coletamos informações que você nos fornece diretamente, como nome, email, 
              endereço e informações de pagamento quando você cria uma conta ou faz um pedido.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              2. Uso das Informações
            </h2>
            <p className="text-gray-600 mb-6">
              Utilizamos suas informações para processar pedidos, enviar atualizações sobre 
              seu pedido, melhorar nossos serviços e comunicar promoções e novidades.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              3. Compartilhamento de Informações
            </h2>
            <p className="text-gray-600 mb-6">
              Não vendemos suas informações pessoais. Compartilhamos dados apenas com 
              parceiros necessários para processar pedidos e pagamentos.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              4. Segurança
            </h2>
            <p className="text-gray-600 mb-6">
              Implementamos medidas de segurança para proteger suas informações pessoais 
              contra acesso não autorizado, alteração ou destruição.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              5. Cookies
            </h2>
            <p className="text-gray-600 mb-6">
              Utilizamos cookies para melhorar sua experiência de navegação, analisar 
              o uso do site e personalizar conteúdo.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              6. Seus Direitos
            </h2>
            <p className="text-gray-600 mb-6">
              Você tem direito a acessar, corrigir ou excluir suas informações pessoais. 
              Entre em contato conosco para exercer esses direitos.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              7. Contato
            </h2>
            <p className="text-gray-600 mb-6">
              Para questões sobre esta política de privacidade, entre em contato através 
              do email: privacidade@jptecidos.com.br
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
