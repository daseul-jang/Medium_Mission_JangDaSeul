'use client';

import { Page, Response } from '@/model/common';
import { Post } from '@/model/post';

interface Props {
  responseData: Response<Page<Post>>;
}

export default function LatestList({ responseData }: Props) {
  const { content } = responseData?.data;
  console.log(responseData);

  return (
    <ul className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4 px-8'>
      {content?.map((post, index) => (
        <li
          key={post.id}
          className='card card-side bg-base-100 rounded-sm w-full p-3 shadow-md'
        >
          <figure className='w-1/6'>
            <span className='w-full flex font-bold text-3xl text-base-300'>
              {index < 9 ? `0${index + 1}` : index + 1}
            </span>
          </figure>
          <div className='card-body p-2 min-h-[100px]'>
            <span className='card-actions justify-start text-xs'>
              {post.writer.username}
            </span>
            <h3 className='card-title text-lg'>{post.title}</h3>
            <span className='card-actions text-xs'>
              {getDate(post.createDate)}
            </span>
          </div>
        </li>
      ))}
    </ul>
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

  /* if (date >= today) {
    const hour = ('0' + date.getHours()).slice(-2);
    const minute = ('0' + date.getMinutes()).slice(-2);
    return `${hour}:${minute}`;
  } */

  return `${year}-${month}-${day}`;
};
