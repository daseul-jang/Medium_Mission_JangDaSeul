import { getInfiniteList } from '@/service/posts';
import { NextRequest, NextResponse } from 'next/server';

interface Context {
  params: { id: string };
}

export async function GET(req: NextRequest, context: Context) {
  console.log('무한스크롤~~');
  const { searchParams } = new URL(req.url);
  const cursorId = searchParams.get('cursorId');
  const limit = searchParams.get('limit');
  console.log(searchParams);
  console.log(context);
  return getInfiniteList(cursorId, limit)
    .then((res) => NextResponse.json(res))
    .catch((err) => new Response(JSON.stringify(err), { status: 500 }));
}
