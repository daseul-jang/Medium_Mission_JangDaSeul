import axios from '@/config/axios-config';
import { WritePost } from '@/model/post';

export const fetchWrite = async (post: WritePost) => {
  return axios.post('/post/write', post);
};
