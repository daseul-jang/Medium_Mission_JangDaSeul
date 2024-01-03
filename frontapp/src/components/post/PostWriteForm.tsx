'use client';

import { usePostWrite } from '@/hooks/post';
import LoadingSpinnerCircle from '../global/ui/icon/LoadingSpinnerCircle';
import { usePostForm } from '@/hooks/usePostForm';
import PostForm from './PostForm';

export default function PostWriteForm() {
  const initialPost = {
    title: '',
    subtitle: '',
    content: '',
    isPublic: true,
    isPaid: false,
  };
  const { submitPostWrite, isPending, isError } = usePostWrite();
  const formProps = usePostForm({
    type: 'write',
    initialPost,
    submitFunction: (post) => submitPostWrite(post),
  });

  if (isPending) {
    return <LoadingSpinnerCircle />;
  }

  return (
    <div className='h-full w-full flex flex-col justify-around gap-5 p-5'>
      <PostForm {...formProps} />
    </div>
  );
}
