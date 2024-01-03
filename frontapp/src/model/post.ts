import { Cause } from './common';
import { Member } from './member';

export interface Post {
  id: number;
  title: string;
  subtitle: string;
  content: string;
  isPublic: boolean;
  isPaid: boolean;
  createDate: string;
  modifyDate: string;
  writer: Member;
  cause?: Cause;
}

export interface WritePost
  extends Pick<
    Post,
    'title' | 'subtitle' | 'content' | 'isPublic' | 'isPaid'
  > {}
