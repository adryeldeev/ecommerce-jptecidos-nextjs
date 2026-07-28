import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { QueryClientProvider } from "@/lib/providers/query-provider";
import { WhatsAppButton } from "@/features/catalog/presentation/components/whatsapp-button";
import { generateLocalBusinessJsonLd } from "@/lib/seo/json-ld";
import { SITE_URL } from "@/lib/seo/site";

const inter = Inter({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfairDisplay = Playfair_Display({
  weight: ['400', '500', '600'],
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "JP Tecidos - Tecido, Jeans e Têxtil em Fortaleza",
  description: "Loja de tecidos e têxtil em Fortaleza: jeans, brim e algodão para confecções, atacado e varejo. Composição, cor e gramatura conferidas em cada lote.",
  keywords: [
    "tecido em fortaleza",
    "têxtil em fortaleza",
    "têxtil",
    "retalho",
    "jeans em fortaleza",
    "loja de jeans",
    "tecidos",
    "brim",
    "algodão",
    "matéria-prima têxtil",
  ],
  openGraph: {
    title: "JP Tecidos - Tecido, Jeans e Têxtil em Fortaleza",
    description: "Loja de tecidos e têxtil em Fortaleza: jeans, brim e algodão para confecções, atacado e varejo.",
    url: SITE_URL,
    siteName: "JP Tecidos",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const localBusinessJsonLd = generateLocalBusinessJsonLd();

  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${playfairDisplay.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <QueryClientProvider>
          <div className="pt-16">
            {children}
          </div>
          <WhatsAppButton />
        </QueryClientProvider>
      </body>
    </html>
  );
}
