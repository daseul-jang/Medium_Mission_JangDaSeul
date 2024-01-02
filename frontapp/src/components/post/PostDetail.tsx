'use client';

import { useDeletePost, usePostDetail } from '@/hooks/post';
import { getDate } from '../home/LatestList';
import Link from 'next/link';
import { AuthMember } from '@/model/member';
import { useState } from 'react';
import ModalPortal from '../global/modal/ModalPortal';
import AlertModal from '../global/modal/AlertModal';

interface Props {
  id: string;
  user: AuthMember | undefined;
}

export default function PostDetail({ id, user }: Props) {
  const { data, isLoading, isError: isDetailError, error } = usePostDetail(id);
  const [openAlert, setOpenAlert] = useState(false);
  const { submitDeletePost } = useDeletePost(id);

  const closeAlert = () => {
    setOpenAlert(false);
  };

  const deleteSubmit = () => {
    submitDeletePost();
    setOpenAlert(false);
  };

  if (isLoading || Number(id) !== data.data.id) {
    return <>Loading...</>;
  }

  if (isDetailError) {
    return <>Error!! : {error}</>;
  }

  if (!data) {
    return <>data not found</>;
  }

  const post = data.data;

  return (
    <div className='flex flex-col items-center w-full gap-3'>
      <h1 className='text-3xl font-bold flex justify-start w-full py-3'>
        {post.title}
      </h1>
      <div className='flex justify-between w-full'>
        <div className='flex gap-2'>
          <Link href={`/user/${post.writer.username}`}>
            <span>{post.writer.username}</span>
          </Link>
          <span>·</span>
          <span>{getDate(post.createDate)}</span>
        </div>
        {user?.username === post.writer.username && (
          <div className='flex gap-2'>
            <Link href={`/posts/${post.id}/modify`}>수정</Link>
            <button onClick={() => setOpenAlert(true)}>삭제</button>
          </div>
        )}
      </div>
      <div className='pt-5 border-t w-full whitespace-pre-line'>
        {post.content}
      </div>
      {openAlert && (
        <ModalPortal>
          <AlertModal onClose={closeAlert}>
            <div className='p-5 w-full h-full flex flex-col justify-center items-center gap-8'>
              <span className='text-center leading-relaxed tracking-wider'>
                삭제시 복구가 불가능합니다. <br /> 정말로 삭제하시겠어요?
              </span>
              <div className='flex gap-3 w-full justify-center'>
                <button className='w-20 btn' onClick={closeAlert}>
                  아니요
                </button>
                <button
                  className='w-20 btn btn-error text-white'
                  onClick={deleteSubmit}
                >
                  네
                </button>
              </div>
            </div>
          </AlertModal>
        </ModalPortal>
      )}
    </div>
  );
}
