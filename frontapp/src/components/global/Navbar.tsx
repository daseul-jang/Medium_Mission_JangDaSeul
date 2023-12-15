'use client';

import { useEffect, useState } from 'react';
import SearchIcon from './ui/icon/SearchIcon';
import ModalPotal from './modal/ModalPordal';
import Modal from './modal/Modal';
import AuthArea from '../member/auth/AuthArea';
import AuthFrom from '../member/auth/AuthForm';
import JoinAfter from '../member/auth/JoinAfter';
import { signOut, useSession } from 'next-auth/react';
import WriteIcon from './ui/icon/WriteIcon';
import { useRouter } from 'next/navigation';
import LoadingSpinnerDots from './ui/icon/LoadingSpinnerDots';

export type AuthType = 'login' | 'join';

export default function Navbar() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const user = session?.user;
  const [openModal, setOpenModal] = useState(false);
  const [openForm, setOpenFrom] = useState(false);
  const [isAfterAuth, setIsAfterAuth] = useState(false);
  const [authType, setAuthType] = useState<AuthType>('login');

  useEffect(() => {
    !openModal && setOpenFrom(false);
  }, [openModal]);

  const changeAuthType = (e: React.MouseEvent<HTMLButtonElement>) => {
    setOpenModal(true);
    setAuthType(e.currentTarget.name as AuthType);
    setIsAfterAuth(false);
  };

  const closeModalHandler = () => {
    setOpenModal(false);
  };

  const afterAuthViewHandler = () => {
    setIsAfterAuth((prev) => !prev);
  };

  const formViewHandler = () => {
    setOpenFrom((prev) => !prev);
  };

  return (
    <div className='navbar max-w-screen-lg mx-auto bg-base-100 px-5'>
      <div className='flex-1 gap-4'>
        <h1 className='text-2xl font-bold font-custom'>Medium</h1>
        <div className='relative bg-zinc-100 rounded-full'>
          <div className='absolute flex items-center inset-y-0 left-0 pl-3 pointer-events-none'>
            <SearchIcon />
          </div>
          <input
            type='text'
            placeholder='Search'
            className='bg-transparent py-3 pl-10 pr-5 focus:outline-none text-sm text-neutral-800'
          />
        </div>
      </div>
      <div className='flex-none gap-3'>
        {status === 'loading' ? (
          <LoadingSpinnerDots />
        ) : user ? (
          <>
            <button
              className='text-sm flex items-center gap-1 mr-3'
              onClick={() => router.push('/post/write')}
            >
              <WriteIcon />
              Write
            </button>
            <button
              className='rounded-full bg-base-200 hover:bg-base-300 py-2 px-3 text-sm'
              onClick={() =>
                signOut({
                  callbackUrl: '/',
                })
              }
            >
              Sign out
            </button>
          </>
        ) : (
          <>
            <button
              name='join'
              className='rounded-full bg-green-700 hover:bg-green-800 py-2 px-3 text-sm text-white'
              onClick={changeAuthType}
            >
              Sign up
            </button>
            <button
              name='login'
              className='rounded-ful py-2 px-3 text-sm text-neutral-500 hover:text-neutral-800'
              onClick={changeAuthType}
            >
              Sign in
            </button>
          </>
        )}
      </div>
      {openModal && (
        <ModalPotal>
          <Modal onClose={closeModalHandler}>
            {isAfterAuth ? (
              <JoinAfter changeAuthType={changeAuthType} />
            ) : openForm ? (
              <AuthFrom
                authType={authType}
                closeModalHandler={closeModalHandler}
                closeFormHandler={formViewHandler}
                afterAuthViewHandler={afterAuthViewHandler}
              />
            ) : (
              <AuthArea
                authType={authType}
                changeAuthType={changeAuthType}
                openFormHandler={formViewHandler}
              />
            )}
          </Modal>
        </ModalPotal>
      )}
    </div>
  );
}
