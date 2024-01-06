import axios from '@/config/axios-config';

export const fetchDeleteComment = async (postId: string, commentId: number) => {
  const res = await axios.delete(`/post/${postId}/comment/${commentId}/delete`);

  return res.data;
};

export const fetchModifyComment = async (
  postId: string,
  commentId: number,
  content: string
) => {
  const res = await axios.put(`/post/${postId}/comment/${commentId}/modify`, {
    content,
  });

  return res.data;
};

export const fetchAddComment = async (postId: string, content: string) => {
  const res = await axios.post(`/post/${postId}/comment/write`, {
    postId,
    content,
  });

  return res.data;
};
