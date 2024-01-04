import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getMemberPost } from '@/service/posts';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export interface Context {
  params: { username: string; id: string };
}

export async function GET(_: NextRequest, context: Context) {
  console.log('context?????????');
  console.log(context);

  const session = await getServerSession(authOptions);
  const accessToken = session?.accessToken;

  return getMemberPost(
    context.params.username,
    context.params.id,
    accessToken!!
  )
    .then((res) => NextResponse.json(res))
    .catch((err) => new Response(JSON.stringify(err), { status: 500 }));
}
