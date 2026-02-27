'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/stores/auth-store';
import { cn } from '@/lib/utils/cn';
import { LogoutLink } from '@/components/account/LogoutLink';

const SIDEBAR_LINKS = [
  { href: '/account', label: 'Головна', icon: '📋' },
  { href: '/account/orders', label: 'Історія замовлень', icon: '📦' },
  { href: '/account/addresses', label: 'Адреси доставки', icon: '📍' },
  { href: '/account/profile', label: 'Змінити дані', icon: '👤' },
];

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const isLoginPage = pathname === '/account/login';
  const isRegisterPage = pathname === '/account/register';

  useEffect(() => {
    if (isLoginPage || isRegisterPage) return;
    if (!isAuthenticated) {
      router.replace('/account/login');
    }
  }, [isAuthenticated, isLoginPage, isRegisterPage, router]);

  if (isLoginPage || isRegisterPage) {
    return <div className="container mx-auto px-4 py-8 pb-24 md:pb-8">{children}</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-muted-foreground">Завантаження...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 pb-24 md:pb-8">
      <div className="flex flex-col gap-8 lg:flex-row">
        <aside className="lg:w-56 shrink-0">
          <nav
            className="rounded-xl border border-border bg-card p-4 shadow-soft"
            aria-label="Меню кабінету"
          >
            <ul className="space-y-1">
              {SIDEBAR_LINKS.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== '/account' && pathname.startsWith(item.href));
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-primary/10 text-primary'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      )}
                    >
                      <span>{item.icon}</span>
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="mt-4 border-t border-border pt-4">
              <LogoutLink />
            </div>
          </nav>
        </aside>
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
