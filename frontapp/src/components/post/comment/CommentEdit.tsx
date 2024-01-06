import { useModifyComment } from '@/hooks/comment';
import { Comment } from '@/model/comment';
import { useState } from 'react';

interface CommentEditProps {
  postId: string;
  comment: Comment;
  onCancel: () => void;
}

export default function CommentEdit({
  postId,
  comment,
  onCancel,
}: CommentEditProps) {
  const [content, setContent] = useState(comment.content);

  const initContent = () => {
    setContent('');
  };

  const { submitModifyComment, isPending } = useModifyComment(
    postId,
    comment.id,
    content,
    initContent,
    onCancel
  );

  const modifySubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    submitModifyComment();
  };

  return (
    <form className='flex flex-col gap-3' onSubmit={modifySubmitHandler}>
      <textarea
        className='resize-none rounded-md focus:outline-green-600 p-4 text-sm border min-h-[100px]'
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <div className='flex justify-end gap-2'>
        <button className='btn' onClick={onCancel}>
          취소
        </button>
        <button className='btn'>수정</button>
      </div>
    </form>
  );
}
