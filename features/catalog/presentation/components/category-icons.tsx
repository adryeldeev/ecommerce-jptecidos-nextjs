import Link from 'next/link';
import { Baby, Bed, Gem, Scissors, Shirt, Sofa, Sprout, Tag, type LucideIcon } from 'lucide-react';
import type { Finalidade } from '@/lib/types';

const FINALIDADES: Array<{ valor: Finalidade; label: string; icon: LucideIcon }> = [
  { valor: 'moda', label: 'Moda', icon: Shirt },
  { valor: 'decoracao', label: 'Decoração', icon: Sofa },
  { valor: 'alfaiataria', label: 'Alfaiataria', icon: Scissors },
  { valor: 'infantil', label: 'Infantil', icon: Baby },
  { valor: 'cama-banho', label: 'Cama & Banho', icon: Bed },
  { valor: 'natural', label: 'Natural', icon: Sprout },
  { valor: 'premium', label: 'Premium', icon: Gem },
  { valor: 'promocao', label: 'Promoção', icon: Tag },
];

export function CategoryIcons() {
  return (
    <section className="bg-white py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {FINALIDADES.map(({ valor, label, icon: Icon }) => (
            <Link
              key={valor}
              href={`/produtos?finalidade=${valor}`}
              className="group flex flex-col items-center gap-2"
            >
              <div className="w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center text-gray-700 group-hover:border-[#f5a623] group-hover:text-[#f5a623] transition-colors">
                <Icon className="w-6 h-6" />
              </div>
              <span className="text-xs font-medium text-gray-600 uppercase tracking-wide group-hover:text-[#f5a623] transition-colors">
                {label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
