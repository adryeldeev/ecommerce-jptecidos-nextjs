import { SITE_URL } from './site';

export function generateLocalBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Store',
    name: 'JP Tecidos',
    description: 'Fornecimento de jeans, brim e algodão para confecções. Atacado e varejo em Fortaleza, com composição, cor e gramatura conferidas em cada lote.',
    url: SITE_URL,
    telephone: '+5585985661823',
    email: 'contato@jptecidos.com.br',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Fortaleza',
      addressRegion: 'CE',
      addressCountry: 'BR',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Brasil',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '11:50',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '13:30',
        closes: '16:50',
      },
    ],
  };
}

export function generateProductJsonLd(product: any) {
  const images = product.imagens?.map((img: any) => img.url) || [];
  const priceRange = product.variacoes?.length > 0
    ? (() => {
        const prices = product.variacoes
          .map((v: any) => v.preco ?? product.precoBase)
          .filter((p: any) => p !== undefined);
        if (prices.length === 0) return product.precoBase;
        const min = Math.min(...prices);
        const max = Math.max(...prices);
        return min === max ? min : `${min}-${max}`;
      })()
    : product.precoBase;

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.titulo,
    description: product.descricao,
    image: images,
    sku: product.variacoes?.[0]?.sku || product.id,
    brand: {
      '@type': 'Brand',
      name: product.fabricante?.nome || 'JP Tecidos',
    },
    offers: {
      '@type': 'Offer',
      price: typeof priceRange === 'string' ? priceRange.split('-')[0] : priceRange,
      priceCurrency: 'BRL',
      availability: product.variacoes?.some((v: any) => v.estoque > 0)
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
    },
    category: product.categoria?.nome,
  };
}

export function generateBreadcrumbJsonLd(items: Array<{ name: string; item: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  };
}
