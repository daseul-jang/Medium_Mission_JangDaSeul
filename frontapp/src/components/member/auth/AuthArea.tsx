import { AuthType } from '../../global/Navbar';
import SocialBtn from '../../global/ui/button/SocialBtn';

interface Props {
  authType: AuthType;
  changeAuthType: (e: React.MouseEvent<HTMLButtonElement>) => void;
  openFormHandler: () => void;
}

const authData = {
  login: {
    title: 'Welcome back.',
    infoText: 'No account?',
    btnName: 'join',
    linkText: 'Create one',
  },
  join: {
    title: 'Join Medium',
    infoText: 'Already have an account?',
    btnName: 'login',
    linkText: 'Sign in',
  },
};

const socialType = ['google', 'kakao'];

export default function AuthArea({
  authType,
  changeAuthType,
  openFormHandler,
}: Props) {
  const data = authData[authType];

  return (
    <div className='flex flex-col items-center justify-center gap-10 h-full p-20'>
      <h1 className='text-3xl font-custom'>{data.title}</h1>
      <div className=''>
        <div className='flex flex-col items-center gap-3 mt-[50px]'>
          {socialType.map((type, index) => (
            <SocialBtn type={type} authType={authType} key={index} />
          ))}
          <SocialBtn
            type='local'
            authType={authType}
            openFormHandler={openFormHandler}
          />
        </div>
        <div className='flex justify-center text-sm mt-[40px] mb-[100px]'>
          <span>{data.infoText} &nbsp;</span>
          <button
            name={data.btnName}
            className='font-bold text-green-700'
            onClick={changeAuthType}
          >
            {data.linkText}
          </button>
        </div>
        <div className='flex justify-center'>
          <p className='text-center text-xs'>
            Click “Sign up” to agree to Medium’s Terms of Service and
            acknowledge that Medium’s Privacy Policy applies to you.
          </p>
        </div>
      </div>
    </div>
  );
}
