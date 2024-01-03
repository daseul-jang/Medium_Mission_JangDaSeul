import { useMemberPosts } from '@/hooks/post';
import { useSearchParams } from 'next/navigation';
import MemberPaginationList from '../MemberPaginationList';
import LoadingSpinnerCircle from '@/components/global/ui/icon/LoadingSpinnerCircle';
import ErrorMessage from '@/components/global/error/ErrorMessage';

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

  const posts = data?.data?.content;

  if (!data?.data || !posts) {
    return <ErrorMessage message='데이터를 찾을 수 없어요.. 🥲' />;
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
