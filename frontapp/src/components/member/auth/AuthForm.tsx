import { useState } from 'react';
import { AuthType } from '../../global/Navbar';
import AuthLeftAngleBracket from '../../global/ui/icon/AuthLeftAngleBracket';
import AuthInput from '../../global/ui/input/AuthInput';
import { JoinInfo, LoginInfo } from '@/model/member';
import { useJoin } from '@/hooks/member';
import { signIn } from 'next-auth/react';

interface Props {
  authType: AuthType;
  closeModalHandler: () => void;
  closeFormHandler: () => void;
  afterAuthViewHandler: () => void;
}

interface authFormType {
  login: LoginInfo;
  join: JoinInfo;
}

const formDataInit: authFormType = {
  login: {
    username: '',
    password: '',
  },
  join: {
    username: '',
    password: '',
    passwordConfirm: '',
  },
};

export default function AuthFrom({
  authType,
  closeModalHandler,
  closeFormHandler,
  afterAuthViewHandler,
}: Props) {
  const formData = formDataInit[authType];
  const [authInfo, setAuthInfo] = useState<LoginInfo | JoinInfo>(formData);
  const { submitJoin, isPending, isError } = useJoin(
    authInfo as JoinInfo,
    afterAuthViewHandler
  );

  const changeAuthInfoHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthInfo({
      ...authInfo,
      [e.target.name]: e.target.value,
    });
  };

  const submitAuthHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (authType === 'join') {
      submitJoin();
    } else {
      console.log('로그인');

      const res = await signIn('credentials', {
        ...authInfo,
        redirect: false,
      });

      console.log(res);

      if (!res?.ok) {
        alert(res?.error);
        return;
      }

      closeModalHandler();
    }
  };

  return (
    <div className='flex flex-col items-center justify-center gap-10 h-full p-20'>
      <h1 className='font-custom text-3xl'>
        {authType === 'join' ? 'Sign up' : 'Sign in'}
      </h1>
      <form className='flex flex-col mt-8 gap-16' onSubmit={submitAuthHandler}>
        <div className='flex flex-col gap-12'>
          <AuthInput
            type='id'
            value={authInfo.username}
            onChange={changeAuthInfoHandler}
          />
          <AuthInput
            type='password'
            value={authInfo.password}
            onChange={changeAuthInfoHandler}
          />
          {authType === 'join' && (
            <AuthInput
              type='passwordConfirm'
              value={
                'passwordConfirm' in authInfo ? authInfo.passwordConfirm : ''
              }
              onChange={changeAuthInfoHandler}
            />
          )}
        </div>
        <button className='rounded-full bg-black text-white text-sm p-3'>
          Continue
        </button>
      </form>
      <span
        className='cursor-pointer flex items-center text-sm text-green-700'
        onClick={closeFormHandler}
      >
        <AuthLeftAngleBracket />
        All sign up options
      </span>
    </div>
  );
}
