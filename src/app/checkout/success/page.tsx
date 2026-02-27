import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function CheckoutSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-12 text-center">
      <h1 className="font-display text-2xl font-bold text-primary">
        Дякуємо за замовлення!
      </h1>
      <p className="mt-2 text-muted-foreground">
        Ми надішлемо підтвердження на вказаний email та звʼяжемось з вами для уточнення доставки.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link href="/catalog">
          <Button size="lg">Продовжити покупки</Button>
        </Link>
        <Link href="/">
          <Button variant="outline" size="lg">На головну</Button>
        </Link>
      </div>
    </div>
  );
}
