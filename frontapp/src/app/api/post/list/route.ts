import { getAllList } from '@/service/posts';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  //console.log(req.url);
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get('page'));
  const size = Number(searchParams.get('size'));

  return getAllList(page, size)
    .then((res) => NextResponse.json(res))
    .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
}
