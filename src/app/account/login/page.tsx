'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/auth-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email.trim()) {
      setError('Вкажіть email');
      return;
    }
    if (!password.trim()) {
      setError('Вкажіть пароль');
      return;
    }
    login(email.trim(), password);
    router.push('/account');
  };

  return (
    <div className="mx-auto max-w-md">
      <h1 className="font-display text-2xl font-bold">Увійти</h1>
      <p className="mt-1 text-muted-foreground">З поверненням! Увійдіть у свій обліковий запис.</p>
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <Label htmlFor="email">E-Mail *</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1"
            autoComplete="current-password"
          />
          <Link
            href="/account/forgot-password"
            className="mt-1 block text-sm text-primary hover:underline"
          >
            Забули ваш пароль?
          </Link>
        </div>
        {error && (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        )}
        <Button type="submit" size="lg" className="w-full">
          Увійти
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Немає облікового запису?{' '}
        <Link href="/account/register" className="font-medium text-primary hover:underline">
          Реєстрація
        </Link>
      </p>
    </div>
  );
}
