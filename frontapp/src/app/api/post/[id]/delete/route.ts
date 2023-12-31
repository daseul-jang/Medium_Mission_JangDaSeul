import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { deletePost } from '@/service/posts';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

interface Context {
  params: {
    id: string;
  };
}

export async function DELETE(_: NextRequest, context: Context) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const accessToken = session?.accessToken;
  console.log('글삭제 세션유저 확인');
  console.log(user);

  return deletePost(context.params.id, accessToken!!)
    .then((res) => NextResponse.json(res))
    .catch((err) => new Response(JSON.stringify(err), { status: 500 }));
}
