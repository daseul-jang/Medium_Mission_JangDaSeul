import { useMemberPosts } from '@/hooks/post';
import { useSearchParams } from 'next/navigation';
import MemberPaginationList from '../MemberPaginationList';
import LoadingSpinnerCircle from '@/components/global/ui/icon/LoadingSpinnerCircle';

interface Props {
  viewer: string;
  username: string;
}

export default function MemberPcPosts({ viewer, username }: Props) {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const size = Number(searchParams.get('size')) || 10;
  const { data, isLoading, isError, error } = useMemberPosts(
    viewer,
    username,
    page,
    size
  );

  if (isLoading) {
    return <LoadingSpinnerCircle />;
  }

  if (!data?.data) {
    return <>Data Not Found</>;
  }

  const posts = data?.data?.content;

  if (!posts) {
    return <>Data Not Found</>;
  }

  return (
    <div className='max-w-screen-lg mx-auto h-full'>
      <MemberPaginationList
        posts={posts}
        isAuth={false}
        totalPages={data.data.totalPages || 0}
        page={page}
        size={size}
        baseUrl={`/user/${username}?`}
      />
    </div>
  );
}
