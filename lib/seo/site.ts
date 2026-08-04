// Enquanto não houver domínio próprio, usa a URL que o Vercel atribui
// automaticamente a cada deploy (VERCEL_PROJECT_PRODUCTION_URL). Depois de
// conectar um domínio próprio, troque a linha abaixo por uma constante fixa,
// ex: export const SITE_URL = 'https://jptecidos.com.br';
const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;

export const SITE_URL = vercelUrl ? `https://${vercelUrl}` : 'http://localhost:3000';
export const SITE_NAME = 'JP Tecidos';
