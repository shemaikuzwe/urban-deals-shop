import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import Github from "next-auth/providers/github";
import { cache } from "react";

const prisma = new PrismaClient();
const {
  handlers,
  signIn,
  signOut,
  auth: isAuth,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    Github({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login/error",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.role = token.role;
      return session;
    },
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnLogin = nextUrl.pathname.startsWith("/login");
      const isOnAdmin = nextUrl.pathname.startsWith("/admin");
      const isAdmin = auth?.user.role === "ADMIN";
      const isOnHome = nextUrl.pathname === "/";
      if (isOnLogin && isLoggedIn) {
        if (isAdmin) {
          return Response.redirect(new URL("/admin", nextUrl));
        }
        return Response.redirect(new URL("/", nextUrl));
      } else if (isOnAdmin) {
        if (!isLoggedIn || !isAdmin)
          return Response.redirect(new URL("/login", nextUrl));
        return true;
      } else if (isOnHome && isAdmin) {
        return Response.redirect(new URL("/admin", nextUrl));
      }
      return true;
    },
  },
});
const auth = cache(isAuth);
export { handlers, signIn,signOut,auth };
