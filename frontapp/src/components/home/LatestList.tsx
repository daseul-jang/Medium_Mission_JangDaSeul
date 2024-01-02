'use client';

import { useLatestList } from '@/hooks/post';
import { Page, Response } from '@/model/common';
import { Post } from '@/model/post';
import Link from 'next/link';
import { useState } from 'react';

interface Props {
  responseData: Response<Page<Post>>;
}

export default function LatestList() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data, isLoading, isError, error } = useLatestList();
  const posts = data?.data?.content;

  const handlePrevClick = (e: React.MouseEvent) => {
    e.preventDefault();

    // 이전 버튼 클릭 핸들러
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : Math.ceil(posts.length / 6) - 1
    );
  };

  const handleNextClick = (e: React.MouseEvent) => {
    e.preventDefault();

    // 다음 버튼 클릭 핸들러
    setCurrentIndex((prevIndex) =>
      prevIndex < Math.ceil(posts.length / 6) - 1 ? prevIndex + 1 : 0
    );
  };

  const currentPosts = posts?.slice(currentIndex * 6, (currentIndex + 1) * 6);

  if (!data || !currentPosts) {
    return <>데이터가 없습니다.</>;
  }

  return (
    <div className='w-full relative'>
      <div className='flex justify-between w-full'>
        <button
          onClick={handlePrevClick}
          className='btn-circle bg-base-200/70 hover:bg-base-300/60 text-2xl text-gray-400 z-10 absolute left-0 top-1/2 transform -translate-y-1/2'
        >
          ❮
        </button>
        <button
          onClick={handleNextClick}
          className='btn-circle bg-base-200/60 hover:bg-base-300/60 text-2xl text-gray-400 z-10 absolute right-0 top-1/2 transform -translate-y-1/2'
        >
          ❯
        </button>
      </div>
      <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4 px-8'>
        {currentPosts?.map((post: Post, index: number) => (
          <Link href={`/posts/${post.id}`} key={post.id} className='h-40'>
            <li className='card card-side bg-base-100 rounded-sm w-full h-full p-3 shadow-md'>
              <figure className='basis-1/6'>
                <span className='w-full flex font-bold text-3xl text-base-300'>
                  {(currentIndex * 6 + index + 1).toString().padStart(2, '0')}
                </span>
              </figure>
              <div className='card-body p-2 basis-5/6'>
                <span className='card-actions justify-start text-xs'>
                  {post.writer.username}
                </span>
                <h3 className='card-title text-lg h-full max-h-14 overflow-ellipsis overflow-hidden line-clamp-2'>
                  {post.title}
                </h3>
                <span className='card-actions text-xs'>
                  {getDate(post.createDate)}
                </span>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export const getDate = (createDate: string) => {
  const date = new Date(createDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const year = date.getFullYear();

  // getMonth 메서드는 0부터 시작하므로 1을 더함
  // ("0" + 값).slice(-2) : 항상 두 자리 숫자를 유지하기 위함
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);

  if (date >= today) {
    const hour = ('0' + date.getHours()).slice(-2);
    const minute = ('0' + date.getMinutes()).slice(-2);
    return `${hour}:${minute}`;
  }

  return `${year}-${month}-${day}`;
};
