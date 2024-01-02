import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import PostDetail from '@/components/post/PostDetail';
import { getPostDetail } from '@/service/posts';
import { getServerSession } from 'next-auth';
import { cache } from 'react';

export interface Params {
  params: { id: string };
}

export const getPostData = cache(async (id: string) => await getPostDetail(id));

export default async function PostDetailPage({ params: { id } }: Params) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    <section className='w-full pt-16 px-10 max-w-screen-md'>
      <PostDetail id={id} user={user} />
    </section>
  );
}