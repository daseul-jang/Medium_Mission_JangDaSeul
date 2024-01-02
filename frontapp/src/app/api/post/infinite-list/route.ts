import { getInfiniteList } from '@/service/posts';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const cursor = searchParams.get('cursor');
  const limit = searchParams.get('limit');

  return getInfiniteList(cursor, limit)
    .then((res) => NextResponse.json(res))
    .catch((err) => new Response(JSON.stringify(err), { status: 500 }));
}
