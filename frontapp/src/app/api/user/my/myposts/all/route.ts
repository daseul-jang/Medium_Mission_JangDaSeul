import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getMyPosts } from '@/service/myPosts';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  console.log('마이페이지 나의 글 목록 (전체)');

  const session = await getServerSession(authOptions);
  const user = session?.user;
  const accessToken = session?.accessToken;

  if (!user) {
    return;
  }

  const url = getUrl(req.url);

  console.log(`url: ${url}`);

  return getMyPosts(url!!, accessToken!!)
    .then((res) => NextResponse.json(res))
    .catch((err) => new Response(JSON.stringify(err), { status: 500 }));
}

export const getUrl = (requestUrl: string) => {
  const { searchParams, pathname } = new URL(requestUrl);
  console.log(requestUrl);

  const type = pathname.split('/').pop();
  const viewer = searchParams.get('viewer');

  switch (viewer) {
    case 'mobile':
      const cursor = searchParams.get('cursor');
      const limit = searchParams.get('limit');

      const queryString = cursor
        ? `cursor=${cursor}&limit=${limit}`
        : `limit=${limit}`;

      return `${type}/${viewer}?${queryString}`;

    case 'pc':
      const page = searchParams.get('page');
      const size = searchParams.get('size');

      return `${type}/${viewer}?page=${page}&size=${size}`;
  }
};
