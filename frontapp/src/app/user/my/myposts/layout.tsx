import MyPostsTabs from '@/components/member/mypage/myposts/MyPostsTabs';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='w-full h-full flex flex-col px-3 md:px-0 py-5'>
      <div className='md:hidden max-w-xs mx-auto w-full pt-2 pb-6'>
        <MyPostsTabs />
      </div>
      <div className='hidden md:flex items-center w-full h-[48px] border-b pb-2'>
        <span className='text-2xl font-semibold tracking-widest px-2 text-gray-600 basis-4/6'>
          나의 작성 글
        </span>
        <div className='basis-2/6'>
          <MyPostsTabs />
        </div>
      </div>
      {children}
    </div>
  );
}
