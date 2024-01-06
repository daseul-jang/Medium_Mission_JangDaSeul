import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import MemberInfo from '@/components/member/member/MemberInfo';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

interface Props {
  children: React.ReactNode;
  params: { username: string };
}

export default async function layout({
  children,
  params: { username },
}: Props) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (user?.username === username) {
    redirect('/user/my');
  }

  return (
    <div className='w-full h-full flex flex-col items-center justify-start pt-[64px]'>
      <div className='sticky top-0 z-[1] w-full h-fit flex flex-col justify-center items-center shadow-sm bg-white p-5'>
        <div className='w-full h-full flex justify-center items-center py-2'>
          <div className='bg-base-300 rounded-full w-28 h-28'></div>
        </div>
        <div className='py-4'>
          <MemberInfo username={username} />
        </div>
      </div>
      <div className='w-full h-full flex flex-col items-center'>{children}</div>
    </div>
  );
}
