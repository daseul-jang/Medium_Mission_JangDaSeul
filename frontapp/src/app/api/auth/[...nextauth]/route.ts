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

        if (res.cause) {
          throw new Error('서버와 연결이 끊겼어요... 🥲');
        }

        if (!res.result) {
          throw new Error(res.message);
        }

        return res.data;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log('jwt');

      if (user) {
        token = {
          accessToken: user.accessToken,
          accessTokenExp: user.accessTokenExp,
          refreshToken: user.refreshToken,
          user: user?.member,
        };
      }

      if (Date.now() > token.accessTokenExp) {
        console.log('액세스 토큰 만료!! 재발급 중...');

        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_LOCAL_SERVER_URL}/member/reissue-access-token`,
            {
              headers: {
                'Content-Type': 'application/json',
              },
              method: 'POST',
              body: token.refreshToken,
            }
          );

          const data = await res.json();

          if (!res.ok) {
            throw new Error('토큰 만료, 재 로그인 요망');
          }

          token = {
            ...token,
            accessToken: data.data.accessToken,
            accessTokenExp: data.data.accessTokenExp,
          };
        } catch (err) {
          console.log('액세스 토큰 재발급 오류', err);
          token.error = {
            message: '액세스 토큰 재발급에 실패했습니다.',
            code: -9001,
          };
        }
      }

      return token;
    },
    async session({ session, token }) {
      console.log('session');

      if (token?.user) {
        return {
          expires: new Date(token.accessTokenExp).toISOString(),
          accessToken: token.accessToken,
          user: token.user,
        };
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
