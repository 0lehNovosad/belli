'use client';

import { useEffect } from 'react';
import { initWebVitals } from '@/lib/performance/web-vitals';

/**
 * Registers Web Vitals (LCP, FCP, CLS, INP, TTFB) and sends to /api/vitals.
 * Renders nothing; load once in root layout.
 */
export function WebVitals() {
  useEffect(() => {
    initWebVitals();
  }, []);
  return null;
}
