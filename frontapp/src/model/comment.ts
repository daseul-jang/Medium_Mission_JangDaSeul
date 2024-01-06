export interface Comment {
  id: number;
  writerId: number;
  writerUsername: string;
  content: string;
  postId: number;
  createDate: string;
  modifyDate: string;
}
