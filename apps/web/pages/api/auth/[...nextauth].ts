import NextAuth, { NextAuthOptions } from 'next-auth';
import TwitterProvider from 'next-auth/providers/twitter';

export const authOptions: NextAuthOptions = {
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CONSUMER_KEY || '',
      clientSecret: process.env.TWITTER_CONSUMER_SECRET || '',
    }),
  ],
};

export default NextAuth(authOptions);
