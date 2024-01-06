import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import LeftAngleBracket from '@/components/global/ui/icon/LeftAngleBracket';
import PostDetail from '@/components/post/PostDetail';
import { getServerSession } from 'next-auth';
import Link from 'next/link';

interface UserPostProps {
  params: {
    username: string;
    id: string;
  };
  searchParams: {
    page: string;
    size: string;
  };
}

export default async function UserPostPage({
  params: { username, id },
  searchParams: { page, size },
}: UserPostProps) {
  return (
    <section className='fixed top-0 bg-white z-40 w-full h-full mt-[64px] pb-[64px]'>
      <div className='max-w-screen-md w-full h-full mx-auto'>
        <PostDetail id={id} username={username} />
      </div>
    </section>
  );
}

/* 
// 추가 할지 말지 고민중..
<Link href={`/user/${username}?page=${page}&size=${size}`}>
  <div className='h-9 flex items-center gap-2'>
    <div className='w-3 h-3 flex items-center'>
      <LeftAngleBracket />
    </div>
    <span className='font-bold'>목록으로 돌아가기</span>
  </div>
</Link>;
 */
