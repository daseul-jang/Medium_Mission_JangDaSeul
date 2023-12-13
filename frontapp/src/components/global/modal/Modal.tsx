import { useEffect } from 'react';
import CloseIcon from '../ui/icon/CloseIcon';

type Props = {
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({ onClose, children }: Props) {
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
          onClose();
        }
      }}
    >
      <div className='relative bg-white w-full h-full max-w-7xl sm:w-4/5 lg:h-4/5 lg:w-3/5 rounded-md shadow-xl border'>
        <button className='absolute right-0 p-4' onClick={() => onClose()}>
          <CloseIcon />
        </button>
        {children}
      </div>
    </section>
  );
}
