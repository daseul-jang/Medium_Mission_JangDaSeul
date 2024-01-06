import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { WritePost } from '@/model/post';
import { modifyPost } from '@/service/posts';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { Context } from '../route';

export async function PUT(req: NextRequest, context: Context) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const accessToken = session?.accessToken;
  console.log('글수정 세션유저 확인');
  console.log(user);

  if (!user) {
    return;
  }

  const { title, subtitle, content, isPublic, isPaid }: WritePost =
    await req.json();

  return modifyPost(
    Number(context.params.id),
    { title, subtitle, content, isPublic, isPaid },
    accessToken!!
  )
    .then((res) => NextResponse.json(res))
    .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
}
