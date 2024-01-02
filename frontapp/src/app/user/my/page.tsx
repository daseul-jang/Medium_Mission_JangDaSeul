import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function MyPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (user) {
    redirect('/user/my/myposts');
  }

  return <section className='w-full h-full'>마이페이지</section>;
}
