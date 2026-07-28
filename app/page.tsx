import { Header } from '@/features/catalog/presentation/components/header';
import { Footer } from '@/features/catalog/presentation/components/footer';
import { FeaturedProducts } from '@/features/catalog/presentation/components/featured-products';
import { NewProducts } from '@/features/catalog/presentation/components/new-products';
import { AtelierBanner } from '@/features/catalog/presentation/components/atelier-banner';
import { CategoryIcons } from '@/features/catalog/presentation/components/category-icons';
import { CategoryMarquee } from '@/features/catalog/presentation/components/category-marquee';
import { CategoriesSection } from '@/features/catalog/presentation/components/categories-section';
import { Testimonials } from '@/features/catalog/presentation/components/testimonials';
import { CTASection } from '@/features/catalog/presentation/components/cta-section';
import Link from 'next/link';
import { CreditCard, QrCode, FileText } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative -mt-8 md:-mt-16 bg-[#1C1917] overflow-hidden">
          {/* Video Background — versão leve por dispositivo (sem áudio) + poster pra evitar tela em branco */}
          <div className="absolute inset-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              poster="/hero-poster.jpg"
              className="w-full h-full object-cover"
            >
              <source src="/hero-mobile.webm" type="video/webm" media="(max-width: 767px)" />
              <source src="/hero-desktop.webm" type="video/webm" />
            </video>
            <div className="absolute inset-0 bg-[#1C1917]/50" />
          </div>

          {/* Content */}
          <div className="relative z-10 py-20 md:py-28">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-3xl">
                <h1 className="text-3xl sm:text-4xl md:text-[44px] font-playfair font-normal text-white mb-6 leading-tight">
                  Tecidos que
                  <br />
                  inspiram criar.
                </h1>
                <p className="text-sm sm:text-base text-white mb-8 leading-relaxed">
                  Composição garantida, cor uniforme e fio resistente
                  em cada lote — pra quem costura em casa ou produz
                  em escala. Jeans, brim e algodão prontos para
                  qualquer projeto.
                </p>
                <div className="flex gap-4">
                  <Link
                    href="/produtos"
                    className="inline-block bg-[#DD8A05] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#c47a04] transition-colors"
                  >
                    Ver Produtos
                  </Link>
                  <Link
                    href="#contato"
                    className="inline-block bg-white text-[#DD8A05] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Contato
                  </Link>
                </div>
              </div>

              {/* Authority Stats */}
              <div className="mt-12 md:mt-16 max-w-3xl mx-auto">
                <div className="border-t border-b border-white/30 py-8">
                  <div className="grid grid-cols-3 divide-x divide-white/30">
                    <div className="text-center px-4">
                      <p className="text-2xl md:text-4xl font-bold text-white mb-2">+20</p>
                      <p className="text-white text-xs md:text-sm">Anos de Tradição</p>
                    </div>
                    <div className="text-center px-4">
                      <p className="text-2xl md:text-4xl font-bold text-white mb-2">+100</p>
                      <p className="text-white text-xs md:text-sm">Confecções Atendidas</p>
                    </div>
                    <div className="text-center px-4">
                      <p className="text-2xl md:text-4xl font-bold text-white mb-2">+98%</p>
                      <p className="text-white text-xs md:text-sm">Satisfação Garantida</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CategoryIcons />

        <FeaturedProducts />

        <AtelierBanner />

        <NewProducts />
        <CategoryMarquee />

        <CategoriesSection />

        <Testimonials />

        <CTASection id="contato" backgroundColor="bg-[#1C1917]" dark />

        {/* Selos de pagamento */}
        <section className="py-10 bg-white border-t border-gray-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
              <p className="text-sm font-medium text-gray-500">
                Pagamento 100% seguro
              </p>
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-2 text-gray-700">
                  <CreditCard className="w-6 h-6" />
                  <span className="text-sm font-medium">Cartão</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <QrCode className="w-6 h-6" />
                  <span className="text-sm font-medium">PIX</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <FileText className="w-6 h-6" />
                  <span className="text-sm font-medium">Boleto</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
