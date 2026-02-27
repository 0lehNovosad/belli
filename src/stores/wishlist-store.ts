/**
 * Wishlist (обране) — Zustand, persisted to localStorage
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type WishlistStore = {
  slugs: string[];
  add: (slug: string) => void;
  remove: (slug: string) => void;
  toggle: (slug: string) => void;
  has: (slug: string) => boolean;
};

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      slugs: [],
      add: (slug) =>
        set((state) =>
          state.slugs.includes(slug) ? state : { slugs: [...state.slugs, slug] }
        ),
      remove: (slug) =>
        set((state) => ({ slugs: state.slugs.filter((s) => s !== slug) })),
      toggle: (slug) => {
        const { has, add, remove } = get();
        if (has(slug)) remove(slug);
        else add(slug);
      },
      has: (slug) => get().slugs.includes(slug),
    }),
    { name: 'bellizoo-wishlist', partialize: (s) => ({ slugs: s.slugs }) }
  )
);
