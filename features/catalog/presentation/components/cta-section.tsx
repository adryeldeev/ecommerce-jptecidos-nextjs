import Link from 'next/link';
import type { ReactNode } from 'react';

interface CTASectionProps {
  title?: ReactNode;
  subtitle?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  backgroundColor?: string;
  dark?: boolean;
  id?: string;
}

export function CTASection({
  title = (
    <>
      Compre com a <span className="text-[#f5a623]">segurança</span> de saber o que está levando
    </>
  ),
  subtitle = "Composição, cor e gramatura conferidas em cada lote antes de chegar até você. Peça jeans, brim ou algodão com a confiança de receber exatamente o padrão que sua confecção precisa.",
  primaryButtonText = "Falar no Whatsapp",
  primaryButtonLink = "https://wa.me/5585985661823",
  secondaryButtonText = "Ver Ofertas",
  secondaryButtonLink = "/produtos",
  backgroundColor = "bg-white",
  dark = false,
  id,
}: CTASectionProps) {
  const isPrimaryExternal = primaryButtonLink.startsWith('http');
  const isSecondaryExternal = secondaryButtonLink.startsWith('http');

  return (
    <section id={id} className={`py-16 md:py-24 scroll-mt-20 ${backgroundColor}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className={`text-3xl md:text-4xl font-playfair font-normal mb-6 ${dark ? 'text-white' : 'text-[#1C1917]'}`}>
          {title}
        </h2>
        <p className={`text-base md:text-lg max-w-3xl mx-auto mb-10 ${dark ? 'text-gray-300' : 'text-gray-500'}`}>
          {subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href={primaryButtonLink}
            target={isPrimaryExternal ? '_blank' : undefined}
            rel={isPrimaryExternal ? 'noopener noreferrer' : undefined}
            className="bg-[#f5a623] text-white font-bold px-6 py-3 rounded-lg hover:bg-[#e0951c] active:scale-95 transition-all w-full sm:w-auto"
          >
            {primaryButtonText}
          </Link>
          <Link
            href={secondaryButtonLink}
            target={isSecondaryExternal ? '_blank' : undefined}
            rel={isSecondaryExternal ? 'noopener noreferrer' : undefined}
            className="bg-white border-2 border-[#f5a623] text-[#f5a623] font-bold px-6 py-3 rounded-lg hover:bg-[#fff8ed] active:scale-95 transition-all w-full sm:w-auto"
          >
            {secondaryButtonText}
          </Link>
        </div>
      </div>
    </section>
  );
}
