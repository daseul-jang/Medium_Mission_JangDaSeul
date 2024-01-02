'use client';

import { usePostModify } from '@/hooks/post';
import { AuthMember } from '@/model/member';
import Redirect from '../global/ui/Redirect';
import LoadingSpinnerCircle from '../global/ui/icon/LoadingSpinnerCircle';
import { Post } from '@/model/post';
import { usePostForm } from '@/hooks/usePostForm';
import PostForm from './PostForm';

interface Props {
  user: AuthMember | undefined;
  post: Post;
  id: string;
}

export default function PostModifyForm({ user, post, id }: Props) {
  const { submitPostModify, isPending, isError } = usePostModify();
  const formProps = usePostForm({
    id,
    type: 'modify',
    initialPost: post,
    submitFunction: (post, id) => submitPostModify({ post, id }),
  });

  if (!post || user?.username !== post.writer.username) {
    return <Redirect message='수정 권한이 없습니다.' />;
  }

  if (isPending) {
    return <LoadingSpinnerCircle />;
  }

  return (
    <div className='h-full w-full flex flex-col justify-around gap-5 p-5'>
      <PostForm {...formProps} type='modify' />
    </div>
  );
}
