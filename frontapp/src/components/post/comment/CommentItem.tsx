import { getDate } from '@/components/home/LatestList';
import { Comment } from '@/model/comment';
import { AuthMember } from '@/model/member';
import { useState } from 'react';
import CommentEdit from './CommentEdit';
import { useDeleteComment } from '@/hooks/comment';
import ConfirmAlert from '@/components/global/ui/ConfirmAlert';

interface CommentItemProps {
  postId: string;
  comment: Comment;
  user: AuthMember;
}

export default function CommentItem({
  postId,
  comment,
  user,
}: CommentItemProps) {
  const [isModify, setIsModify] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const { submitDeleteComment } = useDeleteComment(postId, comment.id, () =>
    setAlertOpen(false)
  );

  const modifyCancelHandler = () => {
    setIsModify(false);
  };

  return (
    <li className='min-h-[150px] flex flex-col py-6 justify-center border-b'>
      <div className='flex h-full items-center justify-between'>
        <div className='flex h-full items-center gap-4'>
          <div className='bg-base-200 rounded-full w-14 h-14'></div>
          <div className='flex flex-col'>
            <span className='text-lg font-medium'>
              {comment.writerUsername}
            </span>
            <span className='text-sm'>{getDate(comment.createDate)}</span>
          </div>
        </div>
        {comment.writerUsername === user?.username && (
          <div className='flex gap-2'>
            {!isModify && (
              <span
                className='text-sm hover:underline hover:text-green-700 cursor-pointer'
                onClick={() => setIsModify(!isModify)}
              >
                수정
              </span>
            )}
            <span
              className='text-sm hover:underline hover:text-green-700 cursor-pointer'
              onClick={() => setAlertOpen(true)}
            >
              삭제
            </span>
          </div>
        )}
      </div>
      <div className='my-5'>
        {!isModify ? (
          <div className='whitespace-pre-line leading-7'>{comment.content}</div>
        ) : (
          <CommentEdit
            postId={postId}
            comment={comment}
            onCancel={modifyCancelHandler}
          />
        )}
      </div>
      {alertOpen && (
        <ConfirmAlert
          alertOpen={alertOpen}
          onClose={() => setAlertOpen(false)}
          onSubmit={() => submitDeleteComment()}
        >
          삭제시 복구가 불가능합니다. <br /> 정말로 삭제하시겠어요?
        </ConfirmAlert>
      )}
    </li>
  );
}
