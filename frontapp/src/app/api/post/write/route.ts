import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';
import { WritePost } from '@/model/post';
import { addPost } from '@/service/posts';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const accessToken = session?.accessToken;
  console.log('글쓰기 세션유저 확인');
  console.log(user);

  if (!user) {
    return;
  }

  const { title, subtitle, content, isPublic, isPaid }: WritePost =
    await req.json();

  return addPost({ title, subtitle, content, isPublic, isPaid }, accessToken!!)
    .then((res) => NextResponse.json(res))
    .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
}
