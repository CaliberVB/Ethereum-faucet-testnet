import NextAuth, { NextAuthOptions, Account, User, Profile } from 'next-auth';
import TwitterProvider from 'next-auth/providers/twitter';
import { JWT } from 'next-auth/jwt';

export const authOptions: NextAuthOptions = {
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CONSUMER_KEY || '',
      clientSecret: process.env.TWITTER_CONSUMER_SECRET || '',
    }),
  ],
  callbacks: {
    // Note that you might need to import the types: JWT, User, Profile, and Account from 'next-auth'
    async jwt({
      token,
      user,
      account,
      profile,
      isNewUser,
    }: {
      token: JWT;
      user: User;
      account: Account | null;
      profile?: Profile;
      isNewUser?: boolean;
    }) {
      if (account?.provider && !token[account.provider]) {
        token[account.provider] = {};
      }

      if (account?.accessToken) {
        (token[account.provider] as { [key: string]: any }).accessToken = account.accessToken;
      }

      if (account?.refreshToken) {
        (token[account.provider] as { [key: string]: any }).refreshToken = account.refreshToken;
      }

      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
