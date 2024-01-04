import { Comment } from './comment';
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
  writerId: number;
  writerUsername: string;
  comments?: Comment[];
  cause?: Cause;
}

export interface WritePost
  extends Pick<
    Post,
    'title' | 'subtitle' | 'content' | 'isPublic' | 'isPaid'
  > {}
