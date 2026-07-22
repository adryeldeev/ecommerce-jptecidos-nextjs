import Link from 'next/link';
import { MessageCircle, Mail, Phone, MapPin, Clock, CreditCard, QrCode, FileText } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Coluna Sobre */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#f5a623]">JP Tecidos</h3>
            <p className="text-gray-400 text-sm mb-6">
              Matéria-prima têxtil de alta qualidade para grandes confecções. 
              Confiabilidade e constância em cada metro.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/jptecidos"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#f5a623] transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://wa.me/5585985661823"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#f5a623] transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Coluna Produtos */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Produtos</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/produtos?categoria=jeans" className="hover:text-[#f5a623] transition-colors">
                  Jeans
                </Link>
              </li>
              <li>
                <Link href="/produtos?categoria=brim" className="hover:text-[#f5a623] transition-colors">
                  Brim
                </Link>
              </li>
              <li>
                <Link href="/produtos?categoria=algodao" className="hover:text-[#f5a623] transition-colors">
                  Algodão
                </Link>
              </li>
              <li>
                <Link href="/produtos?categoria=rolos-atacado" className="hover:text-[#f5a623] transition-colors">
                  Rolos em Atacado
                </Link>
              </li>
              <li>
                <Link href="/produtos?categoria=retalhos" className="hover:text-[#f5a623] transition-colors">
                  Retalhos
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna Institucional */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Institucional</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/sobre" className="hover:text-[#f5a623] transition-colors">
                  Sobre
                </Link>
              </li>
              <li>
                <Link href="/como-comprar" className="hover:text-[#f5a623] transition-colors">
                  Como Comprar
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#f5a623] transition-colors">
                  Perguntas Frequentes
                </Link>
              </li>
              <li>
                <Link href="/politica-trocas" className="hover:text-[#f5a623] transition-colors">
                  Política de Trocas
                </Link>
              </li>
              <li>
                <Link href="/termos-uso" className="hover:text-[#f5a623] transition-colors">
                  Termos de Uso
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna Contato */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Contato</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="hover:text-white transition-colors cursor-pointer">
                    (85) 98566-1823
                  </p>
                  <p className="text-xs text-gray-500">WhatsApp</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <p className="hover:text-white transition-colors cursor-pointer">
                  contato@jptecidos.com.br
                </p>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <p>Atendemos todo o Brasil</p>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div>
                  <p>Seg - Sex: 08h às 11h50 e 13h30 às 16h50</p>
                  <p className="text-xs text-gray-500">Horário de atendimento</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Linha inferior */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-400 text-center md:text-left">
              <p>&copy; 2026 JP Tecidos. Todos os direitos reservados.</p>
              <p className="text-xs text-gray-500 mt-1">CNPJ: 29.658.603/0001-67</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-gray-500">
                <CreditCard className="w-5 h-5" />
                <span className="text-xs">Cartão</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <QrCode className="w-5 h-5" />
                <span className="text-xs">PIX</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <FileText className="w-5 h-5" />
                <span className="text-xs">Boleto</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
