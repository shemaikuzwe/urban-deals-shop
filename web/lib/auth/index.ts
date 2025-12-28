//  Add server only
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { headers } from "next/headers";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  database: prismaAdapter(prisma, {
    provider: "mysql",
    debugLogs: process.env.NODE_ENV === "development",
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
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
