import { AuthType } from '../../Navbar';
import GoogleIcon from '../icon/GoogleIcon';
import KakaoIcon from '../icon/KakaoIcon';
import LocalIdIcon from '../icon/LocalIdIcon';

interface Props {
  type: string;
  authType: AuthType;
  openFormHandler?: () => void;
}

interface Social {
  title: string;
  icon: React.ReactElement;
  style: string;
}

interface SocialMap {
  [key: string]: Social;
}

const btnData: SocialMap = {
  google: {
    title: 'Google',
    icon: <GoogleIcon />,
    style: '',
  },
  kakao: {
    title: 'Kakao',
    icon: <KakaoIcon />,
    style: '',
  },
  local: {
    title: 'ID',
    icon: <LocalIdIcon />,
    style: '',
  },
};

export default function SocialBtn({ type, authType, openFormHandler }: Props) {
  const data = btnData[type];

  return (
    <button
      className='flex justify-between items-center md:gap-10 w-[250px] md:w-[300px] text-sm border border-neutral-800 rounded-full p-3'
      onClick={openFormHandler}
    >
      <span>{data?.icon}</span>
      <span className='text-black'>
        {authType === 'join' ? 'Sign up' : 'Sign in'} with {data?.title}
      </span>
      <span className='w-5 h-5'></span>
    </button>
  );
}
