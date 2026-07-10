import { api } from '@/lib/api/client';
import { Order, CreateOrderRequest } from '@/lib/types';

export const orderApi = {
  create: async (data: CreateOrderRequest) => {
    return api.post('/pedidos', data) as Promise<Order>;
  },

  list: async () => {
    return api.get('/pedidos') as Promise<Order[]>;
  },

  getById: async (id: string) => {
    return api.get(`/pedidos/${id}`) as Promise<Order>;
  },
};
