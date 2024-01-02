'use client';

import { useWindowSize } from '@/hooks/useWindowSize';
import MyMobilePosts from './MyMobilePosts';
import MyPcPosts from './MyPcPosts';

interface Props {
  type: 'all' | 'public' | 'private';
}

export default function MyPosts({ type }: Props) {
  const { width, height } = useWindowSize();
  const viewer = width < 768 ? 'mobile' : 'pc';

  return (
    <div className='h-full'>
      {viewer === 'mobile' ? (
        <MyMobilePosts type={type} viewer={viewer} />
      ) : (
        <MyPcPosts type={type} viewer={viewer} />
      )}
    </div>
  );
}
