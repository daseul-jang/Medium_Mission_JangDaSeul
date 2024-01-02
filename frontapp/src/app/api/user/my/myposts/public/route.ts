import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getMyPosts } from '@/service/myPosts';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { getUrl } from '../all/route';

export async function GET(req: NextRequest) {
  console.log('마이페이지 나의 글 목록 (공개)');

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
