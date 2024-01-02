import InfiniteList from '@/components/home/InfiniteList';
import LatestList from '@/components/home/LatestList';
import LatestListSm from '@/components/home/LatestListSm';
import Main from '@/components/home/Main';

export default async function Home() {
  return (
    <section className='flex flex-col items-center w-full h-full -mt-[70px]'>
      <Main />
      <div className='w-full px-3'>
        <h1 className='text-2xl sm:text-4xl font-bold pt-8 pb-3 lg:px-8 sm:pb-3'>
          최신 글
        </h1>
        <div className='max-sm:hidden'>
          <LatestList />
        </div>
        <div className='sm:hidden'>
          <LatestListSm />
        </div>
        <h1 className='text-2xl sm:text-4xl font-bold pt-14 lg:px-8 sm:pb-3'>
          전체 글
        </h1>
        <div className='pt-3 px-8'>
          <InfiniteList />
        </div>
      </div>
    </section>
  );
}
