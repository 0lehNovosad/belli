import Link from 'next/link';
import Image from 'next/image';
import type { ProductListItem } from '@/lib/types/product';
import { formatPrice } from '@/lib/utils/cn';
import { Card, CardContent } from '@/components/ui/card';
import { ProductCardActions } from '@/components/product/ProductCardActions';

const PLACEHOLDER = '/placeholder-product.svg';

/** Server Component: static shell. Only ProductCardActions is client (micro-hydration). */
export function ProductCard({ product, priority }: { product: ProductListItem; priority?: boolean }) {
  const hasDiscount =
    product.compareAtPrice && product.compareAtPrice.amount > product.price.amount;
  const imgSrc = product.images[0]?.url ?? PLACEHOLDER;
  const imgAlt = product.images[0]?.alt || product.name;

  return (
    <Card className="group overflow-hidden">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={imgSrc}
            alt={imgAlt}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority={priority}
            unoptimized={imgSrc === PLACEHOLDER}
          />
          <ProductCardActions product={product} position="overlay" />
          {hasDiscount && (
            <span className="absolute left-2 top-2 rounded-md bg-destructive px-2 py-0.5 text-xs font-semibold text-destructive-foreground">
              -
              {Math.round(
                (1 - product.price.amount / product.compareAtPrice!.amount) * 100
              )}
              %
            </span>
          )}
          {!product.inStock && (
            <span className="absolute inset-0 flex items-center justify-center bg-black/40 text-sm font-medium text-white">
              Немає в наявності
            </span>
          )}
        </div>
        <CardContent className="p-3 sm:p-4">
          <h3 className="line-clamp-2 min-h-[2.5em] text-sm font-medium leading-tight">
            {product.name}
          </h3>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-lg font-bold text-primary">
              {formatPrice(product.price.amount)}
            </span>
            {hasDiscount && product.compareAtPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.compareAtPrice.amount)}
              </span>
            )}
          </div>
          {product.rating !== undefined && product.reviewCount > 0 && (
            <p className="mt-1 text-xs text-muted-foreground">
              ★ {product.rating.toFixed(1)} ({product.reviewCount})
            </p>
          )}
        </CardContent>
      </Link>
      <ProductCardActions product={product} position="footer" />
    </Card>
  );
}
