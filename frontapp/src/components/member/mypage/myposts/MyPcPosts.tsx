import { useMyPosts } from '@/hooks/myPost';
import { useSearchParams } from 'next/navigation';
import MemberPaginationList from '../../MemberPaginationList';
import LoadingSpinnerCircle from '@/components/global/ui/icon/LoadingSpinnerCircle';
import ErrorMessage from '@/components/global/error/ErrorMessage';

interface Props {
  type: string;
  viewer: string;
}

export default function MyPcPosts({ type, viewer }: Props) {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const size = Number(searchParams.get('size')) || 10;
  const { data, isLoading, isError, error } = useMyPosts(
    type,
    viewer,
    page,
    size
  );

  console.log(data);

  if (isLoading) {
    return <LoadingSpinnerCircle />;
  }

  const posts = data?.data?.content;

  if (!data?.data || !posts) {
    return <ErrorMessage message='데이터를 찾을 수 없어요.. 🥲' />;
  }

  return (
    <MemberPaginationList
      posts={posts}
      isAuth={true}
      totalPages={data.data.totalPages || 0}
      page={page}
      size={size}
      baseUrl={`/user/my/myposts${type === 'all' ? '' : `/${type}`}?`}
    />
  );
}
