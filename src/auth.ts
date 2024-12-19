import NextAuth, { DefaultSession, Session } from "next-auth";
import spotify, { refreshAccessToken } from "./spotify";

export type AuthUser = DefaultSession["user"] & {
  access_token: string;
  token_type: string;
  expires_at: number;
  expires_in: number;
  refresh_token: string;
  scope: string;
  id: string;
};

declare module "next-auth" {
  interface Session {
    user: AuthUser;
    error?: string;
  }
}

export const { handlers, auth } = NextAuth({
  providers: [spotify],
  session: { strategy: "jwt", updateAge: 0 },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        const now = Math.floor(Date.now() / 1000);
        return {
          ...token,
          access_token: account.access_token,
          token_type: account.token_type,
          expires_at: now + (account.expires_in ?? 3600),
          expires_in: account.expires_in ?? 3600,
          refresh_token: account.refresh_token,
          scope: account.scope,
          id: account.providerAccountId,
        };
      }

      const now = Math.floor(Date.now() / 1000);
      if ((token.expires_at as number) <= now) {
        const refreshedToken = await refreshAccessToken(token);
        return refreshedToken.error
          ? { ...token, error: refreshedToken.error as string }
          : refreshedToken;
      }

      return { ...token, expires_in: (token.expires_at as number) - now };
    },

    async session({ session, token }): Promise<Session> {
      return {
        ...session,
        user: {
          ...session.user,
          access_token: token.access_token as string,
          token_type: token.token_type as string,
          expires_at: token.expires_at as number,
          expires_in: token.expires_in as number,
          refresh_token: token.refresh_token as string,
          scope: token.scope as string,
          id: token.id as string,
          supabaseUserId: token.supabaseUserId,
          supabaseAccessToken: token.supabaseAccessToken as string | undefined,
        } as AuthUser,
        error: token.error as string | undefined,
      };
    },
  },
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXT_AUTH_SECRET,
});
