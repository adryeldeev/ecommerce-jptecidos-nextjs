import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryClientProvider } from "@/lib/providers/query-provider";
import { WhatsAppButton } from "@/features/catalog/presentation/components/whatsapp-button";

const inter = Inter({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "JP Tecidos - E-commerce de Tecidos",
  description: "Loja online de tecidos de alta qualidade para costura e artesanato",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-inter">
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
