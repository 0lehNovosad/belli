/**
 * Recently viewed products — for PDP "Ви переглядали"
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ProductListItem } from '@/lib/types/product';

const MAX_VIEWED = 12;

type ViewedStore = {
  ids: string[];
  add: (product: ProductListItem) => void;
  getIds: () => string[];
};

export const useViewedProductsStore = create<ViewedStore>()(
  persist(
    (set, get) => ({
      ids: [],
      add: (product) =>
        set((state) => {
          const next = state.ids.filter((id) => id !== product.id);
          next.unshift(product.id);
          return { ids: next.slice(0, MAX_VIEWED) };
        }),
      getIds: () => get().ids,
    }),
    { name: 'bellizoo-viewed' }
  )
);
