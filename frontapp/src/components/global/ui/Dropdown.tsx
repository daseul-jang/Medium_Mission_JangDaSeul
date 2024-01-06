/* eslint-disable @next/next/no-img-element */
import { AuthMember } from '@/model/member';
import { signOut } from 'next-auth/react';
import { useState } from 'react';
import Menu from './Menu';
import WriteBtn from './button/WriteBtn';
import Underline from './Underline';
import Link from 'next/link';
import Badge from './Badge';

export default function Dropdown({ user }: { user: AuthMember }) {
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
      className='dropdown dropdown-bottom dropdown-end z-[999]'
      onBlur={handleOutsideClick}
    >
      <div
        tabIndex={0}
        className='flex items-center'
        role='button'
        onClick={() => setIsOpen(!isOpen)}
      >
        <img
          src='https://miro.medium.com/v2/resize:fill:32:32/1*dmbNkD5D-u45r44go_cf0g.png'
          alt=''
          className='rounded-full border border-zinc-400'
        />
        <div className='hidden md:block absolute top-0 w-full h-full hover:bg-black/30 rounded-full cursor-pointer'></div>
      </div>
      {isOpen && (
        <ul
          tabIndex={0}
          className='dropdown-content z-40 shadow bg-base-100 rounded-md w-52 mt-2 p-0 py-2'
        >
          <Menu onClick={dropdownClose} style='md:hidden'>
            <WriteBtn style='text-gray-500 hover:text-black' />
          </Menu>
          <Underline style='md:hidden' />
          <Menu onClick={dropdownClose}>
            <Link href='/user/my'>Profile</Link>
          </Menu>
          <Underline />
          <Menu onClick={dropdownClose}>
            <button
              className='flex flex-col items-start gap-2'
              onClick={() =>
                signOut({
                  callbackUrl: '/',
                })
              }
            >
              <span>Sign out</span>
            </button>
          </Menu>
          <Underline />
          <Menu hover={false}>
            <div className='flex justify-between h-full items-center'>
              <span>{user.username}</span>
              {user.role === 'PAID' && (
                <Badge color='green' outline={false}>
                  멤버십
                </Badge>
              )}
            </div>
          </Menu>
        </ul>
      )}
    </div>
  );
}
