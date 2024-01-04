import { useAddComment } from '@/hooks/comment';
import { AuthMember } from '@/model/member';
import { useState } from 'react';

interface CommentWriteFormProps {
  user: AuthMember;
  postId: string;
}

export default function CommentForm({ user, postId }: CommentWriteFormProps) {
  const [content, setContent] = useState('');

  const initContent = () => {
    setContent('');
  };

  const { submitAddComment, isPending } = useAddComment(
    postId,
    content,
    initContent
  );

  const submitCommentHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    submitAddComment();
  };

  return (
    <form className='flex flex-col gap-3' onSubmit={submitCommentHandler}>
      <textarea
        className='resize-none rounded-md focus:outline-green-600 p-4 text-sm border min-h-[100px]'
        value={content}
        placeholder={
          user ? '답변을 입력해 주세요.' : '로그인이 필요한 서비스입니다.'
        }
        disabled={!user}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <div className='flex justify-end'>
        <button className='btn btn-success text-white' disabled={!user}>
          답변 등록
        </button>
      </div>
    </form>
  );
}
