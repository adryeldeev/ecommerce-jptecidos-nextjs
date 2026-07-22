import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/carrinho',
        '/checkout',
        '/pedido-sucesso',
        '/minha-conta',
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
