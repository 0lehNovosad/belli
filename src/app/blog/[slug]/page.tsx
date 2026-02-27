import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getBlogPostBySlug, getBlogPosts, formatPostDate } from '@/lib/api/blog';
import { REMOTE_PLACEHOLDER_IMAGE } from '@/lib/constants/images';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: 'Статтю не знайдено' };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export async function generateStaticParams() {
  const posts = getBlogPosts({ limit: 50 });
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const imgSrc = post.image?.url ?? REMOTE_PLACEHOLDER_IMAGE;
  const imgAlt = post.image?.alt ?? post.title;

  return (
    <div className="container mx-auto px-3 py-4 sm:px-4 sm:py-6 pb-24 md:pb-8">
      <nav aria-label="Хлібні крихти" className="mb-4 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Головна</Link>
        <span className="mx-1">/</span>
        <Link href="/blog" className="hover:text-foreground">Блог</Link>
        <span className="mx-1">/</span>
        <span className="text-foreground line-clamp-1">{post.title}</span>
      </nav>

      <article className="mx-auto max-w-3xl">
        <p className="text-sm text-muted-foreground">
          {post.tags.join('  ·  ')} {formatPostDate(post.date)}
        </p>
        <h1 className="mt-2 font-display text-2xl font-bold sm:text-3xl">{post.title}</h1>

        {post.image && (
          <div className="relative mt-6 aspect-[16/10] overflow-hidden rounded-xl bg-muted">
            <Image
              src={imgSrc}
              alt={imgAlt}
              fill
              sizes="(max-width: 768px) 100vw, 672px"
              className="object-cover"
              priority
              unoptimized={false}
            />
          </div>
        )}

        <div className="mt-6 prose prose-sm max-w-none text-foreground">
          <p className="text-lg text-muted-foreground">{post.excerpt}</p>
          {post.content ? (
            <div className="mt-4 whitespace-pre-wrap">{post.content}</div>
          ) : (
            <p className="mt-4 text-muted-foreground">
              Повний текст статті незабаром зʼявиться. Поверніться на{' '}
              <Link href="/blog" className="text-primary hover:underline">
                сторінку блогу
              </Link>
              .
            </p>
          )}
        </div>
      </article>
    </div>
  );
}
