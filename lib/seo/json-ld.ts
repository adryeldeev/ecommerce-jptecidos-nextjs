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
