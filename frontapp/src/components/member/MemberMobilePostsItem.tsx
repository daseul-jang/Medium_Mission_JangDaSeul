import { getDate } from '@/components/home/LatestList';
import { Post } from '@/model/post';

interface Props {
  post: Post;
  isAuth: boolean;
}

export default function MemberMobilePostsItem({ post, isAuth }: Props) {
  return (
    <div className='w-full flex gap-5 min-h-[70px] justify-between items-center border-b'>
      <span>{post?.id}</span>
      <div className='flex gap-3 h-full items-center'>
        <span className='text-xl font-semibold'>{post?.title}</span>
        {isAuth &&
          (post.isPublic ? (
            <span className='px-2 py-1 text-xs rounded-full text-green-600 bg-green-200 '>
              Public
            </span>
          ) : (
            <span className='px-2 py-1 text-xs rounded-full text-gray-600 bg-base-300 '>
              Private
            </span>
          ))}
      </div>
      <span>{getDate(post?.createDate)}</span>
    </div>
  );
}
