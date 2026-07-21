'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ProductImageGalleryProps {
  images: { url: string; ordem: number }[];
  alt: string;
}

export function ProductImageGallery({ images, alt }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const sortedImages = [...images].sort((a, b) => a.ordem - b.ordem);

  if (sortedImages.length === 0) {
    return (
      <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
        <span className="text-gray-400">Sem imagem</span>
      </div>
    );
  }

  return (
    <div className="space-y-3 md:space-y-4">
      {/* Imagem principal */}
      <div className="relative aspect-[4/3] md:aspect-square bg-gray-100 rounded-lg overflow-hidden">
        <Image
          src={sortedImages[selectedImage].url}
          alt={`${alt} - Imagem ${selectedImage + 1}`}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Miniaturas */}
      {sortedImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {sortedImages.map((image, index) => (
            <button
              key={image.url}
              onClick={() => setSelectedImage(index)}
              className={`relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-colors ${
                selectedImage === index
                  ? 'border-[#DD8A05]'
                  : 'border-transparent hover:border-gray-300'
              }`}
            >
              <Image
                src={image.url}
                alt={`${alt} - Miniatura ${index + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
