'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/stores/cart-store';

const CheckoutForm = dynamic(
  () => import('@/components/checkout/CheckoutForm').then((m) => ({ default: m.CheckoutForm })),
  { ssr: false, loading: () => <div className="animate-pulse h-64 rounded-lg bg-muted" /> }
);

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && items.length === 0) {
      router.replace('/cart');
    }
  }, [mounted, items.length, router]);

  if (!mounted) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-muted-foreground">Завантаження...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-muted-foreground">Перенаправлення до кошика...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-3 py-4 pb-24 sm:px-4 sm:py-6 md:pb-8">
      <h1 className="font-display text-xl font-bold mb-4 sm:text-2xl sm:mb-6">Оформлення замовлення</h1>
      <CheckoutForm />
    </div>
  );
}
