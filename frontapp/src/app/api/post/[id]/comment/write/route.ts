import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { addComment } from '@/service/comment';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const accessToken = session?.accessToken;

  if (!user) {
    return;
  }

  const { postId, content } = await req.json();

  return addComment(postId, content, accessToken!!)
    .then((res) => NextResponse.json(res))
    .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
}
