import NextAuth, { NextAuthOptions, Account, User, Profile } from "next-auth"
import TwitterProvider from "next-auth/providers/twitter"

export const authOptions: NextAuthOptions = {
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CONSUMER_KEY || "",
      clientSecret: process.env.TWITTER_CONSUMER_SECRET || ""
    })
  ],
  callbacks: {
    async jwt({ token, account }: { token: { [key: string]: any }; account?: Account | undefined }) {
      if (account?.provider && !token[account.provider]) {
        token[account.provider] = {}
      }

      if (account?.accessToken) {
        token[account.provider].accessToken = account.accessToken
      }

      if (account?.refreshToken) {
        token[account.provider].refreshToken = account.refreshToken
      }

      return token
    }
  },
  secret: process.env.NEXTAUTH_SECRET
}

export default NextAuth(authOptions)
