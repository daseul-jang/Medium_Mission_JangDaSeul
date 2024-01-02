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
    <div className='w-full h-full'>
      <div className='w-full h-full flex flex-col items-center justify-start'>
        <div className='sticky top-0 z-[1] basis-2/5 w-full h-full flex flex-col justify-center items-center gap-5 shadow-sm bg-white p-10'>
          <div className='bg-base-300 rounded-full w-28 h-28'></div>
          <MemberInfo username={username} />
        </div>
        <div className='basis-3/5 w-full h-full flex flex-col items-center'>
          {children}
        </div>
      </div>
    </div>
  );
}
