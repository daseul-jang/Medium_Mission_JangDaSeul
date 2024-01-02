import { getMemberPosts } from '@/service/posts';
import { NextRequest, NextResponse } from 'next/server';

interface Context {
  params: { username: string };
}

export async function GET(req: NextRequest, context: Context) {
  console.log('특정 회원 글 조회');
  console.log(context);

  const url = getUrl(req.url, context.params.username);

  console.log(`url: ${url}`);

  return getMemberPosts(url!!)
    .then((res) => NextResponse.json(res))
    .catch((err) => new Response(JSON.stringify(err), { status: 500 }));
}

export const getUrl = (requestUrl: string, username: string) => {
  const { searchParams } = new URL(requestUrl);
  console.log(requestUrl);

  const viewer = searchParams.get('viewer');

  switch (viewer) {
    case 'mobile':
      const cursor = searchParams.get('cursor');
      const limit = searchParams.get('limit');

      const queryString = cursor
        ? `cursor=${cursor}&limit=${limit}`
        : `limit=${limit}`;

      return `${username}/${viewer}?${queryString}`;

    case 'pc':
      const page = searchParams.get('page');
      const size = searchParams.get('size');

      return `${username}/${viewer}?page=${page}&size=${size}`;
  }
};
