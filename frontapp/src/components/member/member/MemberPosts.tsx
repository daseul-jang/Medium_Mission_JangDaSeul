'use client';

import { useMemberInfinitePosts, useMemberPosts } from '@/hooks/post';
import { useWindowSize } from '@/hooks/useWindowSize';
import MemberInfiniteList from '../MemberInfiniteList';
import { UseInfiniteQueryResult } from '@tanstack/react-query';
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
