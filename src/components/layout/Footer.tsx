import Link from 'next/link';
import Image from 'next/image';

const FOOTER_LINKS = {
  catalog: [
    { name: 'Собаки', href: '/catalog/sobak' },
    { name: 'Коти', href: '/catalog/koti' },
    { name: 'Птахи', href: '/catalog/ptahi' },
    { name: 'Гризуни', href: '/catalog/grizuni' },
    { name: 'Акваріумістика', href: '/catalog/akvariumistyka' },
  ],
  info: [
    { name: 'Доставка та оплата', href: '/delivery' },
    { name: 'Повернення', href: '/returns' },
    { name: 'Контакти', href: '/contacts' },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30 pb-[env(safe-area-inset-bottom)]">
      <div className="container mx-auto grid gap-6 px-3 py-8 sm:px-4 sm:py-10 md:grid-cols-3 md:gap-8">
        <div>
          <Link href="/" className="inline-block" aria-label="BelliZoo — на головну">
            <Image
              src="/logotip.svg"
              alt="BelliZoo"
              width={140}
              height={42}
              className="h-8 w-auto"
            />
          </Link>
          <p className="mt-2 text-sm text-muted-foreground">
            Зоотовари для ваших улюбленців. Львів та доставка по Україні.
          </p>
        </div>
        <div>
          <h3 className="font-semibold">Каталог</h3>
          <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
            {FOOTER_LINKS.catalog.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-foreground">
                  {l.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold">Інформація</h3>
          <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
            {FOOTER_LINKS.info.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-foreground">
                  {l.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-border px-3 py-4 sm:px-4 text-center text-sm text-muted-foreground" suppressHydrationWarning>
        © {new Date().getFullYear()} BelliZoo. Всі права захищені.
      </div>