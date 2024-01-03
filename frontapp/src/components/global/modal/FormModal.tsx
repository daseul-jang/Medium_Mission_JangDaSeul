import { useEffect } from 'react';
import CloseIcon from '../ui/icon/CloseIcon';

interface Props {
  onClose: (
    e: React.MouseEvent<HTMLButtonElement | HTMLElement, MouseEvent>
  ) => void;
  children: React.ReactNode;
}

export default function FormModal({ onClose, children }: Props) {
  // 모달 창이 떠 있을 땐 백그라운드 스크롤을 막음
  useEffect(() => {
    document.body.style.overflowY = 'hidden';

    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, []);

  return (
    <section
      className='fixed top-0 left-0 flex flex-col justify-center items-center w-full h-full z-50 bg-white/70'
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose(e);
        }
      }}
    >
      <div className='relative bg-white w-full h-full max-w-7xl'>
        <button className='absolute right-0 p-4' onClick={(e) => onClose(e)}>
          <CloseIcon className='w-4 h-4 text-gray-600 fill-current stroke-current' />
        </button>
        {children}
      </div>
    </section>
  );
}
