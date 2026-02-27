'use client';

import { useState, useEffect } from 'react';
import { useAuthStore, useProfileStore } from '@/stores/auth-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function AccountProfilePage() {
  const user = useAuthStore((s) => s.user);
  const updateProfile = useProfileStore((s) => s.updateProfile);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
      });
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!user) return null;

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-soft">
      <h1 className="font-display text-2xl font-bold">Змінити дані</h1>
      <p className="mt-1 text-muted-foreground">Оновіть свої контактні дані.</p>

      <form onSubmit={handleSubmit} className="mt-8 max-w-md space-y-4">
        <div>
          <Label htmlFor="firstName">Імʼя *</Label>
          <Input
            id="firstName"
            value={form.firstName}
            onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
            className="mt-1"
            required
          />
        </div>
        <div>
          <Label htmlFor="lastName">Прізвище *</Label>
          <Input
            id="lastName"
            value={form.lastName}
            onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
            className="mt-1"
            required
          />
        </div>
        <div>
          <Label htmlFor="phone">Телефон</Label>
          <Input
            id="phone"
            type="tel"
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            className="mt-1"
            placeholder="+380"
          />
        </div>
        <p className="text-sm text-muted-foreground">E-Mail змінити неможливо.</p>
        <Button type="submit">{saved ? 'Збережено' : 'Зберегти зміни'}</Button>
      </form>
    </div>
  );
}
