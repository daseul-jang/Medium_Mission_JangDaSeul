import { Member } from './member';

export interface Post {
  id: number;
  title: string;
  content: string;
  isPublic: boolean;
  createDate: string;
  modifyDate: string;
  writer: Member;
}

export interface WritePost
  extends Pick<Post, 'title' | 'content' | 'isPublic'> {}
