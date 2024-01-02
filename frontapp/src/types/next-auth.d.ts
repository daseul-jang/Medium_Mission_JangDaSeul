import { TokenError } from '@/model/common';
import { AuthMember, SessionMember } from '@/model/member';
import { DefaultSession } from 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface User {
    member: AuthMember;
    accessToken: string;
    accessTokenExp: number;
    refreshToken: string;
  }

  interface Session extends DefaultSession {
    accessToken: string;
    user: AuthMember;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    accessToken: string;
    accessTokenExp: number;
    refreshToken: string;
    user: AuthMember;
    error?: TokenError;
  }
}
