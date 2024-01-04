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
import { Comment } from '@/model/comment';
import CommentForm from './comment/CommentForm';
import { useSession } from 'next-auth/react';
import CommentArea from './comment/CommentArea';
import ConfirmAlert from '../global/ui/ConfirmAlert';

interface Props {
  id: string;
  username?: string;
}

export default function PostDetail({ id, username }: Props) {
  const {
    data,
    isLoading,
    isFetching,
    isError: isDetailError,
    error,
  } = usePostDetail(id);
  const { data: session } = useSession();
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
    <div className='flex flex-col items-center w-full h-full'>
      <div className='w-full h-full min-h-[400px]'>
        <div className='w-full h-auto basis-1/12 flex flex-col justify-center py-4 sm:pb-4'>
          <h1 className='text-xl sm:text-3xl font-bold flex justify-start w-full mb-2 sm:mb-0 sm:py-3'>
            {post.title}
          </h1>
          <div className='flex justify-between w-full h-fit items-center'>
            <div className='flex gap-2 text-sm'>
              <Link href={`/user/${post.writerUsername}`}>
                <span>{post.writerUsername}</span>
              </Link>
              <span>·</span>
              <span>{getDate(post.createDate)}</span>
            </div>
            {session?.user?.username === post.writerUsername && (
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
      </div>
      {openAlert && (
        <ConfirmAlert
          alertOpen={openAlert}
          onClose={() => setOpenAlert(false)}
          onSubmit={deleteSubmit}
        >
          삭제시 복구가 불가능합니다. <br /> 정말로 삭제하시겠어요?
        </ConfirmAlert>
      )}
    </div>
  );
}
