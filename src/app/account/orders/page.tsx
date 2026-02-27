'use client';

import Link from 'next/link';
import { useOrdersStore } from '@/stores/auth-store';
import { formatPrice } from '@/lib/utils/cn';

const STATUS_LABELS: Record<string, string> = {
  pending: 'Обробляється',
  shipped: 'Відправлено',
  delivered: 'Доставлено',
  cancelled: 'Скасовано',
};

export default function AccountOrdersPage() {
  const orders = useOrdersStore((s) => s.orders);

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-soft">
      <h1 className="font-display text-2xl font-bold">Історія замовлень</h1>
      <p className="mt-1 text-muted-foreground">Переглядайте статус та деталі ваших замовлень.</p>

      {orders.length === 0 ? (
        <div className="mt-8 rounded-lg border border-dashed border-border p-8 text-center">
          <p className="text-muted-foreground">У вас ще немає замовлень.</p>
          <Link href="/catalog" className="mt-4 inline-block text-primary hover:underline">
            Перейти до каталогу →
          </Link>
        </div>
      ) : (
        <ul className="mt-6 divide-y divide-border">
          {orders.map((order) => (
            <li key={order.id} className="py-4 first:pt-0">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="font-semibold">Замовлення #{order.id.slice(-6)}</span>
                  <span className="ml-2 text-sm text-muted-foreground">
                    {new Date(order.date).toLocaleDateString('uk-UA')}
                  </span>
                </div>
                <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium">
                  {STATUS_LABELS[order.status] ?? order.status}
                </span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {order.itemCount} товар(ів) · {formatPrice(order.total)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
