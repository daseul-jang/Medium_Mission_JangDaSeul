import { Member } from './member';
import { Post } from './post';

export interface Response<T> {
  result: boolean;
  status: number;
  message: string;
  data: T;
}

export interface Page<T> {
  content: T[] | null;
  pageable: Pageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  first: boolean;
  size: number;
  number: number;
  sort: Sort;
  numberOfElements: number;
  empty: boolean;
}

interface Pageable {
  pageNumeber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}
