import Link from 'next/link';
import PageButton from './button/PageButton';
import FirstIcon from './icon/FirstIcon';
import LastIcon from './icon/LastIcon';
import NextIcon from './icon/NextIcon';
import PrevIcon from './icon/PrevIcon';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  pageSize: number;
  baseUrl: string;
}

export default function Pagination({
  totalPages,
  currentPage,
  pageSize,
  baseUrl,
}: PaginationProps) {
  const pagesToShow = 5;
  let startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
  let endPage = Math.min(totalPages, startPage + pagesToShow - 1);
  const pages = [...Array(endPage - startPage + 1).keys()].map(
    (i) => startPage + i
  );

  const prevPage = Math.max(1, currentPage - pagesToShow);
  const nextPage =
    totalPages - currentPage <= pagesToShow
      ? totalPages
      : Math.min(totalPages, currentPage + pagesToShow);

  return (
    <div className='join h-[34px]'>
      <Link href={`${baseUrl}page=1&size=${pageSize}`}>
        <PageButton btnType='start' cond={currentPage === 1}>
          <div className='w-3 h-full flex justify-center items-center'>
            <FirstIcon />
          </div>
        </PageButton>
      </Link>
      <Link href={`${baseUrl}page=${prevPage}&size=${pageSize}`}>
        <PageButton cond={startPage === currentPage}>
          <div className='w-2 h-full flex justify-center items-center'>
            <PrevIcon />
          </div>
        </PageButton>
      </Link>
      {pages.map((page) => (
        <Link key={page} href={`${baseUrl}page=${page}&size=${pageSize}`}>
          <PageButton cond={page === currentPage}>
            <div className='h-full flex justify-center items-center'>
              {page}
            </div>
          </PageButton>
        </Link>
      ))}
      <Link href={`${baseUrl}page=${nextPage}&size=${pageSize}`}>
        <PageButton cond={currentPage === totalPages}>
          <div className='w-2 h-full flex justify-center items-center'>
            <NextIcon />
          </div>
        </PageButton>
      </Link>
      <Link href={`${baseUrl}page=${totalPages}&size=${pageSize}`}>
        <PageButton btnType='end' cond={currentPage === totalPages}>
          <div className='w-3 h-full flex justify-center items-center'>
            <LastIcon />
          </div>
        </PageButton>
      </Link>
    </div>
  );
}
