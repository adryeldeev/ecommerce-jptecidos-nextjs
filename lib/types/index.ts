export type { Cart, CartItem } from './cart';

export interface Category {
  id: string;
  nome: string;
  slug: string;
  imagemUrl?: string | null;
  totalProdutos: number;
}

export type Finalidade =
  | 'moda'
  | 'decoracao'
  | 'alfaiataria'
  | 'infantil'
  | 'cama-banho'
  | 'natural'
  | 'premium'
  | 'promocao';

export interface ProductVariation {
  id: string;
  cor: string;
  corCodigo?: string;
  preco?: string;
  estoque: string;
  sku: string;
  imagens: { url: string; ordem: number }[];
  metragemPorPeca?: string;
}

export interface Product {
  id: string;
  titulo: string;
  slug: string;
  descricao?: string;
  composicao?: string;
  largura?: string;
  gramatura?: number;
  fabricanteId?: string;
  fabricante?: { nome: string } | null;
  observacoes?: string;
  pesoGramas?: number;
  dimensaoAlturaCm?: number;
  dimensaoLarguraCm?: number;
  dimensaoComprimentoCm?: number;
  precoBase: string;
  unidadeMedida: 'METRO' | 'KG' | 'UNIDADE';
  categoriaId: string;
  categoria: { nome: string; slug: string };
  imagens: { url: string; ordem: number }[];
  variacoes: ProductVariation[];
  maisProcurado?: boolean;
  lancamento?: boolean;
  finalidades: Finalidade[];
}

export interface ProductListResponse {
  items: Product[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface AuthResponse {
  accessToken: string;
  usuario: {
    id: string;
    nome: string;
    email: string;
    ehAdmin: boolean;
  };
}

export interface LoginRequest {
  email: string;
  senha: string;
}

export interface RegisterRequest {
  nome: string;
  email: string;
  senha: string;
}

export interface Address {
  id: string;
  cep: string;
  rua: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
}

export interface FreightQuoteRequest {
  cep: string;
  subtotal: string;
  metodo?: string;
  estado?: string;
}

export interface FreightQuoteResponse {
  metodo: string;
  valor: string;
  prazo: number;
}

export interface OrderItem {
  produtoVariacaoId?: string;
  quantidade: string;
}

export interface CreateOrderRequest {
  enderecoId: string;
  freteMetodo: string;
  metodoPagamento: string;
  paymentMethodId?: string;
  paymentProvider?: string;
  itens: OrderItem[];
}

export interface Order {
  id: string;
  enderecoId: string;
  freteMetodo: string;
  metodoPagamento: string;
  itens: OrderItem[];
  subtotal: string;
  frete: string;
  total: string;
  status: string;
  createdAt: string;
}
