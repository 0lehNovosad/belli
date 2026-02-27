# Performance Architecture — BelliZoo

## Мета

- **LCP** < 1.8s · **CLS** < 0.02 · **INP** < 100ms · **TTFB** < 100ms · **FCP** < 1s  
- **Lighthouse**: Performance, Accessibility, Best Practices, SEO — 100  
- **Budget**: JS < 60kb gzipped, CSS < 30kb, above-the-fold images < 150kb, TBT < 50ms  

---

## 1. Стратегія: Performance-first

| Принцип | Реалізація |
|--------|------------|
| **Server-first** | Усі сторінки за замовчуванням RSC; client лише для інтерактиву (кошик, wishlist, форма) |
| **Island architecture** | Header/Footer/Catalog grid — server; SearchDialog, CartDropdown, AddToCart — client islands |
| **Micro-hydration** | ProductCard: статична обгортка (RSC) + остров `ProductCardActions` (додати в кошик, wishlist) |
| **Zero hydration for static UI** | Категорії, trust badges, пагінація — лише HTML/CSS, без JS |
| **Edge + CDN** | Middleware на Edge; агресивний cache для статики та ISR-сторінок |

---

## 2. Стек та конфіг

- **Next.js 14+** App Router, RSC, Streaming SSR  
- **Partial Prerendering (PPR)** — статичний shell + streaming для динамічних блоків (де підтримується)  
- **ISR** `revalidate = 300` для home, catalog, product  
- **Edge Runtime** для middleware (headers, redirects)  
- **next/image** всюди: AVIF/WebP, `sizes`, `priority` для LCP, blur placeholders  

---

## 3. Rendering pipeline

- **Паралельний data fetching**: `Promise.all([getCategories(), getProducts()])` на home/catalog  
- **Streaming**: корінь layout + Suspense для повільних секцій (наприклад, «Схожі товари»)  
- **Cache tags** (при реальному API): `revalidateTag` для інвалідації каталогу/товару  
- **Stale-while-revalidate**: `fetch(..., { next: { revalidate: 300 } })`  

---

## 4. JavaScript — мінімум на клієнті

- **Server Components за замовчуванням**  
- **Client components тільки там, де потрібно**: кошик, wishlist, пошук, форми checkout, AddToCart, WishlistButton  
- **Dynamic import** для важких UI: SearchDialog, CartDropdown, CheckoutForm  
- **optimizePackageImports** для `@/components/ui`, `@radix-ui/*`, `framer-motion`  
- **Tree-shaking**: іменовані імпорти, без barrel exports для великих бібліотек  

---

## 5. Зображення

- **next/image** для всіх зображень товарів і hero  
- **Формати**: AVIF, WebP (config)  
- **LCP**: перше зображення above the fold (hero або перший товар) — `priority`  
- **Blur placeholder**: `placeholder="blur"` + `blurDataURL` або CSS-колір  
- **sizes**: точні breakpoints (наприклад `(max-width: 768px) 50vw, 25vw` для сітки)  
- **CDN**: remotePatterns для bellizoo.com.ua; при наявності CDN — resizing через query params  

---

## 6. Мережа

- **Middleware**: security headers, Link (preconnect, dns-prefetch), early hints де можливо  
- **Preconnect** до API/CDN у layout (link tags)  
- **Brotli**: Next вже стискає; переконатися, що хостинг не вимикає  
- **HTTP/3**: на рівні хостингу/CDN  

---

## 7. CSS

- **Tailwind JIT** + purge (content paths у tailwind.config)  
- **Critical CSS**: ключові стилі в globals.css; без блокуючих зовнішніх таблиць  
- **Container queries**: де потрібно (картки, сітка)  

---

## 8. Monitoring (RUM)

- **Web Vitals**: reportWebVitals → `/api/vitals` або зовнішній endpoint  
- **PerformanceObserver**: LCP, FID/INP, CLS  
- **SpeedCurve-style**: відправка метрик з `id` сесії та `path` для аналітики  

---

## 9. Folder structure (рекомендована)

```
src/
├── app/
│   ├── layout.tsx              # Root: fonts, preconnect, WebVitals
│   ├── page.tsx                # Home: Suspense, priority LCP
│   ├── catalog/[[...slug]]/
│   │   └── page.tsx            # Catalog: ISR, server
│   ├── product/[slug]/
│   │   └── page.tsx            # PDP: priority image, blur, streaming related
│   ├── cart/
│   │   └── page.tsx            # Client
│   ├── wishlist/
│   │   └── page.tsx            # Client
│   ├── checkout/
│   │   ├── page.tsx            # Client shell, dynamic CheckoutForm
│   │   └── success/page.tsx
│   └── api/
│       ├── vitals/route.ts     # Web Vitals beacon
│       └── products/...
├── components/
│   ├── layout/                 # Header, Footer — client лише через islands всередині
│   ├── product/
│   │   ├── ProductCard.tsx     # RSC shell
│   │   ├── ProductCardActions.tsx  # Client island
│   │   ├── ProductGallery.tsx  # Client (minimal)
│   │   └── AddToCartSection.tsx
│   ├── catalog/
│   ├── cart/
│   └── ui/
├── lib/
│   ├── api/
│   │   ├── client.ts           # fetch + revalidate, cache tags
│   │   └── products.ts
│   └── performance/
│       ├── web-vitals.ts       # reportWebVitals + INP
│       └── report.ts           # send to API
├── stores/
└── middleware.ts               # Edge: headers, Link
```

---

## 10. Cache headers (production)

- **Static / _next/static**: immutable, max-age=31536000  
- **ISR pages**: s-maxage=300, stale-while-revalidate  
- **API (JSON)**: s-maxage=60, stale-while-revalidate  
- Реалізація: `next.config.mjs` `headers()` + при потребі CDN rules  
- Приклад правил для CDN: **config/cdn-cache-headers.example.md**  

---

## 11. Lighthouse checklist

- [ ] LCP: один priority image, без зайвих render-blocking ресурсів  
- [ ] CLS: явні width/height або aspect-ratio для зображень, резервовані розміри для шрифтів  
- [ ] INP: мінімум JS, маленькі обробники, без довгих задач у main thread  
- [ ] Accessibility: семантика, контраст, aria, focus  
- [ ] Best practices: HTTPS, cookies, зовнішні скрипти  
- [ ] SEO: meta, Open Graph, JSON-LD (ProductSchema вже є)  

---

## 12. Performance budgets (CI optional)

| Ресурс | Бюджет |
|--------|--------|
| JS (gzipped) | < 60 kb |
| CSS | < 30 kb |
| Images above the fold | < 150 kb |
| TBT | < 50 ms |

Можна додати `bundlesize` або Lighthouse CI для перевірки.
