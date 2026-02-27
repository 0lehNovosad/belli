'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/auth-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function RegisterPage() {
  const router = useRouter();
  const register = useAuthStore((s) => s.register);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.firstName.trim()) {
      setError("Вкажіть ім'я");
      return;
    }
    if (!form.lastName.trim()) {
      setError('Вкажіть прізвище');
      return;
    }
    if (!form.phone.trim()) {
      setError('Вкажіть телефон');
      return;
    }
    if (!form.email.trim()) {
      setError('Вкажіть E-Mail');
      return;
    }
    if (!form.password) {
      setError('Вкажіть пароль');
      return;
    }
    if (form.password.length < 6) {
      setError('Пароль має бути не менше 6 символів');
      return;
    }
    if (form.password !== form.passwordConfirm) {
      setError('Паролі не збігаються');
      return;
    }
    register({
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      password: form.password,
    });
    router.push('/account');
  };

  return (
    <div className="mx-auto max-w-md">
      <h1 className="font-display text-2xl font-bold">Реєстрація</h1>
      <p className="mt-1 text-muted-foreground">Створіть обліковий запис для швидкого оформлення замовлень.</p>
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="firstName">Імʼя *</Label>
            <Input
              id="firstName"
              value={form.firstName}
              onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
              className="mt-1"
              autoComplete="given-name"
            />
          </div>
          <div>
            <Label htmlFor="lastName">Прізвище *</Label>
            <Input
              id="lastName"
              value={form.lastName}
              onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
              className="mt-1"
              autoComplete="family-name"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="phone">Телефон *</Label>
          <Input
            id="phone"
            type="tel"
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            className="mt-1"
            placeholder="+380"
            autoComplete="tel"
          />
        </div>
        <div>
          <Label htmlFor="email">E-Mail *</Label>
          <Input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className="mt-1"
            placeholder="example@mail.ua"
            autoComplete="email"
          />
        </div>
        <div>
          <Label htmlFor="password">Пароль *</Label>
          <Input
            id="password"
            type="password"
            value={form.password}
            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
            className="mt-1"
            autoComplete="new-password"
          />
        </div>
        <div>
          <Label htmlFor="passwordConfirm">Повторіть пароль *</Label>
          <Input
            id="passwordConfirm"
            type="password"
            value={form.passwordConfirm}
            onChange={(e) => setForm((f) => ({ ...f, passwordConfirm: e.target.value }))}
            className="mt-1"
            autoComplete="new-password"
          />
        </div>
        {error && (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        )}
        <Button type="submit" size="lg" className="w-full">
          Зареєструватись
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Вже є обліковий запис?{' '}
        <Link href="/account/login" className="font-medium text-primary hover:underline">
          Увійти
        </Link>
      </p>
    </div>
  );
}
