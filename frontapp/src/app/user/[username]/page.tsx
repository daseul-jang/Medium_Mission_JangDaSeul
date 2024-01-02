import MemberPosts from '@/components/member/member/MemberPosts';

interface Props {
  params: { username: string };
}

export default function UserPage({ params: { username } }: Props) {
  console.log('흠???');
  console.log(username);

  return (
    <section className='w-full h-full'>
      <MemberPosts username={username} />
    </section>
  );
}
