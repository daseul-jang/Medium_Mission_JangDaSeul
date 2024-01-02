import { createPortal } from 'react-dom';

type Props = {
  children: React.ReactNode;
};

export default function ModalPortal({ children }: Props) {
  console.log('modal on');
  if (typeof window === 'undefined') return null;

  const node = document.getElementById('portal') as Element;

  return createPortal(children, node);
}
