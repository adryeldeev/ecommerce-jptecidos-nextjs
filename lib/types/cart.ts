export interface CartItem {
  id: string;
  produtoVariacaoId: string;
  produtoId: string;
  produtoTitulo: string;
  produtoImagem?: string;
  variacao: {
    cor: string;
    largura?: string;
    sku: string;
  };
  quantidade: string;
  precoUnitario: string;
  precoTotal: string;
}

export interface Cart {
  id: string;
  itens: CartItem[];
  subtotal: string;
  quantidadeTotal: number;
}
