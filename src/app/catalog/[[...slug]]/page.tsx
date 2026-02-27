import type { Metadata } from 'next';
import Link from 'next/link';
import { getCategoryBySlug, getCategories, getProducts } from '@/lib/api/products';
import { ProductCard } from '@/components/product/ProductCard';
import { CatalogFilters } from '@/components/catalog/CatalogFilters';
import { CatalogSort } from '@/components/catalog/CatalogSort';

export const revalidate = 300;

type Props = {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<{ sort?: string; page?: string; [key: string]: string | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const categorySlug = slug?.[0] ?? 'catalog';
  const category = await getCategoryBySlug(categorySlug);
  if (!category && slug?.length) return {};
  const title = category ? `${category.name} — купити в BelliZoo` : 'Каталог зоотоварів';
  return {
    title,
    description: category
      ? `Купити ${category.name.toLowerCase()} в інтернет-магазині BelliZoo. Швидка доставка по Україні.`
      : 'Каталог зоотоварів: корм для собак і котів, аксесуари, наповнювачі.',
  };
}

export default async function CatalogPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { sort = 'relevance', page = '1', brand } = await searchParams;
  const categorySlug = slug?.[0];
  const subcategorySlug = slug?.[1];
  const category = categorySlug ? await getCategoryBySlug(categorySlug) : null;
  const pageNum = Math.max(1, parseInt(page, 10));
  const brandsFilter = brand ? (typeof brand === 'string' ? [brand] : brand) : undefined;

  const [catalog, categories] = await Promise.all([
    getProducts({
      categorySlug: category?.slug,
      subcategorySlug: subcategorySlug || undefined,
      page: pageNum,
      pageSize: 12,
      sort: sort as 'relevance' | 'price_asc' | 'price_desc' | 'newest' | 'rating' | 'popular',
      filters: brandsFilter?.length ? { brands: brandsFilter } : undefined,
    }),
    getCategories(),
  ]);

  const basePath = categorySlug ? `/catalog/${categorySlug}${subcategorySlug ? `/${subcategorySlug}` : ''}` : '/catalog';
  const subName = subcategorySlug && category
    ? categories.find((c) => c.slug === categorySlug)?.children?.find((ch) => ch.slug === subcategorySlug)?.name
    : null;

  const breadcrumbs = [
    { label: 'Головна', href: '/' },
    { label: 'Каталог', href: '/catalog' },
    ...(category ? [{ label: category.name, href: `/catalog/${category.slug}` }] : []),
    ...(subName && subcategorySlug && category
      ? [{ label: subName, href: `/catalog/${category.slug}/${subcategorySlug}` }]
      : []),
  ];

  return (
    <div className="container mx-auto px-3 py-4 sm:px-4 sm:py-6">
      <nav aria-label="Хлібні крихти" className="mb-4 text-sm text-muted-foreground overflow-x-auto whitespace-nowrap">
        {breadcrumbs.map((b, i) => (
          <span key={b.href}>
            {i > 0 && ' / '}
            <Link href={b.href} className="hover:text-foreground">
              {b.label}
            </Link>
          </span>
        ))}
      </nav>

      <div className="flex flex-col gap-4 md:gap-6 lg:flex-row">
        <aside className="w-full lg:w-56 shrink-0">
          <CatalogFilters
            categorySlug={category?.slug}
            subcategorySlug={subcategorySlug}
            categories={categories}
            currentBrands={brandsFilter}
          />
        </aside>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <h1 className="font-display text-xl font-bold sm:text-2xl w-full sm:w-auto">
              {subName ?? category?.name ?? 'Каталог'}
            </h1>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <CatalogSort currentSort={sort} categorySlug={category?.slug} subcategorySlug={subcategorySlug} />
            </div>
          </div>

          <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
            {catalog.items.map((product, i) => (
              <li key={product.id}>
                <ProductCard product={product} priority={i < 2} />
              </li>
            ))}
          </ul>

          {catalog.totalPages > 1 && (
            <nav className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-2" aria-label="Пагінація">
              {pageNum > 1 && (
                <Link
                  href={`${basePath}?sort=${sort}&page=${pageNum - 1}${brandsFilter?.length ? `&brand=${brandsFilter.join('&brand=')}` : ''}`}
                  className="rounded-lg border border-border px-4 py-2.5 min-h-[44px] text-sm hover:bg-muted inline-flex items-center justify-center"
                >
                  Назад
                </Link>
              )}
              <span className="flex items-center px-4 py-2.5 min-h-[44px] text-sm text-muted-foreground">
                Сторінка {pageNum} з {catalog.totalPages}
              </span>
              {pageNum < catalog.totalPages && (
                <Link
                  href={`${basePath}?sort=${sort}&page=${pageNum + 1}${brandsFilter?.length ? `&brand=${brandsFilter.join('&brand=')}` : ''}`}
                  className="rounded-lg border border-border px-4 py-2.5 min-h-[44px] text-sm hover:bg-muted inline-flex items-center justify-center"
                >
                  Далі
                </Link>
              )}
            </nav>
          )}
        </div>
      </div>
    </div>
  );
}
