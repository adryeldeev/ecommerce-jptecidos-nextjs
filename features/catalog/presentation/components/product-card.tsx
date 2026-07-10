import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/types';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/produtos/${product.slug || product.id}`}
      className="group block"
    >
      <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
        {product.imagem ? (
          <Image
            src={product.imagem}
            alt={product.titulo}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400">
            Sem imagem
          </div>
        )}
      </div>
      <div className="mt-3">
        <h3 className="font-medium text-gray-900 line-clamp-2">
          {product.titulo}
        </h3>
        <p className="mt-1 text-lg font-semibold text-gray-900">
          R$ {product.precoBase}
        </p>
        {product.unidadeMedida && (
          <p className="text-sm text-gray-500">
            por {product.unidadeMedida}
          </p>
        )}
      </div>
    </Link>
  );
}
