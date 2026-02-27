import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Акції',
  description: 'Акції та знижки на зоотовари в BelliZoo. Вигідні пропозиції для ваших улюбленців.',
};

export default function AktsiyiPage() {
  return (
    <div className="container mx-auto px-3 py-4 pb-24 sm:px-4 sm:py-6 md:pb-8">
      <nav aria-label="Хлібні крихти" className="mb-4 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Головна</Link>
        <span className="mx-1">/</span>
        <span className="text-foreground">Акції</span>
      </nav>

      <h1 className="font-display text-2xl font-bold mb-6">Акції</h1>

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <p className="text-muted-foreground leading-relaxed">
          У каталозі ви знайдете товари зі знижками. Звертайте увагу на позначку «Акція» 
          та перекреслену стару ціну на картках товарів.
        </p>
        <p className="text-muted-foreground leading-relaxed mt-4">
          Безкоштовна доставка при замовленні від 1000 грн — це теж наша постійна акція для вас.
        </p>
        <Link href="/catalog" className="inline-block mt-6 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          Перейти до каталогу
        </Link>
      </div>
    </div>
  );
}
