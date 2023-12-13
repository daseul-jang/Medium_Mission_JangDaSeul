import axios from '@/config/axios-config';
import { JoinInfo } from '@/model/member';

export const fetchJoin = async (member: JoinInfo) => {
  return axios.post('/auth/join', member);
};
