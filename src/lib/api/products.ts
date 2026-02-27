/**
 * Product & Catalog API — can be swapped for real backend
 */

import type {
  Product,
  ProductListItem,
  Category,
  PaginatedResponse,
  CatalogFilters,
  SortOption,
} from '@/lib/types/product';
import { apiGet } from './client';
import {
  MOCK_CATEGORIES,
  MOCK_SUBCATEGORIES,
  MOCK_PRODUCTS_DATA,
  MOCK_BRANDS,
} from './mock-data';

export { MOCK_BRANDS, MOCK_SUBCATEGORIES };

function getCategoriesWithChildren(): Category[] {
  return MOCK_CATEGORIES.map((cat) => {
    const children = MOCK_SUBCATEGORIES.filter((s) => s.parentSlug === cat.slug).map((s) => ({
      id: `${cat.id}-${s.slug}`,
      name: s.name,
      slug: s.slug,
      parentId: cat.id,
      productCount: MOCK_PRODUCTS_DATA.filter(
        (p) => p.categorySlug === cat.slug && p.subcategorySlug === s.slug
      ).length,
    }));
    const productCount = MOCK_PRODUCTS_DATA.filter((p) => p.categorySlug === cat.slug).length;
    return { ...cat, productCount, children: children.length ? children : undefined };
  });
}

export async function getCategories(): Promise<Category[]> {
  if (process.env.NEXT_PUBLIC_MOCK_API !== 'false') {
    return getCategoriesWithChildren();
  }
  return apiGet<Category[]>('/categories');
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const list = await getCategories();
  return list.find((c) => c.slug === slug) ?? null;
}

export async function getSubcategoryBySlug(
  categorySlug: string,
  subcategorySlug: string
): Promise<{ slug: string; name: string } | null> {
  const sub = MOCK_SUBCATEGORIES.find(
    (s) => s.parentSlug === categorySlug && s.slug === subcategorySlug
  );
  return sub ?? null;
}

function applySort(
  items: ProductListItem[],
  sort: SortOption
): ProductListItem[] {
  const arr = [...items];
  switch (sort) {
    case 'price_asc':
      return arr.sort((a, b) => a.price.amount - b.price.amount);
    case 'price_desc':
      return arr.sort((a, b) => b.price.amount - a.price.amount);
    case 'rating':
      return arr.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    case 'newest':
      return arr.reverse();
    case 'popular':
      return arr.sort((a, b) => (b.reviewCount ?? 0) - (a.reviewCount ?? 0));
    default:
      return arr;
  }
}

export async function getProducts(params: {
  categorySlug?: string;
  subcategorySlug?: string;
  page?: number;
  pageSize?: number;
  sort?: SortOption;
  filters?: CatalogFilters;
}): Promise<PaginatedResponse<ProductListItem>> {
  if (process.env.NEXT_PUBLIC_MOCK_API !== 'false') {
    const toListItem = (p: (typeof MOCK_PRODUCTS_DATA)[0]): ProductListItem => ({
      id: p.id,
      slug: p.slug,
      name: p.name,
      images: p.images,
      price: p.price,
      compareAtPrice: p.compareAtPrice,
      inStock: p.inStock,
      rating: p.rating,
      reviewCount: p.reviewCount,
    });

    let items: ProductListItem[] = MOCK_PRODUCTS_DATA.filter((p) => {
      if (params.categorySlug && p.categorySlug !== params.categorySlug) return false;
      if (params.subcategorySlug && p.subcategorySlug !== params.subcategorySlug) return false;
      if (params.filters?.brands?.length) {
        if (!p.brandId || !params.filters.brands!.includes(p.brandId)) return false;
      }
      if (params.filters?.minPrice != null && p.price.amount < params.filters.minPrice) return false;
      if (params.filters?.maxPrice != null && p.price.amount > params.filters.maxPrice) return false;
      return true;
    }).map(toListItem);

    items = applySort(items, params.sort ?? 'relevance');

    const page = params.page ?? 1;
    const pageSize = params.pageSize ?? 12;
    const start = (page - 1) * pageSize;
    const pageItems = items.slice(start, start + pageSize);

    return {
      items: pageItems,
      total: items.length,
      page,
      pageSize,
      totalPages: Math.ceil(items.length / pageSize),
    };
  }
  return apiGet<PaginatedResponse<ProductListItem>>('/products', params as Record<string, string>);
}

