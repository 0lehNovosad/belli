import Link from 'next/link';
import { Suspense } from 'react';
import { getCategories, getProducts } from '@/lib/api/products';
import { getBlogPosts, BLOG_CATEGORIES } from '@/lib/api/blog';
import { ProductCard } from '@/components/product/ProductCard';
import { BlogPostCard } from '@/components/blog/BlogPostCard';
import { Button } from '@/components/ui/button';

export const revalidate = 300;

async function CategoriesGrid() {
  const categories = await getCategories();
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={`/catalog/${cat.slug}`}
          className="rounded-xl border border-border bg-card p-4 text-center shadow-soft transition-shadow hover:shadow-soft-lg hover:border-primary/30"
        >
          <span className="font-medium">{cat.name}</span>
          {cat.productCount != null && (
            <span className="mt-1 block text-sm text-muted-foreground">
              {cat.productCount} товарів
            </span>
          )}
        </Link>
      ))}
    </div>
  );
}

async function PopularProducts() {
  const catalog = await getProducts({ pageSize: 8 });
  return (
    <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {catalog.items.map((product, i) => (
        <li key={product.id}>
          <ProductCard product={product} priority={i === 0} />
        </li>
      ))}
    </ul>
  );
}

export default async function HomePage() {
  return (
    <div className="container mx-auto px-3 py-4 sm:px-4 sm:py-6 md:py-10">
      {/* Hero — above the fold */}
      <section className="mb-8 md:mb-10 rounded-2xl bg-primary/10 p-4 sm:p-6 md:p-10 text-center">
        <h1 className="font-display text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
          Зоотовари для вашого улюбленця
        </h1>
        <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
          Корм для собак і котів, аксесуари, наповнювачі. Безкоштовна доставка від 1000 грн.
        </p>
        <Link href="/catalog" className="inline-block mt-4">
          <Button size="lg" className="min-h-[44px]">Перейти до каталогу</Button>
        </Link>
      </section>

      {/* Categories — streamed */}
      <section aria-labelledby="categories-heading" className="mb-12">
        <h2 id="categories-heading" className="sr-only">
          Категорії товарів
        </h2>
        <Suspense fallback={
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-4 h-20 animate-pulse" />
            ))}
          </div>
        }>
          <CategoriesGrid />
        </Suspense>
      </section>

      {/* Trust badges */}
      <section className="mb-8 md:mb-10 grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-3" aria-hidden="true">
        <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 p-4">
          <span className="text-2xl">🚚</span>
          <div>
            <p className="font-medium">Безкоштовна доставка</p>
            <p className="text-sm text-muted-foreground">від 1000 грн</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 p-4">
          <span className="text-2xl">↩️</span>
          <div>
            <p className="font-medium">Повернення</p>
            <p className="text-sm text-muted-foreground">14 днів</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 p-4">
          <span className="text-2xl">💬</span>
          <div>
            <p className="font-medium">Підтримка</p>
            <p className="text-sm text-muted-foreground">Допоможемо з вибором</p>
          </div>
        </div>
      </section>

      {/* Popular products — streamed, first image priority for LCP */}
      <section aria-labelledby="popular-heading">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 sm:mb-6">
          <h2 id="popular-heading" className="font-display text-xl font-bold sm:text-2xl">
            Популярні товари
          </h2>
          <Link href="/catalog">
            <Button variant="outline" size="sm">Всі товари</Button>
          </Link>
        </div>
        <Suspense fallback={
          <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <li key={i} className="rounded-xl border border-border bg-card aspect-[3/4] animate-pulse" />
            ))}
          </ul>
        }>
          <PopularProducts />
        </Suspense>
      </section>

      {/* Беллі Блог — як на bellizoo.com.ua */}
      <section aria-labelledby="blog-heading" className="mt-12 md:mt-16">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 sm:mb-6">
          <h2 id="blog-heading" className="font-display text-xl font-bold sm:text-2xl">
            Беллі Блог
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            {BLOG_CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={`/blog?category=${cat.slug}`}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {cat.name}
              </Link>
            ))}
            <span className="text-muted-foreground/50">·</span>
            <Link href="/blog" className="text-sm font-medium text-primary hover:underline">
              Більше контенту
            </Link>
          </div>
        </div>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {getBlogPosts({ limit: 4 }).map((post) => (
            <li key={post.id}>
              <BlogPostCard post={post} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
