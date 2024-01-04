import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchAddComment,
  fetchDeleteComment,
  fetchModifyComment,
} from './api-fetcher/commentFetcher';

export const useDeleteComment = (
  postId: string,
  commentId: number,
  alertClose: () => void
) => {
  const queryClient = useQueryClient();
  const { mutate: submitDeleteComment, isPending } = useMutation({
    mutationFn: () => fetchDeleteComment(postId, commentId),
    onSuccess: (res) => {
      console.log('댓글 삭제 성공');
      console.log(res);

      if (!res.result) {
        alert(res.message);
      }

      queryClient.invalidateQueries({ queryKey: ['post'] });

      alertClose();
    },
    onError: (err) => {
      console.log('댓글 삭제 실패');
      console.log(err);
    },
  });

  return { submitDeleteComment, isPending };
};

export const useModifyComment = (
  postId: string,
  commentId: number,
  content: string,
  initContent: () => void,
  modifyCancel: () => void
) => {
  const queryClient = useQueryClient();
  const { mutate: submitModifyComment, isPending } = useMutation({
    mutationFn: () => fetchModifyComment(postId, commentId, content),
    onSuccess: (res) => {
      console.log('댓글 수정 성공');
      console.log(res);

      if (!res.result) {
        alert(res.message);
      }

      queryClient.invalidateQueries({ queryKey: ['post'] });

      initContent();
      modifyCancel();
    },
    onError: (err) => {
      console.log('댓글 수정 실패');
      console.log(err);
    },
  });

  return { submitModifyComment, isPending };
};

export const useAddComment = (
  postId: string,
  content: string,
  initContent: () => void
) => {
  const queryClient = useQueryClient();
  const { mutate: submitAddComment, isPending } = useMutation({
    mutationFn: () => fetchAddComment(postId, content),
    onSuccess: (res) => {
      console.log('댓글 작성 성공');
      console.log(res);

      if (!res.result) {
        alert('댓글을 작성하지 못했어요...🥹');
        return;
      }

      queryClient.invalidateQueries({ queryKey: ['post'] });

      initContent();
    },
    onError: (err) => {
      console.log('댓글 작성 실패');
      console.log(err);
    },
  });

  return { submitAddComment, isPending };
};
