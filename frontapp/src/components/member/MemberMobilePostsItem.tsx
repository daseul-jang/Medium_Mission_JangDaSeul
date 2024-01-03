import { getDate } from '@/components/home/LatestList';
import { Post } from '@/model/post';
import Badge from '../global/ui/Badge';

interface Props {
  post: Post;
  isAuth: boolean;
}

export default function MemberMobilePostsItem({ post, isAuth }: Props) {
  return (
    <div className='w-full flex flex-col min-h-[70px] justify-center border-b py-5'>
      <div className='h-full'>
        <span>{post?.id}</span>
        <div className='flex gap-3 h-full items-center'>
          <span className='text-xl font-semibold max-sm:max-w-[300px] line-clamp-2 overflow-hidden text-ellipsis'>
            {post?.title}
          </span>
        </div>
      </div>
      <div className='flex justify-between h-full items-center mt-5'>
        <span>{getDate(post?.createDate)}</span>
        <div className='flex gap-2'>
          {post.isPaid && (
            <Badge color='green' fill={false}>
              멤버십
            </Badge>
          )}
          {isAuth && (
            <Badge color={post.isPublic ? 'green' : 'gray'} outline={false}>
              {post.isPublic ? 'Public' : 'Private'}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}
