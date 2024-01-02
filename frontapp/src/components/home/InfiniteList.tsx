'use client';

import { useInfiniteList } from '@/hooks/post';
import {
  InfiniteLoader,
  List,
  AutoSizer,
  ListRowProps,
  CellMeasurerCache,
  CellMeasurer,
  WindowScroller,
  IndexRange,
} from 'react-virtualized';
import InfiniteListItem from './InfiniteListItem';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import LoadingSpinnerDots from '../global/ui/icon/LoadingSpinnerDots';

export default function InfiniteList() {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage, status } =
    useInfiniteList();
  console.log(data);

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
    () => data?.pages.flatMap((page) => page) ?? [],
    [data]
  );

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
              <InfiniteListItem post={post} />
            </Link>
          )}
        </CellMeasurer>
      );
    },
    [posts]
  );

  if (status === 'pending') return <LoadingSpinnerDots />;
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
            <div className='w-full min-h-[300px]'>
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
                    overscanRowCount={5}
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
