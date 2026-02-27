import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProductBySlug, getSimilarProducts } from '@/lib/api/products';
import { formatPrice } from '@/lib/utils/cn';
import { ProductGallery } from '@/components/product/ProductGallery';
import { AddToCartSection } from '@/components/product/AddToCartSection';
import { ProductCard } from '@/components/product/ProductCard';
import { ProductSchema } from '@/components/seo/ProductSchema';
import { WishlistButton } from '@/components/product/WishlistButton';

export const revalidate = 300;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: 'Товар не знайдено' };
  const title = product.seo?.title ?? `Купити ${product.name} | BelliZoo`;
  const description = product.seo?.description ?? product.shortDescription ?? product.description.slice(0, 160);
  const image = product.images[0];
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      images: image ? [{ url: image.url, width: image.width, height: image.height, alt: image.alt }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const relatedFiltered = await getSimilarProducts(product.category.slug, product.slug, 4);

  const breadcrumbs = [
    { label: 'Головна', href: '/' },
    { label: 'Каталог', href: '/catalog' },
    { label: product.category.name, href: `/catalog/${product.category.slug}` },
    { label: product.name, href: `/product/${product.slug}` },
  ];

  return (
    <div className="container mx-auto px-3 py-4 pb-24 sm:px-4 sm:py-6 md:pb-8">
      <ProductSchema product={product} />

      <nav aria-label="Хлібні крихти" className="mb-4 text-sm text-muted-foreground overflow-x-auto whitespace-nowrap">
        {breadcrumbs.map((b, i) => (
          <span key={b.href}>
            {i > 0 && ' / '}
            <Link href={b.href} className="hover:text-foreground">
              {i === breadcrumbs.length - 1 ? product.name : b.label}
            </Link>
          </span>
        ))}
      </nav>

      <article className="grid gap-6 lg:grid-cols-2 lg:gap-8">
        <ProductGallery images={product.images} name={product.name} />
        <div>
          <div className="flex items-start justify-between gap-3">
            <h1 className="font-display text-xl font-bold sm:text-2xl md:text-3xl">{product.name}</h1>
            <WishlistButton slug={product.slug} className="shrink-0" />
          </div>
          {product.brand && (
            <p className="mt-1 text-sm text-muted-foreground">{product.brand.name}</p>
          )}
          <div className="mt-4 flex flex-wrap items-baseline gap-2">
            <span className="text-2xl font-bold text-primary">
              {formatPrice(product.price.amount)}
            </span>
            {product.compareAtPrice && product.compareAtPrice.amount > product.price.amount && (
              <span className="text-lg text-muted-foreground line-through">
                {formatPrice(product.compareAtPrice.amount)}
              </span>
            )}
          </div>
          {product.rating !== undefined && product.reviewCount > 0 && (
            <p className="mt-1 text-sm text-muted-foreground">
              ★ {product.rating.toFixed(1)} ({product.reviewCount} відгуків)
            </p>
          )}
          <AddToCartSection product={product} className="mt-6" />
          <section className="mt-8 rounded-xl border border-border bg-muted/20 p-4">
            <h2 className="font-semibold">Доставка</h2>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              <li>Нова Пошта — безкоштовно від 899 грн</li>
              <li>Від 65 грн — відділення, поштомат, курʼєр</li>
            </ul>
            <h2 className="mt-4 font-semibold">Оплата</h2>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              <li>Готівка при отриманні</li>
              <li>Онлайн карткою на сайті</li>
            </ul>
          </section>
        </div>
      </article>

      {product.attributes && Object.keys(product.attributes).length > 0 && (
        <section className="mt-10">
          <h2 className="font-display text-xl font-bold">Характеристики</h2>
          <dl className="mt-4 grid gap-2 sm:grid-cols-2">
            {Object.entries(product.attributes).map(([key, value]) => (
              <div key={key} className="flex justify-between gap-4 rounded-lg border border-border px-4 py-2">
                <dt className="text-muted-foreground">{key}</dt>
                <dd className="font-medium">{value}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      <section className="mt-10">
        <h2 className="font-display text-xl font-bold">Опис</h2>
        <div className="mt-4 prose prose-sm max-w-none text-muted-foreground">
          {product.description}
        </div>
      </section>

      {relatedFiltered.length > 0 && (
        <section className="mt-12" aria-labelledby="related-heading">
          <h2 id="related-heading" className="font-display text-xl font-bold mb-6">
            Схожі товари
          </h2>
          <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {relatedFiltered.map((p) => (
              <li key={p.id}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
