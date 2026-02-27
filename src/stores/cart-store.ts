/**
 * Cart store — Zustand, persisted to localStorage
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Cart, CartLineItem } from '@/lib/types/cart';
import type { Money, ProductImage } from '@/lib/types/product';

type CartStore = Cart & {
  addItem: (item: Omit<CartLineItem, 'id'>) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  removeItem: (lineId: string) => void;
  setCartId: (id: string | null) => void;
  clear: () => void;
};

function computeSubtotal(items: CartLineItem[]): Money {
  const amount = items.reduce((sum, i) => sum + i.price.amount * i.quantity, 0);
  return { amount, currency: 'UAH' };
}

const initialState = {
  id: null as string | null,
  items: [] as CartLineItem[],
  itemCount: 0,
  subtotal: { amount: 0, currency: 'UAH' } as Money,
};

type CartPersisted = { items: CartLineItem[] };

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      ...initialState,
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find(
            (i) => i.productId === item.productId && i.variantId === item.variantId
          );
          let nextItems: CartLineItem[];
          if (existing) {
            nextItems = state.items.map((i) =>
              i.id === existing.id
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            );
          } else {
            const newItem: CartLineItem = {
              ...item,
              id: `line-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
            };
            nextItems = [...state.items, newItem];
          }
          const subtotal = computeSubtotal(nextItems);
          return {
            items: nextItems,
            itemCount: nextItems.reduce((s, i) => s + i.quantity, 0),
            subtotal,
          };
        }),
      updateQuantity: (lineId, quantity) =>
        set((state) => {
          if (quantity < 1) {
            const nextItems = state.items.filter((i) => i.id !== lineId);
            return {
              items: nextItems,
              itemCount: nextItems.reduce((s, i) => s + i.quantity, 0),
              subtotal: computeSubtotal(nextItems),
            };
          }
          const nextItems = state.items.map((i) =>
            i.id === lineId ? { ...i, quantity } : i
          );
          return {
            items: nextItems,
            itemCount: nextItems.reduce((s, i) => s + i.quantity, 0),
            subtotal: computeSubtotal(nextItems),
          };
        }),
      removeItem: (lineId) =>
        set((state) => {
          const nextItems = state.items.filter((i) => i.id !== lineId);
          return {
            items: nextItems,
            itemCount: nextItems.reduce((s, i) => s + i.quantity, 0),
            subtotal: computeSubtotal(nextItems),
          };
        }),
      setCartId: (id) => set({ id }),
      clear: () => set(initialState),
    }),
    {
      name: 'bellizoo-cart',
      // Зберігаємо лише items; тип приведено бо persist очікує повний стан
      partialize: ((s: CartStore) => ({ items: s.items })) as (state: CartStore) => CartStore,
      merge: (persistedState: unknown, currentState: CartStore) => {
        const stored = persistedState as CartPersisted | undefined;
        const items = stored?.items ?? currentState.items;
        return {
          ...currentState,
          items,
          itemCount: items.reduce((s, i) => s + i.quantity, 0),
          subtotal: computeSubtotal(items),
        };
      },
    }
  )
);
