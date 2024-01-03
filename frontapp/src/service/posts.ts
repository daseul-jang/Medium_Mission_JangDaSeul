import { WritePost } from '@/model/post';
import { BASE_URL, CUSTOM_HEADERS } from './setting';

const POST_URL = BASE_URL + '/post';

export const deletePost = async (id: string, accessToken: string) => {
  console.log('포스트 서비스 - 게시글 삭제');

  try {
    const res = await fetch(`${POST_URL}/${id}/delete`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      method: 'DELETE',
    });

    const data = await res.json();

    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getMemberPosts = async (url: string) => {
  console.log('포스트 서비스 - 회원 게시글 조회');

  try {
    const res = await fetch(`${POST_URL}/b/${url}`, {
      headers: {
        'Content-Type': 'application/json',
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

export const modifyPost = async (
  id: number,
  post: WritePost,
  accessToken: string
) => {
  console.log('포스트 서비스 - 게시글 수정');

  try {
    const res = await fetch(`${POST_URL}/${id}/modify`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      method: 'PUT',
      body: JSON.stringify(post),
    });

    const data = await res.json();

    //console.log(data);

    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getPostDetail = async (id: string, accessToken?: string) => {
  console.log('포스트 서비스 - 상세글');
  try {
    const res = await fetch(`${POST_URL}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      cache: 'no-store',
    });

    const data = await res.json();

    console.log(data);

    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getInfiniteList = async (
  cursor: string | null,
  limit: string | null
) => {
  console.log('포스트 서비스 - 무한 리스트');

  const queryString = cursor
    ? `cursor=${cursor}&limit=${limit}`
    : `limit=${limit}`;

  try {
    const res = await fetch(`${POST_URL}/infinite-list?${queryString}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    const data = await res.json();

    if (!data.result) {
      return new Response(JSON.stringify(data.message), {
        status: data.status,
      });
    }

    return data.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getAllList = async (page: number, size: number) => {
  console.log('포스트 서비스 - 전체글');

  try {
    const res = await fetch(`${POST_URL}/list?page=${page}&size=${size}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    //console.log(res.status);

    const data = await res.json();

    //console.log(data);

    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getLatestList = async () => {
  console.log('포스트 서비스 - 최신글');

  try {
    const res = await fetch(`${POST_URL}/latest-list`, {
      ...CUSTOM_HEADERS,
      cache: 'no-store',
      method: 'GET',
    });

    const data = await res.json();

    /* console.log(data);
    console.log(data.data.content[0]); */

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

    //console.log(data);

    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
