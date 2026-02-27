'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useCartStore } from '@/stores/cart-store';
import { useAuthStore } from '@/stores/auth-store';
import { useWishlistStore } from '@/stores/wishlist-store';
import { Button } from '@/components/ui/button';
import { SearchTrigger } from '@/components/search/SearchTrigger';
import { CartDropdown } from '@/components/cart/CartDropdown';

const INFO_NAV = [
  { name: 'Про нас', href: '/pro-nas' },
  { name: 'Акції', href: '/aktsiyi' },
  { name: 'Бренди', href: '/brendy' },
  { name: 'Блог', href: '/blog' },
  { name: 'Наші магазини', href: '/nashi-magazyny' },
  { name: 'Клієнтам', href: '/kliyentam' },
];

export function Header() {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { itemCount, subtotal } = useCartStore();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const wishlistCount = useWishlistStore((s) => s.slugs.length);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isActive = (href: string) => {
    if (href === '/blog') return pathname === '/blog' || pathname.startsWith('/blog/');
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto flex h-14 md:h-16 items-center gap-2 px-3 sm:gap-4 sm:px-4">
        <Link href="/" className="flex shrink-0 items-center" aria-label="BelliZoo — на головну">
          <Image
            src="/logotip.svg"
            alt="BelliZoo"
            width={140}
            height={42}
            className="h-8 w-auto sm:h-9 md:h-10"
            priority
          />
        </Link>
        <nav className="hidden flex-1 items-center justify-center gap-6 md:flex lg:gap-8" aria-label="Інформаційні сторінки">
          {INFO_NAV.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative py-1 text-sm font-medium transition-colors after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:transition-transform after:duration-200 ${
                  active
                    ? 'text-foreground after:scale-x-100'
                    : 'text-foreground/80 hover:text-foreground after:scale-x-0 after:origin-left hover:after:scale-x-100'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="flex flex-1 items-center justify-end gap-1 sm:gap-2 md:flex-none md:gap-4">
          <SearchTrigger />
          <Link
            href="/wishlist"
            className="relative flex h-10 w-10 min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-lg border border-input text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
            aria-label={mounted && wishlistCount ? `Обране (${wishlistCount})` : 'Обране'}
          >
            <span className="text-lg" aria-hidden>🤍</span>
            {mounted && wishlistCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                {wishlistCount > 9 ? '9+' : wishlistCount}
              </span>
            )}
          </Link>
          <Link
            href="/account"
            className="flex h-10 w-10 min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-lg border border-input text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
            aria-label={isAuthenticated ? 'Кабінет' : 'Увійти в кабінет'}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z