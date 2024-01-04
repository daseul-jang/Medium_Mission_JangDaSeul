import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { deleteComment } from '@/service/comment';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

interface Context {
  params: {
    id: string;
    commentId: string;
  };
}

export async function DELETE(_: NextRequest, context: Context) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const accessToken = session?.accessToken;

  if (!user) {
    return;
  }

  return deleteComment(
    context.params.id,
    context.params.commentId,
    accessToken!!
  )
    .then((res) => NextResponse.json(res))
    .catch((err) => new Response(JSON.stringify(err), { status: 500 }));
}
