export default function ErrorHandler({ message }: { message: string }) {
  return (
    <div className='fixed top-0 w-full h-full bg-white z-50'>
      <div className='flex flex-col justify-center items-center h-full gap-8'>
        <span className='text-3xl font-semibold text-error'>Error</span>
        <span className='text-3xl font-bold tracking-widest'>{message}</span>
      </div>
    </div>
  );
}
