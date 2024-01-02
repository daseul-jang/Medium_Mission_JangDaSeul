import { getServerSession } from 'next-auth';
import { Params, getPostData } from '../page';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import ErrorHandler from '@/components/global/error/ErrorHandler';

export default async function DeletePage({ params: { id } }: Params) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const post = await getPostData(id);

  if (user?.username !== post.writer?.username) {
    return <ErrorHandler message='403 | Forbidden' />;
  }

  return <></>;
}
