import LatestList from '@/components/home/LatestList';
import Main from '@/components/home/Main';
import { Post } from '@/model/post';
import { getLatestList } from '@/service/posts';
import Image from 'next/image';

export default async function Home() {
  const responseData = await getLatestList();

  return (
    <section className='flex flex-col items-center w-full'>
      <Main />
      <LatestList responseData={responseData} />
    </section>
  );
}
