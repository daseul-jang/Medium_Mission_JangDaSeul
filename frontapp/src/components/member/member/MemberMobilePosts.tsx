import { useMemberInfinitePosts } from '@/hooks/post';
import MemberInfiniteList from '../MemberInfiniteList';
import { getDate } from '@/components/home/LatestList';

interface Props {
  viewer: string;
  username: string;
}

export default function MemberMobilePosts({ viewer, username }: Props) {
  const {
    data,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    status,
    error,
  } = useMemberInfinitePosts(viewer, username);

  return (
    <MemberInfiniteList
      data={data}
      status={status}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={fetchNextPage}
    >
      {(post) => (
        <div className='w-full flex gap-5 min-h-[70px] justify-between items-center border-b'>
          <span>{post?.id}</span>
          <div className='flex gap-3 h-full items-center'>
            <span className='text-xl font-semibold'>{post?.title}</span>
          </div>
          <span>{getDate(post?.createDate)}</span>
        </div>
      )}
    </MemberInfiniteList>
  );
}
