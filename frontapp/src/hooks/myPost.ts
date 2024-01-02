import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { fetchMyInfinitePosts, fetchMyPosts } from './api-fetcher/postFetcher';

export const useMyInfinitePosts = (type: string, viewer: string) => {
  const {
    data,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    status,
    error,
  } = useInfiniteQuery({
    queryKey: ['myInfinitePosts', type, viewer],
    queryFn: fetchMyInfinitePosts,
    initialPageParam: null,
    getNextPageParam: (lastPage, allPages) => {
      const lastPostId = lastPage?.data?.length
        ? lastPage.data[lastPage.data.length - 1].id
        : undefined;

      console.log(lastPostId);

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

export const useMyPosts = (
  type: string,
  viewer: string,
  page: number,
  size: number
) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['myposts', type, viewer, page, size],
    queryFn: () => fetchMyPosts(type, viewer, page, size),
  });

  return { data, isLoading, isError, error };
};
