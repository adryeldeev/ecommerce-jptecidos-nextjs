import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">JP Tecidos</h3>
            <p className="text-gray-400 text-sm">
              Loja online de tecidos de alta qualidade para costura e artesanato.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Institucional</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/sobre" className="hover:text-white">
                  Sobre nós
                </Link>
              </li>
              <li>
                <Link href="/contato" className="hover:text-white">
                  Contato
                </Link>
              </li>
              <li>
                <Link href="/politica-privacidade" className="hover:text-white">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="/termos" className="hover:text-white">
                  Termos de Uso
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Minha Conta</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/minha-conta/meus-pedidos" className="hover:text-white">
                  Meus Pedidos
                </Link>
              </li>
              <li>
                <Link href="/minha-conta/meus-enderecos" className="hover:text-white">
                  Meus Endereços
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Atendimento</h4>
            <p className="text-sm text-gray-400">
              Email: contato@jptecidos.com.br
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Telefone: (11) 1234-5678
            </p>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} JP Tecidos. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
