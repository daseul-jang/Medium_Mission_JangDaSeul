'use client';

import { useSession } from 'next-auth/react';
import { Post } from '@/model/post';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import { Comment } from '@/model/comment';
import { usePostDetail } from '@/hooks/post';

interface CommentAreaProps {
  postId: string;
}

export default function CommentArea({ postId }: CommentAreaProps) {
  const { data: session } = useSession();
  const { data, isLoading, isFetching, isError } = usePostDetail(postId);

  const post = data?.data;

  if (!post?.comments) {
    return <></>;
  }

  return (
    <div className='w-full h-full flex flex-col'>
      <div className='order-1 h-auto'>
        <div className='py-3'>
          <span className='text-lg font-bold'>
            댓글 {post.comments.length} 개
          </span>
        </div>
        <CommentForm user={session?.user!!} postId={postId} />
      </div>
      <ul className='h-auto flex flex-col justify-center order-2'>
        {post?.comments.map((comment: Comment) => (
          <CommentItem
            key={comment.id}
            postId={postId}
            comment={comment}
            user={session?.user!!}
          />
        ))}
      </ul>
    </div>
  );
}
