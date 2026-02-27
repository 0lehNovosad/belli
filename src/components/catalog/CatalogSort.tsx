'use client';

import { useRouter, useSearchParams } from 'next/navigation';

const SORT_OPTIONS: { value: string; label: string }[] = [
  { value: 'relevance', label: 'За популярністю' },
  { value: 'price_asc', label: 'Спочатку дешеві' },
  { value: 'price_desc', label: 'Спочатку дорогі' },
  { value: 'newest', label: 'За новизною' },
  { value: 'rating', label: 'За рейтингом' },
];

export function CatalogSort({
  currentSort,
  categorySlug,
  subcategorySlug,
}: {
  currentSort: string;
  categorySlug?: string | null;
  subcategorySlug?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (value: string) => {
    const next = new URLSearchParams(searchParams.toString());
    next.set('sort', value);
    next.delete('page');
    const base = categorySlug ? `/catalog/${categorySlug}${subcategorySlug ? `/${subcategorySlug}` : ''}` : '/catalog';
    router.push(`${base}?${next.toString()}`);
  };

  return (
    <select
      value={currentSort}
      onChange={(e) => handleChange(e.target.value)}
      className="min-h-[44px] h-10 rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring w-full sm:w-auto"
      aria-label="Сортування"
    >
      {SORT_OPTIONS.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

