import { auth, toNextJsHandler } from "@urban-deals-shop/auth";

export const { POST, GET } = toNextJsHandler(auth);
