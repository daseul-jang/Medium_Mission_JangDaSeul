import { useMemberInfinitePosts } from '@/hooks/post';
import MemberInfiniteList from '../MemberInfiniteList';
import { getDate } from '@/components/home/LatestList';
import MemberMobilePostsItem from '../MemberMobilePostsItem';

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
      {(post) => <MemberMobilePostsItem post={post} isAuth={false} />}
    </MemberInfiniteList>
  );
}
