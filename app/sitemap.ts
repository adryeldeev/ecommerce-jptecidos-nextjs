import type { MetadataRoute } from 'next';
import { productApi } from '@/features/catalog/infrastructure/product-api';
import { SITE_URL } from '@/lib/seo/site';

const STATIC_ROUTES: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
  priority: number;
}> = [
  { path: '', changeFrequency: 'daily', priority: 1 },
  { path: '/produtos', changeFrequency: 'daily', priority: 0.9 },
  { path: '/sobre', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/contato', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/como-comprar', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/faq', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/politica-trocas', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/termos-uso', changeFrequency: 'yearly', priority: 0.3 },
];

async function getAllProductSlugs(): Promise<string[]> {
  const slugs: string[] = [];
  let page = 1;
  const limit = 100;

  try {
    while (true) {
      const response = await productApi.getProducts({ page, limit });
      slugs.push(...response.items.map((product) => product.slug));

      if (page >= response.totalPages) break;
      page += 1;
    }
  } catch {
    // Se a API estiver fora do ar no momento do build, o sitemap sai só com as rotas estáticas.
  }

  return slugs;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const slugs = await getAllProductSlugs();
  const productEntries: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${SITE_URL}/produtos/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticEntries, ...productEntries];
}
