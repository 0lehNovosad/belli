'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils/cn';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useCartStore } from '@/stores/cart-store';
import { CartLineItemPreview } from './CartLineItemPreview';

export function CartDropdown({
  itemCount,
  subtotal,
}: {
  itemCount: number;
  subtotal: number;
}) {
  const [open, setOpen] = useState(false);
  const items = useCartStore((s) => s.items);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="relative gap-1.5"
          aria-label={`Кошик: ${itemCount} товарів`}
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="hidden sm:inline">Кошик</span>
          {itemCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-primary px-1 text-xs font-bold text-primary-foreground">
              {itemCount > 99 ? '99+' : itemCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[min(360px,calc(100vw-2rem))] p-0">
        <div className="border-b p-3">
          <p className="font-semibold">Ваш кошик</p>
          <p className="text-sm text-muted-foreground">
            {itemCount === 0
              ? 'Порожній'
              : `${itemCount} ${itemCount === 1 ? 'товар' : 'товарів'} · ${formatPrice(subtotal)}`}
          </p>
        </div>
        <div className="max-h-[50vh] overflow-y-auto">
          {items.length === 0 ? (
            <div className="p-6 text-center text-sm text-muted-foreground">
              Додайте товари з каталогу
            </div>
          ) : (
            <ul className="divide-y">
              {items.slice(0, 5).map((line) => (
                <CartLineItemPreview key={line.id} line={line} onNavigate={() => setOpen(false)} />
              ))}
            </ul>
          )}
        </div>
        <div className="border-t p-3">
          <Link href="/cart" onClick={() => setOpen(false)}>
            <Button className="w-full" size="lg">
              Оформити замовлення
            </Button>
          </Link>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
