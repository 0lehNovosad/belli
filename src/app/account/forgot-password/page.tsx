import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ForgotPasswordPage() {
  return (
    <div className="mx-auto max-w-md">
      <h1 className="font-display text-2xl font-bold">Забули пароль?</h1>
      <p className="mt-1 text-muted-foreground">
        Вкажіть email вашого облікового запису — ми надішлемо посилання для відновлення пароля.
      </p>
      <form className="mt-8 space-y-4">
        <div>
          <Label htmlFor="email">E-Mail *</Label>
          <Input
            id="email"
            type="email"
            className="mt-1"
            placeholder="example@mail.ua"
            autoComplete="email"
          />
        </div>
        <Button type="submit" size="lg" className="w-full" disabled>
          Надіслати (функція в розробці)
        </Button>
      </form>
      <Link href="/account/login" className="mt-6 block text-center text-sm text-primary hover:underline">
        ← Повернутись до входу
      </Link>
    </div>
  );
}
