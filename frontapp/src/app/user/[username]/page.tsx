import MemberPosts from '@/components/member/member/MemberPosts';

interface Props {
  params: { username: string };
}

export default function UserPage({ params: { username } }: Props) {
  return (
    <section className='w-full h-full px-5'>
      <MemberPosts username={username} />
    </section>
  );
}
