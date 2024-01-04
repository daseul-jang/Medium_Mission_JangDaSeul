import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { modifyComment } from '@/service/comment';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

interface Context {
  params: {
    id: string;
    commentId: string;
  };
}

export async function PUT(req: NextRequest, context: Context) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const accessToken = session?.accessToken;

  if (!user) {
    return;
  }

  const { content } = await req.json();

  return modifyComment(
    context.params.id,
    context.params.commentId,
    content,
    accessToken!!
  )
    .then((res) => NextResponse.json(res))
    .catch((err) => new Response(JSON.stringify(err), { status: 500 }));
}
