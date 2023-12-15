import { WritePost } from '@/model/post';
import { BASE_URL, CUSTOM_HEADERS } from './setting';

const POST_URL = BASE_URL + '/post';

export const getLatestList = async () => {
  console.log('포스트 서비스 - 최신글');

  try {
    const res = await fetch(`${POST_URL}/latest-list`, {
      ...CUSTOM_HEADERS,
      cache: 'no-store',
      method: 'GET',
    });

    const data = await res.json();

    console.log(data);
    console.log(data.data.content[0]);

    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const addPost = async (post: WritePost, accessToken: string) => {
  console.log('포스트 서비스 - 게시글 작성');

  try {
    const res = await fetch(`${POST_URL}/write`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      method: 'POST',
      body: JSON.stringify(post),
    });

    const data = await res.json();

    console.log(data);

    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
