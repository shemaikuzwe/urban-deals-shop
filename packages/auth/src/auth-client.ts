import { adminClient, inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { auth } from "./index";

const { useSession, signIn, signOut, $Infer, admin } = createAuthClient({
  plugins: [adminClient(), inferAdditionalFields<typeof auth>()],
});
type Session = typeof $Infer.Session;
export { useSession, signIn, signOut, type Session, admin };
