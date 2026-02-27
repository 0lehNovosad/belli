import type { BlogPost, BlogCategory } from '@/lib/types/blog';
import { REMOTE_PLACEHOLDER_IMAGE } from '@/lib/constants/images';

export const BLOG_CATEGORIES: BlogCategory[] = [
  { id: 'novyny', slug: 'novyny-magazynu', name: 'Новини магазину' },
  { id: 'porady', slug: 'porady-dlya-sobak', name: 'Поради для собак' },
];

const MOCK_POSTS: BlogPost[] = [
  {
    id: '1',
    slug: 'protiparazytarni-zasoby-dlya-ulyublenetsiv',
    title: 'Протипаразитарні засоби широкого спектра для улюбленців: як обрати найкраще',
    excerpt: 'Поради щодо вибору протипаразитарних засобів для собак та котів.',
    category: 'porady',
    tags: ['Собаки', 'Коти'],
    date: '2025-07-24',
    image: { url: REMOTE_PLACEHOLDER_IMAGE, alt: 'Протипаразитарні засоби' },
  },
  {
    id: '2',
    slug: 'naymenshi-porody-kotiv',
    title: 'Найменші породи котів у світі',
    excerpt: 'Огляд найменших порід котів та їхні особливості.',
    category: 'porady',
    tags: ['Коти'],
    date: '2025-07-24',
    image: { url: REMOTE_PLACEHOLDER_IMAGE, alt: 'Найменші породи котів' },
  },
  {
    id: '3',
    slug: 'top-10-porid-naybilshyh-kotiv',
    title: 'Топ 10 порід найбільших котів',
    excerpt: 'Рейтинг найбільших порід котів для любителів великих улюбленців.',
    category: 'porady',
    tags: ['Коти'],
    date: '2025-07-24',
    image: { url: REMOTE_PLACEHOLDER_IMAGE, alt: 'Найбільші коти' },
  },
  {
    id: '4',
    slug: 'gipoalergenni-domashni-ulyublentsi',
    title: 'Гіпоалергенні домашні улюбленці: кого обрати при алергії',
    excerpt: 'Яких тварин можна тримати при алергії на шерсть.',
    category: 'porady',
    tags: ['Собаки', 'Коти'],
    date: '2025-07-24',
    image: { url: REMOTE_PLACEHOLDER_IMAGE, alt: 'Гіпоалергенні тварини' },
  },
  {
    id: '5',
    slug: 'yakyy-korm-dlya-sobak-krashchyy',
    title: 'Який корм для собак кращий',
    excerpt: 'Поради з вибору якісного корму для собак.',
    category: 'porady',
    tags: ['Собаки'],
    date: '2025-11-11',
    image: { url: REMOTE_PLACEHOLDER_IMAGE, alt: 'Корм для собак' },
  },
  {
    id: '6',
    slug: 'top-10-naykrashchih-kormiv-dlya-sobak',
    title: 'Топ 10 найкращих кормів для собак: рейтинг від Bellizoo',
    excerpt: 'Рейтинг кормів для собак за версією експертів Bellizoo.',
    category: 'novyny',
    tags: ['Собаки'],
    date: '2025-07-24',
    image: { url: REMOTE_PLACEHOLDER_IMAGE, alt: 'Рейтинг кормів' },
  },
];

function formatBlogDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('uk-UA', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

export function getBlogPosts(options?: { category?: string; limit?: number }): BlogPost[] {
  let list = [...MOCK_POSTS].sort((a, b) => (b.date > a.date ? 1 : -1));
  if (options?.category) {
    const catSlug = options.category;
    const cat = BLOG_CATEGORIES.find((c) => c.slug === catSlug || c.id === catSlug);
    if (cat) {
      list = list.filter((p) => p.category === cat.id);
    }
  }
  if (options?.limit) {
    list = list.slice(0, options.limit);
  }
  return list;
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  return MOCK_POSTS.find((p) => p.slug === slug) ?? null;
}

export function formatPostDate(iso: string): string {
  return formatBlogDate(iso);
}
