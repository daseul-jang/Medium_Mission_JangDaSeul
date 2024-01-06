export default function ErrorMessage({ message }: { message: string }) {
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <span className='text-xl font-semibold'>{message}</span>
    </div>
  );
}
