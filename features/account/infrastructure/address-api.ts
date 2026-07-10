import { api } from '@/lib/api/client';
import { Address } from '@/lib/types';

export const addressApi = {
  create: async (data: Omit<Address, 'id'>) => {
    return api.post('/enderecos', data) as Promise<Address>;
  },

  list: async () => {
    return api.get('/enderecos') as Promise<Address[]>;
  },

  update: async (id: string, data: Partial<Address>) => {
    return api.patch(`/enderecos/${id}`, data) as Promise<Address>;
  },

  delete: async (id: string) => {
    return api.delete(`/enderecos/${id}`);
  },
};
