import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/types';

interface ProductCardFeaturedProps {
  product: Product;
}

export function ProductCardFeatured({ product }: ProductCardFeaturedProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div className="relative aspect-square bg-gray-100">
        {product.imagens && product.imagens.length > 0 ? (
          <Image
            src={product.imagens[0].url}
            alt={product.titulo}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <svg
              className="w-12 h-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
      </div>
      <div className="p-3">
        <h3 className="text-base font-semibold text-gray-900 mb-1 line-clamp-1">
          {product.titulo}
        </h3>
        <p className="text-xs text-gray-600 mb-3 line-clamp-1">
          {product.descricao || 'Tecido de alta qualidade'}
        </p>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-base font-bold text-[#DD8A05]">
              R$ {parseFloat(product.precoBase).toFixed(2)}
            </p>
            <p className="text-xs text-gray-500">
              por {product.unidadeMedida.toLowerCase()}
            </p>
          </div>
          <Link
            href={`/produtos/${product.slug}`}
            className="bg-[#DD8A05] cursor-pointer text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-[#c47a04] active:scale-95 transition-all"
          >
            Ver Detalhes
          </Link>
        </div>
      </div>
    </div>
  );
}
