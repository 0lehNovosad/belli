import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Клієнтам',
  description: 'Оплата та доставка, повернення товару, договір оферти. Інформація для клієнтів BelliZoo.',
};

export default function KliyentamPage() {
  return (
    <div className="container mx-auto px-3 py-4 pb-24 sm:px-4 sm:py-6 md:pb-8">
      <nav aria-label="Хлібні крихти" className="mb-4 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Головна</Link>
        <span className="mx-1">/</span>
        <span className="text-foreground">Клієнтам</span>
      </nav>

      <h1 className="font-display text-2xl font-bold mb-6">Інформація клієнтам</h1>

      <div className="space-y-8">
        <section className="rounded-xl border border-border bg-muted/20 p-4 sm:p-6">
          <h2 className="font-semibold text-lg mb-2">Доставка по Україні</h2>
          <p className="text-muted-foreground">
            Безкоштовна доставка при замовленні від 1000 грн. Відправляємо Новою Поштою 
            (відділення, поштомат, курʼєр). Вартість доставки від 65 грн залежно від тарифів перевізника.
          </p>
        </section>

        <section className="rounded-xl border border-border bg-muted/20 p-4 sm:p-6">
          <h2 className="font-semibold text-lg mb-2">Оплата</h2>
          <p className="text-muted-foreground">
            Оплата при отриманні (готівка або картка у відділенні НП), або оплата карткою онлайн 
            при оформленні замовлення.
          </p>
        </section>

        <section className="rounded-xl border border-border bg-muted/20 p-4 sm:p-6">
          <h2 className="font-semibold text-lg mb-2">Повернення товару</h2>
          <p className="text-muted-foreground">
            14 днів для повернення товару належної якості згідно із законодавством. 
            Доможемо та проконсультуємо щодо обміну та повернення.
          </p>
        </section>

        <section className="rounded-xl border border-border bg-muted/20 p-4 sm:p-6">
          <h2 className="font-semibold text-lg mb-2">Додатково</h2>
          <ul className="text-muted-foreground space-y-1">
            <li><Link href="/aktsiyi" className="hover:text-foreground">Акції</Link></li>
            <li><Link href="/pro-nas" className="hover:text-foreground">Про нас</Link></li>
            <li><Link href="/brendy" className="hover:text-foreground">Бренди</Link></li>
            <li><Link href="/nashi-magazyny" className="hover:text-foreground">Наші магазини</Link></li>
            <li><Link href="/blog" className="hover:text-foreground">Блог</Link></li>
          </ul>
        </section>
      </div>
    </div>
  );
}
