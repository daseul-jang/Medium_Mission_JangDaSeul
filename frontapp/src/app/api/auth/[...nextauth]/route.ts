import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { LoginInfo } from '@/model/member';
import { loginMember } from '@/service/member';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {},
      async authorize(credentials, req) {
        console.log('next-auth');

        const { username, password } = credentials as LoginInfo;

        const res = await loginMember({ username, password });

        if (!res.result) {
          throw new Error('에러에러에러!!');
        }

        return res.data;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const member = user?.member;
        console.log(member);

        token.user = {
          ...member,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
        };
      }

      return token;
    },
    async session({ session, token }) {
      if (token?.user) {
        session.user = token.user;
      }

      return session;
    },
  },
  pages: {
    //signIn: '/user/signin',
    //error: '/user/error',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
