'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/stores/cart-store';
import { useOrdersStore } from '@/stores/auth-store';
import { formatPrice } from '@/lib/utils/cn';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CartSummary } from '@/components/checkout/CartSummary';

type Errors = Record<string, string>;

const initialCustomer = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
};

export function CheckoutForm() {
  const router = useRouter();
  const { items, subtotal, clear } = useCartStore();
  const addOrder = useOrdersStore((s) => s.addOrder);
  const [customer, setCustomer] = useState(initialCustomer);
  const [shipping, setShipping] = useState<'nova_poshta' | 'pickup'>('nova_poshta');
  const [payment, setPayment] = useState<'cash' | 'card_online'>('cash');
  const [comment, setComment] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setSubmitting] = useState(false);

  const validate = (): boolean => {
    const e: Errors = {};
    if (!customer.firstName.trim()) e.firstName = "Вкажіть ім'я";
    if (!customer.lastName.trim()) e.lastName = 'Вкажіть прізвище';
    if (!customer.phone.trim()) e.phone = 'Вкажіть телефон';
    else if (!/^[\d\s+()-]{10,}$/.test(customer.phone)) e.phone = 'Невірний формат телефону';
    if (!customer.email.trim()) e.email = 'Вкажіть email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)) e.email = 'Невірний формат email';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 800));
      addOrder({
        id: `ord-${Date.now()}`,
        date: new Date().toISOString(),
        status: 'pending',
        total: subtotal.amount,
        itemCount: items.reduce((s, i) => s + i.quantity, 0),
      });
      clear();
      router.push('/checkout/success');
    } catch (err) {
      setErrors({ submit: 'Помилка оформлення. Спробуйте ще раз.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-3 lg:gap-8">
      <div className="lg:col-span-2 space-y-6 sm:space-y-8 min-w-0">
        <section aria-labelledby="customer-heading">
          <h2 id="customer-heading" className="font-display text-xl font-bold mb-4">
            Контактні дані
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="firstName">Імʼя *</Label>
              <Input
                id="firstName"
                value={customer.firstName}
                onChange={(e) => setCustomer((c) => ({ ...c, firstName: e.target.value }))}
                className="mt-1"
                autoComplete="given-name"
                aria-invalid={!!errors.firstName}
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-destructive" role="alert">
                  {errors.firstName}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="lastName">Прізвище *</Label>
              <Input
                id="lastName"
                value={customer.lastName}
                onChange={(e) => setCustomer((c) => ({ ...c, lastName: e.target.value }))}
                className="mt-1"
                autoComplete="family-name"
                aria-invalid={!!errors.lastName}
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-destructive" role="alert">
                  {errors.lastName}
                </p>
              )}
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="phone">Телефон *</Label>
              <Input
                id="phone"
                type="tel"
                value={customer.phone}
                onChange={(e) => setCustomer((c) => ({ ...c, phone: e.target.value }))}
                className="mt-1"
                placeholder="+380"
                autoComplete="tel"
                aria-invalid={!!errors.phone}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-destructive" role="alert">
                  {errors.phone}
                </p>
              )}
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={customer.email}
                onChange={(e) => setCustomer((c) => ({ ...c, email: e.target.value }))}
                className="mt-1"
                autoComplete="email"
                aria-invalid={!!errors.email}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-destructive" role="alert">
                  {errors.email}
                </p>
              )}
            </div>
          </div>
        </section>

        <section aria-labelledby="shipping-heading">
          <h2 id="shipping-heading" className="font-display text-xl font-bold mb-4">
            Доставка
          </h2>
          <div className="space-y-2">
            <label className="flex items-center gap-3 rounded-lg border border-border p-4 cursor-pointer hover:bg-muted/50">
              <input
                type="radio"
                name="shipping"
                checked={shipping === 'nova_poshta'}
                onChange={() => setShipping('nova_poshta')}
                className="h-4 w-4"
              />
              <span>Нова Пошта (відділення / поштомат / курʼєр)</span>
            </label>
            <label className="flex items-center gap-3 rounded-lg border border-border p-4 cursor-pointer hover:bg-muted/50">
              <input
                type="radio"
                name="shipping"
                checked={shipping === 'pickup'}
                onChange={() => setShipping('pickup')}
                className="h-4 w-4"
              />
              <span>Самовивіз з магазину (Львів)</span>
            </label>
          </div>
        </section>

        <section aria-labelledby="payment-heading">
          <h2 id="payment-heading" className="font-display text-xl font-bold mb-4">
            Оплата
          </h2>
          <div className="space-y-2">
            <label className="flex items-center gap-3 rounded-lg border border-border p-4 cursor-pointer hover:bg-muted/50">
              <input
                type="radio"
                name="payment"
                checked={payment === 'cash'}
                onChange={() => setPayment('cash')}
                className="h-4 w-4"
              />
              <span>Готівка при отриманні</span>
            </label>
            <label className="flex items-center gap-3 rounded-lg border border-border p-4 cursor-pointer hover:bg-muted/50">
              <input
                type="radio"
                name="payment"
                checked={payment === 'card_online'}
                onChange={() => setPayment('card_online')}
                className="h-4 w-4"
              />
              <span>Оплата карткою на сайті</span>
            </label>
          </div>
        </section>

        <div>
          <Label htmlFor="comment">Коментар до замовлення</Label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="mt-1 flex min-h-[80px] w-full rounded-lg border border-input bg-background px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="Номер відділення НП, бажаний час доставки..."
          />
        </div>
      </div>

      <div className="lg:col-span-1 order-first lg:order-none">
        <CartSummary subtotal={subtotal.amount} />
        {errors.submit && (
          <p className="mt-2 text-sm text-destructive" role="alert">
            {errors.submit}
          </p>
        )}
        <Button type="submit" size="xl" className="w-full mt-4" disabled={isSubmitting}>
          {isSubmitting ? 'Обробка...' : 'Підтвердити замовлення'}
        </Button>
      </div>
    </form>
  );
}
