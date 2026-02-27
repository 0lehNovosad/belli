'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { ProductImage } from '@/lib/types/product';

const PLACEHOLDER = '/placeholder-product.svg';

export function ProductGallery({ images, name }: { images: ProductImage[]; name: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mainError, setMainError] = useState(false);
  const main = images[activeIndex] ?? images[0];
  const mainSrc = main && !mainError ? main.url : PLACEHOLDER;

  if (!main && !mainError) {
    return (
      <div className="aspect-square rounded-xl bg-muted flex items-center justify-center text-muted-foreground">
        Немає зображення
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
        <Image
          src={mainSrc}
          alt={main?.alt || name}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxIiBoZWlnaHQ9IjEiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNlNWU3ZWIiLz48L3N2Zz4="
          className="object-cover"
          onError={() => setMainError(true)}
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
          {images.map((img, i) => (
            <button
              key={img.id}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={`relative h-16 w-16 sm:h-20 sm:w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-colors min-w-[64px] sm:min-w-[80px] ${
                i === activeIndex ? 'border-primary' : 'border-transparent hover:border-muted-foreground/50'
              }`}
            >
              <Image
                src={img.url}
                alt={img.alt || `${name} ${i + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
