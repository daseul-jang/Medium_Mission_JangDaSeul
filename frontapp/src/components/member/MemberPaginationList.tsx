import { Post } from '@/model/post';
import Link from 'next/link';
import { getDate } from '../home/LatestList';
import Pagination from '../global/ui/Pagination';

interface Props {
  posts: Post[];
  isAuth: boolean;
  totalPages: number;
  page: number;
  size: number;
  baseUrl: string;
}

export default function MemberPaginationList({
  posts,
  isAuth,
  totalPages,
  page,
  size,
  baseUrl,
}: Props) {
  return (
    <div className='w-full h-full flex flex-col gap-8 items-center justify-between pb-5'>
      <ul className='w-full'>
        <div className='w-full min-h-[50px] flex justify-around items-center border-b px-2 py-3'>
          <span className='basis-2/12 text-center border-r border-gray-300'>
            번호
          </span>
          <span className='basis-8/12 text-center'>제목</span>
          <span className='basis-2/12 text-center border-l border-gray-300'>
            날짜
          </span>
        </div>
        {posts?.map((post: Post) => (
          <li
            key={post.id}
            className='w-full flex min-h-[50px] justify-between items-center border-b px-2'
          >
            <span className='basis-2/12 text-center'>{post.id}</span>
            <Link href={`/posts/${post.id}`} className='basis-8/12'>
              <div className='w-full flex gap-3 items-center px-4'>
                <span className='font-semibold'>{post.title}</span>
                {isAuth &&
                  (post.isPublic ? (
                    <span className='px-2 py-1 text-xs rounded-full text-green-600 bg-green-200 '>
                      Public
                    </span>
                  ) : (
                    <span className='px-2 py-1 text-xs rounded-full text-gray-600 bg-base-300 '>
                      Private
                    </span>
                  ))}
              </div>
            </Link>
            <span className='basis-2/12 text-center'>
              {getDate(post.createDate)}
            </span>
          </li>
        ))}
      </ul>
      <Pagination
        baseUrl={baseUrl}
        totalPages={totalPages}
        currentPage={page}
        pageSize={size}
      />
    </div>
  );
}
