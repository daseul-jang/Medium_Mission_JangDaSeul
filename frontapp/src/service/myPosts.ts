import { BASE_URL } from './setting';

const POST_URL = BASE_URL + '/post';

export const getMyPosts = async (url: string, accessToken: string) => {
  console.log('마이페이지 내 글 목록 서비스');

  try {
    const res = await fetch(`${POST_URL}/myList/${url}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await res.json();
    console.log(data);

    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
