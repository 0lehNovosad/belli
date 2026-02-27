'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCartStore } from '@/stores/cart-store';
import { useWishlistStore } from '@/stores/wishlist-store';
import { cn } from '@/lib/utils/cn';

const NAV: { href: string; label: string; icon: string; showBadge?: boolean; badgeStore?: 'cart' | 'wishlist' }[] = [
  { href: '/', label: 'Головна', icon: '🏠' },
  { href: '/catalog', label: 'Каталог', icon: '📦' },
  { href: '/wishlist', label: 'Обране', icon: '🤍', showBadge: true, badgeStore: 'wishlist' },
  { href: '/cart', label: 'Кошик', icon: '🛒', showBadge: true, badgeStore: 'cart' },
  { href: '/account', label: 'Кабінет', icon: '👤' },
];

export function MobileBottomNav() {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const itemCount = useCartStore((s) => s.itemCount);
  const wishlistCount = useWishlistStore((s) => s.slugs.length);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 grid grid-cols-5 gap-1 border-t border-border bg-background/95 p-2 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
      aria-label="Мобільна навігація"
    >
      {NAV.map((item) => {
        const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
        const count = mounted && item.showBadge && item.badgeStore
          ? item.badgeStore === 'cart'
            ? itemCount
            : wishlistCount
          : 0;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex flex-col items-center justify-center gap-0.5 rounded-lg py-2 text-xs font-medium transition-colors',
              isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <span className="relative">
              {item.icon}
              {count > 0 && (
                <span className="absolute -right-2 -top-1 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                  {count > 99 ? '99+' : count}
                </span>
              )}
            </span>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
