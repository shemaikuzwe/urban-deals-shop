//  Add server only
import { db } from "@urban-deals-shop/db";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { headers } from "next/headers";

const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  database: prismaAdapter(db, {
    provider: "postgresql",
    debugLogs: process.env.NODE_ENV === "development",
  }),
  account: {
    accountLinking: {
      trustedProviders: [
        "google",
        "github",
        "apple",
        "gitlab",
        "email-password",
      ],
    },
    skipStateCookieCheck: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
});
const signIn = async (provider: "google" | "github") =>
  await auth.api.signInSocial({
    body: {
      provider,
    },
  });
const signOut = async () =>
  await auth.api.signOut({
    headers: await headers(),
  });

const getSession = async () =>
  await auth.api.getSession({ headers: await headers() });

export { auth, signIn, signOut, getSession };
