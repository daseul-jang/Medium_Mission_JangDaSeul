export interface Member {
  id: number;
  username: string;
  password: string;
  role: 'USER' | 'PAID' | 'ADMIN';
  createDate: string;
  modifyDate: string;
  refreshToken: RefreshToken;
  posts: [];
}

export interface LoginInfo extends Pick<Member, 'username' | 'password'> {}
export interface JoinInfo extends LoginInfo {
  passwordConfirm: string;
}

export interface AuthMember
  extends Pick<
    Member,
    'id' | 'username' | 'role' | 'createDate' | 'modifyDate'
  > {}

export interface SessionMember extends AuthMember {
  accessToken: string;
  refreshToken: string;
}

export interface RefreshToken
  extends Pick<Member, 'id' | 'createDate' | 'modifyDate'> {
  token: string;
  expiryDate: string;
  member: Member;
}
