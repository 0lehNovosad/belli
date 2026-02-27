import { NextResponse } from 'next/server';
import { getProductsBySlugs } from '@/lib/api/products';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slugsParam = searchParams.get('slugs');
  if (!slugsParam || typeof slugsParam !== 'string') {
    return NextResponse.json({ items: [] });
  }
  const slugs = slugsParam.split(',').map((s) => s.trim()).filter(Boolean);
  const items = await getProductsBySlugs(slugs);
  return NextResponse.json({ items });
}
