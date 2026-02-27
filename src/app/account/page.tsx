'use client';

import Link from 'next/link';
import { useAuthStore } from '@/stores/auth-store';
import { useOrdersStore } from '@/stores/auth-store';
import { formatPrice } from '@/lib/utils/cn';

export default function AccountDashboardPage() {
  const user = useAuthStore((s) => s.user);
  const orders = useOrdersStore((s) => s.orders);

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-soft">
      <h1 className="font-display text-2xl font-bold">Мій кабінет</h1>
      <p className="mt-1 text-muted-foreground">
        Вітаємо, {user?.firstName} {user?.lastName}!
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <Link
          href="/account/orders"
          className="flex flex-col rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
        >
          <span className="text-2xl">📦</span>
          <span className="mt-2 font-semibold">Історія замовлень</span>
          <span className="text-sm text-muted-foreground">
            {orders.length === 0
              ? 'У вас ще немає замовлень'
              : `Останніх замовлень: ${orders.length}`}
          </span>
        </Link>
        <Link
          href="/account/addresses"
          className="flex flex-col rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
        >
          <span className="text-2xl">📍</span>
          <span className="mt-2 font-semibold">Адреси доставки</span>
          <span className="text-sm text-muted-foreground">
            Збережені адреси для швидкого оформлення
          </span>
        </Link>
      </div>

      <section className="mt-8">
        <h2 className="font-semibold">Контактні дані</h2>
        <dl className="mt-2 space-y-1 text-sm text-muted-foreground">
          <div>
            <dt className="inline font-medium text-foreground">E-Mail: </dt>
            <dd className="inline">{user?.email}</dd>
          </div>
          {user?.phone && (
            <div>
              <dt className="inline font-medium text-foreground">Телефон: </dt>
              <dd className="inline">{user.phone}</dd>
            </div>
          )}
        </dl>
        <Link
          href="/account/profile"
          className="mt-2 inline-block text-sm font-medium text-primary hover:underline"
        >
          Змінити дані →
        </Link>
      </section>
    </div>
  );
}
