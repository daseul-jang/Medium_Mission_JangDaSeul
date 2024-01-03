import { WritePost } from '@/model/post';
import AfterSubmitArea from './AfterSubmitArea';

interface PostFormProps {
  type: 'write' | 'modify';
  post: WritePost;
  isPublic: boolean;
  isPaid: boolean;
  modalOpen: boolean;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  publicHandler: () => void;
  privateHandler: () => void;
  paidHandler: () => void;
  noPaidHandler: () => void;
  openModalHandler: () => void;
  closeModalHandler: () => void;
  handleOnChange: (
    e: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>
  ) => void;
  handleSubmit: () => void;
}

export default function PostForm({
  type,
  post,
  isPublic,
  isPaid,
  modalOpen,
  textareaRef,
  publicHandler,
  privateHandler,
  paidHandler,
  noPaidHandler,
  openModalHandler,
  closeModalHandler,
  handleOnChange,
  handleSubmit,
}: PostFormProps) {
  return (
    <>
      <div className='flex flex-col basis-1/12 bg-white justify-center rounded-md mt-3'>
        <textarea
          name='title'
          ref={textareaRef}
          value={post.title}
          onChange={handleOnChange}
          placeholder='제목을 입력하세요'
          className='resize-none text-3xl font-bold w-full focus:outline-none'
          rows={1}
        />
      </div>
      <div className='flex flex-col basis-9/12 py-5 border-t'>
        <textarea
          name='content'
          value={post.content}
          onChange={handleOnChange}
          placeholder='내용을 입력하세요'
          className='resize-none h-full text-xl focus:outline-none'
        />
      </div>
      <AfterSubmitArea
        type={type}
        post={post}
        modalOpen={modalOpen}
        openModal={openModalHandler}
        closeModal={closeModalHandler}
        isPublic={isPublic}
        isPaid={isPaid}
        publicHandler={publicHandler}
        privateHandler={privateHandler}
        paidHandler={paidHandler}
        noPaidHandler={noPaidHandler}
        handleOnChange={handleOnChange}
        handleSubmit={handleSubmit}
      />
    </>
  );
}
