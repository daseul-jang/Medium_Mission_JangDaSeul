import { Post } from '@/model/post';
import { getDate } from './LatestList';

export default function InfiniteListItem({ post }: { post: Post }) {
  if (!post) {
    return <></>;
  }

  return (
    <div className='flex flex-col justify-start pt-5 border-b h-[175px] sm:h-[270px] w-full'>
      <div className='flex gap-2 items-center h-fit'>
        <span className='overflow-hidden text-ellipsis whitespace-nowrap'>
          {post.writer?.username}
        </span>
        <span>·</span>
        <span>{getDate(post.createDate)}</span>
      </div>
      <div className='relative flex h-full w-full pt-3'>
        <div className='flex flex-col gap-2 basis-4/6 lg:basis-5/6 h-full'>
          <div className='pb-3'>
            <h1 className='line-clamp-2 overflow-hidden text-ellipsis min-w-[175px] h-full text-xl sm:text-2xl font-bold max-h-[50px] sm:max-h-[72px]'>
              {post.title}
            </h1>
          </div>
          <div className='hidden sm:block'>
            <p className='line-clamp-2 overflow-hidden text-ellipsis leading-6 w-full h-full text-lg max-h-[48px]'>
              {post.content}
            </p>
          </div>
          <div className=''></div>
        </div>
        <div className='absolute top-0 right-0 basis-1/6'>
          <div className='w-20 h-14 sm:w-32 sm:h-32 bg-base-300'></div>
        </div>
      </div>
    </div>
  );
}
