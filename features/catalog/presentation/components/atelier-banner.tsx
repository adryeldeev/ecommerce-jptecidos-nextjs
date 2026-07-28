import Link from 'next/link';

const PLACEHOLDER_LABEL = (
  <span className="absolute top-3 right-3 z-10 text-[10px] uppercase tracking-wide text-white/40">
    Foto ilustrativa
  </span>
);

export function AtelierBanner() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Banner principal */}
          <Link
            href="/produtos"
            className="group relative lg:col-span-2 rounded-lg overflow-hidden min-h-[420px] flex items-end p-8 bg-gradient-to-br from-[#3d3530] to-[#1C1917]"
          >
            {PLACEHOLDER_LABEL}
            <div className="relative z-10 max-w-md">
              <p className="text-[#f5a623] text-sm font-semibold uppercase tracking-wide mb-2">
                Destaque
              </p>
              <h2 className="text-3xl font-playfair font-normal text-white mb-3">
                Para ateliês e costureiras
              </h2>
              <p className="text-white/80 mb-6">
                Tecidos de qualidade para os projetos mais exigentes. Compre no atacado e economize.
              </p>
              <span className="inline-block bg-[#f5a623] text-white font-semibold px-6 py-3 rounded-lg group-hover:bg-[#e0951c] transition-colors">
                Comprar Agora
              </span>
            </div>
          </Link>

          {/* Cards laterais */}
          <div className="flex flex-col gap-4">
            <Link
              href="/produtos?lancamento=true"
              className="group relative flex-1 min-h-[200px] rounded-lg overflow-hidden flex items-end p-6 bg-gradient-to-br from-[#DD8A05]/40 to-[#1C1917]"
            >
              {PLACEHOLDER_LABEL}
              <div className="relative z-10">
                <p className="text-white/70 text-xs font-semibold uppercase tracking-wide mb-1">
                  Chegadas
                </p>
                <h3 className="text-xl font-bold text-white mb-1">Novos Tecidos</h3>
                <span className="text-white text-sm font-medium group-hover:underline">
                  Ver agora →
                </span>
              </div>
            </Link>

            <Link
              href="/produtos?maisProcurado=true"
              className="group relative flex-1 min-h-[200px] rounded-lg overflow-hidden flex items-end p-6 bg-gradient-to-br from-gray-600 to-gray-800"
            >
              {PLACEHOLDER_LABEL}
              <div className="relative z-10">
                <p className="text-white/70 text-xs font-semibold uppercase tracking-wide mb-1">
                  Alta procura
                </p>
                <h3 className="text-xl font-bold text-white mb-1">Mais Procurados</h3>
                <span className="text-white text-sm font-medium group-hover:underline">
                  Aproveitar →
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
