'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { CartLineItem } from '@/lib/types/cart';
import { formatPrice } from '@/lib/utils/cn';

export function CartLineItemPreview({
  line,
  onNavigate,
}: {
  line: CartLineItem;
  onNavigate: () => void;
}) {
  return (
    <li>
      <Link
        href={`/product/${line.slug}`}
        onClick={onNavigate}
        className="flex gap-3 p-3 hover:bg-muted/50 transition-colors"
      >
        {line.image && (
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-muted">
            <Image
              src={line.image.url}
              alt={line.image.alt}
              fill
              sizes="56px"
              className="object-cover"
            />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{line.name}</p>
          <p className="text-sm text-muted-foreground">
            {formatPrice(line.price.amount)} × {line.quantity}
          </p>
        </div>
        <p className="text-sm font-semibold shrink-0">
          {formatPrice(line.price.amount * line.quantity)}
        </p>
      </Link>
    </li>
  );
}
