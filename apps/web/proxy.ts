import { NextRequest, NextResponse } from "next/server";
import { auth } from "./lib/auth";


const publicRoutes=["/","/products"]
export default async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({ headers: request.headers });
  const isLoggedIn = !!session;
  const isOnPublicRoute = publicRoutes.includes(request.nextUrl.pathname);
  const isOnApi = request.nextUrl.pathname.startsWith("/api");
  if (!isLoggedIn && !isOnPublicRoute && !isOnApi) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
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
  runtime: "nodejs",
};
