import { Header } from '@/features/catalog/presentation/components/header';
import { Footer } from '@/features/catalog/presentation/components/footer';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative -mt-8 md:-mt-16 h-[859px] bg-black overflow-hidden">
          {/* Video Background */}
          <div className="absolute inset-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              style={{ objectFit: 'cover' }}
            >
              <source src="/video.webm" type="video/webm" />
            </video>
            <div className="absolute inset-0 bg-black/50" />
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex items-center">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-3xl">
                <h1 className="text-[44.44px] font-bold text-white mb-6 leading-tight">
                  Matéria-Prima Têxtil de Alta Performance para Grandes Confecções
                </h1>
                <p className="text-[16px] text-white mb-8 leading-relaxed">
                  Explore nossa linha exclusiva de rolos de jeans primário estruturado e tecidos tecnológicos. Condições exclusivas de atacado para marcas de moda e fabricantes.
                </p>
                <div className="flex gap-4">
                  <Link
                    href="/produtos"
                    className="inline-block bg-[#DD8A05] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#c47a04] transition-colors"
                  >
                    Ver Produtos
                  </Link>
                  <Link
                    href="/contato"
                    className="inline-block bg-white text-[#DD8A05] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Contato
                  </Link>
                </div>
              </div>

              {/* Authority Stats */}
              <div className="mt-44 grid grid-cols-3 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
                <div className="text-center">
                  <p className="text-4xl font-bold text-white mb-2">+20</p>
                  <p className="text-white text-sm">Anos de Tradição</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-white mb-2">+100</p>
                  <p className="text-white text-sm">Confecções Atendidas</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-white mb-2">+98%</p>
                  <p className="text-white text-sm">Satisfação Garantida</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Categories */}
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Categorias em Destaque
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['Algodão', 'Seda', 'Linho'].map((category) => (
                <Link
                  key={category}
                  href={`/produtos?categoria=${category.toLowerCase()}`}
                  className="group relative h-48 rounded-lg overflow-hidden bg-gray-100"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-xl font-semibold text-white">
                      {category}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-[#DD8A05] text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Comece seu projeto hoje
            </h2>
            <p className="text-lg mb-8">
              Explore nossa coleção e encontre o tecido perfeito para sua criação
            </p>
            <Link
              href="/produtos"
              className="inline-block bg-white text-[#DD8A05] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Explorar Catálogo
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
