'use client';

import { Header } from '@/features/catalog/presentation/components/header';
import { Footer } from '@/features/catalog/presentation/components/footer';
import { useAuth } from '@/features/account/application/use-auth';
import { userApi } from '@/features/account/infrastructure/user-api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateProfileSchema, updatePasswordSchema, type UpdateProfileFormData, type UpdatePasswordFormData } from '@/lib/validations/auth';
import { useState, useEffect } from 'react';

export default function ProfilePage() {
  const { user, setUser } = useAuth();
  const queryClient = useQueryClient();
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const { data: currentUser, isLoading: isLoadingUser } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => userApi.getMe(),
  });

  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: profileErrors, isSubmitting: isSubmittingProfile },
    reset: resetProfile,
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      nome: user?.nome || '',
      email: user?.email || '',
    },
  });

  // Reset form com dados atualizados quando currentUser carregar
  useEffect(() => {
    if (currentUser) {
      resetProfile({
        nome: currentUser.nome,
        email: currentUser.email,
      });
    }
  }, [currentUser, resetProfile]);

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: passwordErrors, isSubmitting: isSubmittingPassword },
    reset: resetPassword,
  } = useForm<UpdatePasswordFormData>({
    resolver: zodResolver(updatePasswordSchema),
  });

  const updateProfileMutation = useMutation({
    mutationFn: userApi.updateMe,
    onSuccess: (data) => {
      setUser(data);
      setProfileSuccess(true);
      setProfileError(null);
      setTimeout(() => setProfileSuccess(false), 3000);
    },
    onError: (error: any) => {
      setProfileError(error.message || 'Erro ao atualizar perfil');
      setProfileSuccess(false);
    },
  });

  const updatePasswordMutation = useMutation({
    mutationFn: userApi.updatePassword,
    onSuccess: () => {
      setPasswordSuccess(true);
      setPasswordError(null);
      resetPassword();
      setTimeout(() => setPasswordSuccess(false), 3000);
    },
    onError: (error: any) => {
      setPasswordError(error.message || 'Erro ao alterar senha');
      setPasswordSuccess(false);
    },
  });

  const onProfileSubmit = (data: UpdateProfileFormData) => {
    setProfileError(null);
    updateProfileMutation.mutate(data);
  };

  const onPasswordSubmit = (data: UpdatePasswordFormData) => {
    setPasswordError(null);
    updatePasswordMutation.mutate({
      senhaAtual: data.senhaAtual,
      novaSenha: data.novaSenha,
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Meus Dados
          </h1>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Informações Pessoais</h2>
            
            {profileSuccess && (
              <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-md mb-4">
                Dados atualizados com sucesso!
              </div>
            )}
            
            {profileError && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-4">
                {profileError}
              </div>
            )}
            
            <form onSubmit={handleSubmitProfile(onProfileSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome
                </label>
                <input
                  type="text"
                  {...registerProfile('nome')}
                  disabled={isLoadingUser || isSubmittingProfile}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#f5a623] focus:outline-none disabled:opacity-50"
                />
                {profileErrors.nome && (
                  <p className="text-sm text-red-600 mt-1">{profileErrors.nome.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  {...registerProfile('email')}
                  disabled={isLoadingUser || isSubmittingProfile}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#f5a623] focus:outline-none disabled:opacity-50"
                />
                {profileErrors.email && (
                  <p className="text-sm text-red-600 mt-1">{profileErrors.email.message}</p>
                )}
              </div>
              
              <button
                type="submit"
                disabled={isSubmittingProfile}
                className="bg-[#f5a623] text-white px-6 py-2 rounded-md font-semibold hover:bg-[#e0961f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmittingProfile ? 'Salvando...' : 'Salvar Alterações'}
              </button>
            </form>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-4">Alterar Senha</h2>
            
            {passwordSuccess && (
              <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-md mb-4">
                Senha alterada com sucesso!
              </div>
            )}
            
            {passwordError && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-4">
                {passwordError}
              </div>
            )}
            
            <form onSubmit={handleSubmitPassword(onPasswordSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Senha Atual
                </label>
                <input
                  type="password"
                  {...registerPassword('senhaAtual')}
                  disabled={isSubmittingPassword}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#f5a623] focus:outline-none disabled:opacity-50"
                />
                {passwordErrors.senhaAtual && (
                  <p className="text-sm text-red-600 mt-1">{passwordErrors.senhaAtual.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nova Senha
                </label>
                <input
                  type="password"
                  {...registerPassword('novaSenha')}
                  disabled={isSubmittingPassword}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#f5a623] focus:outline-none disabled:opacity-50"
                />
                {passwordErrors.novaSenha && (
                  <p className="text-sm text-red-600 mt-1">{passwordErrors.novaSenha.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirmar Nova Senha
                </label>
                <input
                  type="password"
                  {...registerPassword('confirmarNovaSenha')}
                  disabled={isSubmittingPassword}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#f5a623] focus:outline-none disabled:opacity-50"
                />
                {passwordErrors.confirmarNovaSenha && (
                  <p className="text-sm text-red-600 mt-1">{passwordErrors.confirmarNovaSenha.message}</p>
                )}
              </div>
              
              <button
                type="submit"
                disabled={isSubmittingPassword}
                className="bg-[#f5a623] text-white px-6 py-2 rounded-md font-semibold hover:bg-[#e0961f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmittingPassword ? 'Alterando...' : 'Alterar Senha'}
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
