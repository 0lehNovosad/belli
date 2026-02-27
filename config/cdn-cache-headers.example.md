# CDN + Cache Headers (Production)

Використовуйте ці правила на CDN (Vercel, Cloudflare, Fastly тощо) для агресивного кешування та швидкого TTFB.

## Vercel (vercel.json)

```json
{
  "headers": [
    {
      "source": "/_next/static/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    },
    {
      "source": "/(.*)\\.(webp|avif|ico)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    },
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, s-maxage=60, stale-while-revalidate=300" }
      ]
    }
  ]
}
```

## ISR / HTML pages

Для сторінок з `revalidate = 300`:

- **s-maxage=300** — CDN кешує HTML на 5 хв
- **stale-while-revalidate** — віддавати stale, оновлювати у фоні

На Vercel це керується автоматично через `revalidate`. На власному CDN додайте:

- `/:path*` (HTML): `s-maxage=300, stale-while-revalidate=600`

## Security (дубль у next.config + middleware)

- `X-Frame-Options: SAMEORIGIN`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `X-DNS-Prefetch-Control: on`

## Brotli

Увімкніть Brotli на хості/CDN для відповідей (Next вже стискає gzip; Brotli дає додаткове зменшення).