function buildFullProduct(p: (typeof MOCK_PRODUCTS_DATA)[0]): Product {
  const category = MOCK_CATEGORIES.find((c) => c.slug === p.categorySlug) ?? MOCK_CATEGORIES[0];
  const brand = p.brandId ? MOCK_BRANDS.find((b) => b.id === p.brandId) : undefined;
  const shortDesc = p.name.split(' ').slice(0, 8).join(' ') + '.';
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    description:
      'Повноцінний раціон для вашого вихованця. Якісні інгредієнти, збалансований склад. Підходить для щоденного годування.',
    shortDescription: shortDesc,
    images: p.images,
    price: p.price,
    compareAtPrice: p.compareAtPrice,
    inStock: p.inStock,
    sku: `SKU-${p.id}`,
    brand,
    category,
    variants: [],
    attributes: {
      Бренд: brand?.name ?? '—',
      Категорія: category.name,
      ...(p.subcategorySlug
        ? { Підкатегорія: MOCK_SUBCATEGORIES.find((s) => s.slug === p.subcategorySlug)?.name ?? '—' }
        : {}),
    },
    rating: p.rating,
    reviewCount: p.reviewCount ?? 0,
    seo: { title: `Купити ${p.name} | BelliZoo`, description: p.name },
  };
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (process.env.NEXT_PUBLIC_MOCK_API !== 'false') {
    const p = MOCK_PRODUCTS_DATA.find((x) => x.slug === slug);
    if (!p) return null;
    return buildFullProduct(p);
  }
  const product = await apiGet<Product | null>(`/products/${slug}`);
  return product;
}

export async function searchProducts(query: string, limit = 8): Promise<ProductListItem[]> {
  if (!query.trim()) return [];
  if (process.env.NEXT_PUBLIC_MOCK_API !== 'false') {
    const q = query.toLowerCase();
    return MOCK_PRODUCTS_DATA.filter((p) => p.name.toLowerCase().includes(q))
      .slice(0, limit)
      .map((p) => ({
        id: p.id,
        slug: p.slug,
        name: p.name,
        images: p.images,
        price: p.price,
        compareAtPrice: p.compareAtPrice,
        inStock: p.inStock,
        rating: p.rating,
        reviewCount: p.reviewCount,
      }));
  }
  return apiGet<ProductListItem[]>('/search', { q: query, limit: String(limit) });
}

/** For PDP "similar" block: same category, exclude current slug */
export async function getSimilarProducts(
  categorySlug: string,
  excludeSlug: string,
  limit = 4
): Promise<ProductListItem[]> {
  if (process.env.NEXT_PUBLIC_MOCK_API !== 'false') {
    return MOCK_PRODUCTS_DATA.filter(
      (p) => p.categorySlug === categorySlug && p.slug !== excludeSlug
    )
      .slice(0, limit)
      .map((p) => ({
        id: p.id,
        slug: p.slug,
        name: p.name,
        images: p.images,
        price: p.price,
        compareAtPrice: p.compareAtPrice,
        inStock: p.inStock,
        rating: p.rating,
        reviewCount: p.reviewCount,
      }));
  }
  return apiGet<ProductListItem[]>('/similar', {
    category: categorySlug,
    exclude: excludeSlug,
    limit: String(limit),
  });
}

/** For wishlist page: fetch products by slugs */
export async function getProductsBySlugs(slugs: string[]): Promise<ProductListItem[]> {
  if (process.env.NEXT_PUBLIC_MOCK_API !== 'false') {
    const set = new Set(slugs);
    return MOCK_PRODUCTS_DATA.filter((p) => set.has(p.slug)).map((p) => ({
      id: p.id,
      slug: p.slug,
      name: p.name,
      images: p.images,
      price: p.price,
      compareAtPrice: p.compareAtPrice,
      inStock: p.inStock,
      rating: p.rating,
      reviewCount: p.reviewCount,
    }));
  }
  return apiGet<ProductListItem[]>('/products/by-slugs', { slugs: slugs.join(',') });
}
