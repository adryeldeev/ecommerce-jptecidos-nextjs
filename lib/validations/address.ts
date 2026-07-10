import { z } from 'zod';

export const addressSchema = z.object({
  cep: z.string().min(8, 'CEP inválido'),
  rua: z.string().min(1, 'Rua é obrigatória'),
  numero: z.string().min(1, 'Número é obrigatório'),
  complemento: z.string().optional(),
  bairro: z.string().min(1, 'Bairro é obrigatório'),
  cidade: z.string().min(1, 'Cidade é obrigatória'),
  estado: z.string().length(2, 'Estado deve ter 2 caracteres'),
});

export type AddressFormData = z.infer<typeof addressSchema>;
