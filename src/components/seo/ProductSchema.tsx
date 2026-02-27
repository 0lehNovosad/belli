import type { Product } from '@/lib/types/product';

export function ProductSchema({ product }: { product: Product }) {
  const image = product.images[0];
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: image ? image.url : undefined,
    sku: product.sku,
    brand: product.brand
      ? { '@type': 'Brand', name: product.brand.name }
      : undefined,
    offers: {
      '@type': 'Offer',
      price: product.price.amount,
      priceCurrency: product.price.currency,
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      url: `https://bellizoo.com.ua/product/${product.slug}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
