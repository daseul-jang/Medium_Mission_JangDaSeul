import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import Link from 'next/link';

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    <section className='max-w-screen-lg w-full h-full flex flex-col md:flex-row md:justify-center'>
      <div className='basis-1/4 max-md:sticky max-md:top-0 max-md:shadow-sm bg-white z-[1] w-full h-full'>
        <div className='w-full p-5 bg-base-100 md:my-10 rounded-md flex flex-col gap-10'>
          <div className='flex flex-col md:flex-row w-full items-center gap-3'>
            <div className='bg-base-300 w-20 h-20 rounded-full'></div>
            <div className='flex flex-col items-center md:items-start md:pl-1'>
              <h1 className='text-2xl font-bold'>{user?.username}</h1>
              <span className='text-xs text-gray-500 hover:text-gray-600 hover:underline cursor-pointer'>
                프로필 수정 &gt;
              </span>
            </div>
          </div>

          {/* PC 사이드 메뉴 */}
          <div className='hidden md:flex'>
            <Link href={`/user/my/myposts`}>
              <div>
                <span>나의 작성 글</span>
              </div>
            </Link>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        <div className='flex gap-2 justify-center mb-8 md:hidden md:mb-0'>
          <Link href={`/user/my`}>
            <div className='btn'>
              <span className='text-xl font-bold'>My</span>
            </div>
          </Link>
          <Link href={`/user/my/myposts`}>
            <div className='btn'>
              <span className='text-xl font-bold'>My Posts</span>
            </div>
          </Link>
        </div>
      </div>
      <div className='w-full basis-3/4 px-4 md:px-0 mt-2 md:my-10 rounded-md'>
        {children}
      </div>
    </section>
  );
}
