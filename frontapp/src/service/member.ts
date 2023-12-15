import { BASE_URL, CUSTOM_HEADERS } from './setting';
import { JoinInfo, LoginInfo } from '@/model/member';

const MEMBER_URL = BASE_URL + '/member';

export const loginMember = async (member: LoginInfo) => {
  console.log('로그인 서비스');

  try {
    const res = await fetch(`${MEMBER_URL}/login`, {
      ...CUSTOM_HEADERS,
      cache: 'no-store',
      method: 'POST',
      body: JSON.stringify(member),
    });

    const data = await res.json();

    console.log(data);

    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const addMember = async (member: JoinInfo) => {
  console.log('회원가입 서비스');

  try {
    const res = await fetch(`${MEMBER_URL}/join`, {
      ...CUSTOM_HEADERS,
      cache: 'no-store',
      method: 'POST',
      body: JSON.stringify(member),
    });

    const data = await res.json();

    console.log(data);

    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
