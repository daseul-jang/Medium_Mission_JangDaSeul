import { Post } from '@/model/post';

export default function InfiniteListItem({ post }: { post: Post }) {
  if (!post) {
    return <>Loading...</>;
  }

  return (
    <div className='p-3 border-b'>
      <div className='flex gap-2'>
        <span>{post.id}</span>
        <h1 className='text-2xl font-bold'>{post.title}</h1>
      </div>
      <p>{post.writer?.username}</p>
    </div>
  );
}
