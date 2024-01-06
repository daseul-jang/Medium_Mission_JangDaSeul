import { Post } from '@/model/post';
import Link from 'next/link';
import { getDate } from '../home/LatestList';
import Pagination from '../global/ui/Pagination';
import Badge from '../global/ui/Badge';

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
    <div className='w-full h-full flex flex-col items-center pb-5'>
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
            <Link
              href={
                isAuth
                  ? `/posts/${post.id}`
                  : `/user/${post.writerUsername}/${post.id}?page=${page}&size=${size}`
              }
              className='basis-8/12'
            >
              <div className='w-full flex gap-3 items-center px-4'>
                <span className='font-semibold'>{post.title}</span>
                {post.isPaid && (
                  <Badge fill={false} color='green'>
                    멤버십
                  </Badge>
                )}
                {isAuth && (
                  <Badge
                    color={post.isPublic ? 'green' : 'gray'}
                    outline={false}
                  >
                    {post.isPublic ? 'Public' : 'Private'}
                  </Badge>
                )}
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
