'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/features/account/application/use-auth';
import { useCart } from '@/features/cart/application/use-cart';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();
  const cart = useCart((state) => state.cart);
  const cartItemCount = Math.round(cart?.quantidadeTotal ?? 0);
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
            <Image
              src={shouldShowScrolled ? '/jptecidos-dark.webp' : '/jptecidos-light.webp'}
              alt="JP Tecidos"
              width={202}
              height={42}
              priority
              className="h-8 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
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
              href="/#contato"
              className={`font-medium ${shouldShowScrolled ? 'text-gray-900 hover:text-gray-700' : 'text-white hover:text-gray-200'}`}
            >
              Contato
            </Link>
          </nav>

          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Search Input - Hidden on mobile */}
            <form onSubmit={handleSearch} className="relative hidden sm:block">
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

            <div className="relative">
              <Link
                href="/minha-conta"
                className={`${shouldShowScrolled ? 'text-[#DD8A05] hover:text-[#c47a04]' : 'text-white hover:text-gray-200'} p-1`}
                onClick={(e) => {
                  if (isAuthenticated) {
                    e.preventDefault();
                    setIsUserMenuOpen(!isUserMenuOpen);
                  }
                }}
              >
                {isAuthenticated && user ? (
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#f5a623] flex items-center justify-center text-white font-semibold cursor-pointer">
                    {user.nome.charAt(0).toUpperCase()}
                  </div>
                ) : (
                  <svg
                    className="h-5 w-5 md:h-6 md:w-6"
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
                )}
              </Link>
              {isUserMenuOpen && isAuthenticated && user && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <Link
                    href="/minha-conta/perfil"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    Minha Conta
                  </Link>
                  <Link
                    href="/minha-conta/meus-pedidos"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    Meus Pedidos
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsUserMenuOpen(false);
                      router.push('/');
                    }}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Sair
                  </button>
                </div>
              )}
            </div>
            <Link
              href="/carrinho"
              className={`relative ${shouldShowScrolled ? 'text-[#DD8A05] hover:text-[#c47a04]' : 'text-white hover:text-gray-200'} p-1`}
            >
              <svg
                className="h-5 w-5 md:h-6 md:w-6"
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
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-[#f5a623] px-1 text-[10px] font-semibold leading-none text-white">
                  {cartItemCount > 99 ? '99+' : cartItemCount}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 ${shouldShowScrolled ? 'text-gray-900' : 'text-white'}`}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-3">
              <Link
                href="/produtos"
                className={`font-medium ${shouldShowScrolled ? 'text-gray-900 hover:text-gray-700' : 'text-white hover:text-gray-200'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Produtos
              </Link>
              <Link
                href="/sobre"
                className={`font-medium ${shouldShowScrolled ? 'text-gray-900 hover:text-gray-700' : 'text-white hover:text-gray-200'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sobre
              </Link>
              <Link
                href="/#contato"
                className={`font-medium ${shouldShowScrolled ? 'text-gray-900 hover:text-gray-700' : 'text-white hover:text-gray-200'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contato
              </Link>
              {/* Mobile search */}
              <form onSubmit={handleSearch} className="relative sm:hidden">
                <input
                  type="text"
                  placeholder="Buscar produtos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-full border border-gray-300 bg-white px-4 py-2 pr-10 text-sm focus:border-[#DD8A05] focus:outline-none"
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
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
