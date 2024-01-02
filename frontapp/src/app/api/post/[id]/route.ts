import { getPostDetail } from '@/service/posts';
import { NextRequest, NextResponse } from 'next/server';

export interface Context {
  params: { id: string };
}

export async function GET(_: NextRequest, context: Context) {
  return getPostDetail(context.params.id)
    .then((res) => NextResponse.json(res))
    .catch((err) => new Response(JSON.stringify(err), { status: 500 }));
}
