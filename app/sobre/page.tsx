import { Header } from '@/features/catalog/presentation/components/header';
import { Footer } from '@/features/catalog/presentation/components/footer';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            Sobre a JP Tecidos
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              A JP Tecidos é uma loja especializada em tecidos de alta qualidade para costura e artesanato. 
              Desde 2010, oferecemos os melhores produtos para costureiras, designers e artesãos de todo o Brasil.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              Nossa Missão
            </h2>
            <p className="text-gray-600 mb-6">
              Proporcionar tecidos de qualidade excepcional a preços acessíveis, inspirando criatividade 
              e transformando projetos em realidade.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              Nossos Valores
            </h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Qualidade em cada produto</li>
              <li>Atendimento personalizado</li>
              <li>Preços justos</li>
              <li>Sustentabilidade</li>
              <li>Inovação constante</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              Por que escolher a JP Tecidos?
            </h2>
            <p className="text-gray-600 mb-6">
              Trabalhamos com as melhores marcas e fornecedores do mercado, garantindo a qualidade 
              de todos os nossos produtos. Nossa equipe é especializada e pronta para ajudar você 
              a encontrar o tecido perfeito para seu projeto.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
