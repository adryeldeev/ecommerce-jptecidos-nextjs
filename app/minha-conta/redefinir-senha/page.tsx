'use client';

import { Header } from '@/features/catalog/presentation/components/header';
import { Footer } from '@/features/catalog/presentation/components/footer';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema, type ResetPasswordFormData } from '@/lib/validations/auth';
import { authApi } from '@/features/account/infrastructure/auth-api';
import Link from 'next/link';
import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col min-h-screen">
          <Header />
          <Footer />
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { token },
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      await authApi.resetPassword(data.token, data.novaSenha);
      setSuccess(true);
    } catch (err) {
      setError('Erro ao redefinir senha. O token pode ter expirado.');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 py-12">
          <div className="mx-auto max-w-md px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
              <h1 className="text-2xl font-playfair font-normal text-gray-900 mb-4">
                Senha Redefinida
              </h1>
              <p className="text-gray-600 mb-6">
                Sua senha foi redefinida com sucesso.
              </p>
              <Link
                href="/minha-conta/login"
                className="text-[#f5a623] hover:underline"
              >
                Fazer login
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 py-12">
        <div className="mx-auto max-w-md px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <h1 className="text-2xl font-playfair font-normal text-gray-900 mb-6 text-center">
              Redefinir Senha
            </h1>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nova Senha
                </label>
                <input
                  type="password"
                  {...register('novaSenha')}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-gray-500 focus:outline-none"
                />
                {errors.novaSenha && (
                  <p className="text-sm text-red-600 mt-1">{errors.novaSenha.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#f5a623] text-white py-2 rounded-md font-semibold hover:bg-[#e0961f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Redefinindo...' : 'Redefinir Senha'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link
                href="/minha-conta/login"
                className="text-sm text-[#f5a623] hover:underline"
              >
                Voltar para o login
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
