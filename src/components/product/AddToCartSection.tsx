'use client';

import { useState } from 'react';
import type { Product } from '@/lib/types/product';
import { useCartStore } from '@/stores/cart-store';
import { useViewedProductsStore } from '@/stores/viewed-products';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/cn';
import { useEffect } from 'react';

export function AddToCartSection({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const [qty, setQty] = useState(1);
  const addItem = useCartStore((s) => s.addItem);
  const addViewed = useViewedProductsStore((s) => s.add);

  useEffect(() => {
    addViewed({
      id: product.id,
      slug: product.slug,
      name: product.name,
      images: product.images,
      price: product.price,
      compareAtPrice: product.compareAtPrice,
      inStock: product.inStock,
      rating: product.rating,
      reviewCount: product.reviewCount,
    });
  }, [product, addViewed]);

  const handleAdd = () => {
    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      quantity: qty,
      image: product.images[0],
    });
  };

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <div className="flex items-center gap-3">
        <label htmlFor="qty" className="text-sm font-medium">
          Кількість
        </label>
        <div className="inline-flex items-center rounded-full border-2 border-primary/40 bg-background overflow-hidden">
          <button
            type="button"
            aria-label="Зменшити"
            className="h-11 w-11 flex items-center justify-center text-foreground transition-colors hover:bg-primary/15 active:bg-primary/25"
            onClick={() => setQty((n) => Math.max(1, n - 1))}
          >
            −
          </button>
          <input
            id="qty"
            type="number"
            min={1}
            max={99}
            value={qty}
            onChange={(e) => setQty(Math.max(1, Math.min(99, parseInt(e.target.value, 10) || 1)))}
            className="h-11 w-14 border-0 bg-transparent text-center text-sm font-medium focus:outline-none"
          />
          <button
            type="button"
            aria-label="Збільшити"
            className="h-11 w-11 flex items-center justify-center text-foreground transition-colors hover:bg-primary/15 active:bg-primary/25"
            onClick={() => setQty((n) => Math.min(99, n + 1))}
          >
            +
          </button>
        </div>
      </div>
      <Button
        size="xl"
        className="w-full md:w-auto min-w-[200px]"
        disabled={!product.inStock}
        onClick={handleAdd}
      >
        В кошик{qty > 1 ? ` · ${qty} шт` : ''}
      </Button>
    </div>
  );
}
