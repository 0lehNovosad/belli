# BelliZoo Store — Architecture

## Folder structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout, fonts, metadata
│   ├── page.tsx             # Home (SSR)
│   ├── globals.css
│   ├── catalog/
│   │   └── [...slug]/
│   │       └── page.tsx     # Catalog / category (SSR, ISR revalidate 300)
│   ├── product/
│   │   └── [slug]/
│   │       └── page.tsx     # PDP (SSR, Product schema)
│   ├── cart/
│   │   └── page.tsx         # Cart (client)
│   ├── checkout/
│   │   ├── page.tsx         # 1-page checkout (client)
│   │   └── success/
│   │       └── page.tsx     # Order confirmation
│   └── account/
│       └── page.tsx         # Account placeholder
├── components/
│   ├── ui/                  # Atomic: Button, Input, Card, Skeleton, Dialog, Dropdown
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── MobileBottomNav.tsx
│   ├── providers/
│   │   └── Providers.tsx   # TanStack Query
│   ├── product/
│   │   ├── ProductCard.tsx
│   │   ├── ProductGallery.tsx
│   │   └── AddToCartSection.tsx
│   ├── catalog/
│   │   ├── CatalogFilters.tsx
│   │   └── CatalogSort.tsx
│   ├── cart/
│   │   ├── CartDropdown.tsx
│   │   ├── CartLineItemPreview.tsx
│   │   └── CartItemRow.tsx
│   ├── checkout/
│   │   ├── CheckoutForm.tsx
│   │   └── CartSummary.tsx
│   ├── search/
│   │   ├── SearchTrigger.tsx
│   │   └── SearchDialog.tsx
│   └── seo/
│       └── ProductSchema.tsx
├── lib/
│   ├── types/
│   │   ├── product.ts       # Product, Category, Catalog types
│   │   └── cart.ts          # Cart, Checkout types
│   ├── api/
│   │   ├── client.ts        # Typed fetch, ApiError
│   │   └── products.ts      # getCategories, getProducts, getProductBySlug, searchProducts
│   └── utils/
│       └── cn.ts            # cn(), formatPrice()
└── stores/
    ├── cart-store.ts        # Zustand + persist (cart)
    └── viewed-products.ts   # Zustand + persist (recently viewed)
```

## Data flow

- **Server:** `getCategories`, `getProducts`, `getProductBySlug` run in RSC; mock data by default; set `NEXT_PUBLIC_MOCK_API=false` and configure `NEXT_PUBLIC_API_URL` for real API.
- **Client:** Cart and recently viewed are in Zustand with localStorage persist. Search uses TanStack Query with debounced input.
- **Checkout:** Form state local; submit will call API (TODO); on success cart is cleared and user redirected to `/checkout/success`.

## SEO

- Metadata in `layout.tsx` and per-route `generateMetadata`.
- Product pages: JSON-LD Product schema, OpenGraph, Twitter card.
- Semantic HTML: `<main>`, `<nav aria-label>`, `<article>`, headings hierarchy.

## Performance

- `revalidate = 300` on home, catalog, product.
- Next.js Image with sizes; placeholder SVG for mock images.
- Dynamic imports not used yet; can lazy-load SearchDialog, CartDropdown.

## Mobile

- Sticky header, bottom nav (md:hidden), sticky CTA on PDP above bottom nav.
- Touch targets enforced via CSS (min 44px) in globals.css.
