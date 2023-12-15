import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { WritePost } from '@/model/post';
import { fetchWrite } from './api-fetcher/postFetcher';

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
