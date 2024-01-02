import { useEffect, useRef, useState } from 'react';
import ModalPortal from '../global/modal/ModalPortal';
import FormModal from '../global/modal/FormModal';
import IsPublicBtn from '../global/ui/button/IsPublicBtn';
import { WritePost } from '@/model/post';

interface Props {
  type?: 'write' | 'modify';
  post: WritePost;
  modalOpen: boolean;
  isPublic: boolean;
  openModal: () => void;
  closeModal: () => void;
  publicHandler: () => void;
  privateHandler: () => void;
  handleOnChange: (
    e: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>
  ) => void;
  handleSubmit: () => void;
}

export default function AfterSubmitArea({
  type = 'write',
  post,
  modalOpen,
  openModal,
  closeModal,
  isPublic,
  publicHandler,
  privateHandler,
  handleOnChange,
  handleSubmit,
}: Props) {
  const titleRef = useRef<HTMLTextAreaElement | null>(null);
  const subtitleRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.style.height = 'auto';
      titleRef.current.style.height = titleRef.current.scrollHeight + 'px';
    }
  }, [post.title]);

  useEffect(() => {
    if (subtitleRef.current) {
      subtitleRef.current.style.height = 'auto';
      subtitleRef.current.style.height =
        subtitleRef.current.scrollHeight + 'px';
    }
  }, [post.subtitle]);

  console.log(isPublic);

  return (
    <>
      <div className='flex flex-col basis-1/12 justify-center'>
        <button className='btn' onClick={openModal}>
          {type === 'write' ? '등록하기' : '수정하기'}
        </button>
      </div>
      {modalOpen && (
        <ModalPortal>
          <FormModal onClose={closeModal}>
            <div className='flex justify-center items-center h-full'>
              <div className='container flex flex-col gap-8 px-10 lg:max-w-lg lg:px-0'>
                <div className='flex flex-col w-full basis-2/5'>
                  <h1 className='text-lg font-bold mb-3'>Story Preview</h1>
                  <div className='lg:w-full h-52 bg-base-200 flex justify-center'>
                    <div className='h-full basis-4/6'></div>
                  </div>
                  <div className='flex flex-col w-full'>
                    <textarea
                      ref={titleRef}
                      name='title'
                      className='border-b resize-none overflow-hidden py-3 px-2 focus:outline-none'
                      value={post.title}
                      rows={1}
                      onChange={handleOnChange}
                    />
                    <textarea
                      ref={subtitleRef}
                      name='subtitle'
                      className='border-b resize-none overflow-hidden py-3 px-2 focus:outline-none'
                      value={post.subtitle || ''}
                      rows={1}
                      onChange={handleOnChange}
                    />
                  </div>
                </div>
                <div className='flex flex-col w-full h-full basis-2/5'>
                  <h1 className='text-lg font-bold mb-3'>공개 설정</h1>
                  <div className='container flex gap-4'>
                    <IsPublicBtn onClick={publicHandler} selected={isPublic}>
                      전체 공개
                    </IsPublicBtn>
                    <IsPublicBtn onClick={privateHandler} selected={!isPublic}>
                      비공개
                    </IsPublicBtn>
                  </div>
                </div>
                <div className='flex items-end justify-end basis-1/5 w-full py-5'>
                  <button
                    className='btn min-w-[120px] max-sm:w-full'
                    onClick={handleSubmit}
                  >
                    {type === 'write' ? '등록하기' : '수정하기'}
                  </button>
                </div>
              </div>
            </div>
          </FormModal>
        </ModalPortal>
      )}
    </>
  );
}
