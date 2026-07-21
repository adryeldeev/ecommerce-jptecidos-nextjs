import Link from 'next/link';

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  backgroundColor?: string;
}

export function CTASection({
  title = "Teste a qualidade antes de fechar o pedido",
  subtitle = "Solicite uma amostra do jeans, brim ou algodão e comprove na prática a resistência e o padrão que sua confecção precisa — antes de comprar em grande volume.",
  primaryButtonText = "Solicitar amostra",
  primaryButtonLink = "/contato",
  secondaryButtonText = "Ver catálogo",
  secondaryButtonLink = "/produtos",
  backgroundColor = "bg-white",
}: CTASectionProps) {
  return (
    <section className={`py-16 md:py-24 ${backgroundColor}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#0a0a0a] mb-6">
          {title}
        </h2>
        <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto mb-10">
          {subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href={primaryButtonLink}
            className="bg-[#f5a623] text-white font-bold px-6 py-3 rounded-lg hover:bg-[#e0951c] active:scale-95 transition-all w-full sm:w-auto"
          >
            {primaryButtonText}
          </Link>
          <Link
            href={secondaryButtonLink}
            className="bg-white border-2 border-[#f5a623] text-[#f5a623] font-bold px-6 py-3 rounded-lg hover:bg-[#fff8ed] active:scale-95 transition-all w-full sm:w-auto"
          >
            {secondaryButtonText}
          </Link>
        </div>
      </div>
    </section>
  );
}
