import { api } from '@/lib/api/client';
import { LoginRequest, RegisterRequest, AuthResponse } from '@/lib/types';

export const authApi = {
  login: async (data: LoginRequest) => {
    return api.post('/auth/login', data) as Promise<AuthResponse>;
  },

  register: async (data: RegisterRequest) => {
    return api.post('/auth/register', data) as Promise<AuthResponse>;
  },

  forgotPassword: async (email: string) => {
    return api.post('/auth/forgot-password', { email });
  },

  resetPassword: async (token: string, novaSenha: string) => {
    return api.post('/auth/reset-password', { token, novaSenha });
  },
};
