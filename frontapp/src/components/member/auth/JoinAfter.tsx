interface Props {
  changeAuthType: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function JoinAfter({ changeAuthType }: Props) {
  return (
    <div className='flex flex-col items-center justify-center gap-10 h-full p-20'>
      <h1 className='text-3xl font-custom'>Welcome New Member! 🎉</h1>
      <div className='flex flex-col gap-5'>
        <span className='text-center'>
          회원가입이 성공적으로 완료되었습니다! <br />
          로그인 후 서비스를 이용해 보세요!
        </span>
        <button
          name='login'
          className='rounded-full bg-green-700 p-3 hover:bg-green-900 text-white'
          onClick={changeAuthType}
        >
          로그인 하러 가기
        </button>
      </div>
    </div>
  );
}
