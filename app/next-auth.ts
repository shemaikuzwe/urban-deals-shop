import NextAuth, { DefaultSession } from "next-auth";
import { Role } from "@/generated/prisma/client";
import "next-auth/jwt";
import "@auth/core/adapters";

declare module "@auth/core/adapters" {
  interface AdapterUser {
    role: Role;
  }
}

declare module "next-auth" {
  interface User {
    role: Role;
  }
  interface Session {
    user: {
      role: Role;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: Role;
  }
}
