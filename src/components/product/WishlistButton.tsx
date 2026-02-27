'use client';

import { useWishlistStore } from '@/stores/wishlist-store';
import { Button } from '@/components/ui/button';

export function WishlistButton({ slug, className }: { slug: string; className?: string }) {
  const { has, toggle } = useWishlistStore();
  const inWishlist = has(slug);

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className={className}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(slug);
      }}
      aria-label={inWishlist ? 'Прибрати з обраного' : 'Додати в обране'}
    >
      <span className="text-lg" aria-hidden>
        {inWishlist ? '❤️' : '🤍'}
      </span>
    </Button>
  );
}
