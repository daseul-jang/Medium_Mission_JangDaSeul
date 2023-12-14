import { BASE_URL, CUSTOM_HEADERS } from './setting';

const POST_URL = BASE_URL + '/post';

export const latestList = async () => {
  console.log('포스트 서비스 - 최신글');

  try {
    const res = await fetch(`${POST_URL}/latest-list`, {
      ...CUSTOM_HEADERS,
      cache: 'no-store',
      method: 'GET',
    });

    const data = await res.json();

    console.log(data);

    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
