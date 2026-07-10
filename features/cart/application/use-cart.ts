'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Cart, CartItem } from '@/lib/types';

interface CartStore {
  cart: Cart | null;
  addItem: (item: Omit<CartItem, 'id' | 'precoTotal'>) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: string) => void;
  clearCart: () => void;
}

export const useCart = create<CartStore>()(
  persist(
    (set) => ({
      cart: null,
      
      addItem: (item) => set((state) => {
        const newCart = state.cart || {
          id: crypto.randomUUID(),
          itens: [],
          subtotal: '0',
          quantidadeTotal: 0,
        };

        const existingItemIndex = newCart.itens.findIndex(
          (i) => i.produtoVariacaoId === item.produtoVariacaoId
        );

        if (existingItemIndex >= 0) {
          // Atualizar quantidade existente
          const existingItem = newCart.itens[existingItemIndex];
          const newQuantity = String(
            parseFloat(existingItem.quantidade) + parseFloat(item.quantidade)
          );
          const newPrecoTotal = String(
            parseFloat(item.precoUnitario) * parseFloat(newQuantity)
          );

          newCart.itens[existingItemIndex] = {
            ...existingItem,
            quantidade: newQuantity,
            precoTotal: newPrecoTotal,
          };
        } else {
          // Adicionar novo item
          const precoTotal = String(
            parseFloat(item.precoUnitario) * parseFloat(item.quantidade)
          );

          newCart.itens.push({
            ...item,
            id: crypto.randomUUID(),
            precoTotal,
          });
        }

        // Recalcular subtotal e quantidade total
        newCart.quantidadeTotal = newCart.itens.reduce(
          (sum, item) => sum + parseFloat(item.quantidade),
          0
        );
        newCart.subtotal = String(
          newCart.itens.reduce((sum, item) => sum + parseFloat(item.precoTotal), 0)
        );

        return { cart: newCart };
      }),

      removeItem: (itemId) => set((state) => {
        if (!state.cart) return state;

        const newCart = { ...state.cart };
        newCart.itens = newCart.itens.filter((item) => item.id !== itemId);

        newCart.quantidadeTotal = newCart.itens.reduce(
          (sum, item) => sum + parseFloat(item.quantidade),
          0
        );
        newCart.subtotal = String(
          newCart.itens.reduce((sum, item) => sum + parseFloat(item.precoTotal), 0)
        );

        return { cart: newCart };
      }),

      updateQuantity: (itemId, quantity) => set((state) => {
        if (!state.cart) return state;

        const newCart = { ...state.cart };
        const itemIndex = newCart.itens.findIndex((item) => item.id === itemId);

        if (itemIndex >= 0) {
          const item = newCart.itens[itemIndex];
          const newQuantity = quantity;
          const newPrecoTotal = String(
            parseFloat(item.precoUnitario) * parseFloat(newQuantity)
          );

          newCart.itens[itemIndex] = {
            ...item,
            quantidade: newQuantity,
            precoTotal: newPrecoTotal,
          };

          newCart.quantidadeTotal = newCart.itens.reduce(
            (sum, item) => sum + parseFloat(item.quantidade),
            0
          );
          newCart.subtotal = String(
            newCart.itens.reduce((sum, item) => sum + parseFloat(item.precoTotal), 0)
          );
        }

        return { cart: newCart };
      }),

      clearCart: () => set({ cart: null }),
    }),
    {
      name: 'cart-storage',
    }
  )
);
