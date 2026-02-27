'use client';

import type { ProductListItem } from '@/lib/types/product';
import { useCartStore } from '@/stores/cart-store';
import { Button } from '@/components/ui/button';
import { CardFooter } from '@/components/ui/card';
import { WishlistButton } from '@/components/product/WishlistButton';

/** Client island: wishlist (overlay) or add-to-cart (footer). Micro-hydration. */
export function ProductCardActions({
  product,
  position,
}: {
  product: ProductListItem;
  position: 'overlay' | 'footer';
}) {
  const addItem = useCartStore((s) => s.addItem);
  const inStock = product.inStock;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!inStock) return;
    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      quantity: 1,
      image: product.images[0],
    });
  };

  if (position === 'overlay') {
    return (
      <div className="absolute right-2 top-2 z-10">
        <WishlistButton
          slug={product.slug}
          className="h-9 w-9 rounded-full bg-background/80 hover:bg-background/90"
        />
      </div>
    );
  }

  return (
    <CardFooter className="p-4 pt-0">
      <Button
        className="w-full"
        size="lg"
        disabled={!inStock}
        onClick={handleAddToCart}
        aria-label={`Додати ${product.name} до кошика`}
      >
        В кошик
      </Button>
    </CardFooter>
  );
}
