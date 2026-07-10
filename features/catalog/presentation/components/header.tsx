'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 889);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Em outras páginas, sempre mostra como se tivesse scrollado
  const shouldShowScrolled = !isHomePage || isScrolled;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/produtos?busca=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-lg transition-colors duration-300 ${
      shouldShowScrolled ? 'bg-white/90' : 'bg-transparent'
    }`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center">
            <span className={`text-xl font-bold ${shouldShowScrolled ? 'text-gray-900' : 'text-white'}`}>
              JP Tecidos
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/produtos"
              className={`font-medium ${shouldShowScrolled ? 'text-gray-900 hover:text-gray-700' : 'text-white hover:text-gray-200'}`}
            >
              Produtos
            </Link>
            <Link
              href="/sobre"
              className={`font-medium ${shouldShowScrolled ? 'text-gray-900 hover:text-gray-700' : 'text-white hover:text-gray-200'}`}
            >
              Sobre
            </Link>
            <Link
              href="/contato"
              className={`font-medium ${shouldShowScrolled ? 'text-gray-900 hover:text-gray-700' : 'text-white hover:text-gray-200'}`}
            >
              Contato
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {/* Search Input */}
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 md:w-64 rounded-full border border-gray-300 bg-white px-4 py-2 pr-10 text-sm focus:border-[#DD8A05] focus:outline-none"
              />
              <button
                type="submit"
                className="absolute right-1 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full bg-[#DD8A05] text-white hover:bg-[#c47a04] transition-colors"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </form>

            <Link
              href="/minha-conta"
              className={shouldShowScrolled ? 'text-[#DD8A05] hover:text-[#c47a04]' : 'text-white hover:text-gray-200'}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </Link>
            <Link 
              href="/carrinho" 
              className={shouldShowScrolled ? 'text-[#DD8A05] hover:text-[#c47a04]' : 'text-white hover:text-gray-200'}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
