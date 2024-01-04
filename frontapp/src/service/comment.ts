import { BASE_URL } from './setting';

const POST_URL = BASE_URL + '/post';

export const deleteComment = async (
  postId: string,
  commentId: string,
  accessToken: string
) => {
  console.log('댓글 서비스 - 댓글 삭제');

  try {
    const res = await fetch(
      `${POST_URL}/${postId}/comment/${commentId}/delete`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        method: 'DELETE',
      }
    );

    const data = await res.json();
    console.log(data);

    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const modifyComment = async (
  postId: string,
  commentId: string,
  content: string,
  accessToken: string
) => {
  console.log('댓글 서비스 - 댓글 수정');

  try {
    const res = await fetch(
      `${POST_URL}/${postId}/comment/${commentId}/modify`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        method: 'PUT',
        body: content,
      }
    );

    const data = await res.json();
    console.log(data);

    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const addComment = async (
  postId: string,
  content: string,
  accessToken: string
) => {
  console.log('댓글 서비스 - 댓글 작성');

  try {
    const res = await fetch(`${POST_URL}/${postId}/comment/write`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      method: 'POST',
      body: content,
    });

    const data = await res.json();
    console.log(data);

    return data;
  } catch (err) {}
};
