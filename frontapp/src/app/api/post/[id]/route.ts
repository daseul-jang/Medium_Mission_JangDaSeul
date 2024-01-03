import { getPostDetail } from '@/service/posts';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';

export interface Context {
  params: { id: string };
}

export async function GET(_: NextRequest, context: Context) {
  const session = await getServerSession(authOptions);
  const accessToken = session?.accessToken;

  return getPostDetail(context.params.id, accessToken)
    .then((res) => NextResponse.json(res))
    .catch((err) => new Response(JSON.stringify(err), { status: 500 }));
}
