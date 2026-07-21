import { api } from '@/lib/api/client';

interface User {
  id: string;
  email: string;
  nome: string;
  ehAdmin: boolean;
  criadoEm: string;
}

interface UpdateProfileData {
  nome?: string;
  email?: string;
}

interface UpdatePasswordData {
  senhaAtual: string;
  novaSenha: string;
}

export const userApi = {
  getMe: async () => {
    return api.get('/usuarios/me') as Promise<User>;
  },

  updateMe: async (data: UpdateProfileData) => {
    return api.patch('/usuarios/me', data) as Promise<User>;
  },

  updatePassword: async (data: UpdatePasswordData) => {
    return api.patch('/usuarios/me/senha', data) as Promise<{ message: string }>;
  },
};
