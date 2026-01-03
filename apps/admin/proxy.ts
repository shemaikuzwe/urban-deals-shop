import { NextRequest, NextResponse } from "next/server";
import { auth } from "./lib/action/server";

export default async function proxy(req: NextRequest) {
  const session = await auth();
  const isLoggedIn = session.status === "authenticated";
  if (isLoggedIn && req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/admin", req.nextUrl));
  } else if (!isLoggedIn && req.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }
  return NextResponse.next();
}
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
