import InfiniteList from '@/components/home/InfiniteList';
import LatestList from '@/components/home/LatestList';
import Main from '@/components/home/Main';

export default async function Home() {
  return (
    <section className='flex flex-col items-center w-full h-full gap-10 -mt-[70px]'>
      <Main />
      <LatestList />
      <InfiniteList />
    </section>
  );
}
