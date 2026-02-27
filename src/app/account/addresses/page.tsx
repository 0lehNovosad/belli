'use client';

import { useState } from 'react';
import { useAddressesStore } from '@/stores/auth-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function AccountAddressesPage() {
  const { addresses, addAddress, removeAddress, setDefault } = useAddressesStore();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    label: '',
    city: '',
    warehouseName: '',
    fullAddress: '',
    isDefault: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addAddress({
      label: form.label || 'Моя адреса',
      city: form.city,
      warehouseName: form.warehouseName || undefined,
      fullAddress: form.fullAddress || undefined,
      isDefault: form.isDefault || addresses.length === 0,
    });
    setForm({ label: '', city: '', warehouseName: '', fullAddress: '', isDefault: false });
    setShowForm(false);
  };

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-soft">
      <h1 className="font-display text-2xl font-bold">Адреси доставки</h1>
      <p className="mt-1 text-muted-foreground">Збережені адреси для швидкого оформлення замовлень.</p>

      {addresses.length === 0 && !showForm ? (
        <div className="mt-8 rounded-lg border border-dashed border-border p-8 text-center">
          <p className="text-muted-foreground">У вас ще немає збережених адрес.</p>
          <Button className="mt-4" onClick={() => setShowForm(true)}>
            Додати адресу
          </Button>
        </div>
      ) : (
        <>
          <ul className="mt-6 space-y-4">
            {addresses.map((addr) => (
              <li
                key={addr.id}
                className="flex flex-wrap items-start justify-between gap-4 rounded-lg border border-border p-4"
              >
                <div>
                  <p className="font-medium">{addr.label}</p>
                  <p className="text-sm text-muted-foreground">
                    {addr.city}
                    {addr.warehouseName && `, ${addr.warehouseName}`}
                    {addr.fullAddress && `, ${addr.fullAddress}`}
                  </p>
                  {addr.isDefault && (
                    <span className="mt-1 inline-block text-xs text-primary">За замовчуванням</span>
                  )}
                </div>
                <div className="flex gap-2">
                  {!addr.isDefault && (
                    <Button variant="outline" size="sm" onClick={() => setDefault(addr.id)}>
                      За замовчуванням
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" onClick={() => removeAddress(addr.id)}>
                    Видалити
                  </Button>
                </div>
              </li>
            ))}
          </ul>
          {showForm ? (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4 rounded-lg border border-border p-4">
              <h2 className="font-semibold">Нова адреса</h2>
              <div>
                <Label htmlFor="label">Назва (наприклад, Дім, Офіс)</Label>
                <Input
                  id="label"
                  value={form.label}
                  onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="city">Місто *</Label>
                <Input
                  id="city"
                  value={form.city}
                  onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="warehouseName">Відділення Нової Пошти</Label>
                <Input
                  id="warehouseName"
                  value={form.warehouseName}
                  onChange={(e) => setForm((f) => ({ ...f, warehouseName: e.target.value }))}
                  className="mt-1"
                  placeholder="№ відділення або поштомат"
                />
              </div>
              <div>
                <Label htmlFor="fullAddress">Адреса (для курʼєра)</Label>
                <Input
                  id="fullAddress"
                  value={form.fullAddress}
                  onChange={(e) => setForm((f) => ({ ...f, fullAddress: e.target.value }))}
                  className="mt-1"
                />
              </div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.isDefault}
                  onChange={(e) => setForm((f) => ({ ...f, isDefault: e.target.checked }))}
                />
                <span className="text-sm">Використовувати за замовчуванням</span>
              </label>
              <div className="flex gap-2">
                <Button type="submit">Зберегти</Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Скасувати
                </Button>
              </div>
            </form>
          ) : (
            <Button className="mt-6" onClick={() => setShowForm(true)}>
              Додати адресу
            </Button>
          )}
        </>
      )}
    </div>
  );
}
