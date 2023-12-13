interface Props {
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface InputData {
  title: string;
  type: string;
  name: string;
}

interface InputDataMap {
  [key: string]: InputData;
}

const inputData: InputDataMap = {
  id: {
    title: '아이디',
    type: 'text',
    name: 'username',
  },
  password: {
    title: '비밀번호',
    type: 'password',
    name: 'password',
  },
  passwordConfirm: {
    title: '비밀번호 확인',
    type: 'password',
    name: 'passwordConfirm',
  },
};

export default function AuthInput({ type, value, onChange }: Props) {
  const data = inputData[type];

  return (
    <div className='flex flex-col gap-2 w-72 text-sm'>
      <label className=''>{data.title}</label>
      <input
        className='border-b border-black focus:outline-none p-1'
        type={data.type}
        name={data.name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
