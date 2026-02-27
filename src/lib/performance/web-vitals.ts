/**
 * Web Vitals collection + INP (replacement for FID)
 * Reports to sendToAnalytics for RUM
 */

import { onCLS, onFCP, onINP, onLCP, onTTFB } from 'web-vitals';
import { sendToAnalytics, type VitalsPayload } from './report';

function getRating(name: string, value: number): VitalsPayload['rating'] {
  switch (name) {
    case 'LCP':
      return value <= 2500 ? 'good' : value <= 4000 ? 'needs-improvement' : 'poor';
    case 'FID':
    case 'INP':
      return value <= 100 ? 'good' : value <= 300 ? 'needs-improvement' : 'poor';
    case 'CLS':
      return value <= 0.1 ? 'good' : value <= 0.25 ? 'needs-improvement' : 'poor';
    case 'FCP':
      return value <= 1800 ? 'good' : value <= 3000 ? 'needs-improvement' : 'poor';
    case 'TTFB':
      return value <= 800 ? 'good' : value <= 1800 ? 'needs-improvement' : 'poor';
    default:
      return 'good';
  }
}

function reportWebVitals(metric: { name: string; value: number; id: string; navigationType?: string; delta?: number }) {
  const payload: VitalsPayload = {
    name: metric.name as VitalsPayload['name'],
    value: metric.value,
    rating: getRating(metric.name, metric.value),
    id: metric.id,
    path: typeof window !== 'undefined' ? window.location.pathname : '',
    navigationType: metric.navigationType,
    delta: metric.delta,
  };
  sendToAnalytics(payload);
}

/** Register all Web Vitals observers. Call once in client (e.g. layout). */
export function initWebVitals() {
  onCLS(reportWebVitals);
  onFCP(reportWebVitals);
  onINP(reportWebVitals);
  onLCP(reportWebVitals);
  onTTFB(reportWebVitals);
}
