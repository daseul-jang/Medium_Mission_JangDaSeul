import { useState } from 'react';
import EllipsisVerticalIcon from './icon/EllipsisVerticalIcon';
import Menu from './Menu';
import Link from 'next/link';
import { Post } from '@/model/post';

interface Props {
  post: Post;
  alertOpen: () => void;
}

export default function PostDetailDropdown({ post, alertOpen }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOutsideClick = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsOpen(false);
    }
  };

  const dropdownClose = () => {
    setIsOpen(false);
  };

  return (
    <div
      className='dropdown dropdown-bottom dropdown-end'
      onBlur={handleOutsideClick}
    >
      <div
        tabIndex={0}
        className='bg-base-200 p-1 rounded-full hover:bg-base-300'
        role='button'
        onClick={() => setIsOpen(!isOpen)}
      >
        <EllipsisVerticalIcon className='w-4 h-4 fill-current stroke-current text-gray-500' />
      </div>
      {isOpen && (
        <ul
          tabIndex={0}
          className='dropdown-content flex flex-col items-center z-40 shadow bg-base-100 rounded-md min-w-[80px] mt-2 p-0 py-2 px-2'
        >
          <Menu>
            <Link href={`/posts/${post.id}/modify`}>수정</Link>
          </Menu>
          <Menu>
            <button onClick={alertOpen}>삭제</button>
          </Menu>
        </ul>
      )}
    </div>
  );
}
