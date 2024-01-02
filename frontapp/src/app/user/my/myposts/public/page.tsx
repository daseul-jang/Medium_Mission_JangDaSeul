import MyPosts from '@/components/member/mypage/myposts/MyPosts';

export default function PublicPage() {
  return (
    <section className='h-full'>
      <MyPosts type='public' />
    </section>
  );
}
