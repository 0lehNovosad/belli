import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Security headers (duplicated in next.config for static; edge adds for dynamic)
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Resource hints via Link header (preconnect to API/CDN for faster TTFB on API calls)
  const apiOrigin = process.env.NEXT_PUBLIC_API_URL;
  const links: string[] = [];
  links.push('<https://fonts.gstatic.com>; rel=preconnect; crossorigin');
  if (apiOrigin) {
    try {
      const origin = new URL(apiOrigin).origin;
      links.push(`<${origin}>; rel=preconnect`);
    } catch {
      // ignore invalid URL
    }
  }
  if (links.length > 0) {
    response.headers.set('Link', links.join(', '));
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except static files and api
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico)$).*)',
  ],
};
