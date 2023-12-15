import { NextRequest, NextResponse } from 'next/server';
import { addMember } from '@/service/member';

export async function POST(req: NextRequest) {
  const member = await req.json();

  if (!member) {
    return new Response('Bad Request', { status: 400 });
  }

  return addMember(member)
    .then((res) => NextResponse.json(res))
    .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
}
