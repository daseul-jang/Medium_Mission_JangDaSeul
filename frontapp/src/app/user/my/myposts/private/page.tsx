import MyPosts from '@/components/member/mypage/myposts/MyPosts';

export default function PrivatePage() {
  return (
    <section className='h-full'>
      <MyPosts type='private' />
    </section>
  );
}
