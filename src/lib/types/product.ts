/**
 * Domain types — Product & Catalog
 * Single source of truth for e-commerce entities
 */

export type Money = {
  amount: number;
  currency: string;
};

export type ProductVariant = {
  id: string;
  sku: string;
  name: string;
  price: Money;
  compareAtPrice?: Money;
  weight?: number;
  attributes: Record<string, string>;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  shortDescription?: string;
  images: ProductImage[];
  price: Money;
  compareAtPrice?: Money;
  inStock: boolean;
  sku: string;
  brand?: Brand;
  category: Category;
  variants: ProductVariant[];
  attributes: Record<string, string>;
  rating?: number;
  reviewCount: number;
  seo?: ProductSEO;
};

export type ProductImage = {
  id: string;
  url: string;
  alt: string;
  width: number;
  height: number;
};

export type Brand = {
  id: string;
  name: string;
  slug: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  parentId?: string;
  children?: Category[];
  productCount?: number;
};

export type ProductSEO = {
  title: string;
  description: string;
};

export type ProductListItem = Pick<
  Product,
  'id' | 'slug' | 'name' | 'images' | 'price' | 'compareAtPrice' | 'inStock' | 'rating' | 'reviewCount'
>;

export type CatalogFilters = {
  brands?: string[];
  attributes?: Record<string, string[]>;
  minPrice?: number;
  maxPrice?: number;
};

export type SortOption =
  | 'relevance'
  | 'price_asc'
  | 'price_desc'
  | 'newest'
  | 'rating'
  | 'popular';

export type CatalogState = {
  categorySlug: string;
  page: number;
  sort: SortOption;
  filters: CatalogFilters;
};

export type PaginatedResponse<T> = {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};
