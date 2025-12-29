import { createAuthClient } from "better-auth/react";

const { useSession, signIn, signOut, $Infer } = createAuthClient();
type Session = typeof $Infer.Session;

export { useSession, signIn, signOut, type Session };
