'use client';

import { useDeletePost, usePostDetail } from '@/hooks/post';
import { getDate } from '../home/LatestList';
import Link from 'next/link';
import { AuthMember } from '@/model/member';
import { useState } from 'react';
import ModalPortal from '../global/modal/ModalPortal';
import AlertModal from '../global/modal/AlertModal';
import LoadingSpinnerCircle from '../global/ui/icon/LoadingSpinnerCircle';
import ErrorMessage from '../global/error/ErrorMessage';
import EllipsisIcon from '../global/ui/icon/EllipsisIcon';
import EllipsisVerticalIcon from '../global/ui/icon/EllipsisVerticalIcon';
import PostDetailDropdown from '../global/ui/PostDetailDropdown';

interface Props {
  id: string;
  user: AuthMember | undefined;
}

export default function PostDetail({ id, user }: Props) {
  const {
    data,
    isLoading,
    isFetching,
    isError: isDetailError,
    error,
  } = usePostDetail(id);
  const [openAlert, setOpenAlert] = useState(false);
  const { submitDeletePost } = useDeletePost(id);

  console.log(data);

  const closeAlert = () => {
    setOpenAlert(false);
  };

  const deleteSubmit = () => {
    submitDeletePost();
    setOpenAlert(false);
  };

  if (isLoading || isFetching) {
    return (
      <div className='flex justify-center items-center h-full'>
        <LoadingSpinnerCircle />
      </div>
    );
  }

  if (isDetailError) {
    return <ErrorMessage message='Error!!' />;
  }

  if (!data) {
    return <ErrorMessage message='데이터를 찾을 수 없어요.. 🥲' />;
  }

  if (!data.result) {
    return <ErrorMessage message={data.message} />;
  }

  const post = data.data;

  return (
    <div className='flex flex-col items-center w-full h-full px-7 py-1 sm:px-10 sm:py-8'>
      <div className='w-full h-full basis-1/12 flex flex-col justify-center py-4 sm:py-0 sm:pb-4'>
        <h1 className='text-xl sm:text-3xl font-bold flex justify-start w-full mb-2 sm:mb-0 sm:py-3'>
          {post.title}
        </h1>
        <div className='flex justify-between w-full h-fit items-center'>
          <div className='flex gap-2 text-sm'>
            <Link href={`/user/${post.writer?.username}`}>
              <span>{post.writer?.username}</span>
            </Link>
            <span>·</span>
            <span>{getDate(post.createDate)}</span>
          </div>
          {user?.username === post.writer?.username && (
            <>
              <div className='hidden sm:flex gap-2 text-sm'>
                <Link href={`/posts/${post.id}/modify`}>수정</Link>
                <button onClick={() => setOpenAlert(true)}>삭제</button>
              </div>
              <div className='flex gap-2 text-sm sm:hidden'>
                <PostDetailDropdown
                  post={post}
                  alertOpen={() => setOpenAlert(true)}
                />
              </div>
            </>
          )}
        </div>
      </div>
      <div className='pt-5 border-t w-full h-full whitespace-pre-line text-sm sm:text-base'>
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
