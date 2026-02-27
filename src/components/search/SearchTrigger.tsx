'use client';

import { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { SearchDialog } from './SearchDialog';
import { Button } from '@/components/ui/button';

export function SearchTrigger() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="h-10 w-10 shrink-0"
        onClick={() => setOpen(true)}
        aria-label="Відкрити пошук"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </Button>
      <SearchDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
