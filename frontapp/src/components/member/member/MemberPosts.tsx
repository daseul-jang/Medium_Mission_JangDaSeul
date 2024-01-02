'use client';

import { useWindowSize } from '@/hooks/useWindowSize';
import MemberMobilePosts from './MemberMobilePosts';
import MemberPcPosts from './MemberPcPosts';

export default function MemberPosts({ username }: { username: string }) {
  const { width, height } = useWindowSize();
  const viewer = width < 640 ? 'mobile' : 'pc';

  return (
    <div className='w-full h-full'>
      {viewer === 'mobile' ? (
        <MemberMobilePosts viewer={viewer} username={username} />
      ) : (
        <MemberPcPosts viewer={viewer} username={username} />
      )}
    </div>
  );
}
