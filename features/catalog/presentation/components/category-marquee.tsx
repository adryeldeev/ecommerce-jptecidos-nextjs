'use client';

import { useCategories } from '@/features/catalog/application/use-products';

export function CategoryMarquee() {
  const { data: categories = [] } = useCategories();

  if (categories.length === 0) {
    return null;
  }

  const names = categories.map((category) => category.nome.toUpperCase());
  // Repete a lista várias vezes antes de duplicar — com poucas categorias
  // cadastradas, o bloco de texto sozinho não preenche a largura da tela e
  // sobra um vão vazio até o loop reiniciar.
  const REPEAT = 8;
  const repeated = Array.from({ length: REPEAT }, () => names).flat();
  const loop = [...repeated, ...repeated];

  return (
    <div className="bg-[#1C1917] py-4 overflow-hidden">
      <div className="flex w-max whitespace-nowrap animate-marquee">
        {loop.map((name, index) => (
          <span key={index} className="flex items-center text-sm font-medium tracking-widest text-white/80">
            {name}
            <span className="mx-6 text-[#f5a623]">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
