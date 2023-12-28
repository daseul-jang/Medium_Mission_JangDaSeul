import { useRouter } from 'next/navigation';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { WritePost } from '@/model/post';
import { fetchInfiniteList, fetchWrite } from './api-fetcher/postFetcher';
import { getAllList, getLatestList } from '@/service/posts';

export const useInfiniteList = () => {
  const {
    data,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    status,
    error,
  } = useInfiniteQuery({
    queryKey: ['infinitePosts'],
    queryFn: fetchInfiniteList,
    initialPageParam: null,
    getNextPageParam: (lastPage, allPages) => {
      const lastPostId = lastPage?.length
        ? lastPage[lastPage.length - 1].id
        : undefined;

      return lastPostId;
    },
  });

  return {
    data,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    status,
    error,
  };
};

export const useAllList = (page: number, size: number) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['posts', page, size],
    queryFn: () => getAllList(page, size),
  });

  return { data, isLoading, isError, error };
};

export const useLatestList = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['posts'],
    queryFn: getLatestList,
  });

  return { data, isLoading, isError, error };
};

export const usePostWrite = (post: WritePost) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    mutate: submitPostWrite,
    isPending,
    isError,
  } = useMutation({
    mutationFn: () => fetchWrite(post),
    onSuccess: (res) => {
      console.log('게시글 작성 성공');
      console.log(res);

      if (!(res.data.status >= 200 && res.data.status < 400)) {
        alert('게시글 작성에 실패했어요 🥴');
        return;
      }

      queryClient.invalidateQueries({ queryKey: ['posts'] });

      alert('게시글이 성공적으로 등록되었습니다!');

      router.back();
    },
    onError: (err) => {
      console.log('게시글 작성 실패');
      console.log(err);
    },
  });

  return { submitPostWrite, isPending, isError };
};
