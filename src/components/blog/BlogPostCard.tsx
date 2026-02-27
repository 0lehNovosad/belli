import Link from 'next/link';
import Image from 'next/image';
import type { BlogPost } from '@/lib/types/blog';
import { formatPostDate } from '@/lib/api/blog';
import { REMOTE_PLACEHOLDER_IMAGE } from '@/lib/constants/images';

export function BlogPostCard({ post }: { post: BlogPost }) {
  const imgSrc = post.image?.url ?? REMOTE_PLACEHOLDER_IMAGE;
  const imgAlt = post.image?.alt ?? post.title;

  return (
    <article>
      <Link
        href={`/blog/${post.slug}`}
        className="group block overflow-hidden rounded-xl border border-border bg-card shadow-soft transition-shadow hover:shadow-soft-lg hover:border-primary/30"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          <Image
            src={imgSrc}
            alt={imgAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            unoptimized={false}
          />
        </div>
        <div className="p-4">
          <p className="text-xs text-muted-foreground">
            {post.tags.join('  ·  ')} {formatPostDate(post.date)}
          </p>
          <h3 className="mt-2 font-display text-base font-semibold leading-tight line-clamp-2 group-hover:text-primary">
            {post.title}
          </h3>
        </div>
      </Link>
    </article>
  );
}
