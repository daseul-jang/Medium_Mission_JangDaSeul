import { NextResponse } from 'next/server';
import { getLatestList } from '@/service/posts';

export async function GET() {
  return getLatestList()
    .then((res) => NextResponse.json(res))
    .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
}
