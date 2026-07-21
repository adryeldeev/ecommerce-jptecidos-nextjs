import { Header } from '@/features/catalog/presentation/components/header';
import { Footer } from '@/features/catalog/presentation/components/footer';
import { FeaturedProducts } from '@/features/catalog/presentation/components/featured-products';
import { NewProducts } from '@/features/catalog/presentation/components/new-products';
import { WhyChooseJP } from '@/features/catalog/presentation/components/why-choose-jp';
import { Testimonials } from '@/features/catalog/presentation/components/testimonials';
import { CTASection } from '@/features/catalog/presentation/components/cta-section';
import Link from 'next/link';
import Image from 'next/image';

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
                 Tecido que não compromete o resultado da sua peça.
                </h1>
                <p className="text-[16px] text-white mb-8 leading-relaxed">
                  Fio resistente, tingimento uniforme e composição 
                  garantida em cada lote. Jeans, brim e algodão prontos 
                  para aguentar corte, costura e lavagem industrial 
                  sem perder padrão.
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
              <div className="mt-44 max-w-3xl mx-auto">
                <div className="border-t border-b border-white/30 py-8">
                  <div className="grid grid-cols-3 divide-x divide-white/30">
                    <div className="text-center px-4">
                      <p className="text-4xl font-bold text-white mb-2">+20</p>
                      <p className="text-white text-sm">Anos de Tradição</p>
                    </div>
                    <div className="text-center px-4">
                      <p className="text-4xl font-bold text-white mb-2">+100</p>
                      <p className="text-white text-sm">Confecções Atendidas</p>
                    </div>
                    <div className="text-center px-4">
                      <p className="text-4xl font-bold text-white mb-2">+98%</p>
                      <p className="text-white text-sm">Satisfação Garantida</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <FeaturedProducts />

        <WhyChooseJP />

        <NewProducts />

        {/* Featured Categories */}
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Categorias
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: 'Jeans', image: '/imgCategoriaJP.svg' },
                { name: 'Malha', image: '/imgCategoriaJP02.svg' },
                { name: 'Linho', image: '/imgCategoriaJP03.svg' },
                { name: 'Algodão', image: '/imgCategoriaJP04.svg' },
              ].map((category) => (
                <Link
                  key={category.name}
                  href={`/produtos?categoria=${category.name.toLowerCase()}`}
                  className="group relative h-48 rounded-lg overflow-hidden  h-[300px]"
                >
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-xl font-semibold text-white">
                      {category.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <Testimonials />

        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
