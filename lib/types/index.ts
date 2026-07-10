export type { Cart, CartItem } from './cart';

export interface Category {
  id: string;
  nome: string;
  slug: string;
}

export interface ProductVariation {
  id: string;
  produtoId: string;
  cor: string;
  largura?: string;
  estoque: string;
  sku: string;
}

export interface Product {
  id: string;
  titulo: string;
  descricao: string;
  precoBase: string;
  quantidadeEstoque: string;
  unidadeMedida: string;
  categoriaId: string;
  categoria?: Category;
  variacoes?: ProductVariation[];
  imagem?: string;
  slug?: string;
}

export interface ProductListResponse {
  data: Product[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface AuthResponse {
  token: string;
  usuario: {
    nome: string;
    email: string;
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
  produtoVariacaoId: string;
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
