import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { QueryClientProvider } from "@/lib/providers/query-provider";

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ["latin"],
  variable: "--font-poppins",
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
      className={`${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-poppins">
        <QueryClientProvider>
          <div className="pt-16">
            {children}
          </div>
        </QueryClientProvider>
      </body>
    </html>
  );
}
