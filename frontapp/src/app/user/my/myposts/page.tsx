import MyPosts from '@/components/member/mypage/myposts/MyPosts';

export default function MyPostsPage() {
  return (
    <section className='h-full'>
      <MyPosts type='all' />
    </section>
  );
}
