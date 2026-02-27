# BelliZoo Store

Сучасний e-commerce фронтенд для BelliZoo (зоотовари), зібраний з нуля на **Next.js 14**, **TypeScript**, **Tailwind**, **Zustand**, **TanStack Query**.

## Що реалізовано

- **Головна:** категорії, блоки довіри, популярні товари (SSR).
- **Каталог:** багаторівневі категорії, фільтри по категоріях, сортування, пагінація (SSR + client filters/sort).
- **Картка товару (PDP):** галерея, кількість, «В кошик», доставка/оплата, характеристики, опис, схожі товари, Product schema (SEO).
- **Пошук:** debounce, instant suggestions у модалці (TanStack Query).
- **Кошик:** header dropdown з превʼю, сторінка кошика з редагуванням кількості, підсумок.
- **Checkout:** односторінковий оформлення (контакти, доставка, оплата), валідація в реальному часі, сторінка успіху.
- **Mobile-first:** sticky header, bottom navigation на мобільних, sticky CTA на PDP, touch-friendly кнопки.

## Стек

- Next.js 14 (App Router)
- TypeScript (strict)
- Tailwind CSS + tailwindcss-animate
- Radix UI (Dialog, Dropdown)
- Zustand (cart, recently viewed)
- TanStack Query (search, optional catalog)
- class-variance-authority, clsx, tailwind-merge

## Запуск

```bash
npm install
npm run dev
```

Відкрийте [http://localhost:3000](http://localhost:3000).

## Збірка

```bash
npm run build
npm start
```

## Конфігурація

- **Мок API (за замовчуванням):** товари та категорії беруться з `src/lib/api/products.ts`. Підставте реальний бекенд і в `.env.local` задайте:
  - `NEXT_PUBLIC_MOCK_API=false`
  - `NEXT_PUBLIC_API_URL=https://your-api.com`
- **Зображення товарів:** усі фото завантажуються з оригінального сайту (bellizoo.com.ua), нічого не зберігається локально — у репозиторії лише логотип і один малий placeholder для блогу/помилок.
- **Шрифти:** Manrope (display), Inter (sans) з Google Fonts у `layout.tsx`.

## Архітектура

Детальна структура проєкту та потоки даних описані в [ARCHITECTURE.md](./ARCHITECTURE.md).

## Ліцензія

Приватний проєкт.
