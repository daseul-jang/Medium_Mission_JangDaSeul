import { useMyInfinitePosts } from '@/hooks/myPost';
import MemberInfiniteList from '../../MemberInfiniteList';
import MemberMobilePostsItem from '../../MemberMobilePostsItem';

interface Props {
  type: string;
  viewer: string;
}

export default function MyMobilePosts({ type, viewer }: Props) {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage, status } =
    useMyInfinitePosts(type, viewer);

  return (
    <MemberInfiniteList
      data={data}
      status={status}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={fetchNextPage}
    >
      {(post) => <MemberMobilePostsItem post={post} isAuth={true} />}
    </MemberInfiniteList>
  );
}
