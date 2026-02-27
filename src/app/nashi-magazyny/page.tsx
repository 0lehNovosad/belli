import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Наші магазини',
  description: 'Адреси магазинів BelliZoo у Львові. Графік роботи та контакти.',
};

export default function NashiMagazynyPage() {
  return (
    <div className="container mx-auto px-3 py-4 pb-24 sm:px-4 sm:py-6 md:pb-8">
      <nav aria-label="Хлібні крихти" className="mb-4 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Головна</Link>
        <span className="mx-1">/</span>
        <span className="text-foreground">Наші магазини</span>
      </nav>

      <h1 className="font-display text-2xl font-bold mb-6">Наші магазини</h1>

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <p className="text-muted-foreground leading-relaxed">
          BelliZoo — мережа зоомагазинів у Львові. Ви можете придбати товари в магазині 
          або замовити доставку по Україні.
        </p>
        <div className="mt-6 rounded-xl border border-border bg-muted/20 p-4 sm:p-6">
          <h2 className="font-semibold text-lg mb-2">Графік роботи</h2>
          <p className="text-muted-foreground">Пн – Нд: 10:00 – 19:00</p>
          <p className="text-muted-foreground mt-1 text-sm">Опрацьовуємо ваші замовлення щодня.</p>
        </div>
        <div className="mt-6 rounded-xl border border-border bg-muted/20 p-4 sm:p-6">
          <h2 className="font-semibold text-lg mb-2">Телефони для консультацій</h2>
          <ul className="text-muted-foreground space-y-1">
            <li><a href="tel:+380683009191" className="hover:text-foreground">+38 (068) 300 91 91</a> — відділ продажу</li>
            <li><a href="tel:+380933009191" className="hover:text-foreground">+38 (093) 300 91 91</a></li>
            <li><a href="tel:+380993009191" className="hover:text-foreground">+38 (099) 300 91 91</a></li>
            <li><a href="tel:+380684792876" className="hover:text-foreground">+38 (068) 479 28 76</a> — відділ підтримки</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
