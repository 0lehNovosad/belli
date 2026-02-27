import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Про нас',
  description: 'BelliZoo — зоомагазин у Львові. Зоотовари для собак, котів, птахів, гризунів та акваріумістики.',
};

export default function ProNasPage() {
  return (
    <div className="container mx-auto px-3 py-4 pb-24 sm:px-4 sm:py-6 md:pb-8">
      <nav aria-label="Хлібні крихти" className="mb-4 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Головна</Link>
        <span className="mx-1">/</span>
        <span className="text-foreground">Про нас</span>
      </nav>

      <h1 className="font-display text-2xl font-bold mb-6">Про нас</h1>

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <p className="text-muted-foreground leading-relaxed">
          BelliZoo — це мережа зоомагазинів у Львові та доставка зоотоварів по всій Україні. 
          Ми пропонуємо корми для собак і котів, аксесуари, наповнювачі, товари для птахів, 
          гризунів та акваріумістики.
        </p>
        <p className="text-muted-foreground leading-relaxed mt-4">
          Наша мета — допомогти вам дбати про ваших улюбленців. Якісні товари, консультації 
          та зручна доставка Новою Поштою.
        </p>
        <p className="text-muted-foreground leading-relaxed mt-4">
          Безкоштовна доставка від 1000 грн. 14 днів на повернення товару.
        </p>
      </div>
    </div>
  );
}
