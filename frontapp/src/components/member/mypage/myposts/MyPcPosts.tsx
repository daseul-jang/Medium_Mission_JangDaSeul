import { useMyPosts } from '@/hooks/myPost';
import { useSearchParams } from 'next/navigation';
import MemberPaginationList from '../../MemberPaginationList';
import LoadingSpinnerCircle from '@/components/global/ui/icon/LoadingSpinnerCircle';

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

  if (!data?.data) {
    return <>Data Not Found</>;
  }

  const posts = data?.data?.content;

  if (!posts) {
    return <>Data Not Found</>;
  }

  return (
    <div>
      <MemberPaginationList
        posts={posts}
        isAuth={true}
        totalPages={data.data.totalPages || 0}
        page={page}
        size={size}
        baseUrl={`/user/my/myposts${type === 'all' ? '' : `/${type}`}?`}
      />
    </div>
  );
}
