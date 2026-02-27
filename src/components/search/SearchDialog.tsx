'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import Image from 'next/image';
import { searchProducts } from '@/lib/api/products';
import { formatPrice } from '@/lib/utils/cn';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';

const DEBOUNCE_MS = 300;

export function SearchDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [query, setQuery] = useState('');
  const [debounced, setDebounced] = useState('');

  useEffect(() => {
    const t = setTimeout(() => setDebounced(query.trim()), DEBOUNCE_MS);
    return () => clearTimeout(t);
  }, [query]);

  const { data: results, isFetching } = useQuery({
    queryKey: ['search', debounced],
    queryFn: () => searchProducts(debounced, 8),
    enabled: debounced.length >= 2,
    staleTime: 30 * 1000,
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="top-[5%] left-[50%] translate-x-[-50%] translate-y-0 sm:top-[50%] sm:translate-y-[-50%] h-[90vh] sm:h-auto sm:max-h-[80vh] overflow-hidden flex flex-col p-0 gap-0 w-[calc(100vw-1rem)] sm:max-w-lg rounded-xl">
        <DialogTitle className="sr-only">Пошук товарів</DialogTitle>
        <div className="border-b p-3">
          <Input
            type="search"
            placeholder="Шукати товари..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="h-12 text-base"
            autoComplete="off"
          />
        </div>
        <div className="flex-1 overflow-y-auto min-h-0">
          {!debounced && (
            <p className="p-4 text-sm text-muted-foreground">Введіть мінімум 2 символи</p>
          )}
          {debounced.length >= 2 && isFetching && (
            <div className="p-4 space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-3">
                  <Skeleton className="h-16 w-16 rounded-lg shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          )}
          {debounced.length >= 2 && !isFetching && results && (
            <ul className="p-2" role="listbox">
              {results.length === 0 ? (
                <li className="p-4 text-sm text-muted-foreground">Нічого не знайдено</li>
              ) : (
                results.map((p) => (
                  <li key={p.id} role="option">
                    <Link
                      href={`/product/${p.slug}`}
                      onClick={() => onOpenChange(false)}
                      className="flex gap-3 rounded-lg p-2 hover:bg-muted transition-colors"
                    >
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-muted">
                        {p.images[0] && (
                          <Image
                            src={p.images[0].url}
                            alt={p.images[0].alt}
                            fill
                            sizes="56px"
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{p.name}</p>
                        <p className="text-sm text-primary font-semibold">
                          {formatPrice(p.price.amount)}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))
              )}
            </ul>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
