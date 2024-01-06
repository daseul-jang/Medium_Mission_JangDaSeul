import PostDetail from '@/components/post/PostDetail';
import CommentArea from '@/components/post/comment/CommentArea';
import { getPostDetail } from '@/service/posts';
import { cache } from 'react';

export interface Params {
  params: { id: string };
}

export const getPostData = cache(
  async (id: string, accessToken?: string) =>
    await getPostDetail(id, accessToken)
);

export default async function PostDetailPage({ params: { id } }: Params) {
  return (
    <section className='w-full h-full max-w-screen-md px-7 sm:px-10 flex flex-col pt-[64px]'>
      <div className='h-full md:mt-5 min-h-[300px] md:min-h-[400px]'>
        <PostDetail id={id} />
      </div>
      <div className='h-full py-3'>
        <CommentArea postId={id} />
      </div>
    </section>
  );
}
