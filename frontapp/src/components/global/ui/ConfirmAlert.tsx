import AlertModal from '../modal/AlertModal';
import ModalPortal from '../modal/ModalPortal';

interface ConfirmAlertProps {
  alertOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  children: React.ReactNode;
}

export default function ConfirmAlert({
  alertOpen,
  onClose,
  onSubmit,
  children,
}: ConfirmAlertProps) {
  if (!alertOpen) {
    return null;
  }

  return (
    <ModalPortal>
      <AlertModal onClose={onClose}>
        <div className='p-5 w-full h-full flex flex-col justify-center items-center gap-8'>
          <span className='text-center leading-relaxed tracking-wider'>
            {children}
          </span>
          <div className='flex gap-3 w-full justify-center'>
            <button className='w-20 btn' onClick={onClose}>
              아니요
            </button>
            <button
              className='w-20 btn btn-error text-white'
              onClick={onSubmit}
            >
              네
            </button>
          </div>
        </div>
      </AlertModal>
    </ModalPortal>
  );
}
