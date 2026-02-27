'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import type { Category } from '@/lib/types/product';
import { MOCK_BRANDS } from '@/lib/api/products';

export function CatalogFilters({
  categorySlug,
  subcategorySlug,
  categories,
  currentBrands = [],
}: {
  categorySlug?: string | null;
  subcategorySlug?: string;
  categories: Category[];
  currentBrands?: string[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const basePath = categorySlug ? `/catalog/${categorySlug}` : '/catalog';
  const clearFilters = () => {
    const target = subcategorySlug ? `${basePath}/${subcategorySlug}` : basePath;
    router.push(target);
  };

  const category = categories.find((c) => c.slug === categorySlug);
  const subcategories = category?.children ?? [];

  return (
    <div className="space-y-6">
      <section>
        <h2 className="font-semibold mb-2">Категорії</h2>
        <ul className="space-y-1">
          <li>
            <Link
              href="/catalog"
              className={`block rounded-lg px-3 py-2 text-sm ${!categorySlug ? 'bg-primary/10 font-medium text-primary' : 'hover:bg-muted'}`}
            >
              Усі категорії
            </Link>
          </li>
          {categories?.map((cat) => (
            <li key={cat.id}>
              <Link
                href={`/catalog/${cat.slug}`}
                className={`block rounded-lg px-3 py-2 text-sm ${categorySlug === cat.slug && !subcategorySlug ? 'bg-primary/10 font-medium text-primary' : 'hover:bg-muted'}`}
              >
                {cat.name}
                {cat.productCount != null && <span className="ml-1 text-muted-foreground">({cat.productCount})</span>}
              </Link>
              {cat.slug === categorySlug && subcategories.length > 0 && (
                <ul className="ml-3 mt-1 space-y-1">
                  {subcategories.map((sub) => (
                    <li key={sub.id}>
                      <Link
                        href={`/catalog/${cat.slug}/${sub.slug}`}
                        className={`block rounded-lg px-3 py-1.5 text-sm ${subcategorySlug === sub.slug ? 'bg-primary/10 font-medium text-primary' : 'hover:bg-muted'}`}
                      >
                        {sub.name}
                        {sub.productCount != null && <span className="ml-1 text-muted-foreground">({sub.productCount})</span>}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </section>

      {categorySlug && MOCK_BRANDS.length > 0 && (
        <section>
          <h2 className="font-semibold mb-2">Бренди</h2>
          <ul className="space-y-1">
            {MOCK_BRANDS.slice(0, 10).map((b) => {
              const isActive = currentBrands.includes(b.id);
              const nextBrands = isActive ? currentBrands.filter((x) => x !== b.id) : [...currentBrands, b.id];
              const href = nextBrands.length
                ? `${subcategorySlug ? `${basePath}/${subcategorySlug}` : basePath}?${nextBrands.map((id) => `brand=${id}`).join('&')}`
                : subcategorySlug ? `${basePath}/${subcategorySlug}` : basePath;
              return (
                <li key={b.id}>
                  <Link
                    href={href}
                    className={`block rounded-lg px-3 py-1.5 text-sm ${isActive ? 'bg-primary/10 font-medium text-primary' : 'hover:bg-muted'}`}
                  >
                    {b.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {(searchParams.get('brand') || searchParams.get('sort') || searchParams.get('page')) && (
        <button type="button" onClick={clearFilters} className="text-sm text-primary hover:underline">
          Скинути фільтри
        </button>
      )}
    </div>
  );
}