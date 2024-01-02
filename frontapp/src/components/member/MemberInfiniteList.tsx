import { Post } from '@/model/post';
import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from '@tanstack/react-query';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  IndexRange,
  InfiniteLoader,
  List,
  ListRowProps,
  WindowScroller,
} from 'react-virtualized';

interface Props {
  children: (post: Post) => React.ReactNode;
  data: InfiniteData<any, unknown> | undefined;
  status: string;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<InfiniteData<any, unknown>, Error>>;
}

export default function MemberInfiniteList({
  children,
  data,
  status,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: Props) {
  const cache = useRef(
    new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 100,
    })
  );

  // 화면 사이즈가 변경될 때마다 cache 초기화
  // 리스트 아이템들의 크기를 반응형으로 만들 수 있음
  useEffect(() => {
    const handleResize = () => {
      cache.current.clearAll();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const posts = useMemo(
    () => data?.pages.flatMap((page) => page.data) ?? [],
    [data]
  );

  console.log('posts');
  console.log(posts);

  const loadMoreRows = isFetchingNextPage
    ? () => new Promise((resolve, reject) => {})
    : ({ startIndex, stopIndex }: IndexRange) => fetchNextPage();

  const isRowLoaded = ({ index }: { index: number }) => {
    return index < posts.length;
  };

  const rowRenderer = useCallback(
    ({ index, key, parent, style }: ListRowProps) => {
      const post = posts[index];

      if (post?.cause) {
        return <>서버와 연결이 끊어짐</>;
      }

      if (!post) {
        return <></>;
      }

      return (
        <CellMeasurer
          key={key}
          cache={cache.current}
          parent={parent}
          columnIndex={0}
          rowIndex={index}
        >
          {({ measure }) => (
            <Link href={`/posts/${post?.id}`} style={style} onLoad={measure}>
              {children(post)}
            </Link>
          )}
        </CellMeasurer>
      );
    },
    [posts, children]
  );

  if (status === 'pending') return <p>Loading...</p>;
  if (status === 'error') return <p>Error :(</p>;

  return (
    <WindowScroller>
      {({ height, isScrolling, onChildScroll, scrollTop }) => (
        <InfiniteLoader
          isRowLoaded={isRowLoaded}
          loadMoreRows={loadMoreRows}
          rowCount={hasNextPage ? posts.length + 1 : posts.length}
        >
          {({ onRowsRendered, registerChild }) => (
            <div className='w-full min-h-[200px]'>
              <AutoSizer disableHeight>
                {({ width }) => (
                  <List
                    autoHeight
                    isScrolling={isScrolling}
                    onScroll={onChildScroll}
                    scrollTop={scrollTop}
                    ref={registerChild}
                    onRowsRendered={onRowsRendered}
                    width={width}
                    height={height}
                    rowCount={hasNextPage ? posts.length + 1 : posts.length}
                    rowHeight={cache.current.rowHeight}
                    rowRenderer={rowRenderer}
                    deferredMeasurementCache={cache.current}
                    overscanRowCount={1}
                  />
                )}
              </AutoSizer>
            </div>
          )}
        </InfiniteLoader>
      )}
    </WindowScroller>
  );
}
