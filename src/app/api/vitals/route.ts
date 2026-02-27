import { NextRequest, NextResponse } from 'next/server';

/**
 * Web Vitals beacon endpoint — RUM data for LCP, FCP, CLS, INP, TTFB
 * Log to your analytics or forward to SpeedCurve etc.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // Optional: validate shape, persist to DB or send to analytics
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log('[Vitals]', body);
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
