import Link from 'next/link';

interface ErrorHandlerProps {
  status?: number;
  title?: string;
}

interface ErrorTypes {
  [key: number]: ErrorHandlerProps;
}

const errorTypes: ErrorTypes = {
  403: {
    status: 403,
    title: 'Forbidden',
  },
  404: {
    status: 404,
    title: 'Not Found',
  },
};

export default function PageAccessErrorHandler({ status = 404 }) {
  const errorType = errorTypes[status];

  return (
    <div className='fixed top-0 w-full h-full bg-white z-50'>
      <div className='flex flex-col justify-center items-center h-full max-w-fit mx-auto'>
        <span className='text-3xl font-semibold text-error pb-4'>Error</span>
        <span className='text-3xl font-bold tracking-widest pb-3'>
          {errorType.status} | {errorType.title}
        </span>
        <Link
          href='/'
          className='w-full text-sm text-neutral-500 hover:text-neutral-700 hover:underline'
        >
          <span className='flex justify-end'>메인으로 돌아가기</span>
        </Link>
      </div>
    </div>
  );
}
