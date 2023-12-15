import { AuthMember } from '@/model/member';

declare module 'next-auth' {
  interface User {
    member: AuthMember;
    accessToken: string;
    refreshToken: string;
  }
}
