import axios from '@/config/axios-config';
import { Post, WritePost } from '@/model/post';

export const fetchDeletePost = async (id: string) => {
  const res = await axios.delete(`/post/${id}/delete`);

  return res.data;
};

export const fetchMemberInfinitePosts = async ({
  pageParam = null,
  queryKey,
}: {
  pageParam: number | null;
  queryKey: string[];
}) => {
  const [_key, viewer, username] = queryKey;
  const res = await axios.get(`/user/${username}/posts`, {
    params: { viewer, cursor: pageParam, limit: 5 },
  });

  return res.data;
};

export const fetchMemberPosts = async ({
  queryKey,
}: {
  queryKey: (string | number)[];
}) => {
  const [_key, viewer, username, page, size] = queryKey;
  const res = await axios.get(
    `/user/${username}/posts?viewer=${viewer}&page=${page}&size=${size}`
  );

  return res.data;
};

interface MyInfinitePostsProps {
  pageParam: number | null;
  queryKey: string[];
}

export const fetchMyInfinitePosts = async ({
  pageParam = null,
  queryKey,
}: MyInfinitePostsProps) => {
  const [_key, type, viewer] = queryKey;
  const res = await axios.get(`/user/my/myposts/${type}`, {
    params: { viewer, cursor: pageParam, limit: 5 },
  });

  return res.data;
};

export const fetchMyPosts = async (
  type: string,
  viewer: string,
  page: number,
  size: number
) => {
  console.log(viewer);

  const res = await axios.get(
    `/user/my/myposts/${type}?viewer=${viewer}&page=${page}&size=${size}`
  );

  return res.data;
};

export const fetchModify = async (post: WritePost, id?: string) => {
  const res = await axios.put(`/post/${id}/modify`, post);

  return res.data;
};

export const fetchPostDetail = async (id: string) => {
  const res = await axios.get(`/post/${id}`);

  return res.data;
};

export const fetchInfiniteList = async ({
  pageParam = null,
}: {
  pageParam: number | null;
}): Promise<Post[]> => {
  const res = await axios.get('/post/infinite-list', {
    params: { cursor: pageParam, limit: 20 },
  });

  return res.data;
};

export const fetchAlltList = async (page: number, size: number) => {
  const res = await axios.get(`/post/list?page=${page}&size=${size}`);

  return res.data;
};

export const fetchLatestList = async () => {
  const res = await axios.get('/post/latest');

  return res.data;
};

export const fetchWrite = async (post: WritePost) => {
  const res = await axios.post('/post/write', post);

  return res.data;
};
