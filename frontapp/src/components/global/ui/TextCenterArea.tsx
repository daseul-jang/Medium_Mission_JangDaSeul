export default function TextCenterArea({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex justify-center items-center min-h-screen -mt-[67px]'>
      {children}
    </div>
  );
}
