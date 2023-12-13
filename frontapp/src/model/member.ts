export interface BaseMember {
  id: number;
  username: string;
  password: string;
  role: string;
  createDate: string;
  modifyDate: string;
  refreshToken: RefreshToken;
  posts: [];
}

export interface LoginInfo extends Pick<BaseMember, 'username' | 'password'> {}
export interface JoinInfo extends LoginInfo {
  passwordConfirm: string;
}

export interface AuthMember
  extends Pick<
    BaseMember,
    'id' | 'username' | 'role' | 'createDate' | 'modifyDate'
  > {}

export interface RefreshToken
  extends Pick<BaseMember, 'id' | 'createDate' | 'modifyDate'> {
  token: string;
  expiryDate: string;
  member: BaseMember;
}
