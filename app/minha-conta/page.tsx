'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function MinhaContaPage() {
  const router = useRouter();

  useEffect(() => {
    // Verificar se tem token de autenticação
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('auth_token='))
      ?.split('=')[1];

    if (token) {
      // Se estiver logado, redirecionar para meus pedidos
      router.push('/minha-conta/meus-pedidos');
    } else {
      // Se não estiver logado, redirecionar para login
      router.push('/minha-conta/login');
    }
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-gray-600">Carregando...</p>
    </div>
  );
}
