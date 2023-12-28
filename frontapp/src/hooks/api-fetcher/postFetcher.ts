import axios from '@/config/axios-config';
import { Post, WritePost } from '@/model/post';

export const fetchInfiniteList = async ({
  pageParam = null,
}: {
  pageParam: number | null;
}): Promise<Post[]> => {
  const res = await axios.get('/post/infinite-list', {
    params: { cursorId: pageParam, limit: 20 },
  });

  return res.data;
};

export const fetchAlltList = async (page: number, size: number) => {
  return axios.get(`/post/list?page=${page}&size=${size}`);
};

export const fetchLatestList = async () => {
  return axios.get('/post/latest');
};

export const fetchWrite = async (post: WritePost) => {
  return axios.post('/post/write', post);
};
