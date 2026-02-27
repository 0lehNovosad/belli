/**
 * RUM / Web Vitals reporting — send to API or analytics
 * SpeedCurve-style: path, id, metrics
 */

export type VitalsPayload = {
  name: 'LCP' | 'FID' | 'CLS' | 'INP' | 'TTFB' | 'FCP';
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  id: string;
  path: string;
  navigationType?: string;
  delta?: number;
};

const endpoint = process.env.NEXT_PUBLIC_VITALS_ENDPOINT || '/api/vitals';

export function sendToAnalytics(metric: VitalsPayload) {
  if (typeof window === 'undefined') return;

  const body = JSON.stringify({
    name: metric.name,
    value: metric.value,
    rating: metric.rating,
    id: metric.id,
    path: metric.path,
    navigationType: metric.navigationType,
    delta: metric.delta,
  });

  if (navigator.sendBeacon) {
    navigator.sendBeacon(endpoint, body);
  } else {
    fetch(endpoint, {
      body,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      keepalive: true,
    }).catch(() => {});
  }
}
