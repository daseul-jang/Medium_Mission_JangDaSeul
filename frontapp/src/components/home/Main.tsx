export default function Main() {
  return (
    <div className='min-h-[250px] md:min-h-[600px] basis-3/5 bg-custom-image w-screen bg-cover flex items-center'>
      <div className='hidden md:flex w-full'>
        <div className='max-w-screen-xl w-full mx-auto'>
          <div className='w-[500px] h-72 bg-white/20 mt-[64px] mx-8 rounded-sm'>
            <div className='flex flex-col justify-center h-full gap-5 w-full items-center px-10 text-black'>
              <span className='w-full text-left text-5xl font-custom tracking-widest'>
                Hello,
              </span>
              <span className='w-full text-right text-4xl font-custom tracking-widest'>
                thanks for visiting!
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className='md:hidden w-full h-full'>
        <div className='flex justify-center items-center h-full'>
          <div className='mt-[64px] flex flex-col gap-2 items-center'>
            <span className='bg-white/40 text-xl py-1 px-2 rounded-sm text-black font-semibold font-custom tracking-widest'>
              Hello!
            </span>
            <span className='bg-white/40 text-xl py-1 px-2 rounded-sm text-black font-semibold font-custom tracking-widest'>
              thanks for visiting!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
