'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useWishlistStore } from '@/stores/wishlist-store';
import type { ProductListItem } from '@/lib/types/product';
import { ProductCard } from '@/components/product/ProductCard';
import { Button } from '@/components/ui/button';

export default function WishlistPage() {
  const slugs = useWishlistStore((s) => s.slugs);
  const [items, setItems] = useState<ProductListItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slugs.length === 0) {
      setItems([]);
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    fetch(`/api/products/by-slugs?slugs=${encodeURIComponent(slugs.join(','))}`)
      .then((res) => res.json())
      .then((data: { items: ProductListItem[] }) => {
        if (!cancelled) setItems(data.items ?? []);
      })
      .catch(() => {
        if (!cancelled) setItems([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [slugs.length, slugs.join(',')]);

  return (
    <div className="container mx-auto px-3 py-4 pb-24 sm:px-4 sm:py-6 md:pb-8">
      <nav aria-label="Хлібні крихти" className="mb-4 text-sm text-muted-foreground overflow-x-auto whitespace-nowrap">
        <Link href="/" className="hover:text-foreground">Головна</Link>
        <span className="mx-1">/</span>
        <span className="text-foreground">Обране</span>
      </nav>

      <h1 className="font-display text-xl font-bold mb-4 sm:text-2xl sm:mb-6">Обране</h1>

      {loading ? (
        <p className="text-muted-foreground">Завантаження…</p>
      ) : items.length === 0 ? (
        <div className="rounded-xl border border-border bg-muted/20 p-8 text-center">
          <p className="text-muted-foreground mb-4">
            {slugs.length === 0
              ? 'Ви ще нічого не додали в обране.'
              : 'Частина товарів могла бути видалена з каталогу.'}
          </p>
          <Link href="/catalog">
            <Button>Перейти до каталогу</Button>
          </Link>
        </div>
      ) : (
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {items.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
