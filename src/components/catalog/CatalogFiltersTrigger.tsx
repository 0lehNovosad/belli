'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { CatalogFilters } from './CatalogFilters';
import type { Category } from '@/lib/types/product';

export function CatalogFiltersTrigger({
  categorySlug,
  subcategorySlug,
  categories,
  currentBrands = [],
}: {
  categorySlug?: string | null;
  subcategorySlug?: string;
  categories: Category[];
  currentBrands?: string[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="min-h-[44px] lg:hidden">
          Фільтри
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-hidden flex flex-col p-0 gap-0 top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] w-[calc(100vw-2rem)] max-w-md">
        <DialogTitle className="sr-only">Фільтри каталогу</DialogTitle>
        <div className="border-b p-4">
          <h2 className="font-semibold text-lg">Фільтри</h2>
        </div>
        <div className="overflow-y-auto flex-1 p-4 min-h-0">
          <CatalogFilters
            categorySlug={categorySlug}
            subcategorySlug={subcategorySlug}
            categories={categories}
            currentBrands={currentBrands}
          />
        </div>
        <div className="border-t p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <Button className="w-full min-h-[44px]" onClick={() => setOpen(false)}>
            Застосувати
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
