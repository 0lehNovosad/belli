'use client';

import Link from 'next/link';
import { useCartStore } from '@/stores/cart-store';
import { formatPrice } from '@/lib/utils/cn';
import { Button } from '@/components/ui/button';

export function CartSummary({ subtotal }: { subtotal: number }) {
  const items = useCartStore((s) => s.items);

  return (
    <div className="sticky top-20 lg:top-24 rounded-xl border border-border bg-card p-4 sm:p-6 shadow-soft">
      <h2 className="font-semibold text-lg">Ваше замовлення</h2>
      <p className="mt-2 text-muted-foreground">
        {items.length} {items.length === 1 ? 'товар' : 'товарів'}
      </p>
      <div className="mt-4 flex justify-between text-sm">
        <span>Підсумок</span>
        <span className="font-semibold">{formatPrice(subtotal)}</span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        Доставка розраховується після вказання відділення
      </p>
    </div>
  );
}
