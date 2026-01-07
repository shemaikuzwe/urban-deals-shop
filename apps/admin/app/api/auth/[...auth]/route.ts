import { auth,toNextJsHandler } from "@urban-deals-shop/auth";
export const { GET, POST } = toNextJsHandler(auth);
