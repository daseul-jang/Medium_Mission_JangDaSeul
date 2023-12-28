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
import { useCallback, useMemo, useRef } from 'react';

export default function InfiniteList() {
  const cache = useRef(
    new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 100,
    })
  );
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage, status } =
    useInfiniteList();

  const posts = useMemo(
    () => data?.pages.flatMap((page) => page) ?? [],
    [data]
  );

  const loadMoreRows = isFetchingNextPage
    ? () => new Promise((resolve, reject) => {})
    : ({ startIndex, stopIndex }: IndexRange) => fetchNextPage();

  const isRowLoaded = ({ index }: { index: number }) => {
    return index < posts.length;
  };

  const rowRenderer = useCallback(
    ({ index, key, parent, style }: ListRowProps) => {
      const post = posts[index];

      return (
        <CellMeasurer
          key={key}
          cache={cache.current}
          parent={parent}
          columnIndex={0}
          rowIndex={index}
        >
          <div style={style}>
            <InfiniteListItem post={post} />
          </div>
        </CellMeasurer>
      );
    },
    [posts]
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
