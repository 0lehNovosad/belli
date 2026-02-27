'use client';

import { useState, useEffect } from 'react';

/**
 * Рік тільки після монтування, щоб уникнути hydration mismatch
 * (сервер і клієнт можуть мати різний час/часову зону).
 */
export function FooterCopyright() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <>
      © {year !== null ? `${year} ` : ''}BelliZoo. Всі права захищені.
    </>
  );
}
