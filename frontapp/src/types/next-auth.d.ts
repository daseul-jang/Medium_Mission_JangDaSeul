import { AuthMember, SessionMember } from '@/model/member';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface User {
    member: AuthMember;
    accessToken: string;
    refreshToken: string;
  }

  interface Session extends DefaultSession {
    user: SessionMember;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: SessionMember;
  }
}
