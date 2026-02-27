import type { Metadata } from 'next';
import Link from 'next/link';
import { getBlogPosts, BLOG_CATEGORIES } from '@/lib/api/blog';
import { BlogPostCard } from '@/components/blog/BlogPostCard';

export const metadata: Metadata = {
  title: 'Блог',
  description: 'Новини магазину BelliZoo та поради для власників собак і котів.',
};

type Props = {
  searchParams: Promise<{ category?: string }>;
};

export default async function BlogPage({ searchParams }: Props) {
  const { category } = await searchParams;
  const posts = getBlogPosts({ category, limit: 20 });

  return (
    <div className="container mx-auto px-3 py-4 sm:px-4 sm:py-6 pb-24 md:pb-8">
      <nav aria-label="Хлібні крихти" className="mb-4 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Головна</Link>
        <span className="mx-1">/</span>
        <span className="text-foreground">Блог</span>
      </nav>

      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h1 className="font-display text-2xl font-bold">Беллі Блог</h1>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/blog"
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${!category ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
          >
            Усі статті
          </Link>
          {BLOG_CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/blog?category=${cat.slug}`}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${category === cat.slug ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>

      {posts.length === 0 ? (
        <p className="rounded-xl border border-border bg-muted/20 p-8 text-center text-muted-foreground">
          Статей у цій категорії поки немає.
        </p>
      ) : (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <li key={post.id}>
              <BlogPostCard post={post} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
