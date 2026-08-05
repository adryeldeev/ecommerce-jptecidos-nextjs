import { api } from '@/lib/api/client';
import { FreightQuoteRequest, FreightQuoteResponse } from '@/lib/types';

export const freightApi = {
  getQuote: async (data: FreightQuoteRequest) => {
    return api.post('/fretes/cotacao', data) as Promise<FreightQuoteResponse>;
  },
};
