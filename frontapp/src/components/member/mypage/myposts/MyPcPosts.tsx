import Pagination from '@/components/global/ui/Pagination';
import { getDate } from '@/components/home/LatestList';
import { useMyPosts } from '@/hooks/myPost';
import { Post } from '@/model/post';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import MemberPaginationList from '../../MemberPaginationList';

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
    return <>Loading...</>;
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
