export default function MemberInfo({ username }: { username: string }) {
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <span className='text-2xl font-semibold tracking-widest'>{username}</span>
    </div>
  );
}
