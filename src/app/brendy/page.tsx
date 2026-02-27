import type { Metadata } from 'next';
import Link from 'next/link';
import { MOCK_BRANDS } from '@/lib/api/products';

export const metadata: Metadata = {
  title: 'Бренди',
  description: 'Популярні бренди зоотоварів у BelliZoo: Royal Canin, Pro Plan, Acana, Monge та інші.',
};

export default function BrendyPage() {
  return (
    <div className="container mx-auto px-3 py-4 pb-24 sm:px-4 sm:py-6 md:pb-8">
      <nav aria-label="Хлібні крихти" className="mb-4 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Головна</Link>
        <span className="mx-1">/</span>
        <span className="text-foreground">Бренди</span>
      </nav>

      <h1 className="font-display text-2xl font-bold mb-6">Популярні бренди</h1>

      <p className="text-muted-foreground mb-8">
        У нас представлені перевірені виробники кормів та аксесуарів для тварин.
      </p>

      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {MOCK_BRANDS.map((brand) => (
          <li key={brand.id}>
            <Link
              href={`/catalog?brand=${brand.id}`}
              className="block rounded-xl border border-border bg-card px-4 py-3 text-center font-medium shadow-soft transition-shadow hover:border-primary/30 hover:shadow-soft-lg"
            >
              {brand.name}
            </Link>
          </li>
        ))}
      </ul>

      <Link href="/catalog" className="inline-block mt-8 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
        Перейти до каталогу
      </Link>
    </div>
  );
}
