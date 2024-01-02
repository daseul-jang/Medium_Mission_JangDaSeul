import { useRouter } from 'next/navigation';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { WritePost } from '@/model/post';
import {
  fetchDeletePost,
  fetchInfiniteList,
  fetchMemberInfinitePosts,
  fetchMemberPosts,
  fetchModify,
  fetchPostDetail,
  fetchWrite,
} from './api-fetcher/postFetcher';
import { getAllList, getLatestList } from '@/service/posts';

export const useDeletePost = (id: string) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    mutate: submitDeletePost,
    isPending,
    isError,
  } = useMutation({
    mutationFn: () => fetchDeletePost(id),
    onSuccess: (res) => {
      console.log('게시글 삭제 성공');
      console.log(res);

      if (!res.result) {
        alert('게시글 삭제에 실패했어요 🥴');
        return;
      }

      alert(res.message);

      queryClient.invalidateQueries({ queryKey: ['posts'] });

      router.back();
    },
    onError: (err) => {
      console.log('게시글 삭제 실패');
      console.log(err);
    },
  });

  return { submitDeletePost, isPending, isError };
};

export const useMemberInfinitePosts = (viewer: string, username: string) => {
  const {
    data,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    status,
    error,
  } = useInfiniteQuery({
    queryKey: [`${username}InfinitePosts`, viewer, username],
    queryFn: fetchMemberInfinitePosts,
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

export const useMemberPosts = (
  viewer: string,
  username: string,
  page: number,
  size: number
) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [`${username}posts`, viewer, username, page, size],
    queryFn: fetchMemberPosts,
  });

  return { data, isLoading, isError, error };
};

interface ModifyProps {
  post: WritePost;
  id?: string;
}

export const usePostModify = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    mutate: submitPostModify,
    isPending,
    isError,
  } = useMutation({
    mutationFn: ({ post, id }: ModifyProps) => fetchModify(post, id),
    onSuccess: (res) => {
      console.log('게시글 수정 성공');
      console.log(res);

      if (!res.result) {
        alert('게시글 수정에 실패했어요 🥴');
        return;
      }

      queryClient.invalidateQueries({ queryKey: ['post'] });

      alert('게시글이 성공적으로 수정되었습니다!');

      router.replace(`/post/${res.data.id}`);
    },
    onError: (err) => {
      console.log('게시글 수정 실패');
      console.log(err);
    },
  });

  return { submitPostModify, isPending, isError };
};

export const usePostDetail = (id: string) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['post'],
    queryFn: () => fetchPostDetail(id),
  });

  return { data, isLoading, isError, error };
};

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

export const usePostWrite = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    mutate: submitPostWrite,
    isPending,
    isError,
  } = useMutation({
    mutationFn: (post: WritePost) => fetchWrite(post),
    onSuccess: (res) => {
      console.log('게시글 작성 성공');
      console.log(res);

      if (!res.result) {
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
