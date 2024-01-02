import Link from 'next/link';
import WriteIcon from '../icon/WriteIcon';

interface Props {
  style?: string;
}

export default function WriteBtn({ style }: Props) {
  return (
    <Link href='/posts/write'>
      <div
        className={`${
          style ? style : 'text-black'
        } text-sm flex items-center gap-1 mr-3`}
      >
        <WriteIcon />
        Write
      </div>
    </Link>
  );
}
