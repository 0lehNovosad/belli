'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { CartLineItem } from '@/lib/types/cart';
import { formatPrice } from '@/lib/utils/cn';
import { Button } from '@/components/ui/button';

export function CartItemRow({
  line,
  onUpdateQty,
  onRemove,
}: {
  line: CartLineItem;
  onUpdateQty: (qty: number) => void;
  onRemove: () => void;
}) {
  return (
    <li className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:gap-4">
      <div className="flex gap-3 sm:flex-1 min-w-0">
        {line.image && (
          <Link href={`/product/${line.slug}`} className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-muted sm:h-24 sm:w-24">
            <Image
              src={line.image.url}
              alt={line.image.alt}
              fill
              sizes="96px"
              className="object-cover"
            />
          </Link>
        )}
        <div className="min-w-0 flex-1">
          <Link href={`/product/${line.slug}`} className="font-medium hover:underline line-clamp-2">
            {line.name}
          </Link>
          <p className="mt-1 text-sm text-muted-foreground">
            {formatPrice(line.price.amount)} за шт
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between gap-2 sm:justify-end sm:gap-4">
        <div className="inline-flex items-center rounded-full border-2 border-primary/40 bg-background overflow-hidden">
          <button
            type="button"
            aria-label="Зменшити"
            className="h-10 min-w-[44px] flex items-center justify-center text-foreground transition-colors hover:bg-primary/15 active:bg-primary/25"
            onClick={() => onUpdateQty(Math.max(0, line.quantity - 1))}
          >
            −
          </button>
          <span className="w-8 text-center text-sm font-medium">{line.quantity}</span>
          <button
            type="button"
            aria-label="Збільшити"
            className="h-10 min-w-[44px] flex items-center justify-center text-foreground transition-colors hover:bg-primary/15 active:bg-primary/25"
            onClick={() => onUpdateQty(line.quantity + 1)}
          >
            +
          </button>
        </div>
        <p className="font-semibold shrink-0">
          {formatPrice(line.price.amount * line.quantity)}
        </p>
        <Button variant="ghost" size="sm" onClick={onRemove} className="text-muted-foreground min-h-[44px] sm:ml-0">
          Видалити
        </Button>
      </div>
    </li>
  );
}
