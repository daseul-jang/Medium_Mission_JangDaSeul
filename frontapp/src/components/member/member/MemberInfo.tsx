export default function MemberInfo({ username }: { username: string }) {
  return (
    <div className='w-full flex justify-center'>
      <span className='text-2xl font-semibold tracking-widest'>{username}</span>
    </div>
  );
}
