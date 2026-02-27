'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/stores/cart-store';
import { formatPrice } from '@/lib/utils/cn';
import { Button } from '@/components/ui/button';
import { CartItemRow } from '@/components/cart/CartItemRow';

export default function CartPage() {
  const { items, itemCount, subtotal, updateQuantity, removeItem } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-3 py-8 sm:px-4 sm:py-12 text-center">
        <h1 className="font-display text-2xl font-bold">Кошик порожній</h1>
        <p className="mt-2 text-muted-foreground">
          Додайте товари з каталогу, щоб оформити замовлення.
        </p>
        <Link href="/catalog" className="mt-6 inline-block">
          <Button size="lg">Перейти до каталогу</Button>
        </Link>
        {/* CRO: recommended products when empty */}
        <section className="mt-12 text-left" aria-labelledby="recommended-heading">
          <h2 id="recommended-heading" className="font-display text-xl font-bold mb-4">
            Популярні товари
          </h2>
          <Link href="/catalog" className="text-primary hover:underline">
            Переглянути каталог →
          </Link>
        </section>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-3 py-4 pb-24 sm:px-4 sm:py-6 md:pb-8">
      <h1 className="font-display text-xl font-bold mb-4 sm:text-2xl sm:mb-6">Кошик</h1>
      <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
        <div className="lg:col-span-2 min-w-0">
          <ul className="divide-y divide-border">
            {items.map((line) => (
              <CartItemRow
                key={line.id}
                line={line}
                onUpdateQty={(qty) => updateQuantity(line.id, qty)}
                onRemove={() => removeItem(line.id)}
              />
            ))}
          </ul>
        </div>
        <div className="lg:col-span-1 order-first lg:order-none">
          <div className="sticky top-20 lg:top-24 rounded-xl border border-border bg-card p-4 sm:p-6 shadow-soft">
            <h2 className="font-semibold text-lg">Підсумок</h2>
            <p className="mt-2 text-muted-foreground">
              {itemCount} {itemCount === 1 ? 'товар' : 'товарів'}
            </p>
            <p className="mt-4 text-2xl font-bold text-primary">
              {formatPrice(subtotal.amount)}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Доставка розраховується при оформленні
            </p>
            <Link href="/checkout" className="mt-6 block">
              <Button size="xl" className="w-full">
                Оформити замовлення
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
