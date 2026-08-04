import { Header } from '@/features/catalog/presentation/components/header';
import { Footer } from '@/features/catalog/presentation/components/footer';
import { ProductImageGallery } from '@/features/catalog/presentation/components/product-image-gallery';
import { ProductDetailClient } from '@/features/catalog/presentation/components/product-detail-client';
import { RelatedProducts } from '@/features/catalog/presentation/components/related-products';
import { productApi } from '@/features/catalog/infrastructure/product-api';
import { generateProductJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo/json-ld';
import { Product } from '@/lib/types';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  try {
    const product = await productApi.getProductBySlug(slug);

    return {
      title: `${product.titulo} | JP Tecidos`,
      description: product.descricao || `${product.titulo} - Tecido de alta qualidade para confecções`,
      openGraph: {
        title: product.titulo,
        description: product.descricao || `${product.titulo} - Tecido de alta qualidade para confecções`,
        images: product.imagens?.map((img) => img.url) || [],
        type: 'website',
      },
      alternates: {
        canonical: `/produtos/${slug}`,
      },
    };
  } catch (error) {
    return {
      title: 'Produto não encontrado | JP Tecidos',
    };
  }
}

export const revalidate = 300; // ISR - revalida a cada 5 minutos

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  let product: Product;

  try {
    product = await productApi.getProductBySlug(slug);
  } catch (error) {
    notFound();
  }

  // Buscar produtos relacionados (pede 5, corta para 4 após excluir atual)
  let relatedProducts: Product[] = [];
  try {
    const relatedResponse = await productApi.getProducts({
      categoriaSlug: product.categoria.slug,
      limit: 5,
    });
    relatedProducts = relatedResponse.items
      .filter((p) => p.id !== product.id)
      .slice(0, 4);
  } catch (error) {
    // Se falhar, continua sem produtos relacionados
  }

  const productJsonLd = generateProductJsonLd(product);
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', item: '/' },
    { name: product.categoria.nome, item: `/produtos?categoria=${product.categoria.slug}` },
    { name: product.titulo, item: `/produtos/${product.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-1 py-8 md:py-12 overflow-x-hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="mb-6 md:mb-8 text-xs md:text-sm text-gray-600">
              <ol className="flex items-center gap-1 md:gap-2 flex-wrap">
                <li>
                  <Link href="/" className="hover:text-gray-900">
                    Home
                  </Link>
                </li>
                <li>/</li>
                <li>
                  <Link
                    href={`/produtos?categoria=${product.categoria.slug}`}
                    className="hover:text-gray-900"
                  >
                    {product.categoria.nome}
                  </Link>
                </li>
                <li>/</li>
                <li className="text-gray-900 truncate max-w-[150px] sm:max-w-[200px] md:max-w-none">{product.titulo}</li>
              </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
              {/* Galeria de imagens */}
              <div className="overflow-hidden">
                <ProductImageGallery
                  images={product.imagens}
                  alt={product.titulo}
                />
              </div>

              {/* Informações do produto */}
              <div className="overflow-hidden">
                <ProductDetailClient product={product} />
              </div>
            </div>

            {/* Produtos relacionados */}
            <RelatedProducts
              products={relatedProducts}
              currentProductId={product.id}
            />
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
