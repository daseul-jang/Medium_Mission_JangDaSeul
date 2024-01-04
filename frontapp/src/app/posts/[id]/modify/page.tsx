import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import PostModifyForm from '@/components/post/PostModifyForm';
import { getServerSession } from 'next-auth';
import { Params, getPostData } from '../page';
import PageAccessErrorHandler from '@/components/global/error/PageAccessErrorHandler';

export default async function ModifyPage({ params: { id } }: Params) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  const oldPostData = await getPostData(id, session?.accessToken);

  if (user?.username !== oldPostData?.data.writerUsername) {
    return <PageAccessErrorHandler status={403} />;
  }

  return (
    <section className='w-full h-full max-w-screen-sm mx-auto pt-[64px]'>
      <PostModifyForm post={oldPostData?.data} id={id} />
    </section>
  );
}
